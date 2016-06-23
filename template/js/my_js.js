$(document).ready(function () {
    var before_edit;
    function divClicked(div) {
        var divHtml = $(div).html();
        var editableText = $('<textarea class="input_text"/>');
        editableText.val(divHtml);
        $(div).replaceWith(editableText);
        editableText.trigger('keyup');
        editableText.focus();
    }
    
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

    $('.container_tasks').on('keyup input', '.input_text', function(){
        var offset = this.offsetHeight - this.clientHeight;
        $(this).css('height', 'auto').css('height', this.scrollHeight+offset);
    });

    $('.container_tasks').on('click', '.del', function(e){
      e.preventDefault();
      var id_task_attr=$(this).closest('tr').attr('id');
      var id_task=id_task_attr.replace(/[^0-9]/gim,'');
/*               $.ajax({
                  url: '/path/to/action',
                  method: 'post',
                  data: $(this).closest('form').serialize(),
                  success: function (data) {
                     if (data){ */
                        alert("Task "+id_task+" deleted!");  
/*                     }
                  }
               });*/

    });   

    $('.container_tasks').on('click', '.edit', function(e){
      e.preventDefault();
      var id_task_attr=$(this).closest('tr').attr('id');
      before_edit=$("#"+id_task_attr+" .div_task_text").text();
      var div_text=$("#"+id_task_attr+" .div_task_text");
      divClicked(div_text);
      $("#"+id_task_attr+" .out_edit").hide();
      $("#"+id_task_attr+" .in_edit").css('display','inline-block');
    });
    
    $('.container_tasks').on('click', '.cancel', function(e){
      e.preventDefault();
    });    
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
    
    $('.container_tasks').on('blur', '.input_text', function(event){
      var id_task_attr=$(this).closest('tr').attr('id');
      var textarea_text=$("#"+id_task_attr+" .input_text");
         $(document).one('click', function(e) {
            var focused_element=$(e.target);
            if (focused_element.attr('class')=='save'){
               e.preventDefault();
               var id_task=id_task_attr.replace(/[^0-9]/gim,'');
               $.ajax({
                  data: {name:textarea_text.val()},
                  url: '/task/edit/'+id_task,
                  method: 'post',
                  success: function (data) {
                     if (data){ 
                        var result_data = $.parseJSON(data);
                        var result_errors = false;
                        var result_msg = '';
                        $.each(result_data, function(index, value){
                            if (value.replace(/\:.*/, '')=='Error'){
                               result_errors = true;
                               result_msg=result_msg+'<p class="error_text">'+value+'</p>';
                            }else{
                               result_msg=result_msg+'<p class="success_text">'+value+'</p>';
                            }
    //                        alert(value);
                        });
                        if (result_errors){
                            editableTextBlurred(textarea_text, false);    
                        }else{
                            editableTextBlurred(textarea_text, true);
                        }
                        var n = noty({
                            text: result_msg,
                            closeWith: ['hover'] // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
                        });
                        // вывести всплывающий див вместо алерта выше
                     }
                  }
                  error: function(){
                    editableTextBlurred(textarea_text, false);  
                  }
               });
            }else{
               editableTextBlurred(textarea_text, false);
            }
            $("#"+id_task_attr+" .in_edit").hide();
            $("#"+id_task_attr+" .out_edit").css('display','inline-block');
         });
    });   

    $('.container_tasks').on('click', '.up_task', function(e){
      e.preventDefault();
      var container_tasks=$(this).closest('table');
      var task=$(this).closest('tr');
      var kol_tasks=container_tasks.find($("tr")).length;
      if (parseInt(task.attr('priority'))<kol_tasks){
         var priority_new=parseInt(task.attr('priority'))+1;
         var before_li=container_tasks.find($('[priority = '+priority_new+']'));
         before_li.before(task);
         before_li.attr('priority', (priority_new-1));     
         task.attr('priority', priority_new);
      }
    }); 
    
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
