<?php
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'portail_et';

try {
    $pdo = new PDO("mysql:host=$host;port=3306;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Créer la base de données si elle n'existe pas
    $pdo->exec("CREATE DATABASE IF NOT EXISTS $dbname CHARACTER SET utf8 COLLATE utf8_general_ci");
    $pdo->exec("USE $dbname");

    // Création de la table users
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(50),
        prenom VARCHAR(50),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        site ENUM('Calais', 'Boulogne', 'Dunkerque', 'Saint-Omer'),
        token VARCHAR(255) NULL
    )";
    $pdo->exec($sql);

    // Création de la table posts (ajout du champ sites)
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

     // Création de la table des contacts (ajout du champ site)
     $sql = "CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        site ENUM('Calais', 'Boulogne', 'Dunkerque', 'Saint-Omer') NOT NULL,
        nom VARCHAR(50) NOT NULL,
        prenom VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        telephone VARCHAR(20) NOT NULL,
        service VARCHAR(100) NOT NULL,
        niveau_de_formation VARCHAR(20) DEFAULT NULL
    );";
    $pdo->exec($sql);

} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
?>