<?php
// Activer l'affichage des erreurs pour le débogage
ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();

// CORS — répond à l'OPTIONS ET à la requête POST
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header("Content-Type: application/json; charset=UTF-8");

// Fonction pour renvoyer une erreur en JSON et terminer le script
function returnError($message, $code = 400) {
    http_response_code($code);
    echo json_encode(['error' => $message]);
    exit;
}

// Vérifier que les fichiers requis existent
if (!file_exists(__DIR__.'/db.php')) {
    returnError('Fichier db.php manquant');
}

if (!file_exists(__DIR__.'/vendor/autoload.php')) {
    returnError('Autoloader Composer manquant');
}

require_once __DIR__.'/db.php';
require_once __DIR__.'/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Vérifier la connexion à la base de données
if (!isset($pdo) || !($pdo instanceof PDO)) {
    returnError('Erreur de connexion à la base de données');
}

// Ajouter la colonne reset_token_expires si elle n'existe pas
try {
    $pdo->exec("ALTER TABLE users ADD COLUMN reset_token_expires DATETIME NULL");
} catch (PDOException $e) {
    // La colonne existe déjà, on ignore l'erreur
}

$data = json_decode(file_get_contents("php://input"), true);

// 1️⃣ Demande de lien de réinitialisation
if (isset($data['email'])) {
    try {
        $token = bin2hex(random_bytes(32));
        $expires = date('Y-m-d H:i:s', time() + 3600);

        $stmt = $pdo->prepare("
            UPDATE users 
            SET token = :token, reset_token_expires = :expires 
            WHERE email = :email
        ");
        $stmt->execute([
            ':token'   => $token,
            ':expires' => $expires,
            ':email'   => $data['email']
        ]);

        if ($stmt->rowCount()) {
            $link = "http://localhost:3000/reset-password?token=$token";

            try {
                // Créer un fichier de log pour le débogage
                $logFile = __DIR__ . '/email_log.txt';
                file_put_contents($logFile, date('Y-m-d H:i:s') . " - Tentative d'envoi d'email à {$data['email']}\n", FILE_APPEND);
                
                $mail = new PHPMailer(true);
                // Activer le débogage
                $mail->SMTPDebug = SMTP::DEBUG_SERVER; // Niveau de débogage
                
                // Capturer la sortie de débogage
                ob_start();
                
                $mail->isSMTP();
                $mail->Host       = 'smtp.gmail.com';
                $mail->SMTPAuth   = true;
                $mail->Username   = 'projet.tech.portail@gmail.com';
                $mail->Password   = 'oazw dkfl llsc pztb';
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port       = 587;
                $mail->setFrom('no-reply@portail.com','Portail Étudiant');
                $mail->addAddress($data['email']);
                $mail->Subject = 'Réinitialisation mot de passe';
                $mail->isHTML(true);
                $mail->Body    = "Clique ici pour réinitialiser votre mot de passe : <a href='$link'>$link</a>";
                
                $mail->send();
                
                // Récupérer et enregistrer la sortie de débogage
                $debugOutput = ob_get_clean();
                file_put_contents($logFile, $debugOutput . "\n", FILE_APPEND);
                
                // Enregistrer également le lien pour les tests
                file_put_contents($logFile, "Lien de réinitialisation: $link\n\n", FILE_APPEND);
                
                echo json_encode([
                    'success' => 'Email envoyé', 
                    'debug_info' => 'Vérifiez le fichier email_log.txt pour plus d\'informations',
                    'test_link' => $link // Pour les tests uniquement, à supprimer en production
                ]);
            } catch (Exception $e) {
                // Enregistrer l'erreur dans le fichier de log
                if (isset($logFile)) {
                    file_put_contents($logFile, "Erreur d'envoi: " . $mail->ErrorInfo . "\n\n", FILE_APPEND);
                }
                returnError('Erreur lors de l\'envoi de l\'email: ' . $mail->ErrorInfo);
            }
        } else {
            returnError('Email inconnu');
        }
    } catch (PDOException $e) {
        returnError('Erreur de base de données: ' . $e->getMessage());
    } catch (Exception $e) {
        returnError('Erreur: ' . $e->getMessage());
    }
    exit;
}

// 2️⃣ Réinitialisation du mot de passe
if (isset($data['token'], $data['new_password'])) {
    try {
        $stmt = $pdo->prepare("
            SELECT id FROM users 
            WHERE token = :token 
              AND reset_token_expires > NOW()
        ");
        $stmt->execute([':token' => $data['token']]);

        if (!$user = $stmt->fetch(PDO::FETCH_ASSOC)) {
            returnError('Token invalide ou expiré');
        }

        $hash = password_hash($data['new_password'], PASSWORD_DEFAULT);
        $update = $pdo->prepare("
            UPDATE users 
            SET password = :hash, token = NULL, reset_token_expires = NULL 
            WHERE id = :id
        ");
        $update->execute([
            ':hash' => $hash,
            ':id'   => $user['id']
        ]);

        echo json_encode(['success' => 'Mot de passe mis à jour']);
    } catch (PDOException $e) {
        returnError('Erreur de base de données: ' . $e->getMessage());
    } catch (Exception $e) {
        returnError('Erreur: ' . $e->getMessage());
    }
    exit;
}

returnError('Requête invalide');
?>

