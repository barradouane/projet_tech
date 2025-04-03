<?php
header("Content-Type: application/json"); 
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);


if (!isset($data['id']) || !is_numeric($data['id'])) {
    http_response_code(400); 
    echo json_encode(['message' => 'ID invalide ou manquant.']);
    exit;
}

$id = (int) $data['id']; 

try {
    $stmt = $pdo->prepare("DELETE FROM posts WHERE id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['message' => 'Post supprimée avec succès.']);
    } else {
        http_response_code(404); 
        echo json_encode(['message' => 'Aucune post trouvée avec cet ID.']);
    }
} catch (PDOException $e) {
    http_response_code(500); 
    echo json_encode(['message' => 'Erreur: ' . $e->getMessage()]);
}
?>
