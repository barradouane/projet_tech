<?php
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'portail_etudiant';

try {

    $pdo = new PDO("mysql:host=$host;port=3307;charset=utf8", $username, $password);
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

// Table de contacts                                                                                                        
    $sql = "CREATE TABLE if not exists contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(50) NOT NULL,
        prenom VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        telephone VARCHAR(20) NOT NULL,
        service VARCHAR(100) NOT NULL,
        niveau_de_formation VARCHAR(20) DEFAULT NULL
    );";
    $pdo->exec($sql);
    
} catch (PDOException $e) {
    
    header('Content-Type: application/json');
    echo json_encode(['error' => $e->getMessage()]);
}
?>
