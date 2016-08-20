<?php
class Page404Controller{
  
  public function actionIndex(){
    require_once(ROOT.'/views/layouts/page404.php');
    
    return true;
  }

}
?>
