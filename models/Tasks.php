
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
  
  public static function editTaskData($prop, $val, $id){
    
    $id=intval($id);
    $db=Db::getConnection();
    
    $sql = "UPDATE tasks SET ".$prop." = :val WHERE ID = :id";
    $stmt = $db->prepare($sql);                                  
    $stmt->bindParam(':val',$val, PDO::PARAM_STR);       
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);   
    if ($stmt->execute()){
      return true;
    }else{
      return false;
    }
  }
  
  public static function clean($value) {
      $value = trim($value);
      $value = stripslashes($value);
      $value = strip_tags($value);
      $value = htmlspecialchars($value);
      
      return $value;
  }
  
  public static function checkStatus($val){
    $allowedStatuses = array("0", "1", "2"); // 0 - In work, 1 - Done, 2 - Delete
    if (in_array($val, $allowedStatuses)){
      return true;
    }else{
      return false;
    }
  }  

  public static function checkText($val){
    if((empty($val)) || (strlen($val) < 5) || (strlen($val) > 250)) {
      return false;
    }else{
      return true;
    }
  }    
  
  public static function checkPriority($val, $id){
      $id=intval($id);
      
      $db=Db::getConnection();
      
      $priorityData=array();
      $result=$db->query('SELECT count(*) as max_priority FROM tasks WHERE project_id=(SELECT project_id FROM tasks WHERE id='.$id.')');
      $priorityData=$result->fetch();
      $maxPriority=$priorityData['max_priority'];
 
      $priorityData=array();
      $result=$db->query('SELECT priority FROM tasks WHERE id='.$id);
      $priorityData=$result->fetch();
      $curPriority=$priorityData['priority'];
      
      if (($val==$curPriority+1) || ($val==$curPriority-1)){
        if (($val>0) && ($val<=$maxPriority)){
          return $curPriority;
        }else{
          return -1;
        }
      }else{
        return -1;
      }
  } 
  
  public static function getOldTaskId($priority, $newTaskId){
    $newTaskId=intval($newTaskId);
    
    $db=Db::getConnection();
    
    $oldTaskData=array();
    $result=$db->query('SELECT id FROM tasks WHERE project_id=(SELECT project_id FROM tasks WHERE id='.$newTaskId.') AND priority='.$priority);
    $oldTaskData=$result->fetch();
    $oldTaskId=$oldTaskData['id'];
  
    return $oldTaskId;
  }

  public static function addTaskData($taskText, $projectId){

    $db=Db::getConnection();

    $priorityData=array();
    $result=$db->query('SELECT count(*) as max_priority FROM tasks WHERE project_id='.$projectId);
    $priorityData=$result->fetch();
    $taskPriority=$priorityData['max_priority']+1;
    
    $sql = "INSERT INTO tasks (name, status, priority, project_id) VALUES (:name, 0, :priority, :project_id)";
    $stmt = $db->prepare($sql);                                  
    $stmt->bindParam(':name',$taskText, PDO::PARAM_STR);       
    $stmt->bindParam(':priority', $taskPriority, PDO::PARAM_INT);   
    $stmt->bindParam(':project_id', $projectId, PDO::PARAM_INT);   
    if ($stmt->execute()){
      return $db->lastInsertId('tasks_id_seq');
    }else{
      return false;
    }
  }

  
}
?>
