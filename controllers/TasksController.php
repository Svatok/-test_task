<?php
class TaskController{
  
  public function actionEdit($params){
    $taskStatus='';
    $taskText='';
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $userId=User::checkLogged();
      $taskData=Tasks::getTaskData($params[0]);
      $errors=false;
      $updateData=();
      
      if (isset($_POST['status'])){
        if (Tasks::checkStatus($_POST['status'])){
          $taskStatus=$_POST['status'];
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
        if (Tasks::checkText($_POST['name'])){
          $taskText=$_POST['name'];
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
        if (Tasks::checkPriority($_POST['priority'])){
          $taskPriority=$_POST['priority'];
          if ($taskData['priority']!=$taskPriority){
            if(Tasks::editTaskData('priority', $taskPriority, $params[0])){
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
