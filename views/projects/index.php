<?php include ROOT.'/views/layouts/header.php';?>
<div class="main_div">
<div class="head_div">
    <h1>SIMPLE TODO LISTS</h1>
    <h2>FROM RUBY GARAGE</h2>
</div>
<?php  foreach ($projectsList as $projectsItem):?>
    <div id="div_project_<?php echo $projectsItem['id'];?>" class="div_project_border">
        <table id="container_tasks_<?php echo $projectsItem['id'];?>" class="container_tasks">
          <tr class="project" id="project_<?php echo $projectsItem['id'];?>">
              <td class="project_icon">
                !!!
              </td>
              <td class="div_project_container"><div class="div_project_text"><?php echo $projectsItem['name'];?></div></td>
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
        </table>
    </div>
    <?php endforeach;?>
</div>
<?php include ROOT.'/views/layouts/footer.php'; ?>
