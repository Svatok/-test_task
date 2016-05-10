<?php


class ProjectsController{
  
  public function actionIndex(){
    $userId=User::checkLogged();
    echo $userId;
    
    $projectsList=array();
    $projectsList=Projects::getProjectsList();
    
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
