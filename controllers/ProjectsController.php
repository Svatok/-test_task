<?php

include_once ROOT.'/models/Projects.php';

class ProjectsController{
  
  public function actionIndex(){
    $projectsList=array();
    $projectsList=Projects::getProjectsList();
    
    echo '<pre>';
    print_r($projectsList);
    echo '</pre>';
    
    return true;
    
  }
}
?>
