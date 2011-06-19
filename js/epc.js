EPC = function() {

  return {
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
    }
  }

}();

jQuery(document).ready(function() {
  EPC.init();
});