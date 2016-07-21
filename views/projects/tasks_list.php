<div class="add_task">
  <div class="add_icon">
    <img src="/template/img/a-11.fw.png">
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
        <input id="check_<?php echo $tasksItem['id'];?>" type="checkbox" checked class="task_status">
      <?php else: ?>
        <input id="check_<?php echo $tasksItem['id'];?>" type="checkbox" class="task_status">
      <?php endif; ?>
      <label for="check_<?php echo $tasksItem['id'];?>"></label>
  </div>
  <div class="border_div">
  </div>
  <div class="div_task_container">
    <div class="div_task_text"><?php echo $tasksItem['name'];?></div>
  </div>
  <div class="div_edit_buttons">
    <div class="out_edit">
      <a href="" class="up_task"></a>
      <a href="" class="down_task"></a>
      <a class="border_buttons"></a>
      <a href="" class="edit"></a>
      <a class="border_buttons"></a>
      <a href="" class="del"></a>
    </div>
    <div class="in_edit">
      <a href="" class="save">Save</a>
      <a href="" class="cancel">Cancel</a>
    </div>
  </div>
</div>
  <?php endforeach; ?>


