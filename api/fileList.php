<?php 
include './corsHeader.php';
include './utils.php';
include './config.php';

$res = array();
$res['data'] = file_list($UPLOAD_DIR);
$res['maxSize'] = min(ini_get('upload_max_filesize'), ini_get('post_max_size'));
$res['admin'] = $ALLOW_GUEST_DELETE;
response_json($res)
?>

