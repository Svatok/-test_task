<?php include ROOT.'/views/layouts/header.php'; ?>
  <div>
      <ul>
      <?php foreach ($projectsList as $projectsItem):?>
         <li><a href="/projects/<?php echo $projectsItem['id'];?>"><?php echo $projectsItem['name'];?></li>
      <?php endforeach; ?>
      </ul>
  </div>
<?php include ROOT.'/views/layouts/footer.php'; ?>
