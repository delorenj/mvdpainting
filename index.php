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
<!--        <span class="title">M.V.D.</span>-->
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
            <p><span class="em">I</span>n business for over 40 years, exquisite craftsmanship and unmatched quality.</p><br />
            <p><span class="em"><?php echo $gen->getContent(1, "plain");?></span> <?php echo $gen->getContent(12, "plain");?></p>
          </div>
          <div id="right">
            <p>Schedule a free estimate</p>            
              <div class="field">
                <label>What do you need done?</label><br />
                <select name="services">
                  <option>--Choose a Service--</option>
                  <option>Interior Painting</option>
                  <option>Exterior Painting</option>
                  <option>Wallpaper Removal</option>
                  <option>Wallpaper Hanging</option>                  
                  <option>Carpentry</option>
                </select>
              </div>
              <div class="field">
                <label>When are you free?</label><br />
                <input type="text" name="date" />
              </div>              
              <div class="field">
                <label>What's your name?</label><br />
                <input type="text" name="name" />
              </div>                            
              <div class="field">
                <label>How should we contact you?</label>
                <select name="contact">                  
                  <option selected>--Choose a Method--</option>                  
                  <option>Phone</option>
                  <option>Email</option>                  
                </select>
              </div>
              <div style="display:none" class="field" id="phone">
                <label>Phone</label><br />
                <input type="text" name="phone"></input>
              </div>
              <div style="display:none" class="field" id="email">
                <label>Email</label><br />
                <input type="text" name="email"></input>
              </div>              
              <button id="submit">Schedule me!</button>            
          </div>                    
          <div id="gallery">
            <img src="images/is-entry.jpg" alt="" />
            <img src="images/is-exterior.jpg" alt="" />
            <img src="images/is-house.jpg" alt="" />
            <img src="images/is-kitchen.jpg" alt="" />
            <img src="images/is-living-room.jpg" alt="" />
            <img src="images/is-sinks.jpg" alt="" />
          </div>
        </div>
        <div id="flash">
          <h1>Thank you for your request!</h1>
          <p>We will be in touch with you shortly to confirm your appointment.</p>
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
