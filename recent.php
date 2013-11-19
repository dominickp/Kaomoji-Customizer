<?php

require_once("config.php");

$con = new PDO( DB_DSN, DB_USERNAME, DB_PASSWORD );
$con->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
$sql = "SELECT * FROM `smileys` ORDER BY `timestamp` DESC LIMIT 0,100";
$stmt = $con->prepare( $sql );

$stmt->execute();
$recent = $stmt->fetchAll();