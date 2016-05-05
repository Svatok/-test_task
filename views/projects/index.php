<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Projects</title>
<link href="template/css/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
  <?php foreach ($projectsList as $projectsItem):?>
  <div>
    <h2>ID: <?php echo $projectsItem['id'];?></h2>
    <p>Project: <?php echo $projectsItem['name'];?></p>
  </div>
  <?php endforeach; ?>
</body>

</html>
