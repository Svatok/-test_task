<?php


class ProjectsController{
  
  public function actionIndex(){
    $userId=User::checkLogged();
    
    $projectsList=array();
    $projectsList=Projects::getProjectsList($userId);
    
    require_once(ROOT.'/views/projects/index.php');
    
    return true;
    
  }
  
  public function actionTasks($params){
    $tasksList=array();
    $tasksList=Projects::getTasksList($params[0]);
    
    require_once(ROOT.'/views/projects/tasks_list.php');
    
    return true;
    
  }

  public function actionEdit($params){
    $projectText='';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $userId=User::checkLogged();
      $projectData=Projects::getProjectData($params[0]);
      $errors=false;
      $updateData=array();
      
      if (isset($_POST['name'])){
        $projectText=Projects::clean($_POST['name']);
        if (Projects::checkText($projectText)){
          if ($projectData['name']!=$projectText){
            if(Projects::editProjectData('name', $projectText, $params[0])){
              $updateData['name']='Success:Task was changed!';
            }else{
              $updateData['name']='Error:Database Error: Task is not changed';
            }
          }          
        }else{
          $updateData['name']='Error:Invalid text of task!';
        }
      }
    }
    echo json_encode($updateData);
    
    return true;
  }
  
}
?>
