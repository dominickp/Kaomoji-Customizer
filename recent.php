<?php

require_once("config.php");

$con = new PDO( DB_DSN, DB_USERNAME, DB_PASSWORD );
$con->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
$sql = "SELECT * FROM `smileys` ORDER BY `timestamp` DESC LIMIT 0,20";
$stmt = $con->prepare( $sql );

$stmt->execute();
$recent = $stmt->fetchAll();

$allListItems = null;
foreach($recent as $smiley){
    $allListItems .= '<li>'.base64_decode($smiley['smiley']).' <span class="comment">"'.$smiley['comment'].'"'.'</span></li>';
}

if(isset($_GET['echo']) && $_GET['echo'] == "true"){
    echo $allListItems;
}