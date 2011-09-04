<?php 
require_once "include/LoremIpsum.class.php";
require_once "include/helpers.php";

$gen = new LoremIpsumGenerator;

$paint_tiles = getBgTileImages("comps" . DIRECTORY_SEPARATOR . "paint");
$paper_tiles = getBgTileImages("comps" . DIRECTORY_SEPARATOR . "wallpaper");
$carpentry_tiles = getBgTileImages("comps" . DIRECTORY_SEPARATOR . "carpentry");
$misc_tiles = getBgTileImages("comps" . DIRECTORY_SEPARATOR . "misc");

$tiles = array_merge($paint_tiles, $paper_tiles, $carpentry_tiles, $misc_tiles);
shuffle($tiles);
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
          <li class="active"><a href="index.php">Home</a></li>
          <li><a href="gallery.php">Gallery</a></li>
          <li><a href="about.php">About</a></li>
          <li><a href="contact.php">Contact</a></li>          
        </ul>
      </div>
      <div id="content">
        <div id="bg-grid">
          <ul>
            <?php foreach($tiles as $idx=>$i): ?>
            <li id="img-<?php echo $idx+1;?>" rel="<?php echo getTileCategory($i);?>">
              <img src="<?php echo $i;?>" />
              <img src="<?php echo getBWPath($i);?>" class="bw" />
            </li>
            <?php endforeach; ?>
          </ul>
        </div>
      </div>    
    </div>
  </body>
  <div id="fb-root"></div>
  <script src="http://connect.facebook.net/en_US/all.js#appId=171421066267048&amp;xfbml=1"></script>  
</html>
