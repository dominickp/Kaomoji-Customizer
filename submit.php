<?php

require_once("config.php");

$con = new PDO( DB_DSN, DB_USERNAME, DB_PASSWORD );
$con->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
$sql = "INSERT INTO smileys(smiley, comment) VALUES(:smiley, :comment)";

$stmt = $con->prepare( $sql );
$stmt->bindValue( "smiley", base64_encode($_POST['smiley']), PDO::PARAM_STR );
$stmt->bindValue( "comment", $_POST['description'], PDO::PARAM_STR );
$stmt->execute();

print_r($_POST);