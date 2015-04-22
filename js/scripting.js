// Get all localized variables

var main_color = Codmark.main_color;
var images_loaded_active = Codmark.ts_enable_imagesloaded;
var ts_logo_content = Codmark.ts_logo_content;
var ts_onepage_layout = Codmark.ts_onepage_layout;

if (typeof ts_logo_content !== 'undefined') {
    addLogoToMenu(ts_logo_content);
}

jQuery(document).ready(function () {

    /* Widget Tabs */

    jQuery('.tabs-control > li > a').click(function () {
        var this_id = jQuery(this).attr('href'); // Get the id of the div to show
        var tabs_container_divs = '.' + jQuery(this).parent().parent().next().attr('class') + ' >  div'; // All of elements to hide
        jQuery(tabs_container_divs).hide(); // Hide all other divs
        jQuery(this).parent().parent().next().find(this_id).show(); // Show the selected element
        jQuery(this).parent().parent().find('.active').removeClass('active'); // Remove '.active' from elements
        jQuery(this).addClass('active'); // Add class '.active' to the active element
        return false;
    });

    jQuery('.toggle_title').click(function () {
        jQuery(this).next().slideToggle('fast');
        jQuery(this).find('.toggler').toggleClass('toggled');
    });

    jQuery('.tabs-switch li a').click(function () {
        var tab_id = jQuery(this).attr('href');
        if (jQuery(this).parent().parent().next().find(tab_id).is(':hidden')) {
            jQuery(this).parent().parent().find('li').removeClass('active');
            jQuery(this).parent().addClass('active');
            jQuery(this).parent().parent().next().find('div').hide('fast');
        }
        jQuery(this).parent().parent().next().find(tab_id).show('fast');
        return false;
    });

    var $container = jQuery('.shortcode_accordion > div'),
        $trigger = jQuery('.shortcode_accordion > h3');
    $container.hide();
    $trigger.first().addClass('toggled').next().show();
    $trigger.on('click', function (e) {
        if (jQuery(this).next().is(':hidden')) {
            $trigger.removeClass('toggled').next().slideUp(300);
            jQuery(this).toggleClass('toggled').next().slideDown(300);
        }
        e.preventDefault();
    });

    jQuery('.shortcode_infobox .close').click(function () {
        jQuery(this).parent().fadeOut(500);
    });
});


/* Testimonials */
jQuery(function(){
    jQuery('ul.testimonials-controls li').click(function(){
        var testimonial_id = jQuery(this).attr('id');
            jQuery(this).parent().prev().find('li').hide();
            jQuery(this).parent().find('li.active').removeClass('active');
            jQuery(this).parent().prev().find('#'+testimonial_id).show();
            jQuery(this).addClass('active');
    });
});


/* Article carousel */

function initCarousel() {
    "use strict";
    jQuery('.carousel-wrapper').each(function () {
        var thisElem = jQuery(this);
        var numberOfElems = parseInt(jQuery('.carousel-container', thisElem).children().length, 10);
        var oneElemWidth;
        var numberOfColumns = [
            ['col-lg-2', 6],
            ['col-lg-3', 4],
            ['col-lg-4', 3],
            ['col-lg-6', 2],
            ['col-lg-12', 1]
        ];
        var curentNumberOfColumns;
        var moveMargin;
        var leftHiddenElems = 0;
        var rightHiddenElems;
        var curentMargin = 0;
        var numberOfElemsDisplayed;
        var index = 0;
        var carouselContainerWidth;
        var carouselContainerWidthPercentage;
        var elemWidth;
        var elemWidthPercentage;

        while (index < numberOfColumns.length) {
            if (jQuery('.carousel-container>div', thisElem).hasClass(numberOfColumns[index][0])) {
                curentNumberOfColumns = numberOfColumns[index][1];
                break;
            }
            index++;
        }

        elemWidth = 100 / numberOfElems;
        elemWidth = elemWidth.toFixed(4);
        elemWidthPercentage = elemWidth + '%';

        function showHideArrows(){
            if(curentNumberOfColumns >= numberOfElems){

                jQuery('ul.carousel-nav > li.carousel-nav-left', thisElem).css('opacity','0.4');
                jQuery('ul.carousel-nav > li.carousel-nav-right', thisElem).css('opacity','0.4');

            } else if(leftHiddenElems === 0){

                jQuery('ul.carousel-nav > li.carousel-nav-left', thisElem).css('opacity','0.4');
                jQuery('ul.carousel-nav > li.carousel-nav-right', thisElem).css('opacity','1');

            } else if (rightHiddenElems === 0 ){

                jQuery('ul.carousel-nav > li.carousel-nav-left', thisElem).css('opacity','1');
                jQuery('ul.carousel-nav > li.carousel-nav-right', thisElem).css('opacity','0.4');

            } else {
                jQuery('ul.carousel-nav > li.carousel-nav-left', thisElem).css('opacity','1');
                jQuery('ul.carousel-nav > li.carousel-nav-right', thisElem).css('opacity','1');
            }
        }

        function reinitCarousel() {

            showHideArrows();
            jQuery('.carousel-container', thisElem).css('margin-left', 0);
            leftHiddenElems = 0;
            jQuery('ul.carousel-nav > li', thisElem).unbind('click');

            if (jQuery(window).width() <= 973) {

                carouselContainerWidth = 100 * numberOfElems;
                carouselContainerWidthPercentage = carouselContainerWidth + '%';
                rightHiddenElems = numberOfElems - 1;
                moveMargin = 100;
                curentMargin = 0;

                jQuery('ul.carousel-nav > li', thisElem).unbind('click');

                jQuery('ul.carousel-nav > li', thisElem).click(function () {
                    if (jQuery(this).hasClass('carousel-nav-left')) {
                        if (leftHiddenElems > 0) {
                            curentMargin = curentMargin + moveMargin;
                            jQuery('.carousel-container', thisElem).css('margin-left', curentMargin + '%');
                            rightHiddenElems++;
                            leftHiddenElems--;
                        }
                    } else {
                        if (rightHiddenElems > 0) {
                            curentMargin = curentMargin - moveMargin;
                            jQuery('.carousel-container', thisElem).css('margin-left', curentMargin + '%');
                            rightHiddenElems--;
                            leftHiddenElems++;
                        }
                    }
                    // Trigger arrows color change
                    showHideArrows();
                });

            } else {

                while (index < numberOfColumns.length) {
                    if (jQuery('.carousel-container>div', thisElem).hasClass(numberOfColumns[index][0])) {
                        numberOfElemsDisplayed = numberOfColumns[index][1];
                        moveMargin = 100 / numberOfElemsDisplayed;
                        rightHiddenElems = numberOfElems - numberOfElemsDisplayed;
                        oneElemWidth = 100 / numberOfColumns[index][1];
                        break;
                    }
                    index++;
                }

                carouselContainerWidth = oneElemWidth * numberOfElems;
                carouselContainerWidthPercentage = carouselContainerWidth + '%';

                curentMargin = 0;

                jQuery('ul.carousel-nav > li', thisElem).click(function () {
                    if (jQuery(this).hasClass('carousel-nav-left')) {
                        if (leftHiddenElems > 0) {
                            curentMargin = curentMargin + moveMargin + 0.00001;
                            jQuery('.carousel-container', thisElem).css('margin-left', curentMargin + '%');
                            rightHiddenElems++;
                            leftHiddenElems--;
                        }
                    } else {
                        if (rightHiddenElems > 0) {
                            curentMargin = curentMargin - moveMargin;
                            jQuery('.carousel-container', thisElem).css('margin-left', curentMargin + '%');
                            rightHiddenElems--;
                            leftHiddenElems++;
                        }
                    }
                    // Trigger arrows color change
                    showHideArrows();
                });
            }

            //Set the container total width
            jQuery('.carousel-container', thisElem).width(carouselContainerWidthPercentage).css({
                'max-height': '9999px',
                'opacity': '1'
            });

            //Set width for each element
            jQuery('.carousel-container>div', thisElem).each(function () {
                jQuery(this).attr('style', 'width: ' + elemWidthPercentage + ' !important; float:left;');
            });
        }

        reinitCarousel();

        jQuery(window).resize(function () {
            reinitCarousel();
        });
    });
}


jQuery(function() {
                
    var Page = (function() {

        var $navArrows = jQuery( '#nav-arrows' ).hide(),
            $shadow = jQuery( '#shadow' ).hide(),
            slicebox = jQuery( '.sb-slider' ).slicebox( {
                onReady : function() {

                    $navArrows.show();
                    $shadow.show();

                },
                orientation : 'r',
                cuboidsRandom : false,
                disperseFactor : 50
            } ),
            
            init = function() {

                initEvents();
                
            },
            initEvents = function() {

                // add navigation events
                $navArrows.children( ':first' ).on( 'click', function() {

                    slicebox.next();
                    return false;

                } );

                $navArrows.children( ':last' ).on( 'click', function() {
                    
                    slicebox.previous();
                    return false;

                } );

            };

            return { init : init };

    })();

    Page.init();

});

function visibleBeforeAnimation(){
    jQuery('.grid-view.animated, .thumbnail-view.animated, .big-posts.animated, .list-view.animated, .super-posts.animated').each(function(){
        jQuery(this).find('article').each(function(index){
            thisElem = jQuery(this);
            if( !thisElem.hasClass('shown') && thisElem.isOnScreen() === true ){
                thisElem.addClass('shown');
                thisElem.stop().delay(100*index).animate({opacity: 1},1000);
            }
        });
    });
    jQuery('.content-block.animated').each(function(index){
        thisElem = jQuery(this);
        var pixelsFromTransform = 0;
        if( thisElem.hasClass('slideup') ){
            pixelsFromTransform = 250;
        }
        if( thisElem.isOnScreen() === true ){
            thisElem.addClass('shown');
            thisElem.animate({opacity: 1},800);
        }
    });
    
    jQuery('.ts-counters').each(function(index){
        thisElem = jQuery(this);
        if ( thisElem.isOnScreen() ) {
            startCounters();
        };
    });

}

function animateArticlesOnLoad(){
    var thisElem;
    // If adds fade effect to articles in grid view
    jQuery(window).on('scroll',function(){
        jQuery('.grid-view.animated, .thumbnail-view.animated, .big-posts.animated, .list-view.animated, .super-posts.animated').each(function(){
            jQuery(this).find('article').each(function(index){
                thisElem = jQuery(this);
                if( !thisElem.hasClass('shown') && thisElem.isOnScreen() === true ){
                    thisElem.addClass("shown");
                    thisElem.stop().delay(100*index).animate({opacity: 1},1200);
                }
            });
        });
    });
}

jQuery.fn.isOnScreen = function(){
     
    var win = jQuery(window);
     
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
     
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
     
    return (!(viewport.bottom < bounds.top || viewport.top > bounds.bottom));
     
};

function animateBlocksOnScroll(){
    var thisElem;
    jQuery(window).on('scroll',function(){
        jQuery('.content-block.animated').each(function(index){
            thisElem = jQuery(this);
            pixelsFromTransform = 0;
            if( thisElem.hasClass('slideup') ){
                pixelsFromTransform = 150;
            }
            if( !thisElem.hasClass('shown') && thisElem.isOnScreen() === true ){
                thisElem.addClass('shown');
                thisElem.stop().delay(100*index).animate({opacity: 1},1000);
            }
        });
        jQuery('.ts-counters').each(function(index){
            thisElem = jQuery(this);
            pixelsFromTransform = 0;
            if( !thisElem.hasClass('shown') && thisElem.isOnScreen() === true ){
                thisElem.addClass('shown');
                startCounters();
            }
        });
    });
    
}

function activateStickyMenu(){
    if( jQuery('.static_menu:last').length > 0 ){
        var lastMenuOnPage = jQuery('.static_menu:last');
        var alignMenu = jQuery('#nav').attr('class').split(' ');
        jQuery(window).on('scroll',function(){
            var normalMenuTop = jQuery(lastMenuOnPage) != ''? jQuery(lastMenuOnPage).offset().top : '';
            var normalMenuHeight = jQuery('nav#nav').height();
            var stickyMenuHeight = jQuery('.ts-sticky-menu .container').outerHeight();
            if( jQuery(window).scrollTop() > normalMenuHeight + normalMenuTop && !jQuery('.ts-sticky-menu').hasClass('active') ){
                jQuery('.ts-sticky-menu').outerHeight(stickyMenuHeight);
                jQuery('.ts-sticky-menu').addClass('active');
            } else if( jQuery(window).scrollTop() < normalMenuHeight + normalMenuTop && jQuery('.ts-sticky-menu').hasClass('active') ) {
                jQuery('.ts-sticky-menu').removeClass('active');
                jQuery('.ts-sticky-menu').outerHeight(0);
            }
        });
        jQuery('.ts-sticky-menu').addClass(''+alignMenu[2]+' '+alignMenu[3]);
    }
}

function startOnePageNav(){
    jQuery('.main-menu a').click(function(e){
        e.preventDefault();
        navItemUrl = jQuery(this).attr('href');
        jQuery(document).scrollTo(navItemUrl,500);
    });

    onePageScrollActive();
}

function onePageScrollActive(){
    var menuItems = jQuery(".main-menu li").children();
    var itemsId = [];

    for (var i=0; i < menuItems.length; i++) {    
        var ahref = jQuery(menuItems[i]).attr('href');
        itemsId.push(ahref);
    }

    jQuery(window).scroll(function(){
        var windowPos = jQuery(window).scrollTop();
        var viewportHeight = jQuery(window).height(); 

        for (var i = 0; i < itemsId.length; i++) {
            var divPos = jQuery(itemsId[i]).offset().top;
            var divHeight = jQuery(itemsId[i]).height();
    
            if ( windowPos >= divPos - 200) {
                jQuery('.main-menu li a').removeClass('active');
                jQuery("a[href='" + itemsId[i] + "']").addClass("active");
            }
        }
    });
}

function filterButtonsRegister(){
    // Adds active class to "all" button
    jQuery('.ts-filters > li:first').find('a').addClass('active');
    
    // Code to change the .active class on click
    jQuery('.ts-filters > li a').click(function(e){
        e.preventDefault();
        
        var thisElem = jQuery(this);
        jQuery('.ts-filters > li').find('.active').removeClass('active');
        thisElem.addClass('active');
        return false;
    });
}

function hidePreloader(){
    setTimeout(function(){
        jQuery('.ts-preloader').fadeOut(800, function(){
            jQuery('.ts-preloader').css('display','none');
        });
    }, 600);
}

function resizeVideo(){

    if(jQuery('.embedded_videos').length){
        jQuery('.embedded_videos iframe').each(function(){
            var iframe_width = jQuery(this).width();
            var iframe_height = jQuery(this).height();
            var iframe_proportion = iframe_width/iframe_height;
            
            var iframe_parent_width = jQuery(this).parents('.embedded_videos').parent().width();
            jQuery(this).attr('width',iframe_parent_width);
            jQuery(this).attr('height',iframe_parent_width/iframe_proportion);
        });
    }
}

function twitterWidgetAnimated(){
    /*Tweets widget*/
    var delay = 4000; //millisecond delay between cycles
    
    function cycleThru(variable, j){
        var jmax = jQuery(variable + " li").length;
        jQuery(variable + " li:eq(" + j + ")")
            .css('display', 'block')
            .animate({opacity: 1}, 600)
            .animate({opacity: 1}, delay)
            .animate({opacity: 0}, 800, function(){
                if(j+1 === jmax){
                    j=0;
                }else{
                    j++;
                }
                jQuery(this).css('display', 'none').animate({opacity: 0}, 10);
                cycleThru(variable, j);
            });
    }

    jQuery('.tweets').each(function(index, val) {
        //iterate through array or object
        var parent_tweets = jQuery(val).attr('id');
        var actioner = '#' + parent_tweets + ' .ts-twitter-container.dynamic .slides_container .widget-items';
        cycleThru(actioner, 0);
    });
}

function ts_filters(){
    // cache container
    var container = jQuery(".ts-filters-container");
    
    // initialize isotope
    container.isotope({
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });

    jQuery(window).on('resize', function(){
        setTimeout(function(){
            container.isotope('reLayout');
        }, 400);
    });

    jQuery(".ts-filters a").click(function(){
        var selector = jQuery(this).attr("data-filter");
        container.isotope({ filter: selector });
        return false;
    });
}

function activatePrettyPhoto(){
    jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
        autoplay_slideshow: false,
        theme: 'light_square',
        social_tools: false,
        deeplinking: false,
        hook: 'data-rel'
    });
}

jQuery(document).ready(function($) {

    $(document).on('click', '.contact-form-submit', function(event) {
        event.preventDefault();
        
        var form = $(this).closest('form'),
            name = form.find('.contact-form-name'),
            email = form.find('.contact-form-email'),
            subject = form.find('.contact-form-subject'),
            message = form.find('.contact-form-text'),
            emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            errors = 0,
            data = {};

        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g,"");
        };

        if ( emailRegEx.test(email.val()) ) {
            email.removeClass('invalid');
        } else {
            email.addClass('invalid');
            errors = errors + 1;
        }


        if (name.val().trim() !== '') {
            name.removeClass('invalid');
        } else {
            name.addClass('invalid');
            errors = errors + 1;
        }


        if ( subject.length !== 0 ) {
            if (subject.val().trim() !== '') {
                subject.removeClass('invalid');
            } else {
                subject.addClass('invalid');
                errors = errors + 1;
            }
        }

        if (message.val().trim() !== '') {
            message.removeClass('invalid');
        } else {
            message.addClass('invalid');
            errors = errors + 1;
        }

        if ( errors === 0 ) {

            data['action']  = 'codmark_contact_me';
            data['token']   = Codmark.contact_form_token;
            data['name']    = name.val().trim();
            data['from']    = email.val().trim();
            data['subject'] = (subject.length) ? subject.val().trim() : '';
            data['message'] = message.val().trim();

            $.post(Codmark.ajaxurl, data, function(data, textStatus, xhr) {
                form.find('.contact-form-messages').html('');

                if ( data !== '-1' ) {
                    if ( data.status === 'ok' ) {
                        form.find('.contact-form-messages').removeClass("hidden").html(Codmark.contact_form_success).addClass('success');
                    } else {
                        form.find('.contact-form-messages').removeClass("hidden").html('<div class="invalid">' + data.message + '</div>');
                    }

                    if ( typeof data.token !== "undefined" ) {
                        Codmark.contact_form_error = data.token;
                    }

                } else {
                    form.addClass('hidden');
                    form.find('.contact-form-messages').html(Codmark.contact_form_error);
                }
            });
        }
    });
});
//Add logo to the center of all menu item list
function addLogoToMenu(logoContent){
    var menu_item_number = jQuery(".menu-with-logo > .main-menu > li").length;
    var middle = Math.round(menu_item_number / 2);
    jQuery(".menu-with-logo > .main-menu > li:nth-child(" + middle + ")").after(jQuery('<li class="menu-logo">'+logoContent+'</li>'));
    if (typeof logoContent !== 'undefined') {
        jQuery(".ts-sticky-menu .main-menu > li:nth-child(" + middle + ")").after(jQuery('<li class="menu-logo">'+logoContent+'</li>'));
    }
}

jQuery(document).on('click', '#ts-mobile-menu .trigger', function(event){
    event.preventDefault();
    jQuery(this).parent().next().slideToggle();
}); 

jQuery(document).on('click', '#ts-mobile-menu .menu-item-has-children > a', function(event){
    event.preventDefault();
    jQuery(this).next().slideToggle();
});

function ExpireCookie(minutes) {
    var date = new Date();
    var m = minutes;
    date.setTime(date.getTime() + (m * 60 * 1000));
    jQuery.cookie("ts_fb_modal_cookie", m, { expires: date, path:'/' });
}

/* Time calculating in seconds! [example: fb_like_modal(30)] P.S. After 30 seconds, the function will be run */
function fb_likeus_modal(ShowTime){
    var modalContainer = jQuery('#fbpageModal');
    var timeExe = ShowTime*1000;
    var closeBtn = modalContainer.find('button[data-dismiss="modal"]');
    var cookie = jQuery.cookie('ts_fb_modal_cookie'),
        setTime = 360;

    if( cookie != setTime ){
        modalContainer.delay(timeExe).queue(function() {
            jQuery(this).hide();
            jQuery(this).modal('show'); //calling modal() function
            jQuery(this).dequeue();
        });
    }else{
        modalContainer.modal('hide');
    }
    //If you clicked on the close button, the function sends a cookie for 30 minutes which helps to not display modal at every recharge page
    closeBtn.on('click', function(){
        ExpireCookie(setTime);
    });
}

/* This function aligns the vertical center elements */
function alignElementVerticalyCenter(){
    var container = jQuery('.site-section');

    jQuery(container).each(function(){
        if( jQuery(this).hasClass('ts-fullscreen-row') ){
            var windowHeight = jQuery(window).height();
            var containerHeight = windowHeight;
        }else{
            var windowHeight = '100%';
            var containerHeight = jQuery(this).outerHeight();
        }

        var innerContent = jQuery(this).find('.container').height();
        var insertPadding = Math.round((containerHeight-innerContent)/2);

        if( jQuery(this).attr('data-alignment') == 'middle' ){
            jQuery(this).css({'padding-top':insertPadding,'padding-bottom':insertPadding,'min-height':windowHeight});
        }else if( jQuery(this).attr('data-alignment') == 'top' ){
            jQuery(this).css('min-height',windowHeight);
        }else if( jQuery(this).attr('data-alignment') == 'bottom' ){
            jQuery(this).css({'width':'100%','height':containerHeight,'position':'relative','min-height':windowHeight});
            jQuery(this).children('.container').css({'width':'100%','height':'100%'});
            var rowPaddingBottom = jQuery(this).css('padding-bottom');
            jQuery(this).find('.row-align-bottom').css({'position':'absolute','width':'100%','bottom':rowPaddingBottom});
        }
    });

    // align the elements vertically in the middle for banner box
    if( jQuery('.ts-banner-box').length > 0 ){
        jQuery('.ts-banner-box').each(function(){
            var containerHeight = jQuery(this).outerHeight();
            var innerContent = jQuery(this).find('.container').height();
            var insertPadding = Math.round((containerHeight-innerContent)/2);

            jQuery(this).css({'padding-top':insertPadding,'padding-bottom':insertPadding});
        });
    }
        
}

function alignMegaMenu(){
    setTimeout(function(){
        if ( jQuery('.main-menu').length > 0 ) {
            jQuery('.main-menu').each(function(){
                if( !jQuery(this).parent().hasClass('mobile_menu') ){
                    var thisElem = jQuery(this).find('.is_mega .ts_is_mega_div');
                    if ( jQuery(thisElem).length > 0 ) {
                        var windowWidth = jQuery(window).width();
                        var thisElemWidth = jQuery(thisElem).outerWidth();
                        jQuery(thisElem).removeAttr('style');
                        var menuOffset = jQuery(thisElem).offset().left;
                        var result = Math.round((windowWidth-thisElemWidth)/2);

                        var result2 = result - menuOffset;
                        jQuery(thisElem).css('left',result2);
                    };
                }
            });
        };
    },100);
}

function fb_comments_width(){
    setTimeout(function(){
        jQuery('#comments .fb-comments').css('width','100%');
        jQuery('#comments .fb-comments > span').css('width','100%');
        jQuery('#comments .fb-comments > span > iframe').css('width','100%');
    },300);
}

function startCounters(){
    var $chart = jQuery('.chart');
    var $cnvSize = 160;
    $chart.easyPieChart({
        animate: 2000,
        scaleColor: false,
        barColor: main_color,
        size: $cnvSize,
        onStep: function(from, to, percent) {
            jQuery(this.el).find('.percent').text(Math.round(percent)).css({
                "line-height": $cnvSize+'px',
                width: $cnvSize 
            })
        }
    })
}
function startSly(){
    jQuery(function($){
        (function () {
            var $frame  = $('.slyframe');
                var $slidee = $frame.children('ul').eq(0);
                var $wrap   = $frame.parent();

                // Call Sly on frame
                $frame.sly({
                    horizontal: 1,
                    itemNav: 'centered',
                    smart: 1,
                    activateOn: 'click',
                    mouseDragging: 1,
                    touchDragging: 1,
                    releaseSwing: 1,
                    startAt: 0,
                    scrollBar: $wrap.find('.slyscrollbar'),
                    scrollBy: 1,
                    pagesBar: $wrap.find('.pages'),
                    activatePageOn: 'click',
                    speed: 300,
                    elasticBounds: 1,
                    easing: 'easeOutExpo',
                    dragHandle: 1,
                    dynamicHandle: 1,
                    clickBar: 1
                });
        }());
    });
}

/* Running functions on page load */
jQuery(window).on('load resize orientationchange', function(){
    alignMegaMenu();
});

jQuery(window).load(function() {
    fb_likeus_modal(5);
    initCarousel();
    startSly();
    animateArticlesOnLoad();
    animateBlocksOnScroll();
    visibleBeforeAnimation();
    activateStickyMenu();
    filterButtonsRegister();
    hidePreloader();
    twitterWidgetAnimated();
    resizeVideo();
    ts_filters();
    activatePrettyPhoto();
    fb_comments_width();
    alignElementVerticalyCenter();    

    // If onepage layout - run the onepage menu
    if ( ts_onepage_layout == 'yes' ) {
        startOnePageNav();
    }

    echo.init({
        offset: 100,
        throttle: 250,
        unload: false,
        callback: function (element, op) {
            if( op === 'load' ){
                setTimeout(function(){
                    jQuery(".ts-filters-container").isotope('reLayout');
                },500);
            }
        }
    });
    jQuery('.flexslider').each(function(){
        if( jQuery(this).hasClass('with-thumbs') ){
            nav_control = 'thumbnails';
        } else{
            nav_control = 'none';
        }
        nav_animation = jQuery(this).attr('data-animation');
        jQuery(this).flexslider({
            animation: nav_animation,
            controlNav: nav_control,
            prevText: "",
            nextText: "",
            smoothHeight: true
            
        });
    });

    jQuery('.panel-heading a[data-toggle="collapse"]').on('click', function(){
        var panelCollapse = jQuery(this).parent().next();
        if ( panelCollapse.hasClass('in')) {
            jQuery(this).find('i').css({
                '-webkit-transform': 'rotate(0deg)',
                '-o-transform': 'rotate(0deg)',
                '-mz-transform': 'rotate(0deg)',
                'transform': 'rotate(0deg)'
            })
        } else {
            jQuery(this).find('i').css({
                '-webkit-transform': 'rotate(90deg)',
                '-o-transform': 'rotate(90deg)',
                '-mz-transform': 'rotate(90deg)',
                'transform': 'rotate(90deg)'
            })
        }
    });

    jQuery('.megaWrapper').each(function(){
        if( jQuery(this).hasClass('ts-behold-menu') ){
            jQuery(this).removeClass('ts-behold-menu').addClass('ts-mega-menu');
        }
        jQuery(this).find('.ts_is_mega_div .sub-menu').addClass('ts_is_mega');
        jQuery(this).find('.ts_is_mega_div').parent().addClass('is_mega');
    })

});