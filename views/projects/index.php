<?php include ROOT.'/views/layouts/header.php';?>
<form action="" method="post" class="form-container">
   <?php if (isset($errors) && is_array($errors)): ?>
        <ul>
        <?php foreach ($errors as $error): ?>
          <li> - <?php echo $error; ?></li>
        <?php endforeach; ?>
      </ul>
    <?php endif; ?>
<div class="form-title"><h2>Sign up</h2></div>
<div class="form-title">Email</div>
<input class="form-field" type="text" name="name" placeholder="E-mail" /><br />
<div class="form-title" type="password" name="password" placeholder="Password">Password</div>
<input class="form-field" type="text" name="email" /><br />
<div class="submit-container">
<input class="submit-button" type="submit" name="submit" value="Enter" />
</div>
</form>
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
