$(document).ready(function () {
   
   var edit_text = false;
   
    $('.div_tasks').on('click', '.edit', function(e){
      e.preventDefault();
      var id_form=$(this).closest('form').attr('id');
      //var id_task=id_form.replace(/[^0-9]/gim,'');
      var input_text=$("#"+id_form+" .input_text");
      input_text.prop('disabled', false);
      input_text.focus();
      $("#"+id_form+" .out_edit").hide();
      $("#"+id_form+" .in_edit").css('display','inline-block');
      edit_text=true;
    });
    
    $('.div_tasks').on('click', '.cancel', function(e){
      e.preventDefault();
      var id_form=$(this).closest('form').attr('id');
      var input_text=$("#"+id_form+" .input_text");
      input_text.prop('disabled', true);
      $("#"+id_form+" .in_edit").hide();
      $("#"+id_form+" .out_edit").css('display','inline-block');
    });    
    
    $('.div_tasks').on('click', '.save', function(e){
      e.preventDefault();
      var id_form=$(this).closest('form').attr('id');
      var input_text=$("#"+id_form+" .input_text");
               alert("Task changed!");              
               input_text.prop('disabled', true);
               $("#"+id_form+" .in_edit").hide();
               $("#"+id_form+" .out_edit").css('display','inline-block');
/*     $.ajax({
         url: '/path/to/action',
         method: 'post',
         data: $(this).closest('form').serialize(),
         success: function (data) {
            if (data){ */

/*            }
         }
      });*/
    });       
    
    $('.div_tasks').on('blur', '.input_text', function(event){
      var focused_element;   
         $(document).one('click', function(e) {
            focused_element=$(e.target);
         });
      var id_form=$(this).closest('form').attr('id');
      alert (focused_element.attr('class'));
      
      if (focused_element==$("#"+id_form+" .save")){
         alert ('=');
      }
/*      var id_form=$(this).closest('form').attr('id');      
      $(this).prop('disabled', true);
      $("#"+id_form+" .in_edit").hide();
      $("#"+id_form+" .out_edit").css('display','inline-block');*/
    });   
    
    $(".project").click(function (){
      var id=$(this).attr("data-id");
      if ($("#div_tasks_"+id).is(':empty')){
          $.post("/projects/"+id, {}, function (data){
            $("#div_tasks_"+id).html(data);
          });
      } else {
          $("#div_tasks_"+id).empty();
      }
      return false;
    });
}); 
