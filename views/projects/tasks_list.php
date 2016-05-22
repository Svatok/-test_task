
  <tr class="add_task">
    <td>
      +
    </td>
    <td class="add_task_input"> 
      <input type="text" width="90%" placeholder="Start typing here to create a task..."></input>
    </td>
    <td class="add_task_button">
      <a href="#">Add Task</a>
    </td>
  </tr>
  
  <?php foreach ($tasksList as $tasksItem):?>
  <tr priority="<?php echo $tasksItem['priority'];?>" class="task" id="task_<?php echo $tasksItem['id'];?>">
      <td class="div_check">
      <?php if ($tasksItem['status']==1): ?>
        <input type="checkbox" checked>
      <?php else: ?>
        <input type="checkbox">
      <?php endif; ?>
      </td>
      <td class="div_task_container"><div class="div_task_text"><?php echo $tasksItem['name'];?></div></td>
      <td class="div_edit_buttons">
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
      </td>
  </tr>
  <?php endforeach; ?>


