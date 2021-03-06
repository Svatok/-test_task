<div class="add_task">
  
  <div class="add_icon">
    <img src="/template/img/a-11.png">
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
  
  <div class="border_div"></div>

  <div class="div_task_container">
    <?php if ($tasksItem['status']==1): ?>
      <div class="div_task_text_check"><?php echo $tasksItem['name'];?></div>
    <?php else: ?>
      <div class="div_task_text"><?php echo $tasksItem['name'];?></div>
    <?php endif; ?>
  </div>

  <div class="div_edit_buttons">
    <div class="div_deadline"><?php echo $tasksItem['deadline_date'];?></div>
    <div class="out_edit">
      <div class="priority_buttons">
        <div class="up_task"></div>
        <div class="border_proirity"></div>
        <div class="down_task"></div>
      </div>
      <a class="border_buttons"></a>
      <a href="" class="edit"></a>
      <a class="border_buttons"></a>
      <input class="deadline_input" type="hidden" />
      <a href="" class="deadline"></a>
      <a class="border_buttons"></a>
      <a href="" class="del"></a>
    </div>
    <div class="in_edit">
      <a href="" class="save"></a>
      <a class="border_buttons"></a>
      <a href="" class="cancel"></a>
    </div>
  </div>

</div>
<?php endforeach; ?>


