$(document).ready(function () {
    var max_height = 100;
    
    $('.div_tasks').on('keyup input', '.input_text', function(){
        var offset = this.offsetHeight - this.clientHeight;
        $(this).css('height', 'auto').css('height', Math.min(max_height, this.scrollHeight + offset));
    });

    $('.div_tasks').on('click', '.del', function(e){
      e.preventDefault();
      var id_form=$(this).closest('form').attr('id');
      var id_task=id_form.replace(/[^0-9]/gim,'');
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

    $('.div_tasks').on('click', '.edit', function(e){
      e.preventDefault();
      var id_form=$(this).closest('form').attr('id');
      var input_text=$("#"+id_form+" .input_text");
      input_text.prop('disabled', false);
      input_text.focus();
      $("#"+id_form+" .out_edit").hide();
      $("#"+id_form+" .in_edit").css('display','inline-block');
    });
    
    $('.div_tasks').on('click', '.cancel', function(e){
      e.preventDefault();
      var id_form=$(this).closest('form').attr('id');
      var input_text=$("#"+id_form+" .input_text");
      input_text.prop('disabled', true);
      $("#"+id_form+" .in_edit").hide();
      $("#"+id_form+" .out_edit").css('display','inline-block');
    });    
    
    $('.div_tasks').on('blur', '.input_text', function(event){
         var id_form=$(this).closest('form').attr('id');
         var input_text=$("#"+id_form+" .input_text");
         $(document).one('click', function(e) {
            var focused_element=$(e.target);
            if (focused_element.attr('class')=='save'){
               e.preventDefault();
               var id_task=id_form.replace(/[^0-9]/gim,'');
/*               $.ajax({
                  url: '/path/to/action',
                  method: 'post',
                  data: $(this).closest('form').serialize(),
                  success: function (data) {
                     if (data){ */
                        alert("Task "+id_task+" changed!");  
/*                     }
                  }
               });*/
            }
            input_text.prop('disabled', true);
            $("#"+id_form+" .in_edit").hide();
            $("#"+id_form+" .out_edit").css('display','inline-block');
         });
    });   

    $('.div_tasks').on('click', '.up_task', function(e){
      e.preventDefault();
      var parent_ul=$(this).closest('ul');
      var parent_li=$(this).closest('li');
      var kol_tasks=parent_ul.find($("li")).length;
      if (parseInt(parent_li.attr('priority'))<kol_tasks){
         var priority_new=parseInt(parent_li.attr('priority'))+1;
         var before_li=parent_ul.find($('[priority = '+priority_new+']'));
         before_li.before(parent_li);
         before_li.attr('priority', (priority_new-1));     
         parent_li.attr('priority', priority_new);
      }
    }); 
    
    $('.div_tasks').on('click', '.down_task', function(e){
      e.preventDefault();
      var parent_ul=$(this).closest('ul');
      var parent_li=$(this).closest('li');
      if (parseInt(parent_li.attr('priority'))>1){
         var priority_new=parseInt(parent_li.attr('priority'))-1;
         var after_li=parent_ul.find($('[priority = '+priority_new+']'));
         after_li.after(parent_li);
         after_li.attr('priority', (priority_new+1));     
         parent_li.attr('priority', priority_new);
      }
    }); 
   
    $(".project").click(function (){
      var id=$(this).attr("data-id");
      if ($("#div_tasks_"+id).is(':empty')){
          $.post("/projects/"+id, {}, function (data){
            $("#div_tasks_"+id).html(data);
          });
          $(".input_text").each(function() {
            $(this).css('background', 'green'); 
          });
      } else {
          $("#div_tasks_"+id).empty();
      }
      return false;
    });
}); 
