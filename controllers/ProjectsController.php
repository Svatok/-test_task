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
}
?>
