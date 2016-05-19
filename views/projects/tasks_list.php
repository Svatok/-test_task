<ul>
  <?php foreach ($tasksList as $tasksItem):?>
  <li priority="<?php echo $tasksItem['priority'];?>" class="li_task" id="li_task_<?php echo $tasksItem['id'];?>">
      <?php if ($tasksItem['status']==1): ?>
        <input type="checkbox" checked>
      <?php else: ?>
        <input type="checkbox">
      <?php endif; ?>
      <div class="input_text"><?php echo $tasksItem['name'];?></div>
      <div class="out_edit">
        <a href="" class="up_task">Up</a>
        <a href="" class="down_task">Down</a>
        <a href="" class="edit">Edit</a>
        <a href="" class="del">Del</a>
      </div>
      <div class="in_edit">
        <a href="" class="save">Save</a>
        <a href="" class="cancel">Cancel</a>
      </div>
  </li>
  <?php endforeach; ?>
</ul>

