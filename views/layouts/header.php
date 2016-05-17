<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Projects</title>
<link href="template/css/style.css" rel="stylesheet" type="text/css" />
<script src="template/js/jquery.js"></script>
<script>
$(document).ready(function () {
    $(".project").click(function (){
      var id=$(this).attr("data-id");
      if ($("#div_tasks_"+id).html()=""){
          $.post("/projects/"+id, {}, function (data){
            $("#div_tasks_"+id).html(data);
          });
      }else{
          $("#div_tasks_"+id).empty();
      }
      return false;
    });
}); 
</script>
</head>

<body>
