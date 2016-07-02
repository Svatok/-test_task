<?php include ROOT.'/views/layouts/header.php';
    foreach ($projectsList as $projectsItem):?>
    <div id="div_project_<?php echo $projectsItem['id'];?>">
      <h2><a href="/projects/<?php echo $projectsItem['id'];?>" data-id="<?php echo $projectsItem['id'];?>" class="project"><?php echo $projectsItem['name'];?></a></h2>
        <table id="container_tasks_<?php echo $projectsItem['id'];?>" class="container_tasks">
          <tr class="project_tr" id="project_<?php echo $projectsItem['id'];?>">
            <td>
              !!!
            </td>
            <td class="div_project_container"> 
              <div class="div_project_text"><?php echo $projectsItem['name'];?></div>
            </td>
            <td class="div_edit_buttons">
                <div class="out_edit">
                  <a href="" class="edit">Edit</a>
                  <a href="" class="del">Del</a>
                </div>
                <div class="in_edit">
                  <a href="" class="save">Save</a>
                  <a href="" class="cancel">Cancel</a>
                </div>
            </td>
          </tr>
            <tr class="add_task">
                <td>
                  +
                </td>
                <td class="add_task_input"> 
                  <input type="text" placeholder="Start typing here to create a task..."></input>
                </td>
                <td class="add_task_button">
                  <a href="#" class="save_add">Add Task</a>
                </td>
              </tr>
        </table>
    </div>
    <?php endforeach; 
include ROOT.'/views/layouts/footer.php'; ?>
