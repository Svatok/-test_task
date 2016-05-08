<?php
class Projects{

  public static function getProjectsList(){
    
    $db=Db::getConnection();
    
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
  
  public static function getTasksList($id){
    
    $id=intval($id);
    
    $db=Db::getConnection();
    
    $tasksList=array();
    $result=$db->query('SELECT * FROM tasks WHERE project_id='.$id);
    
    $i=0;
    while($row=$result->fetch()){
      $tasksList[$i]['id']=$row['id'];
      $tasksList[$i]['name']=$row['name'];
      $i++;
    }
  
    return $tasksList;
  }
}
?>
