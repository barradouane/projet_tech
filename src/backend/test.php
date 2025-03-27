<?php
$host = '127.0.0.1';
$username = 'root';
$password = '';
$dbname = 'portail_etudiant';

try {
    $pdo = new PDO("mysql:host=$host;port=3306;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connexion réussie.";
} catch (PDOException $e) {
    echo "Erreur: " . $e->getMessage();
}
?>
