<?php
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");
$host = '127.0.0.1';
$username = 'root';
$password = '';
$dbname = 'portail_etudiant';
$port = 3306;

try {
    $pdo = new PDO("mysql:host=$host;port=$port;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec("CREATE DATABASE IF NOT EXISTS $dbname CHARACTER SET utf8 COLLATE utf8_general_ci");
    
    $pdo->exec("USE $dbname");
    
    $sql = "CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type ENUM('actualite', 'evenement') NOT NULL,
        titre VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        date DATE DEFAULT NULL,
        image VARCHAR(255) DEFAULT NULL,
        plus_de_details TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($sql);
    
    $sql = "CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(50) NOT NULL,
        prenom VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        telephone VARCHAR(20) NOT NULL,
        service VARCHAR(100) NOT NULL,
        niveau_de_formation VARCHAR(20) DEFAULT NULL
    )";
    $pdo->exec($sql);
    
    $sql = "CREATE TABLE IF NOT EXISTS utilisateurs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(50) NOT NULL,
        prenom VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        mot_de_passe VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'etudiant',
        verification_token VARCHAR(64),
        verified TINYINT(1) NOT NULL DEFAULT 0,
        session_active TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        reset_token VARCHAR(64) NULL,
        reset_token_expires DATETIME NULL
    )";
    $pdo->exec($sql);
} catch (PDOException $e) {
    echo "Erreur: " . $e->getMessage();
    exit;
}
?>