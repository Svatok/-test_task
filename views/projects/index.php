<?php include ROOT.'/views/layouts/header.php';

   if (isset($projectsList)){
      include ROOT.'/views/projects/projects_list.php'; 
   }else{
      include ROOT.'/views/user/login.php';       
   }
 
   include ROOT.'/views/layouts/footer.php'; 
?>
