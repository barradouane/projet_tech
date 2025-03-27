<?php
include 'db.php';
header("Content-Type: application/json; charset=UTF-8");
ini_set('display_errors', 0);
if($_SERVER["REQUEST_METHOD"]!=="POST"){
    echo json_encode([
        "success"=>false,
        "message"=>"Méthode invalide utliser Post"
    ]);
    exit;
};
$nom = $_POST["nom"]??"";
$prenom = $_POST["prenom"]??"";
$email= $_POST["email"]??"";
$telephone=$_POST["telephone"]??"";
$service = $_POST["service"]??"";
$niveau_de_formation = $_POST["niveau_de_formation"]??"";
try{
$stmt=$pdo->prepare("INSERT INTO contacts(nom,prenom,email,telephone,service,niveau_de_formation)
            VALUES(:nom,:prenom,:email,:telephone,:service,:niveau_de_formation)");
$stmt->bindParam(':nom',$nom);
$stmt->bindParam(':prenom',$prenom); 
$stmt->bindParam(':email',$email);
$stmt->bindParam(':telephone',$telephone);
$stmt->bindParam(':service',$service);
$stmt->bindParam(':niveau_de_formation',$niveau_de_formation);
$stmt->execute();
echo json_encode([
    "success"=>true,
    "message"=>"contact ajouté avec succés"
]);
}catch(PDOException $e){
    echo json_encode([
        "success"=>false,
        "message"=>'erreur'. $e->getMessage()
    ]);
};           




?>