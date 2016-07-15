<?php
return array (
  'project/add' => 'projects/add',
  'task/add' => 'tasks/add',
  'task/edit/([0-9]+)' => 'tasks/edit/$1',
  'project/edit/([0-9]+)' => 'projects/edit/$1',
  'projects/([0-9]+)' => 'projects/tasks/$1',
  'projects' => 'projects/projects',
  'user/register' => 'user/register',
  'user/login' => 'user/login',
  'user/logout' => 'user/logout',
  '' => 'projects/index', //actionIndex in ProjectsController
);
?>
