<?php

class UserController{


  public function actionRegister(){
    $email='';
    $password='';
    
    if (isset($_POST['submit'])){
      $email=$_POST['email'];
      $password=$_POST['password'];
      $errors=false;
      
      if (!User::checkEmail($email)){
        $errors[]='Wrong e-mail!';
      }
      if (!User::checkPassword($password)){
        $errors[]='Password have to more then 4 symbols!';
      }      
      if (User::checkEmailExists($email)){
        $errors[]='E-mail is used!';
      }   
      
      if ($errors==false){
        $result=User::register($email, $password);
      }
      
    }
    
    require_once(ROOT.'/views/user/register.php');
    
    return true;
  }
  
  public function actionLogin(){
    $email='';
    $password='';
    
    if (isset($_POST['submit'])){
      $email=$_POST['email'];
      $password=$_POST['password'];
      $errors=false;
      
      if (!User::checkEmail($email)){
        $errors[]='Wrong e-mail!';
      }
      if (!User::checkPassword($password)){
        $errors[]='Password have to more then 4 symbols!';
      }      
      $userId=User::checkUserData($email, $password);
      if ($userId==false){
        $errors[]='Wrong data for enter!';
      }else{
        User::auth($userId);
        header("Location: /projects/index");
      }
      
    }

    
    require_once(ROOT.'/views/user/login.php');
    
    return true;
  }
}
?>
