<?php
$host = 'co1610-001.eu.clouddb.ovh.net';  // Hôte de la base de données sur OVH
$port = '35228';  // Port spécifique fourni par OVH
$username = 'projetportetu';  // Login de ta BDD
$password = '0Eilco475';  // Mot de passe pour la connexion à la BDD
$dbname = 'projetportetu';  // Nom de la base de données sur OVH

try {
    // Connexion avec les informations mises à jour
    $pdo = new PDO("mysql:host=$host;port=$port;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Sélection de la base de données
    $pdo->exec("USE $dbname");

    // Création de la table users
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(50),
        prenom VARCHAR(50),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        site ENUM('Calais', 'Boulogne', 'Dunkerque', 'Saint-Omer'),
        email_verified TINYINT(1) DEFAULT 0,
        verification_token VARCHAR(100) NULL,
        token VARCHAR(255) NULL
    )";
    $pdo->exec($sql);

    // Création de la table posts
    $sql = "CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type ENUM('actualite', 'evenement') NOT NULL,
        titre VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        date DATE DEFAULT NULL,
        image VARCHAR(255) DEFAULT NULL,
        plus_de_details TEXT NOT NULL,
        sites TEXT,  
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($sql);

    // Création de la table contacts
    $sql = "CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        site ENUM('Calais', 'Boulogne', 'Dunkerque', 'Saint-Omer') NOT NULL,
        nom VARCHAR(50) NOT NULL,
        prenom VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        telephone VARCHAR(20) NOT NULL,
        titre VARCHAR(255) DEFAULT NULL,
        service VARCHAR(100) DEFAULT NULL,
        niveau_de_formation VARCHAR(20) DEFAULT NULL
    );";
    $pdo->exec($sql);

    // Si la table contacts existe déjà, ajouter le champ titre s'il n'existe pas
    try {
        $pdo->exec("ALTER TABLE contacts ADD COLUMN titre VARCHAR(255) DEFAULT NULL");
    } catch (PDOException $e) {
        // La colonne existe déjà, on ignore l'erreur
    }

} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
?>
