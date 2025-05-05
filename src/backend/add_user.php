<?php
// On inclut le fichier de connexion à la base de données et de création des tables
include 'db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

/**
 * Cette classe gère l'ajout d'utilisateurs par l'administrateur.
 */
class AdminUserManager
{
    // Propriété qui stocke l'instance PDO (la connexion à la BDD)
    private $pdo;

    /**
     * Constructeur : on passe l'instance PDO lors de la création de l'objet.
     *
     * @param PDO $pdo La connexion à la base de données
     */
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Ajoute un nouvel utilisateur dans la table 'users'.
     *
     * Le mot de passe fourni est d'abord haché pour assurer la sécurité.
     * L'utilisateur est directement marqué comme vérifié (email_verified = 1)
     * et le token de vérification est mis à NULL.
     *
     * @param string $nom      Le nom de l'utilisateur
     * @param string $prenom   Le prénom de l'utilisateur
     * @param string $email    L'adresse email de l'utilisateur
     * @param string $password Le mot de passe en clair (qui sera haché)
     * @param string $site     Le site auquel l'utilisateur est associé (ex : 'Calais')
     *
     * @return bool Retourne true si l'insertion est réussie, sinon false
     */
    public function addUser(string $nom, string $prenom, string $email, string $password, string $site): bool
    {
        // On hache le mot de passe avec l'algorithme par défaut (actuellement bcrypt)
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Préparation de la requête SQL pour insérer l'utilisateur en le marquant comme vérifié
        $sql = "INSERT INTO users (nom, prenom, email, password, site, email_verified, verification_token) 
                VALUES (:nom, :prenom, :email, :password, :site, 1, NULL)";
        $stmt = $this->pdo->prepare($sql);

        // Exécution de la requête avec les valeurs fournies
        return $stmt->execute([
            ':nom'      => $nom,
            ':prenom'   => $prenom,
            ':email'    => $email,
            ':password' => $hashedPassword,
            ':site'     => $site,
        ]);
    }
}

// On crée une instance de la classe AdminUserManager en lui passant la connexion PDO
$adminManager = new AdminUserManager($pdo);

// Vérification que la requête est de type POST (on attend des données JSON)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupération du contenu JSON envoyé (par exemple via Postman)
    $data = json_decode(file_get_contents("php://input"));

    // On vérifie que tous les champs requis sont présents
    if (isset($data->nom, $data->prenom, $data->email, $data->password, $data->site)) {
        // On tente d'ajouter l'utilisateur dans la base
        $result = $adminManager->addUser($data->nom, $data->prenom, $data->email, $data->password, $data->site);

        if ($result) {
            echo json_encode(["success" => "Utilisateur ajouté avec succès et vérifié."]);
        } else {
            echo json_encode(["error" => "Erreur lors de l'ajout de l'utilisateur."]);
        }
    } else {
        // Si un champ est manquant, on renvoie une erreur
        echo json_encode(["error" => "Tous les champs sont requis."]);
    }
}
?>
