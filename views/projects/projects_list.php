<div class="menu">
    <?php echo $_SESSION['email']?>, <a href="" id="log_out">Log out</a>
</div>
<div class="main_div"> 
<?php  foreach ($projectsList as $projectsItem):?>
<div id="div_project_<?php echo $projectsItem['id'];?>" class="div_project_border">
    <div id="container_tasks_<?php echo $projectsItem['id'];?>" class="container_tasks">
        <div class="project" id="project_<?php echo $projectsItem['id'];?>">
            <div class="project_icon">
                <img src="/template/img/logo_p.fw.png">
            </div>
            <div class="div_project_container">
                <div class="div_project_text"><?php echo $projectsItem['name'];?></div>
            </div>
            <div class="div_edit_buttons">
                <div class="out_edit">
                    <a href="" class="edit"></a>
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
    </div>
</div>
<?php endforeach;?>
<div class="add_button_project"><button>Add TODO List</button></div>
</div>
