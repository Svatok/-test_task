<?php if ($result): ?>
  <div>Are you registered!</div>
<?php else: ?>
  <div>
    <?php if (isset($errors) && is_array($errors)): ?>
      <ul>
        <?php foreach ($errors as $error): ?>
          <li> - <?php echo $error; ?></li>
        <?php endforeach; ?>
      </ul>
    <?php endif; ?>
    <form action="#" method="post">
      <input type="text" name="email" placeholder="E-mail" value="<?php echo $email; ?>"/>
      <input type="password" name="password" placeholder="Pass" value="<?php echo $password; ?>"/>
      <input type="submit" name="submit" value="Registration"/>
    </form>
  </div>
<?php endif; ?>
