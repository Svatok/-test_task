<?php
class Page404Controller{

// Controller connection page 404  
  public function actionIndex(){
    
    require_once(ROOT.'/views/layouts/page404.php');
    
    return true;
  
  }

}
?>
