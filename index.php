<?php

// FRONT CONTROLLER

// 1. General settings
ini_set('display_errors',1);
error_reporting(E_ALL);

// 2. Connecting sustem files
define('ROOT',dirname(_FILE_));
require_once(ROOT.'/components/Router.php');

// 3. Connect to DB

// 4. Call Router
$router=new Router();
$router->run();

?>
