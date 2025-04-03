<?php
// On inclut le fichier de connexion à la base de données et de création des tables
include 'db.php';

/**
 * Cette classe gère l'administration des utilisateurs (ajout, suppression, mise à jour, récupération).
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
     * Récupère la liste des utilisateurs, ordonnée par site et par nom en ordre alphabétique.
     *
     * @return array Renvoie un tableau associatif contenant les utilisateurs.
     */
    public function getUsersOrdered(): array
    {
        // Préparation de la requête SQL pour sélectionner les utilisateurs
        // en les ordonnant par 'site' puis par 'nom' en ordre alphabétique
        $sql = "SELECT id, nom, prenom, email, site 
                FROM users 
                ORDER BY site ASC, nom ASC";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();

        // Récupération de tous les utilisateurs sous forme de tableau associatif
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

// --- Exemple d'utilisation de la méthode getUsersOrdered ---
// On crée une instance de la classe AdminUserManager avec la connexion PDO
$adminManager = new AdminUserManager($pdo);

// On vérifie que la requête est de type GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // On récupère la liste des utilisateurs ordonnés par site et par nom
    $users = $adminManager->getUsersOrdered();

    // On renvoie la liste sous forme de JSON
    header('Content-Type: application/json');
    echo json_encode($users);
}
?>
