<?php

function file_allows($filetype){
    return
    ($filetype == "text/html")||
    ($filetype == "application/x-php");
}

function file_list($UPLOAD_DIR) //get file list
{
    $files = array();
    if(is_dir($UPLOAD_DIR)){
        $names = array();
        if($dh = opendir($UPLOAD_DIR)){
            while(($name = readdir($dh))){
                if(!is_dir($name)) // not allow directory
                    $names[$name] = filemtime($UPLOAD_DIR.'/'.$name); 
            }
            arsort($names);
            foreach($names as $name => $time){ // generate files{file{},...} json 
                $file = array();
                $file['name'] = $name;
                $file['size'] = filesize($UPLOAD_DIR."/".$name);
                $file['time'] = $time;
                $file['key'] = $time;
                array_push($files,$file);
            }
            closedir($dh);
            return $files;
        } else return array();
    } else return array();
}

function delete_file($path) { //return is success
    return unlink($path);
}

function response_json($res_array) {
    echo json_encode($res_array);
}


?>