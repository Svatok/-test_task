<?php

// FRONT CONTROLLER

// 1. General settings
ini_set('display_errors','Off');
error_reporting(E_ERROR);

session_start();

// 2. Connecting system files
define('ROOT',dirname(__FILE__));
require_once(ROOT.'/components/Autoload.php');

// 3. Call Router
$router=new Router();
$router->run();

?>
