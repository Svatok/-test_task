$(document).ready(function () {
   
    $('.div_tasks').on('click', '.edit', function(e){
      e.preventDefault();
      var id_form=$(this).closest('form').attr('id');
      //var id_task=id_form.replace(/[^0-9]/gim,'');
      alert($("#"+id_form+" .input_text").attr('value'));
      
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
