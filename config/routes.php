<?php
return array (
  'task/edit/([0-9]+)' => 'task/edit/$1',
  'projects/([0-9]+)' => 'projects/tasks/$1',
  'projects' => 'projects/index',
  'user/register' => 'user/register',
  'user/login' => 'user/login',
  'user/logout' => 'user/logout',
  '' => 'projects/index', //actionIndex in ProjectsController
);
?>
