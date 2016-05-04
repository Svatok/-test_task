<?php
class Router {
  
  private $routes;
  
  public function __construct(){
    $routesPath=ROOT.'/config/routes.php';
    $this->routes=include($routesPath);
  }
  
  
  // Returns request string
  private function getURI(){
      if (!empty($_SERVER['REQUEST_URI'])){
        return trim($_SERVER['REQUEST_URI'],'/');
      }    
  }
  
  public function run(){
    // Take string request
    $uri=$this->getURI();
      
    // Check request in routes.php
    foreach($this->routes as $uriPattern=>$path){
      echo '<br>'.$uriPattern.' -> '.$path;  
    }
    
    // If there is a match then determine which Controller and wich Action process request
    
    // Require file of Class Controller
    
    // Create object and run Action
    
  }
}
?>
