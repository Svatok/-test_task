<?php
return array (
  'projects/([0-9]+)' => 'projects/tasks/$1',
  'projects' => 'projects/index',
  'user/register' => 'user/register',
  'user/login' => 'user/login',
  '' => 'projects/index', //actionIndex in ProjectsController
);
?>
