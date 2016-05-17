<ul>
  <?php foreach ($tasksList as $tasksItem):?>
  <li>
    <form action="" method="post" class="task_form">
      <?php if ($tasksItem['status']==1): ?>
        <input type="checkbox" checked>
      <?php else: ?>
        <input type="checkbox">
      <?php endif; ?>
      <input type="text" id="<?php echo $tasksItem['id'];?>" value="<?php echo $tasksItem['name'];?>" class="task_input" disabled/>
      <div class="out_edit">
        <a href="" class="up_task">Up</a>
        <a href="" class="down_task">Down</a>
        <a href="" class="edit">Edit</a>
        <a href="" class="del">Del</a>
      </div>
      <div class="in_edit">
        <a href="" class="save">Save</a>
        <a href="" class="cansel">Cansel</a>
      </div>
    </form>
  </li>
  <?php endforeach; ?>
</ul>
