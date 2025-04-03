<?php
include 'db.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

try {
    // Récupérer le paramètre site s'il est fourni
    $site = isset($_GET['site']) ? $_GET['site'] : null;
    
    // Récupérer tous les posts, triés par date de création (du plus récent au plus ancien)
    $stmt = $pdo->query("SELECT * FROM posts ORDER BY created_at DESC");
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $actualites = [];
    $evenements = [];

    foreach ($posts as $post) {
        // Décoder le champ sites qui est stocké en JSON
        $postSites = json_decode($post['sites'], true);
        
        // Si un site est spécifié, vérifier si le post appartient à ce site
        if ($site !== null) {
            // Vérifier si le site demandé est dans la liste des sites du post
            if (!in_array($site, $postSites)) {
                continue; // Ignorer ce post s'il n'appartient pas au site demandé
            }
        }
        
        // Ajouter le post à la catégorie correspondante
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

