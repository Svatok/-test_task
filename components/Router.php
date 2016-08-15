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

        // Require file of Class Controller
        $controllerFile=ROOT.'/controllers/'.$controllerName.'.php';
        if (file_exists($controllerFile)){
          include_once($controllerFile);
        }else{
          Router::ErrorPage404();
        }
        // Create object and run Action
        $controllerObject=new $controllerName;
        //$result=call_user_func_array(array($controllerObject, $actionName), $parametrs);
        if(method_exists($controllerObject, $actionName)){
          $result=$controllerObject->$actionName($parametrs);
          if ($result!=null){
            break;
          }
        }else{
          Router::ErrorPage404();
        }
      } 
    }  
        
  }

  public static function ErrorPage404(){
    	$host = 'https://'.$_SERVER['HTTP_HOST'].'/';
   	header('HTTP/1.1 404 Not Found');
//	header("Status: 404 Not Found");
	header('Location:'.$host.'page404');
	//header('Location: '.ROOT.'/404');
  }
}
?>
