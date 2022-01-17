"use strict";

var THEMEREX_isotope_resize_delta = 0.3;
var THEMEREX_ADMIN_MODE = false;
var THEMEREX_error_msg_box = null;
var THEMEREX_video_resize_inited = false;
var THEMEREX_top_height = 0;
var THEMEREX_use_fixed_wrapper = true;
var THEMEREX_MESSAGE_BOOKMARK_ADD = "Add the bookmark";
var THEMEREX_MESSAGE_BOOKMARK_ADDED = "Current page has been successfully added to the bookmarks. You can see it in the right panel on the tab \'Bookmarks\'";
var THEMEREX_MESSAGE_BOOKMARK_TITLE = "Enter bookmark title";
var THEMEREX_MESSAGE_BOOKMARK_EXISTS = "Current page already exists in the bookmarks list";
var THEMEREX_MESSAGE_EMAIL_CONFIRM = "On the e-mail address <b>%s</b> we sent a confirmation email.<br>Please, open it and click on the link.";
var THEMEREX_MESSAGE_EMAIL_ADDED = "Your address <b>%s</b> has been successfully added to the subscription list";
var THEMEREX_MAGNIFIC_LOADING = "Loading image #%curr% ...";
var THEMEREX_MAGNIFIC_ERROR = "<a href=\"%url%\">The image #%curr%</a> could not be loaded.";
var THEMEREX_NAME_EMPTY = "The name can\'t be empty";
var THEMEREX_NAME_LONG = "Too long name";
var THEMEREX_EMAIL_EMPTY = "Too short (or empty) email address";
var THEMEREX_EMAIL_LONG = "Too long email address";
var THEMEREX_EMAIL_NOT_VALID = "Invalid email address";
var THEMEREX_SUBJECT_EMPTY = "The subject can\'t be empty";
var THEMEREX_SUBJECT_LONG = "Too long subject";
var THEMEREX_MESSAGE_EMPTY = "The message text can\'t be empty";
var THEMEREX_MESSAGE_LONG = "Too long message text";
var THEMEREX_SEND_COMPLETE = "Send message complete!";
var THEMEREX_SEND_COMPLETEERROR = "Transmit failed!";
var THEMEREX_ajax_url = "#";
var THEMEREX_ajax_nonce = "b700d01c81";

// Site base url
var THEMEREX_site_url = "#";

// Theme base font
var THEMEREX_theme_font = "";

// Theme skin
var THEMEREX_theme_skin = "kinder";
var THEMEREX_theme_skin_bg = "#ffffff";

// Slider height
var THEMEREX_slider_height = 500;

// Sound Manager
var THEMEREX_sound_enable = true;
var THEMEREX_sound_folder = 'sounds/';
var THEMEREX_sound_mainmenu = 'sounds/l9.mp3';
var THEMEREX_sound_othermenu = 'sounds/l2.mp3';
var THEMEREX_sound_buttons = 'sounds/mouseover3.mp3';
var THEMEREX_sound_links = 'sounds/l6.mp3';
var THEMEREX_sound_state = {
    all: THEMEREX_sound_enable ? 1 : 0,
    mainmenu: 0,
    othermenu: 0,
    buttons: 1,
    links: 0
};

// System message
var THEMEREX_systemMessage = {
    message: "",
    status: "",
    header: ""
};

// User logged in
var THEMEREX_userLoggedIn = false;

// Show table of content for the current page
var THEMEREX_menu_toc = 'float';
var THEMEREX_menu_toc_home = THEMEREX_menu_toc != 'no' && true;
var THEMEREX_menu_toc_top = THEMEREX_menu_toc != 'no' && true;

// Fix main menu
var THEMEREX_menuFixed = true;

// Use responsive version for main menu
var THEMEREX_menuResponsive = 1024;
var THEMEREX_responsive_menu_click = true;

// Right panel demo timer
var THEMEREX_demo_time = 5000;

// Video and Audio tag wrapper
var THEMEREX_useMediaElement = true;

// Use AJAX search
var THEMEREX_useAJAXSearch = true;
var THEMEREX_AJAXSearch_min_length = 3;
var THEMEREX_AJAXSearch_delay = 200;

// Popup windows engine
var THEMEREX_popupEngine = 'magnific';
var THEMEREX_popupGallery = true;

// E-mail mask
var THEMEREX_EMAIL_MASK = '^([a-zA-Z0-9_\\-]+\\.)*[a-zA-Z0-9_\\-]+@[a-z0-9_\\-]+(\\.[a-z0-9_\\-]+)*\\.[a-z]{2,6}$';

// Messages max length
var THEMEREX_msg_maxlength_contacts = 1000;
var THEMEREX_msg_maxlength_comments = 1000;

// Remember visitors settings
var THEMEREX_remember_visitors_settings = true;

if (THEMEREX_theme_font == '') THEMEREX_theme_font = 'Roboto Slab';

// Add skin custom colors in custom styles
function theme_skin_set_theme_color(custom_style, clr) {
    custom_style +=
        '.topWrap .topMenuStyleLine ul#mainmenu .menu-panel .item_placeholder .item_title a:hover,.topWrap .topMenuStyleLine ul#mainmenu .menu-panel.thumb .item_placeholder .item_title a:hover' + ' { color: ' + clr + ' !important; }' + '.sliderHomeBullets .order a,.usermenu_area,.twitBlock,.twitBlockWrap,.twitBlock .sc_slider .flex-direction-nav li' + ' { background-color: ' + clr + '; }' + '.topWrap .openRightMenu:hover,.topWrap .search:not(.searchOpen):hover,.sliderHomeBullets .order a' + ' {border-color: ' + clr + '; }';
    return custom_style;
}

// Add skin's main menu (top panel) back color in the custom styles
function theme_skin_set_menu_bgcolor(custom_style, clr) {
    return custom_style;
}

// Add skin top panel colors in custom styles
function theme_skin_set_menu_color(custom_style, clr) {
    custom_style +=
        '.responsive_menu .menuTopWrap > ul > li > a,.responsive_menu .menuTopWrap li.menu-item-has-children:before' + ' { color: ' + clr + '; }';
    return custom_style;
}

// Add skin's user menu (user panel) back color in the custom styles
function theme_skin_set_user_menu_bgcolor(custom_style, clr) {
    return custom_style;
}

// Add skin's user menu (user panel) fore colors in the custom styles
function theme_skin_set_user_menu_color(custom_style, clr) {
    return custom_style;
}

jQuery(document).ready(function() {
    userpopup_menu();
    timelineResponsive();
    ready();
    timelineScrollFix();
    itemPageFull();
    mainMenuResponsive();
    scrollAction();
    calcMenuColumnsWidth();
    resizeVideoBackground();
    REX_parallax();
    isotope_filtr();
    customizer_scroll();
    hover_mobile();
    review_star();
    slider_range();
    shop_calculator();
    swiper_slider_init();
    swiper_multi_slider();
    toTop();
    massage_init();
    royalSlider_init();
    // Resize handlers
    jQuery(window).resize(function() {
        timelineResponsive();
        fullSlider();
        resizeSliders();
        itemPageFull();
        mainMenuResponsive();
        scrollAction();
        resizeVideoBackground();
        REX_parallax()
        hover_mobile();
        swiper_slider_init();
        swiper_multi_slider();
        royalSlider_init();
    });
    // Scroll handlers
    jQuery(window).scroll(function() {
        timelineScrollFix();
        scrollAction();
        REX_parallax()
    });
    // Scroll handlers
    jQuery(window).load(function() {
        preloader();
        swiper_slider_init();
        swiper_multi_slider();
    })
});


// riyalSlider init
function royalSlider_init() {
    if (jQuery(".royalSlider").length > 0) {
        $(".royalSlider").royalSlider({
            // general options go gere
            autoScaleSlider: true,
            loop: true,
            block: {
                // animated blocks options go gere
                fadeEffect: false,
                moveEffect: 'left'
            },
            autoPlay: {
                // autoplay options go gere
                enabled: true,
                delay: 7000,
                stopAtAction: true,
                pauseOnHover: true
            }
        });
    }
}

// Preloader 
function preloader() {

    jQuery("#preloader_image").fadeOut();
    jQuery("#preloader").delay(200).fadeOut("slow").delay(200, function() {
        jQuery(this).remove();
    });
}

// Init swiper sliders
function swiper_slider_init() {

    if (jQuery("#swiper_container_1").length > 0) {
        var swiper1 = new Swiper('#swiper_container_1', {
            slidesPerView: 1,
            spaceBetween: 0,
            grabCursor: true,
            loop: true,
            autoplay: 4000
        });
    }

    if (jQuery("#swiper_container_2").length > 0) {
        var swiper2 = new Swiper('#swiper_container_2', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            pagination: '.swiper-pagination',
            slidesPerView: 1,
            paginationClickable: true,
            spaceBetween: 0,
            grabCursor: true,
            loop: true,
            autoplay: 4000
        });
    }

    if (jQuery("#swiper_container_3").length > 0) {
        var swiper3 = new Swiper('#swiper_container_3', {
            nextButton: '.swiper-button-next3',
            prevButton: '.swiper-button-prev3',
            slidesPerView: 1,
            spaceBetween: 0,
            grabCursor: true,
            loop: true,
            autoplay: 4000
        });
    }

    if (jQuery("#swiper_container_4").length > 0) {
        var swiper4 = new Swiper('#swiper_container_4', {
            scrollbar: '.swiper-scrollbar_tab4',
            scrollbarHide: true,
            direction: 'vertical',
            slidesPerView: 2,
            spaceBetween: 0,
            grabCursor: true,
            mousewheelControl: true,
            freeMode: true
        });
    }
    /*if (jQuery(".swiper-container4").length > 0) {
        $('#tabs_sliders a').on('shown.bs.tab', function(e) {
            if ($(this).attr('href') == "#tab1") {
                var swiper4 = new Swiper('.swiper-container4', {
                    scrollbar: '.swiper-scrollbar_tab4',
                    scrollbarHide: true,
                    direction: 'vertical',
                    slidesPerView: 2,
                    spaceBetween: 0,
                    grabCursor: true,
                    mousewheelControl: true,
                    freeMode: true
                });
            }
        });
    }*/

    if (jQuery("#swiper_container_5").length > 0) {
        $('#tabs_sliders a').on('shown.bs.tab', function(e) {
            if ($(this).attr('href') == "#tab22") {
                var swiper5 = new Swiper('#swiper_container_5', {
                    scrollbar: '.swiper-scrollbar_tab5',
                    scrollbarHide: true,
                    direction: 'vertical',
                    slidesPerView: 2,
                    spaceBetween: 0,
                    grabCursor: true,
                    mousewheelControl: true,
                    freeMode: true
                });
            }
        });
    }

    if (jQuery("#swiper_container_6").length > 0) {
        var swiper8 = new Swiper('#swiper_container_6', {
            nextButton: '.flex-next',
            prevButton: '.flex-prev',
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            grabCursor: true,
            autoplay: 4000
        });
    }

    if (jQuery("#swiper_container_6_2").length > 0) {
        var swiper8 = new Swiper('#swiper_container_6_2', {
            nextButton: '.flex-next',
            prevButton: '.flex-prev',
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            grabCursor: true,
            autoplay: 4000
        });
    }  
  
    if (jQuery("#swiper_container_7").length > 0) {
        var swiper9 = new Swiper('#swiper_container_7', {
            nextButton: '.flex-next',
            prevButton: '.flex-prev',
            slidesPerView: 1,
            spaceBetween: 0,
            grabCursor: true,
            loop: true,
            autoplay: 4000
        });
    }

    if (jQuery(".swiper-container_8").length > 0) {
        var swiper10 = new Swiper('.swiper-container_8', {
            scrollbar: '.swiper-scrollbar',
            scrollbarHide: true,
            nextButton: '.swiper-button-next8',
            prevButton: '.swiper-button-prev8',
            direction: 'vertical',
            slidesPerView: 3,
            spaceBetween: 0,
            mousewheelControl: true,
            grabCursor: true,
            freeMode: true
        });
    }

    if (jQuery("#swiper_container_9").length > 0) {
        $('#tabs_sliders a').on('shown.bs.tab', function(e) {
            if ($(this).attr('href') == "#tab2") {
                var swiper9 = new Swiper('#swiper_container_9', {
                    scrollbar: '.swiper-scrollbar_tab9',
                    scrollbarHide: true,
                    direction: 'vertical',
                    slidesPerView: 2,
                    spaceBetween: 0,
                    grabCursor: true,
                    mousewheelControl: true,
                    freeMode: true
                });
            }
        });
    }

    if (jQuery("#swiper_container_10").length > 0) {
        $('#tabs_sliders a').on('shown.bs.tab', function(e) {
            if ($(this).attr('href') == "#tab3") {
                var swiper6 = new Swiper('#swiper_container_10', {
                    scrollbar: '.swiper-scrollbar_tab10',
                    scrollbarHide: true,
                    direction: 'vertical',
                    slidesPerView: 2,
                    spaceBetween: 0,
                    grabCursor: true,
                    mousewheelControl: true,
                    freeMode: true
                });
            }
        });
    }

    if (jQuery("#swiper_container_11").length > 0) {
        var isSliderActive4 = true;
        $('#tabs_sliders a').on('shown.bs.tab', function(e) {
            if ($(this).attr('href') == "#tab4") {
                var swiper7 = new Swiper('#swiper_container_11', {
                    scrollbar: '.swiper-scrollbar_tab11',
                    scrollbarHide: true,
                    direction: 'vertical',
                    slidesPerView: 2,
                    spaceBetween: 0,
                    mousewheelControl: true,
                    grabCursor: true,
                    freeMode: true
                });
            }
        });
    }    

    if (jQuery("#swiper_container_12").length > 0) {
        var swiper12 = new Swiper('#swiper_container_12', {
            scrollbar: '.swiper-scrollbar12',
            scrollbarHide: true,
            nextButton: '.swiper-button-next12',
            prevButton: '.swiper-button-prev12',
            slidesPerView: 5,
            spaceBetween: 25,
            grabCursor: true,
            freeMode: true
        });
    }

    if (jQuery("#swiper_container_13").length > 0) {
        var swiper13 = new Swiper('#swiper_container_13', {
            scrollbar: '.swiper-scrollbar13',
            scrollbarHide: true,
            nextButton: '.swiper-button-next13',
            prevButton: '.swiper-button-prev13',
            //slidesPerView: 8,
            slidesPerView: 'auto',
            spaceBetween: 25,
            grabCursor: true,
            freeMode: true
        });
    }

    if (jQuery("#swiper_container_14").length > 0) {
        var swiper14 = new Swiper('#swiper_container_14', {
            scrollbar: '.swiper-scrollbar',
            scrollbarHide: true,
            direction: 'vertical',
            slidesPerView: 8,
            spaceBetween: 0,
            mousewheelControl: true,
            grabCursor: true,
            freeMode: true
        });
    }

    /*if (jQuery(".swiper-container_15").length > 0) {
        var swiper15 = new Swiper('.swiper-container_15', {
            scrollbar: '.swiper-scrollbar15',
            scrollbarHide: true,
            direction: 'vertical',
            slidesPerView: 4,
            spaceBetween: 10,
            grabCursor: true,
            freeMode: true
        });
    }*/

    if (jQuery("#swiper_container_16").length > 0) {
        var swiper16 = new Swiper('#swiper_container_16', {
            scrollbar: '.swiper-scrollbar16',
            scrollbarHide: true,
            nextButton: '.swiper-button-next16',
            prevButton: '.swiper-button-prev16',
            direction: 'vertical',
            slidesPerView: 3,
            spaceBetween: 0,
            mousewheelControl: true,
            grabCursor: true,
            freeMode: true
        });
    }

    if (jQuery("#swiper_container_17").length > 0) {
        var swiper17 = new Swiper('#swiper_container_17', {
            nextButton: '.swiper-button-next17',
            prevButton: '.swiper-button-prev17',
            direction: 'vertical',
            slidesPerView: 'auto',
            spaceBetween: 0,
            mousewheelControl: true,
            grabCursor: true,
            freeMode: true
        });
    }

    if (jQuery("#swiper_container_18").length > 0) {
        var swiper11 = new Swiper('#swiper_container_18', {
            scrollbar: '.swiper-scrollbar',
            scrollbarHide: true,
            nextButton: '.swiper-button-next9',
            prevButton: '.swiper-button-prev9',
            direction: 'vertical',
            slidesPerView: 7,
            spaceBetween: 0,
            mousewheelControl: true,
            grabCursor: true,
            freeMode: true
        });
    }
}

// Init swiper multi sliders
function swiper_multi_slider() {

    if (jQuery("#multi_slider").length > 0) {

        var sliderleft = new Swiper('#multi_slider_left', {
            nextButton: '.flex-next',
            prevButton: '.flex-prev',
            grabCursor: true,
            loop: true,
            loopedSlides: 4,
            autoplay: 6000,

        });
        var sliderright = new Swiper('#multi_slider_right', {
            direction: 'vertical',
            centeredSlides: true,
            slidesPerView: 3,
            touchRatio: 0.2,
            grabCursor: true,
            loop: true,
            loopedSlides: 4,
            slideToClickedSlide: true
        });
        sliderleft.params.control = sliderright;
        sliderright.params.control = sliderleft;
    }
}

// Price range slider
function slider_range() {
    if (jQuery("#slider-range").length > 0) {
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 500,
            values: [0, 500],
            slide: function(event, ui) {
                $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });
        $("#amount").val("$" + $("#slider-range").slider("values", 0) +
            " - $" + $("#slider-range").slider("values", 1));
    }
}

// Scroll customizer
function customizer_scroll() {
    $(".swpLeftPos .menuTranform .sc_scroll").mCustomScrollbar({
        autoHideScrollbar: true,
        theme: "dark"
    });
};

// Add Isotope Filtr Button 
function isotope_filtr() {

    //Portfolio classic one columns
    if (jQuery("#style_portfolio1").length > 0) {
        jQuery(".isotopeFiltr", "#style_portfolio1").append('<ul><li class="squareButton active"><a href="#" data-filter="*">All</a></li><li class="squareButton"><a href="#" data-filter=".flt_65">clear</a></li><li class="squareButton"><a href="#" data-filter=".flt_36">Design</a></li><li class="squareButton"><a href="#" data-filter=".flt_66">exclusive</a></li><li class="squareButton"><a href="#" data-filter=".flt_7">portfolio</a></li><li class="squareButton"><a href="#" data-filter=".flt_63">portfolio hover</a></li><li class="squareButton"><a href="#" data-filter=".flt_64">print</a></li></ul>');
    }

    //Portfolio classic two columns
    if (jQuery("#style_portfolio2").length > 0) {
        jQuery(".isotopeFiltr", "#style_portfolio2").append('<ul><li class="squareButton active"><a href="#" data-filter="*">All</a></li><li class="squareButton"><a href="#" data-filter=".flt_65">clear</a></li><li class="squareButton"><a href="#" data-filter=".flt_66">exclusive</a></li><li class="squareButton"><a href="#" data-filter=".flt_7">portfolio</a></li><li class="squareButton"><a href="#" data-filter=".flt_36">Design</a></li><li class="squareButton"><a href="#" data-filter=".flt_51">portfolio classic</a></li><li class="squareButton"><a href="#" data-filter=".flt_64">print</a></li><li class="squareButton"><a href="#" data-filter=".flt_10">gallery</a></li></ul>');
    }

    //Portfolio classic four columns
    if (jQuery("#style_portfolio4").length > 0) {
        jQuery(".isotopeFiltr", "#style_portfolio4").append("<ul><li class=\"squareButton active\"><a href=\"#\" data-filter=\"*\">All</a></li><li class=\"squareButton\"><a href=\"#\" data-filter=\".flt_65\">clear</a></li><li class=\"squareButton\"><a href=\"#\" data-filter=\".flt_36\">Design</a></li><li class=\"squareButton\"><a href=\"#\" data-filter=\".flt_66\">exclusive</a></li><li class=\"squareButton\"><a href=\"#\" data-filter=\".flt_7\">portfolio</a></li><li class=\"squareButton\"><a href=\"#\" data-filter=\".flt_63\">portfolio hover</a></li><li class=\"squareButton\"><a href=\"#\" data-filter=\".flt_64\">print</a></li><li class=\"squareButton\"><a href=\"#\" data-filter=\".flt_118\">nature</a></li></ul>");
    }

    //Portfolio classic columns
    if (jQuery("#style_portfolio_cc").length > 0) {
        jQuery(".isotopeFiltr", "#style_portfolio_cc").append('<ul><li class="squareButton active"><a href="#" data-filter="*">All</a></li><li class="squareButton"><a href="#" data-filter=".flt_65">clear</a></li><li class="squareButton"><a href="#" data-filter=".flt_66">exclusive</a></li><li class="squareButton"><a href="#" data-filter=".flt_7">portfolio</a></li><li class="squareButton"><a href="#" data-filter=".flt_36">Design</a></li><li class="squareButton"><a href="#" data-filter=".flt_51">portfolio classic</a></li><li class="squareButton"><a href="#" data-filter=".flt_64">print</a></li><li class="squareButton"><a href="#" data-filter=".flt_10">gallery</a></li></ul>');
    }

    //Portfolio classic columns with sidebar
    if (jQuery("#style_portfolio_sb").length > 0) {
        jQuery(".isotopeFiltr", "#style_portfolio_sb").append('<ul><li class="squareButton active"><a href="#" data-filter="*">All</a></li><li class="squareButton"><a href="#" data-filter=".flt_65">clear</a></li><li class="squareButton"><a href="#" data-filter=".flt_66">exclusive</a></li><li class="squareButton"><a href="#" data-filter=".flt_7">portfolio</a></li><li class="squareButton"><a href="#" data-filter=".flt_36">Design</a></li><li class="squareButton"><a href="#" data-filter=".flt_51">portfolio classic</a></li><li class="squareButton"><a href="#" data-filter=".flt_64">print</a></li><li class="squareButton"><a href="#" data-filter=".flt_10">gallery</a></li></ul>');
    }

    //Portfolio masonry columns
    if (jQuery("#style_portfolio_mc").length > 0) {
        jQuery(".isotopeFiltr", "#style_portfolio_mc").append('<ul><li class="squareButton active"><a href="#" data-filter="*">All</a></li><li class="squareButton"><a href="#" data-filter=".flt_36">Design</a></li><li class="squareButton"><a href="#" data-filter=".flt_7">portfolio</a></li><li class="squareButton"><a href="#" data-filter=".flt_10">gallery</a></li><li class="squareButton"><a href="#" data-filter=".flt_6">masonry</a></li><li class="squareButton"><a href="#" data-filter=".flt_64">print</a></li><li class="squareButton"><a href="#" data-filter=".flt_65">clear</a></li><li class="squareButton"><a href="#" data-filter=".flt_57">portfolio masonry</a></li></ul>');
    }
    //Portfolio masonry columns with sidebar
    if (jQuery("#style_portfolio_mcsb").length > 0) {
        jQuery(".isotopeFiltr", "#style_portfolio_mcsb").append('<ul><li class="squareButton active"><a href="#" data-filter="*">All</a></li><li class="squareButton"><a href="#" data-filter=".flt_36">Design</a></li><li class="squareButton"><a href="#" data-filter=".flt_7">portfolio</a></li><li class="squareButton"><a href="#" data-filter=".flt_10">gallery</a></li><li class="squareButton"><a href="#" data-filter=".flt_6">masonry</a></li><li class="squareButton"><a href="#" data-filter=".flt_64">print</a></li><li class="squareButton"><a href="#" data-filter=".flt_65">clear</a></li><li class="squareButton"><a href="#" data-filter=".flt_57">portfolio masonry</a></li></ul>');
    }

    //Portfolio grid columns
    if (jQuery("#style_portfolio_grid").length > 0) {
        jQuery(".isotopeFiltr", "#style_portfolio_grid").append('<ul><li class="squareButton active"><a href="#" data-filter="*">All</a></li><li class="squareButton"><a href="#" data-filter=".flt_65">clear</a></li><li class="squareButton"><a href="#" data-filter=".flt_36">Design</a></li><li class="squareButton"><a href="#" data-filter=".flt_66">exclusive</a></li><li class="squareButton"><a href="#" data-filter=".flt_7">portfolio</a></li><li class="squareButton"><a href="#" data-filter=".flt_63">portfolio hover</a></li><li class="squareButton"><a href="#" data-filter=".flt_64">print</a></li></ul>');
    }
};

// Select review stars
function review_star() {
    if (jQuery(".stars", "#review_form").length > 0) {
        $(".stars").find("a").on("click", function() {
            $("a.active").removeClass("active");
            $(this).addClass("active");
            return false;
        });
    }
}

//Add user popup block
function userpopup_menu() {
    if (jQuery(".usermenu_area", "#header").length > 0) {
        var userpopUpHTML = '<div id="user-popUp" class="user-popUp mfp-with-anim mfp-hide">';
        userpopUpHTML += '<div class="sc_tabs">';
        userpopUpHTML += '<ul class="loginHeadTab">';
        userpopUpHTML += '<li><a href="#loginForm" class="loginFormTab icon">Log In</a></li>';
        userpopUpHTML += '<li ><a href="#registerForm" class="registerFormTab icon" role="presentation">Create an Account</a></li>';
        userpopUpHTML += '</ul>';
        userpopUpHTML += '<div id="loginForm" class="formItems loginFormBody">';
        userpopUpHTML += '<div class="itemformLeft">';
        userpopUpHTML += '<form action="#" method="post" name="login_form" class="formValid">';
        userpopUpHTML += '<input type="hidden" name="redirect_to" value="#">';
        userpopUpHTML += '<ul class="formList">';
        userpopUpHTML += '<li class="icon formLogin"><input type="text" id="login" name="log" value="" placeholder="Login"></li>';
        userpopUpHTML += '<li class="icon formPass"><input type="password" id="password" name="pwd" value="" placeholder="Password"></li>';
        userpopUpHTML += '<li class="remember">';
        userpopUpHTML += '<a href="#" class="forgotPwd">Forgot password?</a>';
        userpopUpHTML += '<input type="checkbox" value="forever" id="rememberme" name="rememberme">';
        userpopUpHTML += '<label for="rememberme">Remember me</label>';
        userpopUpHTML += '</li>';
        userpopUpHTML += '<li><a href="#" class="sendEnter enter">Login</a></li>';
        userpopUpHTML += '</ul>';
        userpopUpHTML += '</form>';
        userpopUpHTML += '</div>';
        userpopUpHTML += '<div class="itemformRight">';
        userpopUpHTML += '<ul class="formList">';
        userpopUpHTML += '<li>You can login using your social profile</li>';
        userpopUpHTML += '<li class="loginSoc">';
        userpopUpHTML += '<a href="#" class="iconLogin fb"></a>';
        userpopUpHTML += '<a href="#" class="iconLogin tw"></a>';
        userpopUpHTML += '<a href="#" class="iconLogin gg"></a>';
        userpopUpHTML += '</li>';
        userpopUpHTML += '<li><a href="#" class="loginProblem">Problem with login?</a></li>';
        userpopUpHTML += '</ul>';
        userpopUpHTML += '</div>';
        userpopUpHTML += '<div class="result messageBlock"></div>';
        userpopUpHTML += '</div>';
        userpopUpHTML += '<div id="registerForm" class="formItems registerFormBody">';
        userpopUpHTML += '<form name="register_form" method="post" class="formValid">';
        userpopUpHTML += '<input type="hidden" name="redirect_to" value="#">';
        userpopUpHTML += '<div class="itemformLeft">';
        userpopUpHTML += '<ul class="formList">';
        userpopUpHTML += '<li class="icon formUser"><input type="text" id="registration_username" name="registration_username" value="" placeholder="User name (login)"></li>';
        userpopUpHTML += '<li class="icon formLogin"><input type="text" id="registration_email" name="registration_email" value="" placeholder="E-mail"></li>';
        userpopUpHTML += '<li class="i-agree">';
        userpopUpHTML += '<input type="checkbox" value="forever" id="i-agree" name="i-agree">';
        userpopUpHTML += '<label for="i-agree">I agree with</label> <a href="#">Terms &amp; Conditions</a>';
        userpopUpHTML += '</li>';
        userpopUpHTML += '<li><a href="" class="sendEnter enter">Sign Up</a></li>';
        userpopUpHTML += '</ul>';
        userpopUpHTML += '</div>';
        userpopUpHTML += '<div class="itemformRight">';
        userpopUpHTML += '<ul class="formList">';
        userpopUpHTML += '<li class="icon formPass"><input type="password" id="registration_pwd" name="registration_pwd" value="" placeholder="Password"></li>';
        userpopUpHTML += '<li class="icon formPass"><input type="password" id="registration_pwd2" name="registration_pwd2" value="" placeholder="Confirm Password"></li>';
        userpopUpHTML += '</ul>';
        userpopUpHTML += '</div>';
        userpopUpHTML += '</form>';
        userpopUpHTML += '<div class="result messageBlock"></div>';
        userpopUpHTML += '</div>';
        userpopUpHTML += '</div>';
        userpopUpHTML += '<button title="Close (Esc)" type="button" class="mfp-close">×</button>';
        userpopUpHTML += '</div>';

        jQuery('body').append(userpopUpHTML);

    }
}

