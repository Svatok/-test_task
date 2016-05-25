<?php
class TaskController{
  
  public function actionEdit(){
    $check_done='';
    $text_task='';
    
    $errors=false;
    if (isset($_POST['check_done'])){
      $check_done=$_POST['check_done'];
    }
    if (isset($_POST['check_done'])){
      $text_task=$_POST['text_task'];
    }
    
    
    return true;
  }
  
}
?>
