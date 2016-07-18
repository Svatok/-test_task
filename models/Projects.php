<?php
class Projects{

  public static function getProjectData($id){
    
    $id=intval($id);
    
    $db=Db::getConnection();
    
    $projectData=array();
    $result=$db->query('SELECT * FROM projects WHERE id='.$id);
    $projectData=$result->fetch();
  
    return $projectData;
  }
  
  public static function getProjectsList($userId){
    
    $db=Db::getConnection();
    
    $projectsList=array();
    
    $result=$db->query('SELECT id, name FROM projects WHERE user_id='.$userId.' AND status<>2 ORDER BY id');
    
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
    $result=$db->query('SELECT * FROM tasks WHERE project_id='.$id.' AND status IN (0, 1)  ORDER BY priority DESC');
    
    $i=0;
    while($row=$result->fetch()){
      $tasksList[$i]['id']=$row['id'];
      $tasksList[$i]['name']=$row['name'];
      $tasksList[$i]['status']=$row['status'];
      $tasksList[$i]['priority']=$row['priority'];
      $i++;
    }
  
    return $tasksList;
  }

  public static function editProjectData($prop, $val, $id){
    
    $id=intval($id);
    $db=Db::getConnection();
    
    $sql = "UPDATE projects SET ".$prop." = :val WHERE ID = :id";
    $stmt = $db->prepare($sql);    
    $stmt->bindParam(':val',$val, PDO::PARAM_STR);       
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);   
    if ($stmt->execute()){
      return true;
    }else{
      return false;
    }
  }
  
  public static function addProjectData($projectText, $userId){
    $db=Db::getConnection();
    
    $sql = "INSERT INTO projects (name, user_id, status) VALUES (:name, :user_id, 0)";
    $stmt = $db->prepare($sql);                                  
    $stmt->bindParam(':name',$projectText, PDO::PARAM_STR);
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    if ($stmt->execute()){
      return $db->lastInsertId('projects_id_seq');
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
  
  public static function checkText($val){
    if((empty($val)) || (strlen($val) < 5) || (strlen($val) > 250)) {
      return false;
    }else{
      return true;
    }
  }  

  public static function checkStatus($val){
    $allowedStatuses = array("0", "1", "2"); // 0 - In work, 1 - Done, 2 - Delete
    if (in_array($val, $allowedStatuses)){
      return true;
    }else{
      return false;
    }
  }
  
  public static function projectOwner($userId, $projectId){
    $db=Db::getConnection();
    
    $sql='SELECT * FROM projects WHERE id=:id AND user_id=:userId';
    $result=$db->prepare($sql);
    $result->bindParam(':id',$projectId,PDO::PARAM_INT);
    $result->bindParam(':userId',$userId,PDO::PARAM_INT);
    $result->execute();

    if ($result->fetch()){
      return true;
    }
      return false;
  }
  
}
?>
