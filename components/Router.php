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
      if (preg_match("~$uriPattern~", $uri)){
        
        $internalRoute=preg_replace("~$uriPattern~", $path, $uri);
        
        $segments=explode('/',$internalRoute);
        $controllerName=ucfirst(array_shift($segments).'Controller');
        $actionName='action'.ucfirst(array_shift($segments));
        
        $parametrs=$segments;
        print_r($parametrs);
        die;

        // Require file of Class Controller
        $controllerFile=ROOT.'/controllers/'.$controllerName.'.php';
        if (file_exists($controllerFile)){
          include_once($controllerFile);
        }
        // Create object and run Action
        $controllerObject=new $controllerName;
        $result=$controllerObject->$actionName();
        if ($result!=null){
          break;
        }
      } 
    }  
        
  }
}
?>
