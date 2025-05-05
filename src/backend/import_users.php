<?php
// Désactiver l'affichage des erreurs dans la sortie
ini_set('display_errors', 0);
error_reporting(0);
ob_clean();

// Headers CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

// Répondre immédiatement aux requêtes OPTIONS (pre-flight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Fonction pour envoyer une réponse JSON propre
function sendJsonResponse($data) {
    // S'assurer que la sortie est propre
    if (ob_get_length()) ob_clean();
    
    // Envoyer les en-têtes
    header('Content-Type: application/json; charset=utf-8');
    
    // Encoder et envoyer la réponse
    echo json_encode($data);
    exit;
}

// Vérifier que la requête est bien une requête POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(["error" => "Méthode non autorisée. Utilisez POST."]);
}

// Inclusion de l'autoloader généré par Composer
try {
    require __DIR__ . '/vendor/autoload.php';
    require 'db.php';
    require 'add_user.php'; // Contient la classe AdminUserManager
} catch (Exception $e) {
    sendJsonResponse(["error" => "Erreur lors du chargement des dépendances: " . $e->getMessage()]);
}

use PhpOffice\PhpSpreadsheet\IOFactory;

// Vérifier que la bibliothèque est bien chargée
if (!class_exists('PhpOffice\PhpSpreadsheet\IOFactory')) {
    sendJsonResponse(["error" => "La bibliothèque PhpSpreadsheet n'est pas correctement chargée."]);
}

// Vérifier que la connexion à la base de données est établie
if (!isset($pdo) || !($pdo instanceof PDO)) {
    sendJsonResponse(["error" => "La connexion à la base de données n'est pas disponible."]);
}

// Création d'une instance de AdminUserManager
try {
    $adminManager = new AdminUserManager($pdo);
} catch (Exception $e) {
    sendJsonResponse(["error" => "Erreur lors de l'initialisation du gestionnaire d'utilisateurs: " . $e->getMessage()]);
}

// Vérifier si un fichier a été envoyé
if (!isset($_FILES['excelFile']) || $_FILES['excelFile']['error'] !== UPLOAD_ERR_OK) {
    $errorMessage = "Aucun fichier Excel n'a été reçu.";
    
    if (isset($_FILES['excelFile'])) {
        switch ($_FILES['excelFile']['error']) {
            case UPLOAD_ERR_INI_SIZE:
                $errorMessage = "Le fichier dépasse la taille maximale autorisée par PHP.";
                break;
            case UPLOAD_ERR_FORM_SIZE:
                $errorMessage = "Le fichier dépasse la taille maximale autorisée par le formulaire.";
                break;
            case UPLOAD_ERR_PARTIAL:
                $errorMessage = "Le fichier n'a été que partiellement téléchargé.";
                break;
            case UPLOAD_ERR_NO_FILE:
                $errorMessage = "Aucun fichier n'a été téléchargé.";
                break;
            case UPLOAD_ERR_NO_TMP_DIR:
                $errorMessage = "Dossier temporaire manquant.";
                break;
            case UPLOAD_ERR_CANT_WRITE:
                $errorMessage = "Échec de l'écriture du fichier sur le disque.";
                break;
            case UPLOAD_ERR_EXTENSION:
                $errorMessage = "Une extension PHP a arrêté le téléchargement du fichier.";
                break;
        }
    }
    
    sendJsonResponse(["error" => $errorMessage]);
}

// Récupérer le chemin du fichier temporaire
$filePath = $_FILES['excelFile']['tmp_name'];

// Vérifier que le fichier existe et est lisible
if (!file_exists($filePath) || !is_readable($filePath)) {
    sendJsonResponse(["error" => "Le fichier téléchargé n'est pas accessible."]);
}

try {
    // Déterminer le type de fichier Excel
    $inputFileType = IOFactory::identify($filePath);
    
    // Créer un lecteur pour ce type de fichier
    $reader = IOFactory::createReader($inputFileType);
    
    // Configurer le lecteur pour qu'il lise uniquement les données
    $reader->setReadDataOnly(true);
    
    // Charger le fichier Excel
    $spreadsheet = $reader->load($filePath);
    
    // Récupérer la première feuille
    $sheet = $spreadsheet->getActiveSheet();
    
    // Convertir la feuille en tableau
    $rows = $sheet->toArray();
    
    // Vérifier que le fichier contient des données
    if (count($rows) <= 1) {
        sendJsonResponse(["error" => "Le fichier Excel ne contient pas de données ou seulement des en-têtes."]);
    }
    
    $errors = [];
    $successCount = 0;
    
    // Supposons que la première ligne contient les en-têtes
    foreach ($rows as $index => $row) {
        if ($index === 0) continue; // Ignorer l'en-tête
        
        // Vérifier que la ligne contient des données
        if (empty(array_filter($row))) {
            continue; // Ignorer les lignes vides
        }
        
        $nom      = isset($row[0]) ? trim($row[0]) : null;
        $prenom   = isset($row[1]) ? trim($row[1]) : null;
        $email    = isset($row[2]) ? trim($row[2]) : null;
        $password = isset($row[3]) ? trim($row[3]) : null;
        $site     = isset($row[4]) ? trim($row[4]) : null;
        
        // Validation des données
        $rowErrors = [];
        
        if (empty($nom)) $rowErrors[] = "Nom manquant";
        if (empty($prenom)) $rowErrors[] = "Prénom manquant";
        if (empty($email)) $rowErrors[] = "Email manquant";
        if (empty($password)) $rowErrors[] = "Mot de passe manquant";
        if (empty($site)) $rowErrors[] = "Site manquant";
        
        if (!empty($rowErrors)) {
            $errors[] = "Ligne " . ($index + 1) . " : " . implode(", ", $rowErrors);
            continue;
        }
        
        // Validation de l'email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = "Ligne " . ($index + 1) . " : format d'email invalide ($email)";
            continue;
        }
        
        try {
            $result = $adminManager->addUser($nom, $prenom, $email, $password, $site);
            if ($result) {
                $successCount++;
            } else {
                $errors[] = "Ligne " . ($index + 1) . " : erreur lors de l'ajout de l'utilisateur avec l'email : $email";
            }
        } catch (Exception $e) {
            $errors[] = "Ligne " . ($index + 1) . " : " . $e->getMessage();
        }
    }
    
    // Préparer la réponse
    $response = ["success" => "$successCount utilisateur(s) ajouté(s) avec succès."];
    
    if (!empty($errors)) {
        $response["errors"] = $errors;
    }
    
    // Envoyer la réponse
    sendJsonResponse($response);
    
} catch (Exception $e) {
    sendJsonResponse(["error" => "Erreur lors du traitement du fichier Excel : " . $e->getMessage()]);
}
?>
