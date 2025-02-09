<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

try {
    $stmt = $pdo->prepare("DELETE FROM actualites WHERE id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    echo json_encode(['message' => 'Actualité supprimée avec succès.']);
} catch (PDOException $e) {
    echo json_encode(['message' => 'Erreur: ' . $e->getMessage()]);
}
?>
