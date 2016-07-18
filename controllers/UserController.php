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
      }
      if ($userId){
        User::auth($userId);
        $regData['id']="$userId";
      }
    
    echo json_encode($regData);  
    
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
        User::auth($userId);
        $enterData['id']="$userId";
       // header("Location: /");
      }
      
      echo json_encode($enterData);
      
    }
    
    //require_once(ROOT.'/views/user/login.php');
    
    return true;
  }
  
  public function actionLogout(){
    unset($_SESSION["user"]);
    header("Location: /user/login");
  }
}
?>
