<?php
include 'db.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

try {
    // Vérifier si un ID de post est fourni
    if (isset($_GET['id'])) {
        $postId = intval($_GET['id']); // Sécuriser l'ID

        // Récupérer un seul post par ID
        $stmt = $pdo->prepare("SELECT * FROM posts WHERE id = :id");
        $stmt->execute(['id' => $postId]);
        $post = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($post) {
            echo json_encode(["success" => true, "post" => $post]);
        } else {
            echo json_encode(["success" => false, "message" => "Post introuvable"]);
        }
        exit; // Stopper l'exécution après avoir renvoyé le post spécifique
    }

    // Sinon, récupérer tous les posts comme avant
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
    echo json_encode(['success' => false, 'message' => 'Erreur: ' . $e->getMessage()]);
}
?>
