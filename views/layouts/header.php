<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>SIMPLE TODO LISTS</title>
<link href="template/css/style.css" rel="stylesheet" type="text/css" />
<script src="template/js/jquery.js"></script>
<script src="template/js/my_js.js"></script>
<script src="template/js/noty-2.3.8/js/noty/packaged/jquery.noty.packaged.min.js"></script>
<!--<link href="template/js/jquery-ui-1.12.0.custom/jquery-ui.css" rel="stylesheet" type="text/css"/>
<script src="template/js/jquery-ui-1.12.0.custom/jquery-ui.js"></script> -->
<link type="text/css"
    href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/jquery-ui.css" rel="stylesheet" />
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>
</head>

<body>
<div id="loader"><span class="spinner"></span></div>
<div class="menu">
    <?php 
       if (isset($projectsList)){
          echo $_SESSION['email'].', <a href="" id="log_out">Log out</a>'; 
       }
    ?>
</div>
