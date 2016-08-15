<?php

class UserController{


  public function actionRegister(){
  //  $email='';
  //  $password='';
    
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){
      $email='';
      $password='';
      
      if (isset($_POST['email'])){
        $email=$_POST['email'];
      }
      if (isset($_POST['password'])){
        $password=$_POST['password'];
      }
      $errors=false;
      $regData=array();      
      
      if (!User::checkEmail($email)){
        $errors[]='Wrong e-mail!';
        $regData['email']='Error:Wrong e-mail!';
      }
      if (!User::checkPassword($password)){
        $errors[]='Password have to more then 4 symbols!';
        $regData['password']='Error:Password have to more then 4 symbols!';
      }      
      if (User::checkEmailExists($email)){
        $errors[]='E-mail is used!';
        $regData['email']='Error:E-mail is used!';
      }   
      
      if ($errors==false){
        $userId=User::register($email, $password);
        $regData['id']="$userId";
        if ($userId){
          User::auth($userId, $email);
          $regData['id']="$userId";
          $regData['name_email']=$email;
        }
      }
    
    echo json_encode($regData);  
    
    }else{
      header("Location: /");
    }

    //require_once(ROOT.'/views/user/register.php');
    
    return true;
  }
  
  public function actionLogin(){
  //  $email='test@test.com';
  //  $password='test';
    
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){
      $email='';
      $password='';
      
      if (isset($_POST['email'])){
        $email=$_POST['email'];
      }
      if (isset($_POST['password'])){
        $password=$_POST['password'];
      }
      $errors=false;
      $enterData=array();
      
      if (!User::checkEmail($email)){
        $errors[]='Wrong e-mail!';
        $enterData['email']='Error:Wrong e-mail!';
      }
      if (!User::checkPassword($password)){
        $errors[]='Password have to more then 4 symbols!';
        $enterData['password']='Error:Password have to more then 4 symbols!';
      }      
      $userId=User::checkUserData($email, $password);
      if ($userId==false){
        $errors[]='Wrong data for enter!';
        $enterData['id']="Error:Wrong data for enter!";
      }else{
        User::auth($userId, $email);
        $enterData['id']="$userId";
        $enterData['name_email']=$email;
       // header("Location: /");
      }
      
      echo json_encode($enterData);
      
    }else{
      header("Location: /");
    }
    
    //require_once(ROOT.'/views/user/login.php');
    
    return true;
  }
  
  public function actionLogout(){
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){
      unset($_SESSION["user"]);
    }else{
      unset($_SESSION["user"]);
      header("Location: /");
    }
    //header("Location: /user/login");
  }
}
?>
