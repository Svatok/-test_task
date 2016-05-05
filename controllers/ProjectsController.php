<?php

include_once ROOT.'/models/Projects.php';

class ProjectsController{
  
  public function actionIndex(){
    $projectsList=array();
    $projectsList=Projects::getProjectsList();
    
    require_once(ROOT.'/views/projects/index.php');
    
    return true;
    
  }
}
?>
