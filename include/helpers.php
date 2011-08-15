<?php

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
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui-select.js"></script>    
    <script type="text/javascript" src="js/jquery.orbit-1.2.3.js"></script>
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
