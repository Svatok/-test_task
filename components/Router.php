<?php
class Router {
  
  private $routes;
  
  public function __construct(){
    $routesPath=ROOT.'/config/routes.php';
    $this->routes=include($routesPath);
  }
  
  public function run(){
    // Take string request
      if (!empty($_SERVER['REQUEST_URI'])){
        $uri=trim($SERVER['REQUEST_URI'],'/');
      }
      
      echo $uri;
      
    // Check request in routes.php
    
    // If there is a match then determine which Controller and wich Action process request
    
    // Require file of Class Controller
    
    // Create object and run Action
    
  }
}
?>
