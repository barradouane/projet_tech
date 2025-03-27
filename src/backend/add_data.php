<?php
header("Content-Type: application/json; charset=UTF-8");
ini_set('display_errors', 0);

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        'success' => false,
        'message' => 'Méthode invalide. Utilisez POST.'
    ]);
    exit;
}

// Récupération des données
// Récupération des données
$type            = $_POST['type'] ?? '';
$titre           = $_POST['titre'] ?? '';
$description     = $_POST['description'] ?? '';
$date            = isset($_POST['date']) && !empty($_POST['date']) ? $_POST['date'] : null; // Assurer que la date est NULL si vide
$plus_de_details = $_POST['plus_de_details'] ?? '';
$image           = $_FILES['image'] ?? null;

// Vérification du type de contenu
$types_valides = ['actualite', 'evenement'];
if (!in_array($type, $types_valides)) {
    echo json_encode([
        "success" => false,
        "message" => "Type de contenu invalide."
    ]);
    exit;
}

// Gestion de l'upload de l'image
$uploadDir = 'uploads/';
$imageName = null;

if ($image && $image['error'] === 0) {
    $extension = strtolower(pathinfo($image['name'], PATHINFO_EXTENSION));
    $imageName = uniqid('', true) . '.' . $extension;
    $imagePath = $uploadDir . $imageName;

    if (!move_uploaded_file($image['tmp_name'], $imagePath)) {
        echo json_encode([
            'success' => false,
            'message' => 'Erreur lors du téléchargement de l’image.'
        ]);
        exit;
    }
}

// Enregistrement en base de données
try {
    $stmt = $pdo->prepare("INSERT INTO posts (type, titre, description, date, image, plus_de_details) 
                           VALUES (:type, :titre, :description, :date, :image, :plus_de_details)");

    $stmt->bindParam(':type', $type);
    $stmt->bindParam(':titre', $titre);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':date', $date, PDO::PARAM_NULL); // Assurer que la date est bien NULL si elle est vide
    $stmt->bindParam(':image', $imageName);
    $stmt->bindParam(':plus_de_details', $plus_de_details);
    $stmt->execute();

    echo json_encode([
        'success' => true,
        'message' => 'Contenu ajouté avec succès.'
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erreur: ' . $e->getMessage()
    ]);
}
