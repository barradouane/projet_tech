<?php
include 'db.php';

try {
    $stmt = $pdo->query("SELECT * FROM posts ORDER BY date DESC");
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $actualites = [];
    $evenements = [];

    foreach ($posts as $post) {
        if ($post['type'] === 'actualite') {
            $actualites[] = $post;
        } elseif ($post['type'] === 'evenement') {
            $evenements[] = $post;
        }
    }

    echo json_encode([
        "actualites" => $actualites,
        "evenements" => $evenements,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Erreur: ' . $e->getMessage()]);
}
?>
