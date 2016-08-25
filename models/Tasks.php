<?php

class Tasks{
  
  // Getting data of the task.
  public static function getTaskData($id){
    
    $id=intval($id);
    
    $db=Db::getConnection();
    
    $taskData=array();
    $result=$db->query('SELECT * FROM tasks WHERE id='.$id);
    $taskData=$result->fetch();
  
    return $taskData;
    
  }

  // Getting tasks of the project.
  public static function getTasksList($id){
    
    $id=intval($id);
    
    $db=Db::getConnection();
    
    $tasksList=array();
    $result=$db->query('SELECT * FROM tasks WHERE project_id='.$id.' AND status IN (0, 1)  ORDER BY priority DESC');
    
    $i=0;
    while($row=$result->fetch()){
      $tasksList[$i]['id']=$row['id'];
      $tasksList[$i]['name']=$row['name'];
      $tasksList[$i]['status']=$row['status'];
      $tasksList[$i]['priority']=$row['priority'];
      $tasksList[$i]['deadline_date']=$row['deadline_date'];
      $i++;
    }
  
    return $tasksList;
  
  }
  
  // Editing the task.
  public static function editTaskData($prop, $val, $id){
    
    $id=intval($id);
    $db=Db::getConnection();
    
    if (($prop=='status') && ($val==2)){
      $taskData=Tasks::getTaskData($id);
      
      $taskPriority=array();
      $result=$db->query('SELECT id, priority FROM tasks WHERE project_id='.$taskData['project_id'].' AND priority>'.$taskData['priority'].' AND status<>2');
      while($taskPriority=$result->fetch()){
        $taskPriorityNew=$taskPriority['priority']-1;
        
        $sqlUpdatePriority = "UPDATE tasks SET priority = :priority WHERE ID = :id";
        $stmtUpdatePriority = $db->prepare($sqlUpdatePriority);
        $stmtUpdatePriority->bindParam(':priority',$taskPriorityNew, PDO::PARAM_INT);       
        $stmtUpdatePriority->bindParam(':id', $taskPriority['id'], PDO::PARAM_INT);  
        $stmtUpdatePriority->execute();
      }
      
      $sql = "UPDATE tasks SET ".$prop." = :val, priority = 0 WHERE ID = :id";
    }else{
      $sql = "UPDATE tasks SET ".$prop." = :val WHERE ID = :id";
    }
    
    $stmt = $db->prepare($sql);    
    $stmt->bindParam(':val',$val, PDO::PARAM_STR);       
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);   
    
    if ($stmt->execute()){
      return true;
    }else{
      return false;
    }
    
  }
  
  // Adding task.
  public static function addTaskData($taskText, $projectId){

    $date = new DateTime(date('Y-m-d'));
    $date->add(new DateInterval('P1D'));
    $curDate=$date->format('Y-m-d');
    
    $db=Db::getConnection();

    $priorityData=array();
    $result=$db->query('SELECT count(*) as max_priority FROM tasks WHERE status<>2 AND project_id='.$projectId);
    $priorityData=$result->fetch();
    $taskPriority=$priorityData['max_priority']+1;
    
    $sql = "INSERT INTO tasks (name, status, priority, project_id, deadline_date) VALUES (:name, 0, :priority, :project_id, :deadline_date)";
    $stmt = $db->prepare($sql);                                  
    $stmt->bindParam(':name',$taskText, PDO::PARAM_STR);       
    $stmt->bindParam(':priority', $taskPriority, PDO::PARAM_INT);   
    $stmt->bindParam(':project_id', $projectId, PDO::PARAM_INT);
    $stmt->bindParam(':deadline_date', $curDate , PDO::PARAM_STR); 
    
    if ($stmt->execute()){
      return $db->lastInsertId('tasks_id_seq');
    }else{
      return false;
    }
  
  }

  // Cleaning text of the task.
  public static function clean($value) {
      $value = trim($value);
      $value = stripslashes($value);
      $value = strip_tags($value);
      $value = htmlspecialchars($value);
      
      return $value;
      
  }

  // Checking text of the task.
  public static function checkText($val){

    if((empty($val)) || (strlen($val) < 5) || (strlen($val) > 250)) {
      return false;
    }else{
      return true;
    }

  }  
  
  // Checking status of the task.
  public static function checkStatus($val){
    
    $allowedStatuses = array("0", "1", "2"); // 0 - In work, 1 - Done, 2 - Delete
    
    if (in_array($val, $allowedStatuses)){
      return true;
    }else{
      return false;
    }
  
  }  

  // Checking deadline of the task.
  public static function checkDate($val){
    
    // format - YYYY-MM-DD
    $regularka = "/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/";
   
    if ( preg_match($regularka, $val, $razdeli) ){
      if ( checkdate($razdeli[2],$razdeli[3],$razdeli[1]) ){
        return $razdeli[1].'-'.$razdeli[2].'-'.$razdeli[3];
      }else{
        return false;
      }
    }else{
      return false;
    }
  
  }   
  
    // Checking priority of the task.
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
  
  // Getting data of the task with old id.
  public static function getOldTaskId($priority, $newTaskId){
    
    $newTaskId=intval($newTaskId);
    
    $db=Db::getConnection();
    
    $oldTaskData=array();
    $result=$db->query('SELECT id FROM tasks WHERE project_id=(SELECT project_id FROM tasks WHERE id='.$newTaskId.') AND priority='.$priority);
    $oldTaskData=$result->fetch();
    $oldTaskId=$oldTaskData['id'];
  
    return $oldTaskId;
    
  }

  // Checking user's id of the task.
  public static function taskOwner($userId, $taskId){
    $db=Db::getConnection();
    
    $sql='SELECT * FROM projects WHERE user_id=:userId AND id=(SELECT project_id FROM tasks WHERE id=:taskId)';
    $result=$db->prepare($sql);
    $result->bindParam(':userId',$userId,PDO::PARAM_INT);
    $result->bindParam(':taskId',$taskId,PDO::PARAM_INT);
    $result->execute();
    
    if ($result->fetch()){
      return true;
    }
      return false;
  }
  
}

?>
