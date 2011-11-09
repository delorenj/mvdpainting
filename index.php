<?php 
ini_set("display_errors", "on");
require_once "include/helpers.php";

$expaint_tiles = getBgTileImages("comps" . DIRECTORY_SEPARATOR . "exterior-paint");
$inpaint_tiles = getBgTileImages("comps" . DIRECTORY_SEPARATOR . "interior-paint");
$paper_tiles = getBgTileImages("comps" . DIRECTORY_SEPARATOR . "wallpaper");
$power_tiles = getBgTileImages("comps" . DIRECTORY_SEPARATOR . "power-washing");

$tiles = array_merge($expaint_tiles, $inpaint_tiles, $paper_tiles, $power_tiles);
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
          <li><a href="#" onclick="EPC.onSectionMatch('home');">Home</a></li>
          <li><a href="#" onclick="EPC.onSectionMatch('interior-paint');">Interior Paint</a></li>
          <li><a href="#" onclick="EPC.onSectionMatch('exterior-paint');">Exterior Paint</a></li>
          <li><a href="#" onclick="EPC.onSectionMatch('wallpaper');">Wallpaper</a></li>
          <li><a href="#" onclick="EPC.onSectionMatch('power-washing');">Power Washing</a></li>
          <li><a href="#" onclick="EPC.onSectionMatch('contact');">Contact</a></li>
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
        <div id="response"></div>
        <div id="quote" class="bg-grid-form">
          <form id="quote-form" action="quote.php" method="POST">          
            <div class="form-block clearfix">
              <div class="l-form-block">
                <h1>Contact Information</h1>
              </div>
              <div class="r-form-block">
                <table>
                  <tbody>
                    <tr>
                      <td><input name="name" id="name" value="Name" type="text"></input><span class="label">Name</span></td>
                    </tr>
                    <tr>
                      <td><input name="phone" id="phone" value="Phone Number" type="text"></input><span class="label">Phone</span></td>
                    </tr>
                    <tr>
                      <td><input name="email" id="email" value="Email" type="text"></input><span class="label">Email</span></td>
                    </tr>
                  </tbody>
                </table>
                <div class="clearfix" style="position: relative; left: 30px; width: 350px; left: 30px;">
                  <div style="float:left">
                    <input type="checkbox" name="prefer-email" id="prefer-email" style="width:auto"/>I prefer email
                  </div>
                  <div style="float:right">
                    <input type="checkbox" name="prefer-phone" id="prefer-phone" style="width: auto"/>I prefer phone
                  </div>                  
                </div>
              </div>
            </div>
            <div class="form-block clearfix">
              <div class="l-form-block">
                <h1>Services</h1>
                <div class="sidenote">
                  <p style="color: #871e1d; margin-bottom: 5px;">Questions?</p>
                  <p><a href="#" onclick="EPC.onSectionMatch('contact');">Just Call Us!</a></p>
                </div>
              </div>
              <div class="r-form-block">
                <div id="service-header"></div>
                <div class="check-list" style="margin-left: 45px;">
                  <ul>
                    <li><input type="checkbox" name="exterior-painting" style="width: 50px;"/>Exterior Painting</li>
                    <li><input type="checkbox" name="interior-painting" style="width: 50px;"/>Interior Painting</li>
                    <li><input type="checkbox" name="wallpaper" style="width: 50px;"/>Wallpaper</li>
                    <li><input type="checkbox" name="wallpaper-removal" style="width: 50px;"/>Wallpaper Removal</li>
                    <li><input type="checkbox" name="power-washing" style="width: 50px;"/>Power Washing</li>
                    <li><input type="checkbox" name="other" style="width: 50px;"/>Other</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="form-block clearfix">
              <div class="l-form-block">
                <h1>Finish</h1>
              </div>
              <div class="r-form-block">
                <div id="submit-button"></div>
              </div>
            </div>            
          </form>
        </div>
        <div id="exterior-paint" class="bg-grid-copy">
          <h1>Exterior Paint</h1>
          <p>Painting the exterior of your home is one of the most effective ways to increase its value, but achieving the best results takes great care and skill. With more than 35 years of professional experience and unmatched attention to detail, M.V. DeLorenzo Painting & Decorating is eager to meet all of your exterior painting needs.</p>
          <p>Our expert craftsmen can refresh any surface, including siding, brick, masonry, and stone, and we can make your fences and trellises look tidy and new. No matter your needs, you can count on our experienced and dependable professionals to increase your property values with a flawless exterior paint job.</p>
          <div class="quote-link">
            <a href="#" onclick="EPC.onSectionMatch('quote');">Request a Quote</a>
          </div>                  
        </div>
        <div id="interior-paint" class="bg-grid-copy">
          <h1>Interior Paint</h1>
          <p>Choosing an interior paint contractor and decorator says you care about the appearance of your home and what it says about you. M.V. DeLorenzo Painting & Decorating provides your home with a finished look that says professional.</p>
          <p>Our company offers unbeatable quality and attention to details. We have more than 35 years of experience providing the best interior painting services to our customers. You can see our commitment to quality and craftsmanship in all of the small details</p>
          <div class="quote-link">
            <a href="#" onclick="EPC.onSectionMatch('quote');">Request a Quote</a>
          </div>                            
        </div>        
        <div id="wallpaper" class="bg-grid-copy">
          <h1>Wallpaper</h1>
          <p>Removing old wallpaper and applying a new wall covering requires professional experience and an artistic touch, because you want results you will be proud to live with and show off. With over 35 years experience, we are knowledgeable about every type of wall covering product and how to work with your interior surface to ensure superior quality and lasting beauty.</p>
          <p>Whether you need paper hanging or borders, or you want a more distinctive look using murals or custom graphics, you can rely on our hand-crafted detailing. You can count on us to work efficiently and neatly, respecting your time and your home.  </p>
          <div class="quote-link">
            <a href="#" onclick="EPC.onSectionMatch('quote');">Request a Quote</a>
          </div>                            
        </div>        
        <div id="power-washing" class="bg-grid-copy">
          <h1>Power Washing</h1>
          <p>Your home is a major investment, and we know you take pride in it.  Whether it’s simply time to freshen up your siding or decks, or you’re planning a major painting or staining project, power washing ensures your house is entirely clean.  We’re a long-standing community business, and we know how to get your job done right.</p>
          <p>You can rely on us to provide superior quality work, quickly but also carefully. When we’ve completed your power washing project, your house and decks will be clean, and so will the surrounding areas.</p>
          <div class="quote-link">
            <a href="#" onclick="EPC.onSectionMatch('quote');">Request a Quote</a>
          </div>                            
        </div>
      </div>
    </div>
  </body>
  <div id="fb-root"></div>
  <script src="http://connect.facebook.net/en_US/all.js#appId=171421066267048&amp;xfbml=1"></script>  
</html>
    