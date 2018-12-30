<?php 
include './corsHeader.php';
include './utils.php';
include './config.php';

$filename = $_POST['filename'];
$path = $UPLOAD_DIR.'/'.$filename;

$data = array();
$data['success'] = delete_file($path);
$data['data'] = file_list($UPLOAD_DIR);

response_json($data);
?>

