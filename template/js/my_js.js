$(document).ready(function () {
 /*   $('.div_tasks').on('click', '.edit', function(e){
      e.preventDefault();
      alert('Вы нажали на элемент "foo"');
    });*/
    $('.edit').on('click', function(){
      alert('Вы нажали на элемент "foo11"');
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