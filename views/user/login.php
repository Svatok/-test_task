<?php include ROOT.'/views/layouts/header.php';?>
<div class="parent_enter">
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
</div>
<?php include ROOT.'/views/layouts/footer.php'; ?>
