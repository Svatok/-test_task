$(document).ready(function () {
   
    $('.div_tasks').on('click', '.edit', function(e){
      e.preventDefault();
      id_form=$(this).closest('form').attr('id');
      alert(id_form);
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
