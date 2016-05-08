<?php
class Db {

  public static function getConnection(){
    $paramsPath=ROOT.'/config/db_params.php';
    $params=include($paramsPath);
    
    $db=new PDO('pgsql:user='.$params['user'].' dbname='.$params['dbname'].' password='.$params['password'].' host='.$params['host']);
    $db->exec("set names utf8");
    
    return $db;
  }
}
?>
