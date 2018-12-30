<?php
include './corsHeader.php';
include './utils.php';
include './config.php';

//var_dump($_FILES);
$json = array();
if($_FILES["file"]["error"] > 0){
    $json['success'] = false;
    $json['msg'] = 'error code:'.$_FILES["file"]["error"];
} else if(file_exists($UPLOAD_DIR.'/'.$_FILES["file"]["name"])) {
    $json['success'] = false;
    $json['msg'] = 'file exist!';
} else {
    $json['success'] = true;
    move_uploaded_file($_FILES["file"]["tmp_name"], $UPLOAD_DIR.'/'.$_FILES["file"]["name"]);
    $json['data'] = file_list($UPLOAD_DIR);
}

response_json($json)
?>