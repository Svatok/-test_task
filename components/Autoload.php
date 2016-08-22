<?php

function __autoload($class_name){

  //list all the class directories in array
  $array_paths = array(
    '/models/',
    '/components/'
  );
  // connect file
  foreach ($array_paths as $path) {
    $path=ROOT.$path.$class_name.'.php';
    if (is_file($path)){
      include_once $path;
    }
  }
}
?>
