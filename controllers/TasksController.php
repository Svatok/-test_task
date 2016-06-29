<?php
class TasksController{
  
  public function actionEdit($params){
    $taskStatus='';
    $taskText='';
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $userId=User::checkLogged();
      $taskData=Tasks::getTaskData($params[0]);
      $errors=false;
      $updateData=array();
      
      if (isset($_POST['status'])){
        $taskStatus=Tasks::clean($_POST['status']);
        if (Tasks::checkStatus($taskStatus)){
          if ($taskData['status']!=$taskStatus){
            if(Tasks::editTaskData('status', $taskStatus, $params[0])){
              $updateData['status']='Success:Status was changed!';
            }else{
              $updateData['status']='Error:Database Error: Status is not changed';
            }
          }          
        }else{
          $updateData['status']='Error:Invalid status of task!';
        }
      }
      
      if (isset($_POST['name'])){
        $taskText=Tasks::clean($_POST['name']);
        if (Tasks::checkText($taskText)){
          if ($taskData['name']!=$taskText){
            if(Tasks::editTaskData('name', $taskText, $params[0])){
              $updateData['name']='Success:Task was changed!';
            }else{
              $updateData['name']='Error:Database Error: Task is not changed';
            }
          }          
        }else{
          $updateData['name']='Error:Invalid text of task!';
        }
      }

      if (isset($_POST['priority'])){
        $taskPriority=Tasks::clean($_POST['priority']);
        $curPriority=Tasks::checkPriority($taskPriority, $params[0]);
        if ($curPriority!=-1){
          if ($taskData['priority']!=$taskPriority){
            $oldTaskId=Tasks::getOldTaskId($taskPriority, $params[0]);
            if((Tasks::editTaskData('priority', $taskPriority, $params[0])) && (Tasks::editTaskData('priority', $curPriority, $oldTaskId))){
              $updateData['priority']='Success:Priority was changed!';
            }else{
              $updateData['priority']='Error:Database Error: Priority is not changed';
            }
          }          
        }else{
          $updateData['priority']='Error:Invalid priority of task!';
        }
      }
      
    }
    echo json_encode($updateData);
    
    return true;
  }
  
}
?>
