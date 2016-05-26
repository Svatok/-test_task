
<?php
class Tasks{
  
  public static function getTaskData($id){
    
    $id=intval($id);
    
    $db=Db::getConnection();
    
    $taskData=array();
    $result=$db->query('SELECT * FROM tasks WHERE id='.$id);
    $taskData=$result->fetch();
  
    return $taskData;
  }
}
?>
