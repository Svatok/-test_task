<?php

class UserController{

  // Action for user registration.
  public function actionRegister(){

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
        if ($userId!=false){
          User::auth($userId, $email);
          $regData['id']="$userId";
          $regData['name_email']=$email;
        }
      }
    
    echo json_encode($regData);  
    
    }else{
      header("Location: /");
    }
   
    return true;

  }

// Action for user login.  
  public function actionLogin(){

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
      }
      
      echo json_encode($enterData);
      
    }else{
      header("Location: /");
    }

    return true;

  }

// Action for the user exit.  
  public function actionLogout(){
    
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){
      unset($_SESSION["user"]);
    }else{
      unset($_SESSION["user"]);
      header("Location: /");
    }

    return true;

  }

}
?>
