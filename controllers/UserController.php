<?php

class UserController{
  public function actionRegister(){
    if (isset($_POST['submit'])){
      $email=$_POST['email'];
      $password=$_POST['password'];
      
      if (isset($email)){
        echo $email;
      }
    if (isset($password)){
        echo $password;
      }
      
    }
    
    require_once(ROOT.'/views/user/register.php');
    
    return true;
  }
}
?>
