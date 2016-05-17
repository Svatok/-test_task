$(document).ready(function () {
   
    $('.div_tasks').on('click', '.edit', function(e){
      e.preventDefault();
      var id_form=$(this).closest('form').attr('id');
      //var id_task=id_form.replace(/[^0-9]/gim,'');
      var input_text=$("#"+id_form+" .input_text");
      input_text.prop('disabled', false);
      input_text.focus();
      $("#"+id_form+" .out_edit").hide();
      $("#"+id_form+" .in_edit").show();
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
