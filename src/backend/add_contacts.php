<?php
include 'db.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
ini_set('display_errors', 0);

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Méthode invalide, utilisez POST"
    ]);
    exit;
}

$nom = $_POST["nom"] ?? "";
$prenom = $_POST["prenom"] ?? "";
$email = $_POST["email"] ?? "";
$telephone = $_POST["telephone"] ?? "";
$titre = $_POST["titre"] ?? null; // Nouveau champ titre
$service = $_POST["service"] === "" ? null : ($_POST["service"] ?? null); // Peut être null
$niveau_de_formation = $_POST["niveau_de_formation"] === "" ? null : ($_POST["niveau_de_formation"] ?? null); // Peut être null
$site = $_POST["site"] ?? "";

// Vérification de la validité du site
$valid_sites = ['Calais', 'Boulogne', 'Dunkerque', 'Saint-Omer'];
if (!in_array($site, $valid_sites)) {
    echo json_encode([
        "success" => false,
        "message" => "Site invalide, veuillez choisir parmi Calais, Boulogne, Dunkerque ou Saint-Omer"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO contacts (site, nom, prenom, email, telephone, titre, service, niveau_de_formation)
                           VALUES (:site, :nom, :prenom, :email, :telephone, :titre, :service, :niveau_de_formation)");
    $stmt->bindParam(':site', $site);
    $stmt->bindParam(':nom', $nom);
    $stmt->bindParam(':prenom', $prenom);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':telephone', $telephone);
    $stmt->bindParam(':titre', $titre);
    $stmt->bindParam(':service', $service);
    $stmt->bindParam(':niveau_de_formation', $niveau_de_formation);

    $stmt->execute();

    echo json_encode([
        "success" => true,
        "message" => "Contact ajouté avec succès"
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => 'Erreur : ' . $e->getMessage()
    ]);
};
?>