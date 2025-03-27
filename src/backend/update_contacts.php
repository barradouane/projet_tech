<?php
include 'db.php';
header("Content-Type: application/json; charset=UTF-8");
ini_set('display_errors', 0);

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Méthode invalide, utilisez POST"
    ]);
    exit;
}

$id = $_POST["id"] ?? "";
$nom = $_POST["nom"] ?? "";
$prenom = $_POST["prenom"] ?? "";
$email = $_POST["email"] ?? "";
$telephone = $_POST["telephone"] ?? "";
$service = $_POST["service"] ?? "";
$niveau_de_formation = $_POST["niveau_de_formation"] ?? "";

if (empty($id)) {
    echo json_encode([
        "success" => false,
        "message" => "ID du contact requis"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE contacts SET nom = :nom, prenom = :prenom, email = :email, telephone = :telephone, service = :service, niveau_de_formation = :niveau_de_formation WHERE id = :id");
    
    $stmt->bindParam(":id", $id);
    $stmt->bindParam(":nom", $nom);
    $stmt->bindParam(":prenom", $prenom);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":telephone", $telephone);
    $stmt->bindParam(":service", $service);
    $stmt->bindParam(":niveau_de_formation", $niveau_de_formation);
    
    $stmt->execute();
    
    echo json_encode([
        "success" => true,
        "message" => "Contact mis à jour avec succès"
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Erreur: " . $e->getMessage()
    ]);
}
?>