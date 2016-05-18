<?php include ROOT.'/views/layouts/header.php';
    foreach ($projectsList as $projectsItem):?>
    <textarea data-autoresize placeholder="Type some text"></textarea>
    <div id="div_project_<?php echo $projectsItem['id'];?>">
      <h2><a href="/projects/<?php echo $projectsItem['id'];?>" data-id="<?php echo $projectsItem['id'];?>" class="project"><?php echo $projectsItem['name'];?></a></h2>
        <div id="div_tasks_<?php echo $projectsItem['id'];?>" class="div_tasks"></div>
    </div>
    <?php endforeach; 
include ROOT.'/views/layouts/footer.php'; ?>
