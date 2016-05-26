
<?php
class Tasks{
  $allowedStatuses = array(0, 1, 2); // 0 - In work, 1 - Done, 2 - Delete
  
  public static function getTaskData($id){
    
    $id=intval($id);
    
    $db=Db::getConnection();
    
    $taskData=array();
    $result=$db->query('SELECT * FROM tasks WHERE id='.$id);
    $taskData=$result->fetch();
  
    return $taskData;
  }
  
  public static function editTaskData($prop, $val, $id){
    
    $id=intval($id);
    $db=Db::getConnection();
    
    $sql = "UPDATE tasks SET ".$prop." = :val WHERE ID = :id";
    $stmt = $pdo->prepare($sql);                                  
    $stmt->bindParam(':val',$val, PDO::PARAM_STR);       
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);   
    if ($stmt->execute()){
      return true;
    }else{
      return false;
    }
  }
  
  public static function checkStatus($val){
    if (in_array($val, $allowedStatuses)){
      return true;
    }else{
      return false;
    }
  }  
  
}
?>
