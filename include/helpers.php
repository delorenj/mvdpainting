<?php
ob_start();
require_once dirname(__FILE__) . '/firephp/fb.php';

function fbe($msg) {
  fb($msg);
  error_log($msg);
}

switch($_SERVER["HTTP_HOST"]){
    case 'localhost':
        define("IMAGE_PATH", "/mvdpainting/images/");
        define("IMAGE_URL", "http://localhost/mvdpainting/images/");
        break;
    case 'stage.mvdpainting.com':
        define("IMAGE_PATH", "/home3/mvdpaint/public_html/stage/images/");
        define("IMAGE_URL", "http://stage.mvdpainting.com/images/");
        fbe(getcwd());
        break;      
    case 'mvdpainting.com':
    default:
        define("IMAGE_PATH", "/home3/mvdpaint/public_html/images/");
        define("IMAGE_URL", "http://mvdpainting.com/images/");
        fbe(getcwd());
        break;            
}

function getExtension($str) {
  $i = strrpos($str,".");
  if (!$i) { return ""; }
  $l = strlen($str) - $i;
  $ext = substr($str,$i+1,$l);
  return $ext;
}

function getBgTileImages($dir) {  
  $images = array();
  $dircomp = explode(DIRECTORY_SEPARATOR, $dir);
  $basepath = getcwd(). DIRECTORY_SEPARATOR . "images" . DIRECTORY_SEPARATOR . $dircomp[0] . DIRECTORY_SEPARATOR . $dircomp[1];
  if (is_dir($basepath)) {
    if ($dh = opendir($basepath)) {
      while (($file = readdir($dh)) !== false) {
        $fullpath = $basepath . DIRECTORY_SEPARATOR . $file;
        if((filetype($fullpath) != "dir") && ($file != ".") && ($file != "..")) {
          $images[] = preg_replace("/\\\\/", "/", IMAGE_URL . $dircomp[0] . DIRECTORY_SEPARATOR . $dircomp[1] . DIRECTORY_SEPARATOR . $file);
        }
      }
      closedir($dh);
    }
  }
  return $images;
}

function getTileCategory($path) {
  $sploded = explode("/", $path);
  return($sploded[count($sploded)-2]);
}

function getBWPath($path) {
  $bn = basename($path);
  $path = preg_replace("/" . $bn . "/", "bw/" . $bn, $path);
  return $path;
}

function getFooter() {
  $html = 
    "
     <div>
        <ul class='menu'>
        <li class='active'><a href='#'>Home</a></li>
        <li><a href='services.php'>Services</a></li>
        <li><a href='about.php'>About</a></li>
        <li><a href='contact.php'>Contact</a></li>
      </ul>    
      <p>Copyright &copy; 2011 M.V.DeLorenzo Painting & Decorating</p>      
      <!-- <p>Email: <a href='mailto:mike@mvdpainting.com'>mike@mvdpainting.com</a> Phone: 215-962-2469</p> -->
    </div>
    <div>
      <img src='images/bbb.png' height='40' alt='' />
      <img src='images/lead.png' height='40' alt='' />
    </div>";
  return $html;
}

function getHead($fonts = true) {
  $html =
  ' <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="css/reset.css" type="text/css" rel="stylesheet"></link>
    <link href="css/dot-luv/jquery.ui.css" type="text/css" rel="stylesheet"></link>    
    <link type="text/css" rel="stylesheet" href="css/orbit/orbit-1.2.3.css" />            
    <link rel="Stylesheet" href="css/ui-selectmenu.css" type="text/css"></link>
    <link href="css/default.css" type="text/css" rel="stylesheet"></link>
    <link rel="shortcut icon" href="favicon.ico"></link>
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/jquery.plugins.js"></script>
    <script type="text/javascript" src="js/signals.js"></script>
    <script type="text/javascript" src="js/crossroads.js"></script>
    <script type="text/javascript" src="js/hasher.js"></script>
    <script type="text/javascript" src="js/epc.js"></script>';
  
  if($fonts) {
    $html .= '
    <link  href="http://fonts.googleapis.com/css?family=Bangers:regular" rel="stylesheet" type="text/css" ></link>      
    <link  href="http://fonts.googleapis.com/css?family=La+Belle+Aurore:regular" rel="stylesheet" type="text/css" >
    <link  href="http://fonts.googleapis.com/css?family=Just+Another+Hand:regular" rel="stylesheet" type="text/css" >
    <link href="http://fonts.googleapis.com/css?family=Istok+Web:400,700" rel="stylesheet" type="text/css">
    <link rel="Stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/ui-darkness/jquery-ui.css" type="text/css"></link>';
  }
  
  return $html;
}


?>
