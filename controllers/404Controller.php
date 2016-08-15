<?php
class 404Controller{
  
  public function actionIndex(){
    require_once(ROOT.'/views/404.php');
    
    return true;
  }

}
?>
