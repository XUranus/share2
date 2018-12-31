<?php 
include './corsHeader.php';
include './utils.php';
include './config.php';

$token = $_POST['token'];
$json = array();
$json['success'] = $token==$TOKEN;
$json['yourtoken'] = $token;
if($token==$TOKEN)
    setcookie("token",$token, time()+3600*24);

response_json($json);
?>

