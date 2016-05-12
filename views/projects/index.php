<?php include ROOT.'/views/layouts/header.php'; ?>
  <div id="div_project_<?php echo $projectsItem['id'];?>">
      <ul>
      <?php foreach ($projectsList as $projectsItem):?>
         <li><a href="/projects/<?php echo $projectsItem['id'];?>"><?php echo $projectsItem['name'];?></li>
      <?php endforeach; ?>
      </ul>
      <div id="div_tasks_<?php echo $projectsItem['id'];?>">
      </div>
  </div>
<?php include ROOT.'/views/layouts/footer.php'; ?>
