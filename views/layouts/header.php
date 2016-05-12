<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Projects</title>
<link href="template/css/style.css" rel="stylesheet" type="text/css" />
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script>
    
$(document).ready(function () {
    alert("11");
    $.(".project").click(function (event){
      event.preventDefault();
      
      var id=$(this).attr("data-id");
      alert(id);
      $.post("/projects/"+id, {}, function (data){
        $("#div_tasks_"+id).html(data);
      });
      return false;
    });
}); 
</script>
</head>

<body>
