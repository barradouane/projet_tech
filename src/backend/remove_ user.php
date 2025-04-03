<?php
// On inclut le fichier de connexion à la base de données et de création des tables
include 'db.php';

/**
 * Cette classe gère l'administration des utilisateurs (ajout et suppression).
 */
class AdminUserManager
{
    // Propriété qui stocke l'instance PDO (la connexion à la base de données)
    private $pdo;

    /**
     * Constructeur : on passe l'instance PDO lors de la création de l'objet.
     *
     * @param PDO $pdo La connexion à la base de données.
     */
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Supprime un utilisateur dans la table 'users'.
     *
     * On utilise l'identifiant (id) de l'utilisateur pour le supprimer.
     *
     * @param int $id L'identifiant de l'utilisateur à supprimer.
     *
     * @return bool Retourne true si la suppression est réussie, sinon false.
     */
    public function deleteUser(int $id): bool
    {
        // Préparation de la requête SQL pour supprimer l'utilisateur par son id
        $sql = "DELETE FROM users WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);

        // Exécution de la requête avec l'identifiant passé en paramètre
        return $stmt->execute([
            ':id' => $id,
        ]);
    }
}

// --- Exemple d'utilisation de la méthode deleteUser ---
// On crée une instance de la classe AdminUserManager en lui passant la connexion PDO
$adminManager = new AdminUserManager($pdo);

// On vérifie que la requête est de type DELETE (ou on peut aussi accepter POST si besoin)
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Récupération du contenu JSON envoyé (par exemple via Postman)
    $data = json_decode(file_get_contents("php://input"));

    // On vérifie que l'identifiant de l'utilisateur est fourni
    if (isset($data->id)) {
        // On tente de supprimer l'utilisateur dans la base
        $result = $adminManager->deleteUser($data->id);

        if ($result) {
            echo json_encode(["success" => "Utilisateur supprimé avec succès."]);
        } else {
            echo json_encode(["error" => "Erreur lors de la suppression de l'utilisateur."]);
        }
    } else {
        // Si l'id n'est pas fourni, on renvoie une erreur
        echo json_encode(["error" => "L'identifiant de l'utilisateur est requis."]);
    }
}
?>
