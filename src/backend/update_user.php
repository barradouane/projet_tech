<?php
// On inclut le fichier de connexion à la base de données et de création des tables
include 'db.php';

// CORS HEADERS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Préflight request
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Max-Age: 86400");
    exit(0);
}

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT");
header("Access-Control-Allow-Headers: Content-Type");

/**
 * Cette classe gère l'administration des utilisateurs (ajout, suppression, mise à jour).
 */
class AdminUserManager
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function updateUser(int $id, string $nom, string $prenom, string $email, string $password, string $site): bool
    {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $sql = "UPDATE users 
                SET nom = :nom, prenom = :prenom, email = :email, password = :password, site = :site 
                WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);

        return $stmt->execute([
            ':nom'      => $nom,
            ':prenom'   => $prenom,
            ':email'    => $email,
            ':password' => $hashedPassword,
            ':site'     => $site,
            ':id'       => $id,
        ]);
    }
}

$adminManager = new AdminUserManager($pdo);

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->id, $data->nom, $data->prenom, $data->email, $data->password, $data->site)) {
        $result = $adminManager->updateUser(
            $data->id,
            $data->nom,
            $data->prenom,
            $data->email,
            $data->password,
            $data->site
        );

        echo json_encode($result
            ? ["success" => "Utilisateur mis à jour avec succès."]
            : ["error" => "Erreur lors de la mise à jour de l'utilisateur."]
        );
    } else {
        echo json_encode(["error" => "Tous les champs sont requis."]);
    }
}
?>
