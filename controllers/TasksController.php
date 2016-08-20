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
      
      if (!Tasks::taskOwner($userId, $params[0])){
        header("Location: /");
      }
      
      if (isset($_POST['status'])){
        $taskStatus=Tasks::clean($_POST['status']);
        if (Tasks::checkStatus($taskStatus)){
          if ($taskData['status']!=$taskStatus){
            if(Tasks::editTaskData('status', $taskStatus, $params[0])){
              $updateData['status']='Success:Status of the task changed!';
            }else{
              $updateData['status']='Error:Database Error: Status of the task not changed';
            }
          }          
        }else{
          $updateData['status']='Error:Invalid task status!';
        }
      }
      
      if (isset($_POST['name'])){
        $taskText=Tasks::clean($_POST['name']);
        if (Tasks::checkText($taskText)){
          if ($taskData['name']!=$taskText){
            if(Tasks::editTaskData('name', $taskText, $params[0])){
              $updateData['name']='Success:The task changed!';
            }else{
              $updateData['name']='Error:Database Error: The task is not changed';
            }
          }          
        }else{
          $updateData['name']='Error:Incorrect text of the task!';
        }
      }

      if (isset($_POST['deadline'])){
        $taskDeadline=Tasks::clean($_POST['deadline']);
        $taskDeadline=Tasks::checkDate($taskDeadline);
        if ($taskDeadline){
          if ($taskData['deadline_date']!=$taskDeadline){
            if(Tasks::editTaskData('deadline_date', $taskDeadline, $params[0])){
              $updateData['deadline']='Success:The deadline changed!';
            }else{
              $updateData['deadline']='Error:Database Error: The deadline is not changed!';
            }
          }          
        }else{
          $updateData['deadline']='Error:Incorrect date of the deadline!';
        }
      }

      if (isset($_POST['priority'])){
        $taskPriority=Tasks::clean($_POST['priority']);
        $curPriority=Tasks::checkPriority($taskPriority, $params[0]);
        if ($curPriority!=-1){
          if ($taskData['priority']!=$taskPriority){
            $oldTaskId=Tasks::getOldTaskId($taskPriority, $params[0]);
            if((Tasks::editTaskData('priority', $taskPriority, $params[0])) && (Tasks::editTaskData('priority', $curPriority, $oldTaskId))){
              $updateData['priority']='Success:Priority of the task changed!';
            }else{
              $updateData['priority']='Error:Database Error: Priority of the task is not changed!';
            }
          }          
        }else{
          $updateData['priority']='Error:Invalid priority of the task!';
        }
      }
      echo json_encode($updateData);
      
    }else{
      header("Location: /");
    }
    
    return true;
  }

  public function actionAdd(){
    
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $userId=User::checkLogged();
      $errors=false;
      $updateData=array();
      
      if ((isset($_POST['name']))&&(isset($_POST['project']))){
        $taskText=Tasks::clean($_POST['name']);
        $projectId=intval($_POST['project']);
        if (Tasks::checkText($taskText)){
            $taskId=Tasks::addTaskData($taskText,$projectId);
            if($taskId){
              $updateData['name']='Success:The task is added!';
              $updateData['taskId']=$taskId;
            }else{
              $updateData['name']='Error:Database Error: The task is not added';
            }
        }else{
          $updateData['name']='Error:Incorrect text of the task!';
        }
      }
    echo json_encode($updateData);
    }else{
      header("Location: /");
    }

    return true;
  }
  
}
?>
