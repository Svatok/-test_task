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
              $updateData['name']='Success:Project was changed!';
            }else{
              $updateData['name']='Error:Database Error: Project is not changed';
            }
          }          
        }else{
          $updateData['name']='Error:Invalid text of project!';
        }
      }
    }
    echo json_encode($updateData);
    
    return true;
  }
  
  public function actionAdd(){
    
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $userId=User::checkLogged();
      $errors=false;
      $updateData=array();
      
      if (isset($_POST['name'])){
        $projectText=Projects::clean($_POST['name']);
        if (Projects::checkText($projectText)){
            $projectId=Projects::addProjectData($projectText, $userId);
            if($projectId){
              $updateData['name']='Success:Project was added!';
              $updateData['projectId']=$projectId;
            }else{
              $updateData['name']='Error:Database Error: Project is not added';
            }
        }else{
          $updateData['name']='Error:Invalid text of project!';
        }
      }
    }
    echo json_encode($updateData);
    
    return true;
  }
  
}
?>
