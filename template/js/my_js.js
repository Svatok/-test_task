$(document).ready(function () {
    var allowedStatuses=[0,1,2]; // 0 - In work, 1 - Done, 2 - Delete
    var before_edit;
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
    function editableTextBlurred(textarea, save) {
        var html = $(textarea).val();
        var viewableText = $('<div class="div_task_text">');
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
    $('.container_tasks').on('keyup input', '.input_text', function(){
        var offset = this.offsetHeight - this.clientHeight;
        $(this).css('height', 'auto').css('height', this.scrollHeight+offset);
    });
// delete task
    $('.container_tasks').on('click', '.del', function(e){
      e.preventDefault();
      var task_box=$(this).closest('tr');
      var id_task_attr=task_box.attr('id');
      var id_task=id_task_attr.replace(/[^0-9]/gim,'');
      noty({
    	text: 'Do you want to delete task?',
    	buttons: [
    	//	addClass: 'btn btn-primary', 
    		{text: 'Ok', onClick: function($noty) {
                /*    $.ajax({
                        data: {status:"2"},
                        url: '/task/edit/'+id_task,
                        method: 'post',
                        success: function (data) {
                            if (data){ 
                                var result_data = $.parseJSON(data);
                                var result_errors = false;
                                $.each(result_data, function(index, value){ */
                      //              if (value.replace(/\:.*/, '')=='Error'){
                     /*                   result_errors = true;
                                        var n = noty({
                                            text: 'Task not deleted!',
                                            type: 'error',
                                            timeout: '1000'
                                        }); 
                                    }
                                });
                                if (!result_errors){*/
                                    task_box.remove();
                                    $noty.close();
                                    noty({
                                        text: 'Task deleted!',
                                        type: 'success',
                                        timeout: '1000'
                                    }); 
                       /*         }
                            }
                        },
                        error: function(data){
                            var n = noty({
                                text: 'Task not deleted!',
                                type: 'error',
                                timeout: '1000'
                            });     
                        }
                    });     */
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
    $('.container_tasks').on('click', '.task_status', function(){
      var id_task_attr=$(this).closest('tr').attr('id');
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
                            var n = noty({
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
    $('.container_tasks').on('click', '.edit', function(e){
      e.preventDefault();
      var id_task_attr=$(this).closest('tr').attr('id');
      before_edit=$("#"+id_task_attr+" .div_task_text").text();
      var div_text=$("#"+id_task_attr+" .div_task_text");
      divClicked(div_text);
      $("#"+id_task_attr+" .out_edit").hide();
      $("#"+id_task_attr+" .in_edit").css('display','inline-block');
    });
// cancel edit mode of text of task or project
    $('.container_tasks').on('click', '.cancel', function(e){
      e.preventDefault();
    });   
// lost focus after add task (cancel or save)   
    $('.container_tasks').on('blur', '.add_task_input input', function(event){
      var id_task_attr=$(this).closest('tr').attr('id');
      var textarea_text=$(this);
      var task_text=textarea_text.val();
         $(document).one('click', function(e) {
            var focused_element=$(e.target);
            if (focused_element.attr('class')=='save_add'){
               var errors = new Array();
               var successes = new Array();
               e.preventDefault();
/*               $.ajax({
                  url: '/path/to/action',
                  method: 'post',
                  data: $(this).closest('form').serialize(),
                  success: function (data) {
                     if (data){ */
                        //var result = jQuery.parseJSON( data );
                        var container_tasks=textarea_text.closest('table');
                        var priority_new=(container_tasks.find($("tr.task")).length)+1;
                        var before_li=container_tasks.find($('[priority = '+(priority_new-1)+']'));
                        var insert_task='<tr priority="'+priority_new+'" class="task" id="new">'+   
                                            '<td class="div_check"><input type="checkbox"></td>'+
                                            '<td class="div_task_container"><div class="div_task_text">'+task_text+'</div></td>'+
                                            '<td class="div_edit_buttons">'+
                                                '<div class="out_edit">'+
                                                  '<a href="" class="up_task">Up</a> '+
                                                  '<a href="" class="down_task">Down</a> '+
                                                  '<a href="" class="edit">Edit</a> '+
                                                  '<a href="" class="del">Del</a> '+
                                                '</div>'+
                                                '<div class="in_edit">'+
                                                  '<a href="" class="save">Save</a> '+
                                                  '<a href="" class="cancel">Cancel</a> '+
                                                '</div>'+
                                            '</td>'+
                                        '</tr>';
//                        var new_task_tr = $('<tr></tr>');
                        before_li.before(insert_task);
//                        new_task_tr.prop('class','task');
//                        new_task_tr.prop('priority', priority_new);
                        //container_tasks.find($('[priority = '+priority_new+']').css('min-height','50px');
                        alert("Task "+"new"+" add!");
/*                     }
                  }
               });*/
            }
            $(textarea_text).val('');
         });
    });   
// lost focus after edit task (cancel or save)       
    $('.container_tasks').on('blur', '.input_text', function(event){
      var id_task_attr=$(this).closest('tr').attr('id');
      var textarea_text=$("#"+id_task_attr+" .input_text");
         $(document).one('click', function(e) {
            var focused_element=$(e.target);
            if (focused_element.attr('class')=='save'){
               e.preventDefault();
               var id_task=id_task_attr.replace(/[^0-9]/gim,'');
               if (checkText(textarea_text.val())){
                 if (textarea_text.val()!=before_edit){
                       $.ajax({
                          data: {name:textarea_text.val()},
                          url: '/task/edit/'+id_task,
                          method: 'post',
                          success: function (data) {
                             if (data){ 
                                var result_data = $.parseJSON(data);
                                var result_errors = false;
                                $.each(result_data, function(index, value){
                                    if (value.replace(/\:.*/, '')=='Error'){
                                        result_errors = true;
                                        var n = noty({
                                            text: value,
                                            type: 'error',
                                            timeout: '1000'
                                        }); 
                                    }else{
                                        var n = noty({
                                            text: value,
                                            type: 'success',
                                            timeout: '1000'
                                        }); 
                                    }
                                });
                                if (result_errors){
                                    editableTextBlurred(textarea_text, false);    
                                }else{
                                    editableTextBlurred(textarea_text, true);
                                }
                             }
                          },
                          error: function(){
                            editableTextBlurred(textarea_text, false);  
                          }
                       });
                 }
               }else{
                    var n = noty({
                        text: 'Invalid text of task!',
                        type: 'error',
                        timeout: '1000'
                    });                    
                    editableTextBlurred(textarea_text, false);
               }   
            }else{
               editableTextBlurred(textarea_text, false);
            }
            $("#"+id_task_attr+" .in_edit").hide();
            $("#"+id_task_attr+" .out_edit").css('display','inline-block');
         });
    });   
// change priority of task to UP
    $('.container_tasks').on('click', '.up_task', function(e){
      e.preventDefault();
      var container_tasks=$(this).closest('table');
      var task=$(this).closest('tr');
      var id_task=task.attr('id').replace(/[^0-9]/gim,'');
      var kol_tasks=container_tasks.find($("tr.task")).length;
      alert(kol_tasks);
      if (parseInt(task.attr('priority'))<kol_tasks){
         alert (task.attr('priority')+' < '+kol_tasks);
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
                        }else{
                            noty({
                                text: value,
                                type: 'success',
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
    $('.container_tasks').on('click', '.down_task', function(e){
      e.preventDefault();
      var container_tasks=$(this).closest('table');
      var task=$(this).closest('tr');
      if (parseInt(task.attr('priority'))>1){
         var priority_new=parseInt(task.attr('priority'))-1;
         var after_li=container_tasks.find($('[priority = '+priority_new+']'));
         after_li.after(task);
         after_li.attr('priority', (priority_new+1));     
         task.attr('priority', priority_new);
      }
    }); 
// get tasks of project   
    $(".project").click(function (e){
          e.preventDefault();
          var id=$(this).attr("data-id");
          if ($("#container_tasks_"+id).is(':empty')){
            $.post("/projects/"+id, {}, function (data){
                $("#container_tasks_"+id).html(data);
 //               $(".input_text").each(function() {
  //                 $(this).trigger('keyup');
//                });
            });
          } else {
            $("#container_tasks_"+id).empty();
          }

    });
    
}); 
