<?php
// On inclut le fichier de connexion à la base de données
include 'db.php';

// Gérer la préflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Max-Age: 86400");
    exit(0);
}

// Headers CORS pour toutes les autres requêtes
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");

/**
 * Classe pour gérer les posts
 */
class PostManager
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function updatePost(int $id, string $type, string $titre, string $description, string $date, string $plus_de_details, string $sites): bool
    {
        $sql = "UPDATE posts 
                SET type = :type, titre = :titre, description = :description, date = :date, plus_de_details = :plus_de_details, sites = :sites 
                WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            ':type' => $type,
            ':titre' => $titre,
            ':description' => $description,
            ':date' => $date,
            ':plus_de_details' => $plus_de_details,
            ':sites' => $sites,
            ':id' => $id,
        ]);
    }
}

$postManager = new PostManager($pdo);

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->id, $data->type, $data->titre, $data->description, $data->date)) {
        $plus_de_details = isset($data->plus_de_details) ? $data->plus_de_details : '';
        $sites = isset($data->sites) ? $data->sites : '';

        $result = $postManager->updatePost(
            $data->id,
            $data->type,
            $data->titre,
            $data->description,
            $data->date,
            $plus_de_details,
            $sites
        );

        echo json_encode($result
            ? ["success" => "Post mis à jour avec succès."]
            : ["error" => "Erreur lors de la mise à jour du post."]
        );
    } else {
        echo json_encode(["error" => "Tous les champs requis ne sont pas présents."]);
    }
}
?>
