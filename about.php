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
  <body>
    <div id="wrapper">
      <div id="banner">
        <img src="images/mvd_logo_text.png" alt="" />
      </div>
        <span style="float: right; color: #A5A5A5; position:relative; top:-30px;">
          <fb:like href="mvdpainting.com" send="true" width="450" show_faces="false" action="recommend" colorscheme="dark" font="trebuchet ms"></fb:like>  
        </span>                        
      <div id="banner-border">
          <div id="brush"></div>
          <div id="strip"></div>
      </div>
      <div id="banner-menu">        
        <ul class="menu">
          <li><a href="index.php">Home</a></li>
          <li><a href="gallery.php">Gallery</a></li>
          <li class="active"><a href="about.php">About</a></li>
          <li><a href="contact.php">Contact</a></li>          
        </ul>
      </div>
      <div id="content">
        <div class="container">
          <div id="left">
          </div>
          <div id="right">
          </div>                    
          <div id="middle">
          </div>
        </div>
        <div id="flash">
        </div>
      </div>    
      <div class="push"></div>           
    </div>    
<!--    <div id="page-bottom"></div>-->
    <div id="footer">      
      <?php echo getFooter(); ?>
    </div>
  </body>
  <div id="fb-root"></div>
  <script src="http://connect.facebook.net/en_US/all.js#appId=171421066267048&amp;xfbml=1"></script>    
</html>
