<?php include ROOT.'/views/layouts/header.php';
   foreach ($projectsList as $projectsItem):?>
  <div>
    <h2>ID: <?php echo $projectsItem['id'];?></h2>
    <p>Project: <?php echo $projectsItem['name'];?></p>
  </div>
  <?php endforeach; 
  include ROOT.'/views/layouts/footer.php'; ?>
