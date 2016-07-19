<div class="add_task">
  <div class="add_icon">
    +
  </div>
  <div class="add_task_input"> 
    <input type="text" placeholder="Start typing here to create a task...">
  </div>
  <div class="add_task_button">
    <a href="#" class="save_add">Add Task</a>
  </div>
</div>

<?php foreach ($tasksList as $tasksItem):?>
<div priority="<?php echo $tasksItem['priority'];?>" class="task" id="task_<?php echo $tasksItem['id'];?>">
  <div class="div_check">
      <?php if ($tasksItem['status']==1): ?>
        <input type="checkbox" checked class="task_status">
      <?php else: ?>
        <input type="checkbox" class="task_status">
      <?php endif; ?>
  </div>
  <div class="border_div">
  </div>
  <div class="div_task_container">
    <div class="div_task_text"><?php echo $tasksItem['name'];?></div>
  </div>
  <div class="div_edit_buttons">
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
  </div>
</div>
  <?php endforeach; ?>


