<?php
// On inclut le fichier de connexion à la base de données et de création des tables
include 'db.php';

/**
 * Cette classe gère l'administration des utilisateurs (ajout, suppression, mise à jour).
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
     * Met à jour les informations d'un utilisateur dans la table 'users'.
     *
     * Le nouveau mot de passe est haché avant d'être enregistré.
     *
     * @param int    $id       L'identifiant de l'utilisateur à mettre à jour.
     * @param string $nom      Le nouveau nom de l'utilisateur.
     * @param string $prenom   Le nouveau prénom de l'utilisateur.
     * @param string $email    Le nouvel email de l'utilisateur.
     * @param string $password Le nouveau mot de passe en clair (sera haché).
     * @param string $site     Le nouveau site de l'utilisateur (ex: 'Calais', 'Boulogne', etc.).
     *
     * @return bool Retourne true si la mise à jour a réussi, false sinon.
     */
    public function updateUser(int $id, string $nom, string $prenom, string $email, string $password, string $site): bool
    {
        // Hachage du nouveau mot de passe pour plus de sécurité
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Préparation de la requête SQL pour mettre à jour l'utilisateur
        $sql = "UPDATE users 
                SET nom = :nom, prenom = :prenom, email = :email, password = :password, site = :site 
                WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);

        // Exécution de la requête avec les nouvelles valeurs
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

// --- Exemple d'utilisation de la méthode updateUser ---
// On crée une instance de AdminUserManager avec la connexion PDO
$adminManager = new AdminUserManager($pdo);

// Vérification que la requête est de type PUT (utilisée pour la mise à jour)
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Récupération du contenu JSON envoyé (par exemple via Postman)
    $data = json_decode(file_get_contents("php://input"));

    // Vérifier que tous les champs requis sont présents
    if (isset($data->id, $data->nom, $data->prenom, $data->email, $data->password, $data->site)) {
        // On tente de mettre à jour l'utilisateur avec les nouvelles informations
        $result = $adminManager->updateUser(
            $data->id,
            $data->nom,
            $data->prenom,
            $data->email,
            $data->password,
            $data->site
        );

        if ($result) {
            echo json_encode(["success" => "Utilisateur mis à jour avec succès."]);
        } else {
            echo json_encode(["error" => "Erreur lors de la mise à jour de l'utilisateur."]);
        }
    } else {
        echo json_encode(["error" => "Tous les champs sont requis."]);
    }
}
?>
