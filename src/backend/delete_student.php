<?php
// On inclut le fichier de connexion à la base de données et de création des tables
include 'db.php';

// CORS HEADERS (OPTIONS preflight d'abord)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Max-Age: 86400");
    exit(0);
}

// CORS headers pour les autres requêtes
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

/**
 * Cette classe gère l'administration des utilisateurs (ajout et suppression).
 */
class AdminUserManager
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function deleteUser(int $id): bool
    {
        $sql = "DELETE FROM users WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            ':id' => $id,
        ]);
    }
}

$adminManager = new AdminUserManager($pdo);

// Vérifie que c’est bien une requête DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->id)) {
        $result = $adminManager->deleteUser($data->id);

        echo json_encode($result
            ? ["success" => "Utilisateur supprimé avec succès."]
            : ["error" => "Erreur lors de la suppression de l'utilisateur."]
        );
    } else {
        echo json_encode(["error" => "L'identifiant de l'utilisateur est requis."]);
    }
}
?>
