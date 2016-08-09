<?php include ROOT.'/views/layouts/header.php';?>
<div class="head_div">
    <div class="h1_div">SIMPLE TODO LISTS</div>
    <div class="h2_div">FROM RUBY GARAGE</div>
</div>
<?php 
   if (isset($projectsList)){
      include ROOT.'/views/projects/projects_list.php'; 
   }else{
      include ROOT.'/views/user/login.php';       
   }
 
   include ROOT.'/views/layouts/footer.php'; 
?>
