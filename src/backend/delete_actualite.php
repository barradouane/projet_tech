<?php
// Allow cross-origin requests from localhost:3000
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Set the Content-Type header to JSON
header("Content-Type: application/json");

include 'db.php';

// Handle preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Respond with a 200 status code for OPTIONS requests
    http_response_code(200);
    exit;
}

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
