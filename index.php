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
          <li class="active"><a href="#">Home</a></li>
          <li><a href="services.php">Services</a></li>
          <li><a href="about.php">About</a></li>
          <li><a href="contact.php">Contact</a></li>          
        </ul>
      </div>
      <div id="content">
        <div class="container">
          <div id="left">
              <p>left</p>
          </div>
          <div id="right">
              <p>right</p>
          </div>                    
          <div id="gallery">
            <img src="images/is-entry.jpg" alt="" />
            <img src="images/is-exterior.jpg" alt="" />
            <img src="images/is-house.jpg" alt="" />
            <img src="images/is-kitchen.jpg" alt="" />
            <img src="images/is-living-room.jpg" alt="" />
            <img src="images/is-sinks.jpg" alt="" />
            <img src="images/is-sky.jpg" alt="" />
            <img src="images/is-ceiling.jpg" alt="" />
          </div>
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
