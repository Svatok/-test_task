  <?php foreach ($tasksList as $tasksItem):?>
  <div>
    <h2>ID: <?php echo $tasksItem['id'];?></h2>
    <p>Task: <?php echo $tasksItem['name'];?></p>
  </div>
  <?php endforeach; ?>
