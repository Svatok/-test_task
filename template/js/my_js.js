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
      var id_li=$(this).closest('tr').attr('id');
      var id_task=id_li.replace(/[^0-9]/gim,'');
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
      var id_li=$(this).closest('tr').attr('id');
      before_edit=$("#"+id_li+" .div_task_text").text();
      var div_text=$("#"+id_li+" .div_task_text");
      divClicked(div_text);
      $("#"+id_li+" .out_edit").hide();
      $("#"+id_li+" .in_edit").css('display','inline-block');
    });
    
    $('.container_tasks').on('click', '.cancel', function(e){
      e.preventDefault();
    });    
    
    $('.container_tasks').on('blur', '.input_text', function(event){
      var id_li=$(this).closest('tr').attr('id');
      var textarea_text=$("#"+id_li+" .input_text");
         $(document).one('click', function(e) {
            var focused_element=$(e.target);
            if (focused_element.attr('class')=='save'){
               e.preventDefault();
               var id_task=id_li.replace(/[^0-9]/gim,'');
/*               $.ajax({
                  url: '/path/to/action',
                  method: 'post',
                  data: $(this).closest('form').serialize(),
                  success: function (data) {
                     if (data){ */
                        alert("Task "+id_task+" changed!");
                        editableTextBlurred(textarea_text, true);
/*                     }
                  }
               });*/
            }else{
                editableTextBlurred(textarea_text, false);
            }
            $("#"+id_li+" .in_edit").hide();
            $("#"+id_li+" .out_edit").css('display','inline-block');
         });
    });   

    $('.container_tasks').on('click', '.up_task', function(e){
      e.preventDefault();
      var parent_ul=$(this).closest('table');
      var parent_li=$(this).closest('tr');
      var kol_tasks=parent_ul.find($("tr")).length;
      if (parseInt(parent_li.attr('priority'))<kol_tasks){
         var priority_new=parseInt(parent_li.attr('priority'))+1;
         var before_li=parent_ul.find($('[priority = '+priority_new+']'));
         before_li.before(parent_li);
         before_li.attr('priority', (priority_new-1));     
         parent_li.attr('priority', priority_new);
      }
    }); 
    
    $('.container_tasks').on('click', '.down_task', function(e){
      e.preventDefault();
      var parent_ul=$(this).closest('table');
      var parent_li=$(this).closest('tr');
      if (parseInt(parent_li.attr('priority'))>1){
         var priority_new=parseInt(parent_li.attr('priority'))-1;
         var after_li=parent_ul.find($('[priority = '+priority_new+']'));
         after_li.after(parent_li);
         after_li.attr('priority', (priority_new+1));     
         parent_li.attr('priority', priority_new);
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
