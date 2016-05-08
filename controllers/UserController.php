<?php

class UserController{
  $email='';
  $password='';

  public function actionRegister(){
    if (isset($_POST['submit'])){
      $email=$_POST['email'];
      $password=$_POST['password'];
      
    }
    
    require_once(ROOT.'/views/user/register.php');
    
    return true;
  }
}
?>
