<?php


class ProjectsController{
  
  public function actionIndex(){
    $userId=User::checkLogged();
      
    if ($userId){
      $projectsList=array();
      $projectsList=Projects::getProjectsList($userId);
    }
    
    require_once(ROOT.'/views/main/index.php');
    
    return true;
    
  }
  
  public function actionProjects(){

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $userId=User::checkLogged();
      
      if (!$userId){
        header("Location: /");
      }
      $projectsList=array();
      $projectsList=Projects::getProjectsList($userId);
      require_once(ROOT.'/views/main/projects_list.php');
    }else{
      header("Location: /");
    }
      
    return true;
    
  }
  
  public function actionTasks($params){

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $userId=User::checkLogged();
      
      if ($userId){
        $tasksList=array();
        $tasksList=Projects::getTasksList($params[0]);
      }
      require_once(ROOT.'/views/main/tasks_list.php');
    }else{
      header("Location: /");
    }
    
    return true;
    
  }

  public function actionEdit($params){
    $projectText='';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $userId=User::checkLogged();
      $projectData=Projects::getProjectData($params[0]);
      $errors=false;
      $updateData=array();

      if (!Projects::projectOwner($userId, $params[0])){
        header("Location: /");
      }
      if (isset($_POST['status'])){
        $projectStatus=Projects::clean($_POST['status']);
        if (Projects::checkStatus($projectStatus)){
          if ($projectData['status']!=$projectStatus){
            if(Projects::editProjectData('status', $projectStatus, $params[0])){
              $updateData['status']='Success:Status of the project changed!';
            }else{
              $updateData['status']='Error:Database Error: Status of the project is not changed';
            }
          }          
        }else{
          $updateData['status']='Error:Invalid project status!';
        }
      }
      
      if (isset($_POST['name'])){
        $projectText=Projects::clean($_POST['name']);
        if (Projects::checkText($projectText)){
          if ($projectData['name']!=$projectText){
            if(Projects::editProjectData('name', $projectText, $params[0])){
              $updateData['name']='Success:The project changed!';
            }else{
              $updateData['name']='Error:Database Error: The project is not changed';
            }
          }          
        }else{
          $updateData['name']='Error:Incorrect text of the project!';
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
      
      if (isset($_POST['name'])){
        $projectText=Projects::clean($_POST['name']);
        if (Projects::checkText($projectText)){
            $projectId=Projects::addProjectData($projectText, $userId);
            if($projectId){
              $updateData['name']='Success:The project is added!';
              $updateData['projectId']=$projectId;
            }else{
              $updateData['name']='Error:Database Error: The project is not added';
            }
        }else{
          $updateData['name']='Error:Incorrect text of the project!';
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
