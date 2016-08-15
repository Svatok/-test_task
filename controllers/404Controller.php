<?php
class 404Controller{
  
  public function actionIndex(){
    require_once(ROOT.'/views/layouts/404.php');
    
    return true;
  }

}
?>
