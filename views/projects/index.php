<?php include ROOT.'/views/layouts/header.php';
    foreach ($projectsList as $projectsItem):?>
    <div id="div_project_<?php echo $projectsItem['id'];?>">
      <h2><a href="/projects/<?php echo $projectsItem['id'];?>" data-id="<?php echo $projectsItem['id'];?>" class="project"><?php echo $projectsItem['name'];?></a></h2>
        <table id="div_tasks_<?php echo $projectsItem['id'];?>" class="div_tasks"></table>
    </div>
    <?php endforeach; 
include ROOT.'/views/layouts/footer.php'; ?>
