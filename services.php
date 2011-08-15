<?php 
require_once "include/LoremIpsum.class.php";
require_once "include/helpers.php";

$gen = new LoremIpsumGenerator;
?>

<!DOCTYPE html>
<html>
  <head>
    <?php echo getHead(); ?>    
  </head>
  <body class="painting-bg">
    <div id="wrapper">
      <div id="banner">
        <img src="images/mvd_logo_100.png" alt="" />
      </div>
        <span style="float: right; color: #A5A5A5; position:relative; top:-30px;">
          <iframe src="http://www.facebook.com/plugins/like.php?app_id=171249642935162&amp;href=htttp%3A%2F%2Fwendell.jaradd.com&amp;send=false&amp;layout=standard&amp;width=450&amp;show_faces=true&amp;action=like&amp;colorscheme=dark&amp;font=arial&amp;height=80" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:40px;" allowTransparency="true"></iframe>
        </span>                        
      <div id="banner-border">
          <div id="brush"></div>
          <div id="strip"></div>
      </div>
      <div id="banner-menu">        
        <ul class="menu">
          <li><a href="index.php">Home</a></li>
          <li class="active"><a href="#">Services</a></li>
          <li><a href="about.php">About</a></li>
          <li><a href="contact.php">Contact</a></li>          
        </ul>
      </div>
      <div id="content">
        <div id="copy-container">
          <h1>
            <span class="current">Painting</span>
            <span style="display:none;">Wallpaper</span>
          </h1>
          <span>
            <a id="next-service" href="#"><img src="images/arrow-r.png" /></a>
          </span>
          <p class="current">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </p>
          <p style="display:none;">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </p>          
        </div>
      </div>    
      <div class="push"></div>           
    </div>    
<!--    <div id="page-bottom"></div>-->
    <div id="footer">
      <?php echo getFooter(); ?>
    </div>
  </body>
</html>
