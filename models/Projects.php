<?php
class Projects{

  public static function getProjectsList(){
    
    $host='ec2-54-228-219-2.eu-west-1.compute.amazonaws.com';
    $dbname='d54a0dd3p463b';
    $user='ozothppcrrbtpt';
    $password='QxLJ0IoqGCpetHKE4yJXm1rQXy';
    $db = new PDO('pgsql:user='.$user.' dbname='.$dbname.' password='.$password.' host='.$host);
  
    $projectsList=array();
    
    $result=$db->query('SELECT id, name FROM projects');
    
    $i=0;
    while($row=$result->fetch()){
      $projectsList[$i]['id']=$row['id'];
      $projectsList[$i]['name']=$row['name'];
      $i++;
    }
  
    return $projectsList;
  }

}
?>
