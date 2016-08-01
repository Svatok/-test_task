$(document).ready(function () {
    var allowedStatuses=[0,1,2]; // 0 - In work, 1 - Done, 2 - Delete
    var before_edit;

function ucfirst(str) {
    var first = str.charAt(0).toUpperCase();
    return first + str.substr(1);
}
// function wich replace div on textbox before edit         
    function divClicked(div) {
        var divHtml = $(div).html();
        var editableText = $('<textarea class="input_text"/>');
        editableText.val(divHtml);
        $(div).replaceWith(editableText);
        editableText.trigger('keyup');
        editableText.focus();
    }
// function wich replace textbox on div after edit      
    function editableTextBlurred(textarea, save, type) {
        var html = $(textarea).val();
        var viewableText = $('<div class="div_'+type+'_text">');
        if (save){
            viewableText.html(html);
        }else{
            viewableText.html(before_edit);
        }
        $(textarea).replaceWith(viewableText);
    }
// check valid text of project or task    
    function checkText(val){
        if((val=="") || (val.length < 5) || (val.length > 250)) {
          return false;
        }else{
          return true;
        }
    }   
// check valid status        
    function checkStatus(val){
        if ($.inArray(val, allowedStatuses)>-1){
          return true;
        }else{
          return false;
        }
    }  
// check valid priority    
    function checkPriority(val, old_val, max){
      if ((val=old_val+1) || (val=old_val-1)){
        if ((val>0) && (val<=max)){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
    } 
// resize textbox
    $('body').on('keyup input', '.input_text', function(){
        var offset = this.offsetHeight - this.clientHeight;
        $(this).css('height', 'auto').css('height', this.scrollHeight+offset);
    });
// delete task
    $('body').on('click', '.del', function(e){
      e.preventDefault();
      var id_project_attr=$(this).closest('.container_tasks').attr('id');
      var task_box=$(this).closest('.task, .project');
      var class_attr=task_box.attr('class');
      var id_task_attr=task_box.attr('id');
      var id_task=id_task_attr.replace(/[^0-9]/gim,'');
      noty({
    	text: 'Do you want to delete '+class_attr+'?',
    	buttons: [
    	//	addClass: 'btn btn-primary', 
    		{text: 'Ok', onClick: function($noty) {
                    $.ajax({
                        data: {status:"2"},
                        url: '/'+class_attr+'/edit/'+id_task,
                        method: 'post',
                        success: function (data) {
                            if (data){ 
                                var result_data = $.parseJSON(data);
                                var result_errors = false;
                                $.each(result_data, function(index, value){
                                    if (value.replace(/\:.*/, '')=='Error'){
                                        result_errors = true;
                                        noty({
                                            text: ucfirst(class_attr)+' not deleted!',
                                            type: 'error',
                                            timeout: '1000'
                                        }); 
                                    }
                                });
                                if (!result_errors){
                                    if (class_attr=='task'){
                                        // update priority other tasks
                                        $("#"+id_project_attr+" .task").each(function() {
                                            var del_priority=parseInt(task_box.attr('priority'));
                                            var cur_priority=parseInt($(this).attr('priority'));
                                            if (cur_priority>del_priority){
                                                var new_priority=cur_priority-1;
                                                $(this).attr('priority', new_priority);
                                            }
                                        });
                                        // remove element
                                        task_box.remove();                                        
                                    }else{
                                        // remove element
                                        task_box.closest('.div_project_border').remove();   
                                    }
                                    $noty.close();
                                    noty({
                                        text: ucfirst(class_attr)+' deleted!',
                                        type: 'success',
                                        timeout: '1000'
                                    }); 
                                }
                            }
                        },
                        error: function(data){
                            noty({
                                text: ucfirst(class_attr)+' not deleted!',
                                type: 'error',
                                timeout: '1000'
                            });     
                        }
                    });
    			}
    		},
    		{text: 'Cancel', onClick: function($noty) {
    				$noty.close();
    			}
    		}
    	]
      });        
    }); 
// change status of task
    $('body').on('click', '.task_status', function(){
      var id_task_attr=$(this).closest('.task').attr('id');
      var id_task=id_task_attr.replace(/[^0-9]/gim,'');
      var status = $(this).prop('checked');
      var checkbox_edit=$(this);
      if (!status){
        var new_status = 0;
        var old_status_bul = true;
      }else{
        var new_status = 1;
        var old_status_bul = false;
      }
      if (checkStatus(new_status)){
        $.ajax({
            data: {status:new_status},
            url: '/task/edit/'+id_task,
            method: 'post',
            success: function (data) {
                if (data){ 
                    var result_data = $.parseJSON(data);
                    var result_errors = false;
                    $.each(result_data, function(index, value){ 
                        if (value.replace(/\:.*/, '')=='Error'){
                            result_errors = true;
                            noty({
                                text: value,
                                type: 'error',
                                timeout: '1000'
                            }); 
                        }
                    });
                    if (result_errors){
                        checkbox_edit.prop('checked', old_status_bul); 
                    }
                }
            },
            error: function(data){
                checkbox_edit.prop('checked', old_status_bul); 
            }
        }); 
      }else{
        var n = noty({
            text: 'Invalid status of task!',
            type: 'error',
            timeout: '1000'
        });                    
        checkbox_edit.prop('checked', old_status_bul);  
      }
    }); 
// text of task or project go in edit mode 
    $('body').on('click', '.edit', function(e){
      e.preventDefault();
      var id_task_attr=$(this).closest('.task, .project').attr('id');
      var class_tr_attr=$(this).closest('.task, .project').attr('class');
      before_edit=$("#"+id_task_attr+" .div_"+class_tr_attr+"_text").text();
      var div_text=$("#"+id_task_attr+" .div_"+class_tr_attr+"_text");
      divClicked(div_text);
      $("#"+id_task_attr+" .out_edit").css('display','none');
      $("#"+id_task_attr+" .in_edit").css('display','inline-block');
    });
// cancel edit mode of text of task or project
    $('body').on('click', '.cancel', function(e){
      e.preventDefault();
    });  
// cancel action of link
    $('body').on('click', '.save_add', function(e){
      e.preventDefault();
    });
// lost focus after add task (cancel or save)   
    $('body').on('blur', '.add_task_input input', function(event){
      var container_tasks=$(this).closest('.container_tasks');
      var container_task_add=$(this).closest('.task');
      var id_project=container_tasks.attr('id').replace(/[^0-9]/gim,'');
      var textarea_text=$(this);
      var task_text=textarea_text.val();
         $(document).one('click', function(e) {
            var focused_element=$(e.target);
            if (focused_element.attr('class')=='save_add'){
               var errors = new Array();
               var successes = new Array();
               e.preventDefault();
               $.ajax({
                    data: {name:task_text, project:id_project},
                    url: '/task/add',
                    method: 'post',
                    success: function (data) {
                        if (data){ 
                            var result_data = $.parseJSON(data);
                            var result_errors = false;
                            $.each(result_data, function(index, value){
                                if (value.replace(/\:.*/, '')=='Error'){
                                    result_errors = true;
                                    noty({
                                        text: value,
                                        type: 'error',
                                        timeout: '1000'
                                    }); 
                                }else if (index!='taskId'){
                                    noty({
                                        text: value,
                                        type: 'success',
                                        timeout: '1000'
                                    }); 
                                }
                            });
                            if (!result_errors){
                                var priority_new=(container_tasks.find($("div.task")).length)+1;
                                var before_li=container_tasks.find($('[priority = '+(priority_new-1)+']'));
                                var insert_task='<div priority="'+priority_new+'" class="task" id="task_'+result_data['taskId']+'">'+   
                                                    '<div class="div_check"><input type="checkbox" class="task_status"></div>'+
                                                    '<div class="border_div"></div>'+
                                                    '<div class="div_task_container"><div class="div_task_text">'+task_text+'</div></div>'+
                                                    '<div class="div_edit_buttons">'+
                                                        '<div class="out_edit">'+
                                                          '<div class="priority_buttons">'+
                                                              '<div class="up_task"></div> '+
                                                              '<div class="border_proirity"></div>'+
                                                              '<div class="down_task"></div> '+
                                                          '/div'+
                                                          '<a class="border_buttons"></a>'+
                                                          '<a href="" class="edit"></a> '+
                                                          '<a class="border_buttons"></a>'+
                                                          '<a href="" class="deadline"></a>'+
                                                          '<a class="border_buttons"></a>'+
                                                          '<a href="" class="del"></a> '+
                                                        '</div>'+
                                                        '<div class="in_edit">'+
                                                          '<a href="" class="save"></a> '+
                                                          '<a class="border_buttons"></a>'+
                                                          '<a href="" class="cancel"></a> '+
                                                        '</div>'+
                                                    '</div>'+
                                                '</div>';
                                if ((priority_new-1)==0){
                                    container_task_add.after(insert_task);
                                }else{
                                    before_li.before(insert_task);
                                }
                            }
                        }
                    }
                });
            }
            $(textarea_text).val('');
         });
    });   
// text of task or project go in edit mode 
    $('body').on('click', '.add_button_project button', function(e){
        e.preventDefault();
        before_div=$(this).closest('div');
        var insert_project='<div id="div_project_NEW" class="div_project_border">'+   
                                '<div id="container_tasks_NEW" class="container_tasks">'+
                                    '<div class="project" id="project_NEW">'+
                                        '<div class="project_icon">'+
                                            '<img src="/template/img/logo_p.fw.png">'+
                                        '</div>'+
                                        '<div class="div_project_container"><div class="div_project_text"></div></div>'+
                                        '<div class="div_edit_buttons">'+
                                            '<div class="out_edit">'+
                                                '<a href="" class="edit"></a>'+
                                                '<a class="border_buttons"></a>'+
                                                '<a href="" class="del"></a>'+
                                            '</div>'+
                                            '<div class="in_edit">'+
                                                '<a href="" class="save"></a>'+
                                                '<a class="border_buttons"></a>'+
                                                '<a href="" class="cancel"></a>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
        before_div.before(insert_project);
        $("#project_NEW .edit").trigger('click');
    });
// lost focus after edit task (cancel or save)       
    $('body').on('blur', '.input_text', function(event){
      var id_task_attr=$(this).closest('.task, .project').attr('id');
      var class_attr=$(this).closest('.task, .project').attr('class');
      var textarea_text=$("#"+id_task_attr+" .input_text");
         $(document).one('click', function(e) {
            var focused_element=$(e.target);
            if (focused_element.attr('class')=='save'){
               e.preventDefault();
               var id_task=id_task_attr.replace(/[^0-9]/gim,'');
               if (id_task_attr=='project_NEW'){
                   url_str='/'+class_attr+'/add';
               }else{
                   url_str='/'+class_attr+'/edit/'+id_task
               }
               if (checkText(textarea_text.val())){
                 if (textarea_text.val()!=before_edit){
                       $.ajax({
                          data: {name:textarea_text.val()},
                          url: url_str,
                          method: 'post',
                          success: function (data) {
                             if (data){ 
                                var result_data = $.parseJSON(data);
                                var result_errors = false;
                                $.each(result_data, function(index, value){
                                    if (value.replace(/\:.*/, '')=='Error'){
                                        result_errors = true;
                                        noty({
                                            text: value,
                                            type: 'error',
                                            timeout: '1000'
                                        }); 
                                    }else if (index!='projectId'){
                                        noty({
                                            text: value,
                                            type: 'success',
                                            timeout: '1000'
                                        }); 
                                    }
                                });
                                if (result_errors){
                                    editableTextBlurred(textarea_text, false, class_attr);    
                                }else{
                                    editableTextBlurred(textarea_text, true, class_attr);
                                    $("#"+id_task_attr+" .in_edit").hide();
                                    //$("#"+id_task_attr+" .out_edit").css('display','inline-block');
                                    //add project
                                    if (typeof result_data['projectId'] !=="undefined"){
                                        $('#div_project_NEW').attr('id', 'div_project_'+result_data['projectId']);
                                        $('#container_tasks_NEW').attr('id', 'container_tasks_'+result_data['projectId']);
                                        $('#project_NEW').attr('id', 'project_'+result_data['projectId']);
                                        $("#project_"+result_data['projectId']+" .div_project_container").trigger('click');
                                    }
                                }
                             }
                          },
                          error: function(){
                            editableTextBlurred(textarea_text, false, class_attr);  
                          }
                       });
                 }
               }else{
                    noty({
                        text: 'Invalid text of '+class_attr+'!',
                        type: 'error',
                        timeout: '1000'
                    });                    
                    editableTextBlurred(textarea_text, false, class_attr);
               }   
            }else{
               editableTextBlurred(textarea_text, false, class_attr);
                $("#"+id_task_attr+" .in_edit").hide();
               // $("#"+id_task_attr+" .out_edit").css('display','inline-block');
                if ($("div").is("#div_project_NEW")){
                    $('#div_project_NEW').remove();
                }
            }
         });
    });   
// change priority of task to UP
    $('body').on('click', '.up_task', function(e){
      e.preventDefault();
      var container_tasks=$(this).closest('.container_tasks');
      var task=$(this).closest('.task');
      var id_task=task.attr('id').replace(/[^0-9]/gim,'');
      var kol_tasks=container_tasks.find($("div.task")).length;
      if (parseInt(task.attr('priority'))<kol_tasks){
         var priority_new=parseInt(task.attr('priority'))+1;
         var before_li=container_tasks.find($('[priority = '+priority_new+']'));
         $.ajax({
            data: {priority:priority_new},
            url: '/task/edit/'+id_task,
            method: 'post',
            success: function (data) {
                if (data){ 
                    var result_data = $.parseJSON(data);
                    var result_errors = false;
                    $.each(result_data, function(index, value){
                        if (value.replace(/\:.*/, '')=='Error'){
                            result_errors = true;
                            noty({
                                text: value,
                                type: 'error',
                                timeout: '1000'
                            }); 
                        }
                    });
                    if (!result_errors){
                        before_li.before(task);
                        before_li.attr('priority', (priority_new-1));     
                        task.attr('priority', priority_new);  
                    }
                }
            },
            error: function(){
                noty({
                    text: 'Can not change priority!',
                    type: 'error',
                    timeout: '1000'
                });  
            }
         });
      }
    }); 
// change priority of task to DOWN    
    $('body').on('click', '.down_task', function(e){
      e.preventDefault();
      var container_tasks=$(this).closest('.container_tasks');
      var task=$(this).closest('.task');
      var id_task=task.attr('id').replace(/[^0-9]/gim,'');
      if (parseInt(task.attr('priority'))>1){
         var priority_new=parseInt(task.attr('priority'))-1;
         var after_li=container_tasks.find($('[priority = '+priority_new+']'));
         $.ajax({
            data: {priority:priority_new},
            url: '/task/edit/'+id_task,
            method: 'post',
            success: function (data) {
                if (data){ 
                    var result_data = $.parseJSON(data);
                    var result_errors = false;
                    $.each(result_data, function(index, value){
                        if (value.replace(/\:.*/, '')=='Error'){
                            result_errors = true;
                            noty({
                                text: value,
                                type: 'error',
                                timeout: '1000'
                            }); 
                        }
                    });
                    if (!result_errors){
                        after_li.after(task);
                        after_li.attr('priority', (priority_new+1));     
                        task.attr('priority', priority_new);  
                    }
                }
            },
            error: function(){
                noty({
                    text: 'Can not change priority!',
                    type: 'error',
                    timeout: '1000'
                });  
            }
         });
      }
    }); 
// get tasks of project   
    $('body').on('click', '.project .div_project_container, .project .project_icon', function(){
          var container_tasks_id=$(this).closest('.container_tasks').attr('id');
          var project_tr=$(this).closest('.project');
          var id_project=container_tasks_id.replace(/[^0-9]/gim,'');
          if (!$("div").is("#container_tasks_"+id_project+" .add_task")){
            $.post("/projects/"+id_project, {}, function (data){
                project_tr.after(data);
            });
          } else {
            $("#"+container_tasks_id+" .task, #"+container_tasks_id+" .add_task").remove();
          }
    });  
// log in button
    $('body').on('click', '.submit-button, .reg-button', function(e){
      e.preventDefault();
      var enter_form=$(this).closest('form');
      var class_button=$(this).attr('class');
      if (class_button=='reg-button'){
        var text_url='/user/register';   
      }else{
        var text_url='/user/login';  
      }
         $.ajax({
            data: enter_form.serialize(),
            url: text_url,
            method: 'post',
            success: function (data) {
                if (data){ 
                    var result_data = $.parseJSON(data);
                    var result_errors = false;
                    $.each(result_data, function(index, value){
                        if (value.replace(/\:.*/, '')=='Error'){
                            result_errors = true;
                            noty({
                                text: value,
                                type: 'error',
                                timeout: '3000'
                            });
                            $('#'+index).css('border-color','red');
                        }
                    });
                    if (!result_errors){
                        $.post("/projects", {}, function (data){
                            $('.head_div').after(data);
                            $('.form-container').remove();
                            if (class_button=='reg-button'){
                                noty({
                                    text: 'You have successfully registered!',
                                    type: 'success',
                                    timeout: '1000'
                                }); 
                            }
                        });
                    }
                }
            },
            error: function(){
                noty({
                    text: 'Can not enter!',
                    type: 'error',
                    timeout: '2000'
                });  
            }
         });
    }); 
// log out
    $('body').on('click', '#log_out', function(e){
        e.preventDefault();
        $.post("/user/logout", {}, function (){
            $('.main_div').remove();
            $('.menu').remove();
            $.post("/views/user/login.php", {}, function (data){
                $('.head_div').after(data);
            });
        });
    }); 
// cancel red border of wrong data input   
    $('body').on('keyup input', '.form-field', function(){
        $(this).css('border-color', '#c9b7a2');
    });
    
}); 
