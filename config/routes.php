<?php

return array (
  'project/add' => 'projects/add',
  'task/add' => 'tasks/add',
  'project/text/([0-9]+)' => 'projects/text/$1',
  'task/text/([0-9]+)' => 'tasks/text/$1',
  'task/edit/([0-9]+)' => 'tasks/edit/$1',
  'project/edit/([0-9]+)' => 'projects/edit/$1',
  'projects/([0-9]+)' => 'tasks/tasks/$1',
  'projects' => 'projects/projects',
  'user/register' => 'user/register',
  'user/login' => 'user/login',
  'user/logout' => 'user/logout',
  'page404' => 'page404/index',
  '' => 'projects/index',
);

?>
