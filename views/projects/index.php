<?php include ROOT.'/views/layouts/header.php';?>
<form action="" method="post" class="form-container">
   <?php if (isset($errors) && is_array($errors)): ?>
        <ul>
        <?php foreach ($errors as $error): ?>
          <li> - <?php echo $error; ?></li>
        <?php endforeach; ?>
      </ul>
    <?php endif; ?>
<div class="form-title"><h2>Sign up</h2></div>
<div class="form-title">Email</div>
<input class="form-field" type="text" name="name" placeholder="E-mail" /><br />
<div class="form-title" type="password" name="password" placeholder="Password">Password</div>
<input class="form-field" type="text" name="email" /><br />
<div class="submit-container">
<input class="submit-button" type="submit" name="submit" value="Enter" />
</div>
</form>
<div class="head_div">
    <h1>SIMPLE TODO LISTS</h1>
    <h2>FROM RUBY GARAGE</h2>
</div>
<div class="main_div"> 
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
    <div class="add_button_project"><button>Add TODO List</button></div>
</div>
<?php include ROOT.'/views/layouts/footer.php'; ?>
