<?php

class UserController{


  public function actionRegister(){
    $email='';
    $password='';
    
    if (isset($_POST['submit'])){
      $email=$_POST['email'];
      $password=$_POST['password'];
      
      $errors=false;
      
      if (User::checkEmail($email)){
        echo 'em-ok';
      }else{
        $errors[]='Wrong e-mail!';
      }
      if (User::checkPassword($password)){
        echo 'pass-ok';
      }else{
        $errors[]='Password have to more then 4 symbols!';
      }      
      
      
    }
    
    require_once(ROOT.'/views/user/register.php');
    
    return true;
  }
}
?>
