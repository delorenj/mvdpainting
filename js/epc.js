EPC = function() {
  var _tilesPerRow = 6;
  var _copy = "";
  
  return {
  //handle hash changes
    onSectionMatch : function(section) {
      console.log("Initializing Section: " + section);
      if(section == "home") {
        EPC.shuffleTiles();
      } else if(section == "quote") {
        EPC.initQuote();
      } else if(section == "contact") {
        alert("contact");
      } else {
        $("li[rel='" + section + "']:first img.bw").click();
      }      
    },
    
    hashChange : function(newHash, oldHash){
      console.log("New Hash: " + newHash);
    },
  
    getCopy : function() {
      return _copy
    },
    
    setCopy : function(x) {
      _copy = x
    },
    
    swapTiles : function(a,b, duration) {
      var t1 = $("#img-" + a);
      var t2 = $("#img-" + b);
      var t1p = $(t1).offset();
      var t2p = $(t2).offset();
      var t1x = t1p.left;
      var t1y = t1p.top;
      var t2x = t2p.left;
      var t2y = t2p.top;
      duration = duration || 1200;
      
      var direction_primary_y = '-';
      var direction_secondary_y = '-';
      if (t1y<=t2y) { 
        direction_primary_y = '+'; 
        total_y = t2y-t1y;
      }else{ 
        var total_y = t1y-t2y;
      }
      if (direction_primary_y=='-') {
        direction_secondary_y='+';
      }else{
        direction_secondary_y='-';
      }

      var direction_primary_x = '-';
      var direction_secondary_x = '-';
      if (t1x<=t2x) { // if primary left of secondary 
        direction_primary_x = '+'; 
        total_x = t2x-t1x;
      }else{ // if primary below secondary 
        total_x = t1x-t2x;
      }
      if (direction_primary_x=='-') {
        direction_secondary_x='+';
      }else{
        direction_secondary_x='-';
      }

      $(t1).animate({
        top: direction_primary_y+"="+(total_y)+"px",
        left: direction_primary_x+"="+(total_x)+"px"
      }, {
        duration: duration,
        easing: "easeInOutExpo",
        complete: function() {
          var t1id = $(t1).attr("id");
          var t2id = $(t2).attr("id");
          $(t1).attr({
            id: t2id
          });
          $(t2).attr({
            id: t1id
          });                    
        },
        queue: false
      });

      $(t2).animate({
        top: direction_secondary_y+"="+(total_y)+"px",
        left: direction_secondary_x+"="+(total_x)+"px"
      }, {
        duration: duration,
        easing: "easeInOutExpo",
        queue: false
      });
    },
    
    tilesPerRow : function() {
      return _tilesPerRow;
    },
    
    centerTiles : function() {
      var windowWidth = $(window).width();
      var tileWidth = 250;
      _tilesPerRow = Math.floor(windowWidth / tileWidth) > 6 ? 6 : Math.floor(windowWidth / tileWidth);
      $("#bg-grid").css("width", _tilesPerRow * tileWidth);
    },
    
    shuffleTiles : function() {
      var cat = "home";
      hasher.setHash(cat);
      $(".bg-grid-copy").fadeOut("slow");
      EPC.setCopy(cat);
      $("li img.bw").stop().animate({"opacity": "1"}, "slow");
      $("#bg-grid li").stop().animate(
        {
          "opacity": "1"
        },
        {
          duration: 750
        }
      );                
      setTimeout(function() {
        var arr = [];
        var max = 25;
        while(arr.length < EPC.tilesPerRow()){
          var randomnumber=Math.ceil(Math.random()*max)
          var found=false;
          for(var i=0;i<arr.length;i++){
            if(arr[i]==randomnumber){found=true;break}
          }
          if(!found)arr[arr.length]=randomnumber;
        }        
        for(var i=0; i<arr.length; i+=2) {
          EPC.swapTiles(arr[i], arr[i+1], 1000+(i*100));
        }
      }, 1000);
    },

    initQuote : function() {
      var cat = "quote";
      hasher.setHash(cat);
      $(".bg-grid-copy").fadeOut("slow");
      EPC.setCopy(cat);
      $("li img.bw").stop().animate({"opacity": "1"}, "slow");
      $("#bg-grid li").stop().animate(
        {
          "opacity": "0.1"
        },
        {
          duration: 750
        }
      );                
      setTimeout(function() {
        $("#quote").fadeIn("slow");
      }, 1000);
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
  
  $('input[type="text"]').addClass("idleField");
	$('input[type="text"]').focus(function() {
		$(this).removeClass("idleField").addClass("focusField");
      if (this.value == this.defaultValue){
        this.value = '';
      }
      if(this.value != this.defaultValue){
        this.select();
      }
    $(this).parent().find("span").animate({
      left: "0px"
    });
  });
  
  $('input[type="text"]').blur(function() {
    $(this).removeClass("focusField").addClass("idleField");
    if ($.trim(this.value) == ''){
      this.value = (this.defaultValue ? this.defaultValue : '');
    }
    $(this).parent().find("span").animate({
      left: "-100px"
    });
    
  });
  
  $("img.bw")
    .hover(function() {
      var cat = $(this).closest("li").attr("rel");
      if(cat == EPC.getCopy()) {
        $("li[rel='" + cat + "'] img.bw").stop().animate({"opacity": "0"}, "slow");
      } else {
        $(this).stop().animate({"opacity": "0"}, "slow");
      }
    }, function() {
      var cat = $(this).closest("li").attr("rel");
      $("li[rel='" + cat + "'] img.bw").stop().animate({"opacity": "1"}, "slow");
    })
    .click(function() {
      var cat = $(this).closest("li").attr("rel");
      hasher.setHash(cat);
      $(".bg-grid-copy").fadeOut("slow");
      EPC.setCopy(cat);
      $("li[rel='" + cat + "'] img.bw").stop().animate(
        {
          "opacity": "0"
        },
        {
          duration: 750
        }
      );        
      $("#bg-grid li").stop().animate(
        {
          "opacity": "1"
        },
        {
          duration: 750
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
          EPC.swapTiles(i, swappers.pop(), 1000+(i*100));
        }
      }, 1000);
      setTimeout(function() {
        $("#bg-grid ul li").each(function() {
          if(parseInt($(this).attr("id").split("-")[1]) <= EPC.tilesPerRow()) return 0;
          $(this).animate({
            opacity: "0.2"
          }, {
            duration: 500,
            queue: false
          }).find("img.bw").animate({
            opacity: "1"
          }, {
            duration: 750
          })
        })
      }, 3000);
      setTimeout(function() {
        var rel = $("#img-1").attr("rel");
        $(".bg-grid-copy").fadeOut();
        $("#" + rel).fadeIn("slow");
      }, 3500);
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
  crossroads.addRoute("home");
  crossroads.addRoute("quote");
  crossroads.addRoute("contact");
  crossroads.addRoute("wallpaper");
  crossroads.addRoute("interior-paint");
  crossroads.addRoute("exterior-paint");
  crossroads.addRoute("power-washing");
  crossroads.routed.add(EPC.onSectionMatch);
  hasher.initialized.add(crossroads.parse, crossroads); //parse initial hash
//  hasher.changed.add(crossroads.parse, crossroads); //parse hash changes
  hasher.init();   
});