/*
 * jQuery Orbit Plugin 1.2.3
 * www.ZURB.com/playground
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/


(function($) {

    $.fn.orbit = function(options) {

        //Defaults to extend options
        var defaults = {  
            animation: 'horizontal-push', 		// fade, horizontal-slide, vertical-slide, horizontal-push
            animationSpeed: 600, 				// how fast animtions are
            timer: true, 						// true or false to have the timer
            advanceSpeed: 4000, 				// if timer is enabled, time between transitions 
            pauseOnHover: false, 				// if you hover pauses the slider
            startClockOnMouseOut: false, 		// if clock should start on MouseOut
            startClockOnMouseOutAfter: 1000, 	// how long after MouseOut should the timer start again
            directionalNav: true, 				// manual advancing directional navs
            captions: true, 					// do you want captions?
            captionAnimation: 'fade', 			// fade, slideOpen, none
            captionAnimationSpeed: 600, 		// if so how quickly should they animate in
            bullets: false,						// true or false to activate the bullet navigation
            bulletThumbs: false,				// thumbnails for the bullets
            bulletThumbLocation: '',			// location from this file where thumbs will be
            afterSlideChange: function(){} 		// empty function 
     	};  
        
        //Extend those options
        var options = $.extend(defaults, options); 
	
        return this.each(function() {
        
// ==============
// ! SETUP   
// ==============
        
            //Global Variables
            var activeSlide = 0,
            	numberSlides = 0,
            	orbitWidth,
            	orbitHeight,
            	locked;
            
            //Initialize
            var orbit = $(this).addClass('orbit'),         
            	orbitWrapper = orbit.wrap('<div class="orbit-wrapper" />').parent();
            orbit.add(orbitWidth).width('1px').height('1px');
	    	            
            //Collect all slides and set slider size of largest image
            var slides = orbit.children('img, a, div');
            slides.each(function() {
                var _slide = $(this),
                	_slideWidth = _slide.width(),
                	_slideHeight = _slide.height();
                if(_slideWidth > orbit.width()) {
	                orbit.add(orbitWrapper).width(_slideWidth);
	                orbitWidth = orbit.width();	       			
	            }
	            if(_slideHeight > orbit.height()) {
	                orbit.add(orbitWrapper).height(_slideHeight);
	                orbitHeight = orbit.height();
				}
                numberSlides++;
            });
            
            //Animation locking functions
            function unlock() {
                locked = false;
            }
            function lock() { 
                locked = true;
            }
            
            //If there is only a single slide remove nav, timer and bullets
            if(slides.length == 1) {
            	options.directionalNav = false;
            	options.timer = false;
            	options.bullets = false;
            }
            
            //Set initial front photo z-index and fades it in
            slides.eq(activeSlide)
            	.css({"z-index" : 3})
            	.fadeIn(function() {
            		//brings in all other slides IF css declares a display: none
            		slides.css({"display":"block"})
            	});
            
// ==============
// ! TIMER   
// ==============

            //Timer Execution
            function startClock() {
            	if(!options.timer  || options.timer == 'false') { 
            		return false;
            	//if timer is hidden, don't need to do crazy calculations
            	} else if(timer.is(':hidden')) {
		            clock = setInterval(function(e){
						shift("next");  
		            }, options.advanceSpeed);            		
		        //if timer is visible and working, let's do some math
            	} else {
		            timerRunning = true;
		            pause.removeClass('active')
		            clock = setInterval(function(e){
		                var degreeCSS = "rotate("+degrees+"deg)"
		                degrees += 2
		                rotator.css({ 
		                    "-webkit-transform": degreeCSS,
		                    "-moz-transform": degreeCSS,
		                    "-o-transform": degreeCSS
		                });
		                if(degrees > 180) {
		                    rotator.addClass('move');
		                    mask.addClass('move');
		                }
		                if(degrees > 360) {
		                    rotator.removeClass('move');
		                    mask.removeClass('move');
		                    degrees = 0;
		                    shift("next");
		                }
		            }, options.advanceSpeed/180);
				}
	        }
	        function stopClock() {
	        	if(!options.timer || options.timer == 'false') {return false;} else {
		            timerRunning = false;
		            clearInterval(clock);
		            pause.addClass('active');
				}
	        }  
            
            //Timer Setup
            if(options.timer) {         	
                var timerHTML = '<div class="timer"><span class="mask"><span class="rotator"></span></span><span class="pause"></span></div>'
                orbitWrapper.append(timerHTML);
                var timer = $('div.timer'),
                	timerRunning;
                if(timer.length != 0) {
                    var rotator = $('div.timer span.rotator'),
                    	mask = $('div.timer span.mask'),
                    	pause = $('div.timer span.pause'),
                    	degrees = 0,
                    	clock; 
                    startClock();
                    timer.click(function() {
                        if(!timerRunning) {
                            startClock();
                        } else { 
                            stopClock();
                        }
                    });
                    if(options.startClockOnMouseOut){
                        var outTimer;
                        orbitWrapper.mouseleave(function() {
                            outTimer = setTimeout(function() {
                                if(!timerRunning){
                                    startClock();
                                }
                            }, options.startClockOnMouseOutAfter)
                        })
                        orbitWrapper.mouseenter(function() {
                            clearTimeout(outTimer);
                        })
                    }
                }
            }  
	        
	        //Pause Timer on hover
	        if(options.pauseOnHover) {
		        orbitWrapper.mouseenter(function() {
		        	stopClock(); 
		        });
		   	}
            
// ==============
// ! CAPTIONS   
// ==============
                     
            //Caption Setup
            if(options.captions) {
                var captionHTML = '<div class="orbit-caption"></div>';
                orbitWrapper.append(captionHTML);
                var caption = orbitWrapper.children('.orbit-caption');
            	setCaption();
            }
			
			//Caption Execution
            function setCaption() {
            	if(!options.captions || options.captions =="false") {
            		return false; 
            	} else {
	            	var _captionLocation = slides.eq(activeSlide).data('caption'); //get ID from rel tag on image
	            		_captionHTML = $(_captionLocation).html(); //get HTML from the matching HTML entity            		
	            	//Set HTML for the caption if it exists
	            	if(_captionHTML) {
	            		caption
		            		.attr('id',_captionLocation) // Add ID caption
		                	.html(_captionHTML); // Change HTML in Caption 
		                //Animations for Caption entrances
		             	if(options.captionAnimation == 'none') {
		             		caption.show();
		             	}
		             	if(options.captionAnimation == 'fade') {
		             		caption.fadeIn(options.captionAnimationSpeed);
		             	}
		             	if(options.captionAnimation == 'slideOpen') {
		             		caption.slideDown(options.captionAnimationSpeed);
		             	}
	            	} else {
	            		//Animations for Caption exits
	            		if(options.captionAnimation == 'none') {
		             		caption.hide();
		             	}
		             	if(options.captionAnimation == 'fade') {
		             		caption.fadeOut(options.captionAnimationSpeed);
		             	}
		             	if(options.captionAnimation == 'slideOpen') {
		             		caption.slideUp(options.captionAnimationSpeed);
		             	}
	            	}
				}
            }
            
// ==================
// ! DIRECTIONAL NAV   
// ==================

            //DirectionalNav { rightButton --> shift("next"), leftButton --> shift("prev");
            if(options.directionalNav) {
            	if(options.directionalNav == "false") {return false;}
                var directionalNavHTML = '<div class="slider-nav"><span class="right">Right</span><span class="left">Left</span></div>';
                orbitWrapper.append(directionalNavHTML);
                var leftBtn = orbitWrapper.children('div.slider-nav').children('span.left'),
                	rightBtn = orbitWrapper.children('div.slider-nav').children('span.right');
                leftBtn.click(function() { 
                    stopClock();
                    shift("prev");
                });
                rightBtn.click(function() {
                    stopClock();
                    shift("next")
                });
            }
            
// ==================
// ! BULLET NAV   
// ==================
            
            //Bullet Nav Setup
            if(options.bullets) { 
            	var bulletHTML = '<ul class="orbit-bullets"></ul>';            	
            	orbitWrapper.append(bulletHTML);
            	var bullets = $('ul.orbit-bullets');
            	for(i=0; i<numberSlides; i++) {
            		var liMarkup = $('<li>'+(i+1)+'</li>');
            		if(options.bulletThumbs) {
            			var	thumbName = slides.eq(i).data('thumb');
            			if(thumbName) {
            				var liMarkup = $('<li class="has-thumb">'+i+'</li>')
            				liMarkup.css({"background" : "url("+options.bulletThumbLocation+thumbName+") no-repeat"});
            			}
            		} 
            		$('ul.orbit-bullets').append(liMarkup);
            		liMarkup.data('index',i);
            		liMarkup.click(function() {
            			stopClock();
            			shift($(this).data('index'));
            		});
            	}
            	setActiveBullet();
            }
            
            //Bullet Nav Execution
        	function setActiveBullet() { 
        		if(!options.bullets) {return false;} else {
	        		bullets.children('li').removeClass('active').eq(activeSlide).addClass('active');
	        	}
        	}
        	
// ====================
// ! SHIFT ANIMATIONS   
// ====================
            
            //Animating the shift!
            function shift(direction) {
        	    //remember previous activeSlide
                var prevActiveSlide = activeSlide,
                	slideDirection = direction;
                //exit function if bullet clicked is same as the current image
                if(prevActiveSlide == slideDirection) {return false;}
                //reset Z & Unlock
                function resetAndUnlock() {
                    slides
                    	.eq(prevActiveSlide)
                    	.css({"z-index" : 1});
                    unlock();
                    options.afterSlideChange.call(this);
                }
                if(slides.length == "1") {return false;}
                if(!locked) {
                    lock();
					 //deduce the proper activeImage
                    if(direction == "next") {
                        activeSlide++
                        if(activeSlide == numberSlides) {
                            activeSlide = 0;
                        }
                    } else if(direction == "prev") {
                        activeSlide--
                        if(activeSlide < 0) {
                            activeSlide = numberSlides-1;
                        }
                    } else {
                        activeSlide = direction;
                        if (prevActiveSlide < activeSlide) { 
                            slideDirection = "next";
                        } else if (prevActiveSlide > activeSlide) { 
                            slideDirection = "prev"
                        }
                    }
                    //set to correct bullet
                     setActiveBullet();  
                     
                    //set previous slide z-index to one below what new activeSlide will be
                    slides
                    	.eq(prevActiveSlide)
                    	.css({"z-index" : 2});    
                    
                    //fade
                    if(options.animation == "fade") {
                        slides
                        	.eq(activeSlide)
                        	.css({"opacity" : 0, "z-index" : 3})
                        	.animate({"opacity" : 1}, options.animationSpeed, resetAndUnlock);
                    }
                    //horizontal-slide
                    if(options.animation == "horizontal-slide") {
                        if(slideDirection == "next") {
                            slides
                            	.eq(activeSlide)
                            	.css({"left": orbitWidth, "z-index" : 3})
                            	.animate({"left" : 0}, options.animationSpeed, resetAndUnlock);
                        }
                        if(slideDirection == "prev") {
                            slides
                            	.eq(activeSlide)
                            	.css({"left": -orbitWidth, "z-index" : 3})
                            	.animate({"left" : 0}, options.animationSpeed, resetAndUnlock);
                        }
                    }
                    //vertical-slide
                    if(options.animation == "vertical-slide") { 
                        if(slideDirection == "prev") {
                            slides
                            	.eq(activeSlide)
                            	.css({"top": orbitHeight, "z-index" : 3})
                            	.animate({"top" : 0}, options.animationSpeed, resetAndUnlock);
                        }
                        if(slideDirection == "next") {
                            slides
                            	.eq(activeSlide)
                            	.css({"top": -orbitHeight, "z-index" : 3})
                            	.animate({"top" : 0}, options.animationSpeed, resetAndUnlock);
                        }
                    }
                    //push-over
                    if(options.animation == "horizontal-push") {
                        if(slideDirection == "next") {
                            slides
                            	.eq(activeSlide)
                            	.css({"left": orbitWidth, "z-index" : 3})
                            	.animate({"left" : 0}, options.animationSpeed, resetAndUnlock);
                            slides
                            	.eq(prevActiveSlide)
                            	.animate({"left" : -orbitWidth}, options.animationSpeed);
                        }
                        if(slideDirection == "prev") {
                            slides
                            	.eq(activeSlide)
                            	.css({"left": -orbitWidth, "z-index" : 3})
                            	.animate({"left" : 0}, options.animationSpeed, resetAndUnlock);
							slides
                            	.eq(prevActiveSlide)
                            	.animate({"left" : orbitWidth}, options.animationSpeed);
                        }
                    }
                    setCaption();
                } //lock
            }//orbit function
        });//each call
    }//orbit plugin call
})(jQuery);


/*!
 * jQuery Swapsie Plugin
 * Examples and documentation at: http://biostall.com/swap-and-re-order-divs-smoothly-using-jquery-swapsie-plugin
 * Copyright (c) 2010 Steve Marks - info@biostall.com
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * Version: 1 (09-JULY-2010)
 */

var swapping = false;

(function($) {
  $.fn.extend({
    swap: function(options) {
			
      var defaults = {
        target: "",
        speed: 1000,
        opacity: "1",
        callback: function() {}
      };
      var options = $.extend(defaults, options);
			
      return this.each(function() {
				
        var obj = $(this);
				
        if (options.target!="" && !swapping) {
					
          swapping = true;
					
          // set primary and secondary elements to relative if not already specified a positon CSS attribute
          var current_primary_pos = obj.css("position");
          var current_secondary_pos = $("#"+options.target).css("position");
          if (current_primary_pos!="relative" && current_primary_pos!="absolute") {
            obj.css("position", "relative");
          }
          if (current_secondary_pos!="relative" && current_secondary_pos!="absolute") {
            $("#"+options.target).css("position", "relative");
          }
          //
					
          // calculate y-axis movement
          var current_primary_position = obj.offset();
          var current_primary_top = current_primary_position.top;
          var current_secondary_position = $("#"+options.target).offset();
          var current_secondary_top = current_secondary_position.top;
          var direction_primary_y = '-';
          var direction_secondary_y = '-';
          if (current_primary_top<=current_secondary_top) { // if primary above secondary 
            var direction_primary_y = '+'; 
            var total_y = current_secondary_top-current_primary_top;
          }else{ // if primary below secondary 
            var total_y = current_primary_top-current_secondary_top;
          }
          if (direction_primary_y=='-') {
            direction_secondary_y='+';
          }else{
            direction_secondary_y='-';
          }
          //
					
          // calculate x-axis movement
          var current_primary_position = obj.offset();
          var current_primary_left = current_primary_position.left;
          var current_secondary_position = $("#"+options.target).offset();
          var current_secondary_left = current_secondary_position.left;
          var direction_primary_x = '-';
          var direction_secondary_x = '-';
          if (current_primary_left<=current_secondary_left) { // if primary left of secondary 
            var direction_primary_x = '+'; 
            var total_x = current_secondary_left-current_primary_left;
          }else{ // if primary below secondary 
            var total_x = current_primary_left-current_secondary_left;
          }
          if (direction_primary_x=='-') {
            direction_secondary_x='+';
          }else{
            direction_secondary_x='-';
          }
          //
					
          // do swapping
          obj.animate({
            opacity: options.opacity
          }, 100, function() {
            obj.animate({
              top: direction_primary_y+"="+(total_y)+"px",
              left: direction_primary_x+"="+(total_x)+"px"
            }, {
              duration: options.speed, 
              complete: function() {
                obj.animate({
                  opacity: "1"
                }, 100);
              },
              queue: false
            });
          });
          $("#"+options.target).animate({
            opacity: options.opacity
          }, 100, function() {
            $("#"+options.target).animate({
              top: direction_secondary_y+"="+(total_y)+"px",
              left: direction_secondary_x+"="+(total_x)+"px"
            }, options.speed, function() {
              $("#"+options.target).animate({
                opacity: "1"
              }, 100, function() { 
                swapping = false; // call the callback and apply the scope:
                options.callback.call(this);
              });
            });
          });
					
        }
				
      });
			
			
    }
  });
})(jQuery);


 /*
 * jQuery UI selectmenu
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */

(function($) {

$.widget("ui.selectmenu", {
    _init: function() {
        var self = this, o = this.options;
        
        //quick array of button and menu id's
        this.ids = [this.element.attr('id') + '-' + 'button', this.element.attr('id') + '-' + 'menu'];
        
        //define safe mouseup for future toggling
        this._safemouseup = true;
        
        //create menu button wrapper
        this.newelement = $('<a class="'+ this.widgetBaseClass +' ui-widget ui-state-default ui-corner-all" id="'+this.ids[0]+'" role="button" href="#" aria-haspopup="true" aria-owns="'+this.ids[1]+'"></a>')
            .insertAfter(this.element);
        
        //transfer tabindex
        var tabindex = this.element.attr('tabindex');
        if(tabindex){this.newelement.attr('tabindex', tabindex);}
        
        //save reference to select in data for ease in calling methods
        this.newelement.data('selectelement', this.element);
        
        //menu icon
        this.selectmenuIcon = $('<span class="'+ this.widgetBaseClass +'-icon ui-icon"></span>')
            .prependTo(this.newelement)
            .addClass( (o.style == "popup")? 'ui-icon-triangle-2-n-s' : 'ui-icon-triangle-1-s' );   

            
        //make associated form label trigger focus
        $('label[for='+this.element.attr('id')+']')
            .attr('for', this.ids[0])
            .bind('click', function(){
                self.newelement[0].focus();
                return false;
            }); 

        //click toggle for menu visibility
        this.newelement
            .bind('mousedown', function(event){
                self._toggle(event);
                //make sure a click won't open/close instantly
                if(o.style == "popup"){
                    self._safemouseup = false;
                    setTimeout(function(){self._safemouseup = true;}, 300);
                }   
                return false;
            })
            .bind('click',function(){
                return false;
            })
            .keydown(function(event){
                var ret = true;
                switch (event.keyCode) {
                    case $.ui.keyCode.ENTER:
                        ret = true;
                        break;
                    case $.ui.keyCode.SPACE:
                        ret = false;
                        self._toggle(event);    
                        break;
                    case $.ui.keyCode.UP:
                    case $.ui.keyCode.LEFT:
                        ret = false;
                        self._moveSelection(-1);
                        break;
                    case $.ui.keyCode.DOWN:
                    case $.ui.keyCode.RIGHT:
                        ret = false;
                        self._moveSelection(1);
                        break;  
                    case $.ui.keyCode.TAB:
                        ret = true;
                        break;  
                    default:
                        ret = false;
                        self._typeAhead(event.keyCode, 'mouseup');
                        break;  
                }
                return ret;
            })
            .bind('mouseover focus', function(){ 
                $(this).addClass(self.widgetBaseClass+'-focus ui-state-hover'); 
            })
            .bind('mouseout blur', function(){  
                $(this).removeClass(self.widgetBaseClass+'-focus ui-state-hover'); 
            });
        
        //document click closes menu
        $(document)
            .mousedown(function(event){
                self.close(event);
            });

        //change event on original selectmenu
        this.element
            .click(function(){this._refreshValue();})
            .focus(function(){this.newelement[0].focus();});
        
        //create menu portion, append to body
        var cornerClass = (o.style == "dropdown")? " ui-corner-bottom" : " ui-corner-all"
        this.list = $('<ul class="' + self.widgetBaseClass + '-menu ui-widget ui-widget-content'+cornerClass+'" aria-hidden="true" role="listbox" aria-labelledby="'+this.ids[0]+'" id="'+this.ids[1]+'"></ul>').appendTo('body');              
        
        //serialize selectmenu element options  
        var selectOptionData = [];
        this.element
            .find('option')
            .each(function(){
                selectOptionData.push({
                    value: $(this).attr('value'),
                    text: self._formatText(jQuery(this).text()),
                    selected: $(this).attr('selected'),
                    classes: $(this).attr('class'),
                    parentOptGroup: $(this).parent('optgroup').attr('label')
                });
            });     
                
        //active state class is only used in popup style
        var activeClass = (self.options.style == "popup") ? " ui-state-active" : "";
        
        //write li's
        for(var i in selectOptionData){
            var thisLi = $('<li role="presentation"><a href="#" tabindex="-1" role="option" aria-selected="false">'+ selectOptionData[i].text +'</a></li>')
                .data('index',i)
                .addClass(selectOptionData[i].classes)
                .data('optionClasses', selectOptionData[i].classes|| '')
                .mouseup(function(event){
                        if(self._safemouseup){
                            var changed = $(this).data('index') != self._selectedIndex();
                            self.value($(this).data('index'));
                            self.select(event);
                            if(changed){self.change(event);}
                            self.close(event,true);
                        }
                    return false;
                })
                .click(function(){
                    return false;
                })
                .bind('mouseover focus', function(){ 
                    self._selectedOptionLi().addClass(activeClass); 
                    self._focusedOptionLi().removeClass(self.widgetBaseClass+'-item-focus ui-state-hover'); 
                    $(this).removeClass('ui-state-active').addClass(self.widgetBaseClass + '-item-focus ui-state-hover'); 
                })
                .bind('mouseout blur', function(){ 
                    if($(this).is( self._selectedOptionLi() )){$(this).addClass(activeClass);}
                    $(this).removeClass(self.widgetBaseClass + '-item-focus ui-state-hover'); 
                });
                
            //optgroup or not...
            if(selectOptionData[i].parentOptGroup){
                var optGroupName = self.widgetBaseClass + '-group-' + selectOptionData[i].parentOptGroup;
                if(this.list.find('li.' + optGroupName).size()){
                    this.list.find('li.' + optGroupName + ':last ul').append(thisLi);
                }
                else{
                    $('<li role="presentation" class="'+self.widgetBaseClass+'-group '+optGroupName+'"><span class="'+self.widgetBaseClass+'-group-label">'+selectOptionData[i].parentOptGroup+'</span><ul></ul></li>')
                        .appendTo(this.list)
                        .find('ul')
                        .append(thisLi);
                }
            }
            else{
                thisLi.appendTo(this.list);
            }
            
            //this allows for using the scrollbar in an overflowed list
            this.list.bind('mousedown mouseup', function(){return false;});
            
            //append icon if option is specified
            if(o.icons){
                for(var j in o.icons){
                    if(thisLi.is(o.icons[j].find)){
                        thisLi
                            .data('optionClasses', selectOptionData[i].classes + ' ' + self.widgetBaseClass + '-hasIcon')
                            .addClass(self.widgetBaseClass + '-hasIcon');
                        var iconClass = o.icons[j].icon || "";
                        
                        thisLi
                            .find('a:eq(0)')
                            .prepend('<span class="'+self.widgetBaseClass+'-item-icon ui-icon '+iconClass + '"></span>');
                    }
                }
            }
        }   
        
        //add corners to top and bottom menu items
        this.list.find('li:last').addClass("ui-corner-bottom");
        if(o.style == 'popup'){this.list.find('li:first').addClass("ui-corner-top");}
        
        //transfer classes to selectmenu and list
        if(o.transferClasses){
            var transferClasses = this.element.attr('class') || ''; 
            this.newelement.add(this.list).addClass(transferClasses);
        }
        
        //original selectmenu width
        var selectWidth = this.element.width();
        
        //set menu button width
        this.newelement.width( (o.width) ? o.width : selectWidth);
        
        //set menu width to either menuWidth option value, width option value, or select width 
        if(o.style == 'dropdown'){this.list.width( (o.menuWidth) ? o.menuWidth : ((o.width) ? o.width : selectWidth));}
        else {this.list.width( (o.menuWidth) ? o.menuWidth : ((o.width) ? o.width - o.handleWidth : selectWidth - o.handleWidth));}   
        
        //set max height from option 
        if(o.maxHeight && o.maxHeight < this.list.height()){this.list.height(o.maxHeight);}   
        
        //save reference to actionable li's (not group label li's)
        this._optionLis = this.list.find('li:not(.'+ self.widgetBaseClass +'-group)');
                
        //transfer menu click to menu button
        this.list
            .keydown(function(event){
                var ret = true;
                switch (event.keyCode) {
                    case $.ui.keyCode.UP:
                    case $.ui.keyCode.LEFT:
                        ret = false;
                        self._moveFocus(-1);
                        break;
                    case $.ui.keyCode.DOWN:
                    case $.ui.keyCode.RIGHT:
                        ret = false;
                        self._moveFocus(1);
                        break;  
                    case $.ui.keyCode.HOME:
                        ret = false;
                        self._moveFocus(':first');
                        break;  
                    case $.ui.keyCode.PAGE_UP:
                        ret = false;
                        self._scrollPage('up');
                        break;  
                    case $.ui.keyCode.PAGE_DOWN:
                        ret = false;
                        self._scrollPage('down');
                        break;
                    case $.ui.keyCode.END:
                        ret = false;
                        self._moveFocus(':last');
                        break;          
                    case $.ui.keyCode.ENTER:
                    case $.ui.keyCode.SPACE:
                        ret = false;
                        self.close(event,true);
                        $(event.target).parents('li:eq(0)').trigger('mouseup');
                        break;      
                    case $.ui.keyCode.TAB:
                        ret = true;
                        self.close(event,true);
                        break;  
                    case $.ui.keyCode.ESCAPE:
                        ret = false;
                        self.close(event,true);
                        break;  
                    default:
                        ret = false;
                        self._typeAhead(event.keyCode,'focus');
                        break;      
                }
                return ret;
            });
            
        //selectmenu style
        if(o.style == 'dropdown'){
            this.newelement
                .addClass(self.widgetBaseClass+"-dropdown");
            this.list
                .addClass(self.widgetBaseClass+"-menu-dropdown");   
        }
        else {
            this.newelement
                .addClass(self.widgetBaseClass+"-popup");
            this.list
                .addClass(self.widgetBaseClass+"-menu-popup");  
        }
        
        //append status span to button
        this.newelement.prepend('<span class="'+self.widgetBaseClass+'-status">'+ selectOptionData[this._selectedIndex()].text +'</span>');
        
        //hide original selectmenu element
        this.element.hide();
        
        //transfer disabled state
        if(this.element.attr('disabled') == true){this.disable();}
        
        //update value
        this.value(this._selectedIndex());
    },
    destroy: function() {
        this.element.removeData(this.widgetName)
            .removeClass(this.widgetBaseClass + '-disabled' + ' ' + this.namespace + '-state-disabled')
            .removeAttr('aria-disabled');
    
        //unbind click on label, reset its for attr
        $('label[for='+this.newelement.attr('id')+']')
            .attr('for',this.element.attr('id'))
            .unbind('click');
        this.newelement.remove();
        this.list.remove();
        this.element.show();    
    },
    _typeAhead: function(code, eventType){
        var self = this;
        //define self._prevChar if needed
        if(!self._prevChar){self._prevChar = ['',0];}
        var C = String.fromCharCode(code);
        c = C.toLowerCase();
        var focusFound = false;
        function focusOpt(elem, ind){
            focusFound = true;
            $(elem).trigger(eventType);
            self._prevChar[1] = ind;
        };
        this.list.find('li a').each(function(i){    
            if(!focusFound){
                var thisText = $(this).text();
                if( thisText.indexOf(C) == 0 || thisText.indexOf(c) == 0){
                        if(self._prevChar[0] == C){
                            if(self._prevChar[1] < i){focusOpt(this,i);}  
                        }
                        else{focusOpt(this,i);}   
                }
            }
        });
        this._prevChar[0] = C;
    },
    _uiHash: function(){
        return {
            value: this.value()
        };
    },
    open: function(event){
        var self = this;
        var disabledStatus = this.newelement.attr("aria-disabled");
        if(disabledStatus != 'true'){
            this._refreshPosition();
            this._closeOthers(event);
            this.newelement
                .addClass('ui-state-active');
            
            this.list
                .appendTo('body')
                .addClass(self.widgetBaseClass + '-open')
                .attr('aria-hidden', false)
                .find('li:not(.'+ self.widgetBaseClass +'-group):eq('+ this._selectedIndex() +') a')[0].focus();    
            if(this.options.style == "dropdown"){this.newelement.removeClass('ui-corner-all').addClass('ui-corner-top');} 
            this._refreshPosition();
            this._trigger("open", event, this._uiHash());
        }
    },
    close: function(event, retainFocus){
        if(this.newelement.is('.ui-state-active')){
            this.newelement
                .removeClass('ui-state-active');
            this.list
                .attr('aria-hidden', true)
                .removeClass(this.widgetBaseClass+'-open');
            if(this.options.style == "dropdown"){this.newelement.removeClass('ui-corner-top').addClass('ui-corner-all');}
            if(retainFocus){this.newelement[0].focus();}    
            this._trigger("close", event, this._uiHash());
        }
    },
    change: function(event) {
        this.element.trigger('change');
        this._trigger("change", event, this._uiHash());
    },
    select: function(event) {
        this._trigger("select", event, this._uiHash());
    },
    _closeOthers: function(event){
        $('.'+ this.widgetBaseClass +'.ui-state-active').not(this.newelement).each(function(){
            $(this).data('selectelement').selectmenu('close',event);
        });
        $('.'+ this.widgetBaseClass +'.ui-state-hover').trigger('mouseout');
    },
    _toggle: function(event,retainFocus){
        if(this.list.is('.'+ this.widgetBaseClass +'-open')){this.close(event,retainFocus);}
        else {this.open(event);}
    },
    _formatText: function(text){
        return this.options.format ? this.options.format(text) : text;
    },
    _selectedIndex: function(){
        return this.element[0].selectedIndex;
    },
    _selectedOptionLi: function(){
        return this._optionLis.eq(this._selectedIndex());
    },
    _focusedOptionLi: function(){
        return this.list.find('.'+ this.widgetBaseClass +'-item-focus');
    },
    _moveSelection: function(amt){
        var currIndex = parseInt(this._selectedOptionLi().data('index'), 10);
        var newIndex = currIndex + amt;
        return this._optionLis.eq(newIndex).trigger('mouseup');
    },
    _moveFocus: function(amt){
        if(!isNaN(amt)){
            var currIndex = parseInt(this._focusedOptionLi().data('index'), 10);
            var newIndex = currIndex + amt;
        }
        else {var newIndex = parseInt(this._optionLis.filter(amt).data('index'), 10);}
        
        if(newIndex < 0){newIndex = 0;}
        if(newIndex > this._optionLis.size()-1){
            newIndex =  this._optionLis.size()-1;
        }
        var activeID = this.widgetBaseClass + '-item-' + Math.round(Math.random() * 1000);
        
        this._focusedOptionLi().find('a:eq(0)').attr('id','');
        this._optionLis.eq(newIndex).find('a:eq(0)').attr('id',activeID)[0].focus();
        this.list.attr('aria-activedescendant', activeID);
    },
    _scrollPage: function(direction){
        var numPerPage = Math.floor(this.list.outerHeight() / this.list.find('li:first').outerHeight());
        numPerPage = (direction == 'up') ? -numPerPage : numPerPage;
        this._moveFocus(numPerPage);
    },
    _setData: function(key, value) {
        this.options[key] = value;
        if (key == 'disabled') {
            this.close();
            this.element
                .add(this.newelement)
                .add(this.list)
                    [value ? 'addClass' : 'removeClass'](
                        this.widgetBaseClass + '-disabled' + ' ' +
                        this.namespace + '-state-disabled')
                    .attr("aria-disabled", value);
        }
    },
    value: function(newValue) {
        if (arguments.length) {
            this.element[0].selectedIndex = newValue;
            this._refreshValue();
            this._refreshPosition();
        }
        return this.element[0].selectedIndex;
    },
    _refreshValue: function() {
        var activeClass = (this.options.style == "popup") ? " ui-state-active" : "";
        var activeID = this.widgetBaseClass + '-item-' + Math.round(Math.random() * 1000);
        //deselect previous
        this.list
            .find('.'+ this.widgetBaseClass +'-item-selected')
            .removeClass(this.widgetBaseClass + "-item-selected" + activeClass)
            .find('a')
            .attr('aria-selected', 'false')
            .attr('id', '');
        //select new
        this._selectedOptionLi()
            .addClass(this.widgetBaseClass + "-item-selected"+activeClass)
            .find('a')
            .attr('aria-selected', 'true')
            .attr('id', activeID);
            
        //toggle any class brought in from option
        var currentOptionClasses = this.newelement.data('optionClasses') ? this.newelement.data('optionClasses') : "";
        var newOptionClasses = this._selectedOptionLi().data('optionClasses') ? this._selectedOptionLi().data('optionClasses') : "";
        this.newelement
            .removeClass(currentOptionClasses)
            .data('optionClasses', newOptionClasses)
            .addClass( newOptionClasses )
            .find('.'+this.widgetBaseClass+'-status')
            .html( 
                this._selectedOptionLi()
                    .find('a:eq(0)')
                    .html() 
            );
            
        this.list.attr('aria-activedescendant', activeID)
    },
    _refreshPosition: function(){   
        //set left value
        this.list.css('left', this.newelement.offset().left);
        
        //set top value
        var menuTop = this.newelement.offset().top;
        var scrolledAmt = this.list[0].scrollTop;
        this.list.find('li:lt('+this._selectedIndex()+')').each(function(){
            scrolledAmt -= $(this).outerHeight();
        });
        
        if(this.newelement.is('.'+this.widgetBaseClass+'-popup')){
            menuTop+=scrolledAmt; 
            this.list.css('top', menuTop); 
        }   
        else { 
            menuTop += this.newelement.height();
            this.list.css('top', menuTop); 
        }
    }
});

$.extend($.ui.selectmenu, {
    getter: "value",
    version: "@VERSION",
    eventPrefix: "selectmenu",
    defaults: {
        transferClasses: true,
        style: 'popup', 
        width: null, 
        menuWidth: null, 
        handleWidth: 26, 
        maxHeight: null,
        icons: null, 
        format: null
    }
});

})(jQuery);
