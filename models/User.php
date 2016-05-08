<?php

class User{
  public static function register($email, $password) {
    $db=Db::getConnection();
    
    $sql='INSERT INTO user_table (email, pass) VALUES (:email, :password)';
    
    $result=$db->prepare($sql);
    $result->bindParam(':email',$email,PDO::PARAM_STR);
    $result->bindParam(':password',$password,PDO::PARAM_STR);
    return $result->execute();
  }
  
  public static function checkEmail($email) {
    if (filter_var($email, FILTER_VALIDATE_EMAIL)){
      return true;
    }
    return false;
  }
  public static function checkPassword($password) {
    if (strlen($password)>=4){
      return true;
    }
    return false;
  }
  public static function checkEmailExists($email) {
    $db=Db::getConnection();
    
    $sql='SELECT COUNT(*) FROM user_table WHERE email=:email';
    
    $result=$db->prepare($sql);
    $result->bindParam(':email',$email,PDO::PARAM_STR);
    $result->execute();
    
    if ($result->fetchColumn()){
       return true;
    }
    return false;
  }
}

?>
