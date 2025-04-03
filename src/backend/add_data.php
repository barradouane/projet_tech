<?php
include 'db.php'; // Inclusion de la connexion à la base de données

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $type = $_POST['type'] ?? '';
    $titre = $_POST['titre'] ?? '';
    $description = $_POST['description'] ?? '';
    $date = $_POST['date'] ?? null;
    $plus_de_details = $_POST['plus_de_details'] ?? '';
    $image = $_FILES['image'] ?? null;
    $sites = $_POST['sites'] ?? []; // Récupère les sites envoyés depuis le front-end

    $types_valides = ['actualite', 'evenement'];
    $sites_valides = ['Calais', 'Dunkerque', 'Boulogne', 'Saint-Omer'];

    if (!in_array($type, $types_valides)) {
        echo json_encode(["success" => false, "message" => "Type de contenu invalide."]);
        exit;
    }

    // Vérifier que les sites sont valides
    if (!is_array($sites)) {
        $sites = [$sites]; // Convertir en tableau si une seule valeur
    }
    
    // Filtrer pour ne garder que les sites valides
    $sites = array_intersect($sites, $sites_valides);
    
    // Vérifier qu'au moins un site est sélectionné
    if (empty($sites)) {
        echo json_encode(["success" => false, "message" => "Veuillez sélectionner au moins un site valide."]);
        exit;
    }

    $uploadDir = 'uploads/';
    $imageName = null;

    if ($image && $image['error'] === 0) {
        // Vérifier si le répertoire existe, sinon le créer
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        $extension = strtolower(pathinfo($image['name'], PATHINFO_EXTENSION));
        $imageName = uniqid('', true) . '.' . $extension;
        $imagePath = $uploadDir . $imageName;

        if (!move_uploaded_file($image['tmp_name'], $imagePath)) {
            echo json_encode(['success' => false, 'message' => 'Erreur lors du téléchargement de l\'image.']);
            exit;
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Veuillez sélectionner une image.']);
        exit;
    }

    try {
        // Convertir le tableau des sites en JSON pour le stockage
        $sitesJson = json_encode($sites);
        
        // Insérer le post dans la table posts
        $stmt = $pdo->prepare("INSERT INTO posts (type, titre, description, date, image, plus_de_details, sites) 
                               VALUES (:type, :titre, :description, :date, :image, :plus_de_details, :sites)");
        $stmt->bindParam(':type', $type);
        $stmt->bindParam(':titre', $titre);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':date', $date);
        $stmt->bindParam(':image', $imageName);
        $stmt->bindParam(':plus_de_details', $plus_de_details);
        $stmt->bindParam(':sites', $sitesJson); // Stockage des sites sous forme JSON
        $stmt->execute();

        echo json_encode(['success' => true, 'message' => 'Contenu ajouté avec succès.']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Erreur: ' . $e->getMessage()]);
    }
}
?>

