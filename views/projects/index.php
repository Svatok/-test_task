<?php include ROOT.'/views/layouts/header.php';?>
<div class="head_div">
    <h1>SIMPLE TODO LISTS</h1>
    <h2>FROM RUBY GARAGE</h2>
</div>
<?php 
   if (isset($projectsList)){
      include ROOT.'/views/projects/projects_list.php'; 
   }else{
      include ROOT.'/views/user/login.php';       
   }
 
   include ROOT.'/views/layouts/footer.php'; 
?>
