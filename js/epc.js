EPC = function() {
  var _tilesPerRow = 4;
  
  return {
    swapTiles : function(a,b) {      
      console.log("swap: " + a + ":" + b);
      $("#img-" + a).swap({
        target: "img-" + b,
        opacity: "0.5",
        speed: 1000,
        queue: false
      })
//      var t1 = $("#img-" + a + " img");
//      var t2 = $("#img-" + b + " img");
//      $(t1).css("position", "absolute");
//      $(t2).css("position", "absolute");
//      var t1p = $(t1).offset();
//      var t2p = $(t2).offset();
//      var t1x = t1p.left;
//      var t1y = t1p.top;
//      var t2x = t2p.left;
//      var t2y = t2p.top;
//      
//      console.log(t1x + " : " + t1y);
//      $(t1).animate({
//        top: t2y,
//        left: t2x
//      }, {
//        duration: 1000,
//        queue: false
//      });
//
//      $(t1).closest("li").animate({
//        top: t2y,
//        left: t2x
//      }, {
//        duration: 1000,
//        queue: false
//      });
//
//      $(t2).animate({
//        top: t1y,
//        left: t1x
//      }, {
//        duration: 1000,
//        queue: false
//      });
//
//      $(t2).closest("li").animate({
//        top: t1y,
//        left: t1x
//      }, {
//        duration: 1000,
//        queue: false
//      });
    },
    
    tilesPerRow : function() {
      return _tilesPerRow;
    },
    
    centerTiles : function() {
      var windowWidth = $(window).width();
      var tileWidth = 250;
      _tilesPerRow = Math.floor(windowWidth / tileWidth);
//      console.log("window width=" + windowWidth);
//      console.log("tilesPerRow=" + _tilesPerRow);
//      console.log("grid width=" + _tilesPerRow * tileWidth);
      $("#grid-container").css("width", _tilesPerRow * tileWidth);
    },
    
    init : function() {
      $("#banner-menu li[class!='active'] a").hover(function(e){
          $(this).css("color", "#ffffff").parent().css("background-color", "#141414");
      }, function(e) {
          $(this).css("color", "#e7e7e7").parent().css("background-color", "#0b0b0b");
      });     
      
      $('#gallery').orbit({
       animation: 'fade',
       animationSpeed: 800,
       timer: true,
       advanceSpeed: 4000,
       pauseOnHover: false,
       startClockOnMouseOut: true,
       startClockOnMouseOutAfter: 1000,
       directionalNav: false,
       captions: false,
       captionAnimation: 'slideOpen',
       captionAnimationSpeed: 800,
       bullets: false,
       bulletThumbs: false,
       bulletThumbLocation: 'images/thumbs/'
      });      
      
      $(".timer").hide();
      $("select").selectmenu();
      $("input[name='date']").datepicker();
      $(".ui-datepicker").css("display", "none");
      $("button").button();
      $("select[name='contact']").bind("change", function() {
        switch($(this).val()) {
          case "Phone" :
            $("#email").slideUp("slow", function() {
              $("#phone").slideDown("slow");
            });
            break;
            
          case "Email" :
            $("#phone").slideUp("slow", function() {
              $("#email").slideDown("slow");
            });
            break;     
          
          default :
            $("#phone, #email").slideUp("slow");
        }
      });   
      $("#submit").click(function() {
        $("#flash").slideDown("fast", function() {
          setTimeout(function() {
            $("#flash").fadeOut("slow");
          },2000);
        })
      })
      $("#contact-middle").fadeIn("slow");
    }
  }

}();

jQuery(document).ready(function() {
  EPC.init();
  EPC.centerTiles();
  
  $(window).resize(function() {
    EPC.centerTiles();
  });
  
  $("img.bw")
    .hover(function() {
    $(this).stop().animate({"opacity": "0"}, "slow");
  }, function() {
    var cat = $(this).closest("li").attr("rel");
    $("li[rel='" + cat + "'] img.bw").stop().animate({"opacity": "1"}, "slow");
  })
    .click(function() {
      var cat = $(this).closest("li").attr("rel");
      $("li[rel='" + cat + "'] img.bw")
        .stop()
        .animate(
          {
            "opacity": "0"
          },
          {
            duration: 1000
          }
        );
      setTimeout(function() {
        var idx=1;
        var swappers = new Array();
        $("li[rel='" + cat + "']").each(function(){
          var num = $(this).attr("id").split("-")[1]
          if(parseInt(num) > EPC.tilesPerRow()) {
            swappers.push(parseInt(num));
          }
        });

        for(var i=1; i<=EPC.tilesPerRow(); i++) {
          if($("#img-" + i).closest("li").attr("rel") == cat) continue;
          EPC.swapTiles(i, swappers.pop());
        }
      }, 1500);      
    });
  
  $("#next-service").click(function() {
    $("span.current").each(function() {
      $(this).removeClass("current").animate({
        top: "-=30px",
        opacity: 0
      },{
        duration: 500,
        complete: function() {
          $(this).addClass("gone").next().fadeIn("slow", function() {
            $(this).addClass("current");          
          })
        }
      })
    })
    
    $("p.current").each(function() {
      $(this).removeClass("current").animate({
        top: "-=30px",
        opacity: 0
      },{
        duration: 500,
        complete: function() {
          $(this).addClass("gone").next().fadeIn("slow", function() {
            $(this).addClass("current");          
          })
        }
      })
    })    
  })
});