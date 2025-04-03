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

if (empty($id)) {
    echo json_encode([
        "success" => false,
        "message" => "ID du contact requis"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM contacts WHERE id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "success" => true,
            "message" => "Contact supprimé avec succès"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Aucun contact trouvé avec cet ID"
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Erreur : " . $e->getMessage()
    ]);
}
?>