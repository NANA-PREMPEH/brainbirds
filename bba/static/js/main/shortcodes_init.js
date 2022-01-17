// Shortcodes init
function initShortcodes(a) {
    // Tabs
    if (a.find(".sc_tabs:not(.inited),.tabs_area:not(.inited)").length > 0) {
        a.find(".sc_tabs:not(.inited),.tabs_area:not(.inited)").each(function() {
            var c = jQuery(this).data("active");
            if (isNaN(c)) {
                c = 0
            } else {
                c = Math.max(0, c)
            }
            jQuery(this).addClass("inited").tabs({
                active: c,
                show: {
                    effect: "fade",
                    duration: 250
                },
                hide: {
                    effect: "fade",
                    duration: 200
                },
                create: function(d, e) {
                    initShortcodes(e.panel)
                },
                activate: function(d, e) {
                    initShortcodes(e.newPanel)
                }
            })
        })
    }

    // Toggles
    if (a.find(".sc_toggles .sc_toggles_title:not(.inited)").length > 0) {
        a.find(".sc_toggles .sc_toggles_title:not(.inited)").addClass("inited").on("click", function() {
            jQuery(this).parent().toggleClass("sc_active");
            jQuery(this).parent().find(".sc_toggles_content").slideToggle(200, function() {
                initShortcodes(jQuery(this).parent().find(".sc_toggles_content"))
            })
        })
    }

    // Tooltip
    if (a.find(".sc_tooltip_parent:not(.inited)").length > 0) {
        a.find(".sc_tooltip_parent:not(.inited)").addClass("inited").on({
          mouseenter: function(){
            var c = jQuery(this);
                c.find(".sc_tooltip").stop().animate({
                    marginTop: "5"
                }, 100).show();
          },
          mouseleave: function(){
            var c = jQuery(this);
                c.find(".sc_tooltip").stop().animate({
                    marginTop: "0"
                }, 100).hide();
          }
        });
    }

    // Infoboxes
    if (a.find(".sc_infobox.sc_infobox_closeable:not(.inited)").length > 0) {
        a.find(".sc_infobox.sc_infobox_closeable:not(.inited)").addClass("inited").on("click", function() {
            jQuery(this).slideUp()
        })
    }

    // Contact form
    if (a.find(".sc_contact_form .sc_contact_form_submit:not(.inited)").length > 0) {
        a.find(".sc_contact_form .sc_contact_form_submit:not(.inited)").addClass("inited").on("click", function(f) {
            var c = jQuery(this).parents("form");
            var d = c.attr("action");
            userSubmitForm(c, d != undefined ? d : THEMEREX_ajax_url, THEMEREX_ajax_nonce);
            f.preventDefault();
            return false
        })
    }

    // Bordered images
    if (a.find(".sc_border:not(.inited)").length > 0) {
        a.find(".sc_border:not(.inited)").each(function() {
            if (jQuery(this).parents("div:hidden,article:hidden").length > 0) {
                return
            }
            jQuery(this).addClass("inited");
            var c = Math.round(jQuery(this).width());
            var d = Math.round(c / 4 * 3);
            jQuery(this).find(".slides").css({
                height: d + "px"
            });
            jQuery(this).find(".slides li").css({
                width: c + "px",
                height: d + "px"
            })
        })
    }

    // Autoheight sliders
    if (a.find(".sc_slider_autoheight").length > 0) {
        a.find(".sc_slider_autoheight").each(function() {
            jQuery(this).find("li.swiper-slide,li.flex-slide,li.chop-slide").each(function() {
                if (jQuery(this).data("autoheight") == undefined) {
                    jQuery(this).attr("data-autoheight", jQuery(this).height())
                }
            })
        })
    }

    // Flex Slider
    if (a.find(".sc_slider_flex:not(.inited)").length > 0) {
        a.find(".sc_slider_flex:not(.inited)").addClass("inited").each(function() {
            if (jQuery(this).parents("div:hidden,article:hidden").length > 0) {
                return
            }
            if (jQuery(this).parents(".isotopeNOanim:not(.inited),.isotope:not(.inited)").length > 0) {
                return
            }
            jQuery(this).flexslider({
                prevText: "",
                nextText: "",
                directionNav: jQuery(this).hasClass("sc_slider_controls"),
                controlNav: jQuery(this).hasClass("sc_slider_pagination") || jQuery(this).parents(".sc_slider_pagination_area").length > 0,
                animation: "slide",
                animationLoop: true,
                slideshow: !jQuery(this).hasClass("sc_slider_noautoplay"),
                slideshowSpeed: isNaN(jQuery(this).data("interval")) ? 7000 : jQuery(this).data("interval"),
                animationSpeed: 600,
                pauseOnAction: true,
                pauseOnHover: true,
                useCSS: false,
                manualControls: jQuery(this).parents(".sc_slider_pagination_area").length > 0 ? "#" + jQuery(this).attr("id") + "_scroll ul li" : "",
                after: function(c) {
                    if (c.parents(".sc_slider_pagination_area").length > 0) {
                        sliderChangeActivePagination(c, c.currentSlide)
                    }
                }
            });
            calcSliderDimensions(jQuery(this))
        })
    }

    //Countdown
    if (a.find(".sc_countdown:not(.inited)").length > 0) {
        var b = {};
        a.find(".sc_countdown:not(.inited)").each(function() {
            if (jQuery(this).parents("div:hidden,article:hidden").length > 0) {
                return
            }
            jQuery(this).addClass("inited");
            var i = jQuery(this).attr("id");
            if (i == undefined) {
                i = "countdown_" + Math.random();
                i = i.replace(".", "");
                jQuery(this).attr("id", i)
            }
            var e = new Date();
            var d = e.getFullYear() + "-" + (e.getMonth() < 9 ? "0" : "") + (e.getMonth() + 1) + "-" + (e.getDate() < 10 ? "0" : "") + e.getDate();
            var h = jQuery(this).data("date");
            if (h == undefined || h == "" || h < d) {
                h = d
            }
            h = h.split("-");
            var c = jQuery(this).data("time");
            if (c == undefined || c == "") {
                c = "00:00:00"
            }
            c = c.split(":");
            if (c.length == 2) {
                c[2] = 0
            }
            var f = new Date(h[0], h[1] - 1, h[2], c[0], c[1], c[2]);
            var g = Math.round(f.getTime() / 1000 - e.getTime() / 1000);
            b[i] = jQuery("#" + i).FlipClock(g, {
                countdown: true,
                clockFace: "DailyCounter"
            })
        })
    }

    //Zoom
    if (a.find(".sc_zoom:not(.inited)").length > 0) {
        a.find(".sc_zoom:not(.inited)").each(function() {
            if (jQuery(this).parents("div:hidden,article:hidden").length > 0) {
                return
            }
            jQuery(this).addClass("inited");
            jQuery(this).find("img").elevateZoom({
                zoomType: "lens",
                lensShape: "round",
                lensSize: 200
            })
        })
    }

    //Skills init
    if (a.find(".sc_skills_item:not(.inited)").length > 0) {
        skills_init(a);
        jQuery(window).scroll(function() {
            skills_init(a)
        })
    }

    //Skills type='arc' init
    if (a.find(".sc_skills_arc:not(.inited)").length > 0) {
        skills_arc_init(a);
        jQuery(window).scroll(function() {
            skills_arc_init(a)
        })
    }
}

// Slider navigation
var THEMEREX_Swipers = {};
function prepareSliderNavi(b) {
    // Prev / Next
    var a = b.find(".flex-direction-nav");
    if (a.length == 0) {
        a = b.siblings(".flex-direction-nav")
    }
    if (a.length > 0) {
        a.find(".flex-prev").on("click", function(d) {
            var c = jQuery(this).parents(".swiper-slider-container");
            if (c.length == 0) {
                c = jQuery(this).parents(".flex-direction-nav").siblings(".swiper-slider-container")
            }
            var f = c.attr("id");
            /*THEMEREX_Swipers[f].swipePrev();*/
            d.preventDefault();
            return false
        });
        a.find(".flex-next").on("click", function(d) {
            var c = jQuery(this).parents(".swiper-slider-container");
            if (c.length == 0) {
                c = jQuery(this).parents(".flex-direction-nav").siblings(".swiper-slider-container")
            }
            var f = c.attr("id");
            /*THEMEREX_Swipers[f].swipeNext();*/
            d.preventDefault();
            return false
        })
    }
    // Pagination
    a = b.siblings(".flex-control-nav.manual");
    if (a.length > 0) {
        a.find("li").on("click", function(d) {
            var c = jQuery(this).parents(".sc_slider_pagination_area").find(".swiper-slider-container");
            var f = c.attr("id");
            /*THEMEREX_Swipers[f].swipeTo(jQuery(this).index());*/
            d.preventDefault();
            return false
        })
    }
}

function sliderChangeActivePagination(e, a) {
    var g = e.parents(".sc_slider_pagination_area").find(".flex-control-nav.manual");
    g.find("ul li").removeClass("active").eq(a).addClass("active");
    var c = g.height();
    var f = g.find(".active").offset().top - g.offset().top;
    var d = g.find(".sc_scroll_wrapper").offset().top - g.offset().top;
    var b = g.find(".active").height();
    if (f < 0) {
        g.find(".sc_scroll_wrapper").css({
            transform: "translate3d(0px, 0px, 0px)",
            "transition-duration": "0.3s"
        })
    } else {
        if (c <= f + b) {
            g.find(".sc_scroll_wrapper").css({
                transform: "translate3d(0px, -" + (Math.abs(d) + f + b - c / 4) + "px, 0px)",
                "transition-duration": "0.3s"
            })
        }
    }
}

// Slider dimensions
function calcSliderDimensions(d) {
    if (d.height() == 0 || d.hasClass("sc_slider_noresize") || !d.hasClass("inited")) {
        return
    }
    var a = d.data("old-width");
    var c = d.data("old-height");
    if (isNaN(a) || a < 50 || isNaN(c) || c < 50) {
        d.data("old-width", d.width());
        d.data("old-height", d.height())
    } else {
        if (a != d.width()) {
            if (a < d.width()) {
                d.width(a)
            }
            var b = Math.round(d.width() / a * c);
            d.find(".slides").height(b);
            d.find(".slides li").height(b)
        }
    }
}

// skills init
function skills_init(a) {
    if (arguments.length == 0) {
        var a = jQuery("body")
    }
    var b = jQuery(window).scrollTop() + jQuery(window).height();
    a.find(".sc_skills_item:not(.inited)").each(function() {
        var t = jQuery(this);
        var d = t.offset().top;
        if (b > d) {
            t.addClass("inited");
            var v = t.parents(".sc_skills").eq(0);
            var h = v.data("type");
            var y = t.find(".sc_skills_total").eq(0);
            var i = parseInt(y.data("start"), 10);
            var p = parseInt(y.data("stop"), 10);
            var u = parseInt(y.data("max"), 10);
            var x = Math.round(i / u * 100);
            var w = Math.round(p / u * 100);
            var j = y.data("ed");
            var c = parseInt(y.data("duration"), 10);
            var r = parseInt(y.data("speed"), 10);
            var k = parseInt(y.data("step"), 10);
            if (h == "bar") {
                var n = v.data("dir");
                var l = t.find(".sc_skills_count").eq(0);
                if (n == "horizontal") {
                    l.css("width", x + "%").animate({
                        width: w + "%"
                    }, c)
                } else {
                    if (n == "vertical") {
                        l.css("height", x + "%").animate({
                            height: w + "%"
                        }, c)
                    }
                }
                skills_counter(i, p, r - (n != "unknown" ? 5 : 0), k, j, y)
            } else {
                if (h == "counter") {
                    skills_counter(i, p, r - 5, k, j, y)
                } else {
                    if (h == "pie") {
                        var s = parseInt(y.data("steps"), 10);
                        var q = y.data("color");
                        var o = y.data("easing");
                        skills_counter(i, p, Math.round(1500 / s), k, j, y);
                        var g = {
                            segmentShowStroke: true,
                            segmentStrokeColor: "#fff",
                            segmentStrokeWidth: 0,
                            animationSteps: s,
                            animationEasing: o,
                            animateRotate: true,
                            animateScale: true
                        };
                        var f = [{
                            value: w,
                            color: q
                        }, {
                            value: 100 - w,
                            color: "#E5F1FB"
                        }];
                        var e = t.find("canvas");
                        e.attr({
                            width: t.width(),
                            height: t.width()
                        }).css({
                            width: t.width(),
                            height: t.height()
                        });
                        var m = new Chart(e.get(0).getContext("2d")).Pie(f, g)
                    }
                }
            }
        }
    })
}

//skills counter animation
function skills_counter(f, b, e, d, a, c) {
    f = Math.min(b, f + d);
    c.text(f + a);
    if (f < b) {
        setTimeout(function() {
            skills_counter(f, b, e, d, a, c)
        }, e)
    }
}

//skills arc init
function skills_arc_init(a) {
    if (arguments.length == 0) {
        var a = jQuery("body")
    }
    a.find(".sc_skills_arc:not(.inited)").each(function() {
        var f = jQuery(this);
        f.addClass("inited");
        var d = f.find(".sc_skills_data .arc");
        var e = f.find(".sc_skills_arc_canvas").eq(0);
        var g = f.find(".sc_skills_legend").eq(0);
        var b = Math.round(f.width() - g.width());
        var i = Math.floor(b / 2);
        var h = {
            random: function(c, j) {
                return Math.floor((Math.random() * (j - c + 1)) + c)
            },
            diagram: function() {
                var k = Raphael(e.attr("id"), b, b),
                    c = hover = Math.round(b / 2 / d.length),
                    j = Math.round(((b - 20) / 2 - c) / d.length),
                    m = Math.round(b / 9 / d.length),
                    l = 400;
                k.circle(i, i, Math.round(b / 2)).attr({
                    stroke: "none",
                    fill: THEMEREX_theme_skin_bg ? THEMEREX_theme_skin_bg : "#ffffff"
                });
                var n = k.text(i, i, f.data("subtitle")).attr({
                    font: "lighter " + Math.round(c * 0.8) + 'px "' + THEMEREX_theme_font + '"',
                    fill: "#888888"
                }).toFront();
                c -= Math.round(j / 2);
                k.customAttributes.arc = function(B, p, q) {
                    var C = 3.6 * B,
                        o = C == 360 ? 359.99 : C,
                        t = h.random(91, 240),
                        A = (t - o) * Math.PI / 180,
                        u = t * Math.PI / 180,
                        z = i + q * Math.cos(u),
                        s = i - q * Math.sin(u),
                        w = i + q * Math.cos(A),
                        r = i - q * Math.sin(A),
                        D = [
                            ["M", z, s],
                            ["A", q, q, 0, +(o > 180), 1, w, r]
                        ];
                    return {
                        path: D,
                        stroke: p
                    }
                };
                d.each(function(q) {
                    var p = jQuery(this),
                        o = p.find(".color").val(),
                        r = p.find(".percent").val(),
                        u = p.find(".text").text();
                    c += j;
                    var s = k.path().attr({
                        arc: [r, o, c],
                        "stroke-width": m
                    });
                    s.mouseover(function() {
                        this.animate({
                            "stroke-width": hover,
                            opacity: 0.75
                        }, 1000, "elastic");
                        if (Raphael.type != "VML") {
                            this.toFront()
                        }
                        n.stop().animate({
                            opacity: 0
                        }, l, ">", function() {
                            this.attr({
                                text: (u ? u + "\n" : "") + r + "%"
                            }).animate({
                                opacity: 1
                            }, l, "<")
                        })
                    }).mouseout(function() {
                        this.stop().animate({
                            "stroke-width": m,
                            opacity: 1
                        }, l * 4, "elastic");
                        n.stop().animate({
                            opacity: 0
                        }, l, ">", function() {
                            n.attr({
                                text: f.data("subtitle")
                            }).animate({
                                opacity: 1
                            }, l, "<")
                        })
                    })
                })
            }
        };
        h.diagram()
    })
};

// Popup messages
var THEMEREX_MESSAGE_CALLBACK = null;
var THEMEREX_MESSAGE_TIMEOUT = 5000;

// Warning
function themerex_message_warning(c) {
    var d = arguments[1] ? arguments[1] : "";
    var b = arguments[2] ? arguments[2] : "cancel";
    var a = arguments[3] ? arguments[3] : THEMEREX_MESSAGE_TIMEOUT;
    return themerex_message({
        msg: c,
        hdr: d,
        icon: b,
        type: "warning",
        delay: a,
        buttons: [],
        callback: null
    })
}

// Success
function themerex_message_success(c) {
    var d = arguments[1] ? arguments[1] : "";
    var b = arguments[2] ? arguments[2] : "check";
    var a = arguments[3] ? arguments[3] : THEMEREX_MESSAGE_TIMEOUT;
    return themerex_message({
        msg: c,
        hdr: d,
        icon: b,
        type: "success",
        delay: a,
        buttons: [],
        callback: null
    })
}

// Info
function themerex_message_info(c) {
    var d = arguments[1] ? arguments[1] : "";
    var b = arguments[2] ? arguments[2] : "info";
    var a = arguments[3] ? arguments[3] : THEMEREX_MESSAGE_TIMEOUT;
    return themerex_message({
        msg: c,
        hdr: d,
        icon: b,
        type: "info",
        delay: a,
        buttons: [],
        callback: null
    })
}

// Regular
function themerex_message_regular(c) {
    var d = arguments[1] ? arguments[1] : "";
    var b = arguments[2] ? arguments[2] : "quote";
    var a = arguments[3] ? arguments[3] : THEMEREX_MESSAGE_TIMEOUT;
    return themerex_message({
        msg: c,
        hdr: d,
        icon: b,
        type: "regular",
        delay: a,
        buttons: [],
        callback: null
    })
}

// Confirm dialog
function themerex_message_confirm(a) {
    var c = arguments[1] ? arguments[1] : "";
    var b = arguments[2] ? arguments[2] : null;
    return themerex_message({
        msg: a,
        hdr: c,
        icon: "help",
        type: "regular",
        delay: 0,
        buttons: ["Yes", "No"],
        callback: b
    })
}

// Modal dialog
function themerex_message_dialog(a) {
    var d = arguments[1] ? arguments[1] : "";
    var b = arguments[2] ? arguments[2] : null;
    var c = arguments[3] ? arguments[3] : null;
    return themerex_message({
        msg: a,
        hdr: d,
        icon: "",
        type: "regular",
        delay: 0,
        buttons: ["Apply", "Cancel"],
        init: b,
        callback: c
    })
}

// General message window
function themerex_message(b) {
    var c = b.msg != undefined ? b.msg : "";
    var l = b.hdr != undefined ? b.hdr : "";
    var k = b.icon != undefined ? b.icon : "";
    var h = b.type != undefined ? b.type : "regular";
    var e = b.delay != undefined ? b.delay : THEMEREX_MESSAGE_TIMEOUT;
    var g = b.buttons != undefined ? b.buttons : [];
    var n = b.init != undefined ? b.init : null;
    var m = b.callback != undefined ? b.callback : null;
    // Modal bg
    jQuery("#themerex_modal_bg").remove();
    jQuery("body").append('<div id="themerex_modal_bg"></div>');
    jQuery("#themerex_modal_bg").fadeIn();
    // Popup window
    jQuery(".themerex_message").remove();
    var f = '<div class="themerex_message themerex_message_' + h + (g.length > 0 ? " themerex_message_dialog" : "") + '"><span class="themerex_message_close iconadmin-cancel icon-cancel"></span>' + (k ? '<span class="themerex_message_icon iconadmin-' + k + " icon-" + k + '"></span>' : "") + (l ? '<h2 class="themerex_message_header">' + l + "</h2>" : "");
    f += '<div class="themerex_message_body">' + c + "</div>";
    if (g.length > 0) {
        f += '<div class="themerex_message_buttons">';
        for (var d = 0; d < g.length; d++) {
            f += '<span class="themerex_message_button">' + g[d] + "</span>"
        }
        f += "</div>"
    }
    f += "</div>";
    // Add popup to body
    jQuery("body").append(f);
    var a = jQuery("body .themerex_message").eq(0);
    // Prepare callback on buttons click
    if (m != null) {
        THEMEREX_MESSAGE_CALLBACK = m;
        jQuery(".themerex_message_button").on("click", function(o) {
            var i = jQuery(this).index();
            m(i + 1, a);
            THEMEREX_MESSAGE_CALLBACK = null;
            themerex_message_destroy()
        })
    }
    // Call init function
    if (n != null) {
        n(a)
    }
    // Show (animate) popup
    var j = jQuery(window).scrollTop();
    jQuery("body .themerex_message").animate({
        top: j + Math.round((jQuery(window).height() - jQuery(".themerex_message").height()) / 2),
        opacity: 1
    }, {
        complete: function() {}
    // Call init function
    //if (init != null) init(popup);    
    });
    // Delayed destroy (if need)
    if (e > 0) {
        setTimeout(function() {
            themerex_message_destroy()
        }, e)
    }
    return a
}

// Destroy message window
function themerex_message_destroy() {
    var a = jQuery(window).scrollTop();
    jQuery("#themerex_modal_bg").fadeOut();
    jQuery(".themerex_message").animate({
        top: a - jQuery(".themerex_message").height(),
        opacity: 0
    });
    setTimeout(function() {
        jQuery("#themerex_modal_bg").remove();
        jQuery(".themerex_message").remove()
    }, 500)
};


//  Stylesheets manipulations
function setStateStyleSheet(e, d) {
    var c, b;
    for (c = 0;
        (b = document.getElementsByTagName("link")[c]); c++) {
        if (b.getAttribute("rel").indexOf("style") != -1 && b.getAttribute("title")) {
            if (b.getAttribute("title") == e) {
                b.disabled = !d
            }
        }
    }
}

function getStateStyleSheet(f, d) {
    var c, b, e = -1;
    for (c = 0;
        (b = document.getElementsByTagName("link")[c]); c++) {
        if (b.getAttribute("rel").indexOf("style") != -1 && b.getAttribute("title")) {
            if (b.getAttribute("title") == f) {
                e = b.disabled ? 0 : 1;
                break
            }
        }
    }
    return e
}

function setActiveStyleSheet(f, e) {
    var d, c, b;
    for (d = 0;
        (c = document.getElementsByTagName("link")[d]); d++) {
        if (c.getAttribute("rel").indexOf("style") != -1 && c.getAttribute("title")) {
            if (e) {
                c.disabled = true
            }
            if (c.getAttribute("title") == f) {
                c.disabled = false
            }
        }
    }
}

function getActiveStyleSheet() {
    var c, b;
    for (c = 0;
        (b = document.getElementsByTagName("link")[c]); c++) {
        if (b.getAttribute("rel").indexOf("style") != -1 && b.getAttribute("title") && !b.disabled) {
            return b.getAttribute("title")
        }
    }
    return null
}

function getPreferredStyleSheet() {
    var c, b;
    for (c = 0;
        (b = document.getElementsByTagName("link")[c]); c++) {
        if (b.getAttribute("rel").indexOf("style") != -1 && b.getAttribute("rel").indexOf("alt") == -1 && b.getAttribute("title")) {
            return b.getAttribute("title")
        }
    }
    return null
}

//  ListBox & ComboBox manipulations
function addListBoxItem(b, d, c) {
    var a = new Option();
    a.value = d;
    a.text = c;
    b.options.add(a)
}

function clearListBox(b) {
    for (var a = b.options.length - 1; a >= 0; a--) {
        b.options[a] = null
    }
}

function delListBoxItemByValue(b, c) {
    for (var a = 0; a < b.options.length; a++) {
        if (b.options[a].value == c) {
            b.options[a] = null;
            break
        }
    }
}

function delListBoxItemByText(c, a) {
    for (var b = 0; b < c.options.length; b++) {
        if (c.options[b].text == a) {
            c.options[b] = null;
            break
        }
    }
}

function findListBoxItemByValue(c, d) {
    var a = -1;
    for (var b = 0; b < c.options.length; b++) {
        if (c.options[b].value == d) {
            a = b;
            break
        }
    }
    return a
}

function findListBoxItemByText(d, b) {
    var a = -1;
    for (var c = 0; c < d.options.length; c++) {
        if (d.options[c].text == b) {
            a = c;
            break
        }
    }
    return a
}

function selectListBoxItemByValue(b, c) {
    for (var a = 0; a < b.options.length; a++) {
        b.options[a].selected = (c == b.options[a].value)
    }
}

function selectListBoxItemByText(c, a) {
    for (var b = 0; b < c.options.length; b++) {
        c.options[b].selected = (a == c.options[b].text)
    }
}

function getListBoxValues(b) {
    var d = arguments[1] ? arguments[1] : ",";
    var c = "";
    for (var a = 0; a < b.options.length; a++) {
        c += (c ? d : "") + b.options[a].value
    }
    return c
}

function getListBoxTexts(b) {
    var d = arguments[1] ? arguments[1] : ",";
    var c = "";
    for (var a = 0; a < b.options.length; a++) {
        c += (c ? d : "") + b.options[a].text
    }
    return c
}

function sortListBox(d) {
    var e = new Array();
    var b = new Option();
    for (var c = 0; c < d.options.length; c++) {
        e[c] = d.options[c].clone()
    }
    for (var a = 0; a < e.length - 1; a++) {
        for (var f = (a + 1); f < e.length; f++) {
            if (e[a].text > e[f].text) {
                b = e[a];
                e[a] = e[f];
                e[f] = b
            }
        }
    }
    for (var c = 0; c < d.options.length; c++) {
        d.options[c] = e[c].clone()
    }
}

function getListBoxSelectedIndex(b) {
    for (var a = 0; a < b.options.length; a++) {
        if (b.options[a].selected) {
            return a
        }
    }
    return -1
}

function getListBoxSelectedValue(b) {
    for (var a = 0; a < b.options.length; a++) {
        if (b.options[a].selected) {
            return b.options[a].value
        }
    }
    return null
}

function getListBoxSelectedText(b) {
    for (var a = 0; a < b.options.length; a++) {
        if (b.options[a].selected) {
            return b.options[a].text
        }
    }
    return null
}

function getListBoxSelectedOption(b) {
    for (var a = 0; a < b.options.length; a++) {
        if (b.options[a].selected) {
            return b.options[a]
        }
    }
    return null
}

//  Radiobuttons manipulations
function getRadioGroupValue(b) {
    for (var a = 0; a < b.length; a++) {
        if (b[a].checked) {
            return b[a].value
        }
    }
    return null
}

function setRadioGroupCheckedByNum(c, a) {
    for (var b = 0; b < c.length; b++) {
        if (c[b].checked && b != a) {
            c[b].checked = false
        } else {
            if (b == a) {
                c[b].checked = true
            }
        }
    }
}

function setRadioGroupCheckedByValue(b, c) {
    for (var a = 0; a < b.length; a++) {
        if (b[a].checked && b[a].value != c) {
            b[a].checked = false
        } else {
            if (b[a].value == c) {
                b[a].checked = true
            }
        }
    }
}

//  Array manipulations
function sortArray(c) {
    var b = arguments[1] ? arguments[1] : false;
    for (var a = 0; a < c.length - 1; a++) {
        for (var d = (a + 1); d < c.length; d++) {
            if (b) {
                if (c[a] > c[d]) {
                    tmp = c[a];
                    c[a] = c[d];
                    c[d] = tmp
                }
            } else {
                if (c[a].toLowerCase() > c[d].toLowerCase()) {
                    tmp = c[a];
                    c[a] = c[d];
                    c[d] = tmp
                }
            }
        }
    }
}

//  String functions
function inList(d, g) {
    var f = arguments[2] ? arguments[2] : "|";
    var c = arguments[3] ? arguments[3] : true;
    var a = false;
    if (c) {
        g = g.toLowerCase();
        d = d.toLowerCase()
    }
    var e = d.split(f);
    for (var b = 0; b < e.length; b++) {
        if (e[b] == g) {
            a = true;
            break
        }
    }
    return a
}

function alltrim(e) {
    var b = arguments[1] ? arguments[1] : "a";
    var d = "";
    var c, f = 0,
        a = e.length - 1;
    if (b == "a" || b == "l") {
        for (c = 0; c < e.length; c++) {
            if (e.substr(c, 1) != " ") {
                f = c;
                break
            }
        }
    }
    if (b == "a" || b == "r") {
        for (c = e.length - 1; c >= 0; c--) {
            if (e.substr(c, 1) != " ") {
                a = c;
                break
            }
        }
    }
    return e.substring(f, a + 1)
}

function ltrim(a) {
    return alltrim(a, "l")
}

function rtrim(a) {
    return alltrim(a, "r")
}

function padl(e, a) {
    var c = arguments[2] ? arguments[2] : " ";
    var d = e.substr(0, a);
    if (d.length < a) {
        for (var b = 0; b < a - e.length; b++) {
            d += c
        }
    }
    return d
}

function padr(e, a) {
    var c = arguments[2] ? arguments[2] : " ";
    var d = e.substr(0, a);
    if (d.length < a) {
        for (var b = 0; b < a - e.length; b++) {
            d = c + d
        }
    }
    return d
}

function padc(e, a) {
    var c = arguments[2] ? arguments[2] : " ";
    var d = e.substr(0, a);
    if (d.length < a) {
        for (var b = 0; b < Math.floor((a - e.length) / 2); b++) {
            d = c + d + c
        }
    }
    return d + (d.length < a ? c : "")
}

function replicate(d, a) {
    var c = "";
    for (var b = 0; b < a; b++) {
        c += d
    }
    return c
}

// Numbers functions
// Clear number from any characters and append it with 0 to desired precision
function clearNumber(c) {
    var b = arguments[1] ? arguments[1] : 0;
    var g = arguments[2] ? arguments[2] : 0;
    var e = "";
    var a = -1;
    c = "" + c;
    if (c == "") {
        c = "" + g
    }
    for (var d = 0; d < c.length; d++) {
        if (a == 0) {
            break
        } else {
            if (a > 0) {
                a--
            }
        }
        var f = c.substr(d, 1);
        if (f == ".") {
            if (b > 0) {
                e += f
            }
            a = b
        } else {
            if ((f >= 0 && f <= 9) || (f == "-" && d == 0)) {
                e += f
            }
        }
    }
    if (b > 0 && a != 0) {
        if (a == -1) {
            e += ".";
            a = b
        }
        for (d = a; d > 0; d--) {
            e += "0"
        }
    }
    return e
}

function dec2hex(a) {
    return Number(a).toString(16)
}

function hex2dec(a) {
    return parseInt(a, 16)
}

function roundNumber(b) {
    var a = arguments[1] ? arguments[1] : 0;
    var c = Math.pow(10, a);
    return Math.round(b * c) / c
}

//  Color manipulations
function hex2rgb(a) {
    a = parseInt(((a.indexOf("#") > -1) ? a.substring(1) : a), 16);
    return {
        r: a >> 16,
        g: (a & 65280) >> 8,
        b: (a & 255)
    }
}

function rgb2hex(a) {
    var c;
    a = a.replace(/\s/g, "").toLowerCase();
    if (a == "rgba(0,0,0,0)" || a == "rgba(0%,0%,0%,0%)") {
        a = "transparent"
    }
    if (a.indexOf("rgba(") == 0) {
        c = a.match(/^rgba\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i)
    } else {
        c = a.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i)
    }
    if (c) {
        a = "";
        for (var b = 1; b <= 3; b++) {
            a += Math.round((c[b][c[b].length - 1] == "%" ? 2.55 : 1) * parseInt(c[b])).toString(16).replace(/^(.)$/, "0$1")
        }
    } else {
        a = a.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, "$1$1$2$2$3$3")
    }
    return (a.substr(0, 1) != "#" ? "#" : "") + a
}

function _rgb2hex(d, c, a) {
    return "#" + Number(d).toString(16).toUpperCase().replace(/^(.)$/, "0$1") + Number(c).toString(16).toUpperCase().replace(/^(.)$/, "0$1") + Number(a).toString(16).toUpperCase().replace(/^(.)$/, "0$1")
}

function hex2hsb(a) {
    return rgb2hsb(hex2rgb(a))
}

function hsb2hex(a) {
    var b = hsb2rgb(a);
    return _rgb2hex(b.r, b.g, b.b)
}

function rgb2hsb(b) {
    var a = {};
    a.b = Math.max(Math.max(b.r, b.g), b.b);
    a.s = (a.b <= 0) ? 0 : Math.round(100 * (a.b - Math.min(Math.min(b.r, b.g), b.b)) / a.b);
    a.b = Math.round((a.b / 255) * 100);
    if ((b.r == b.g) && (b.g == b.b)) {
        a.h = 0
    } else {
        if (b.r >= b.g && b.g >= b.b) {
            a.h = 60 * (b.g - b.b) / (b.r - b.b)
        } else {
            if (b.g >= b.r && b.r >= b.b) {
                a.h = 60 + 60 * (b.g - b.r) / (b.g - b.b)
            } else {
                if (b.g >= b.b && b.b >= b.r) {
                    a.h = 120 + 60 * (b.b - b.r) / (b.g - b.r)
                } else {
                    if (b.b >= b.g && b.g >= b.r) {
                        a.h = 180 + 60 * (b.b - b.g) / (b.b - b.r)
                    } else {
                        if (b.b >= b.r && b.r >= b.g) {
                            a.h = 240 + 60 * (b.r - b.g) / (b.b - b.g)
                        } else {
                            if (b.r >= b.b && b.b >= b.g) {
                                a.h = 300 + 60 * (b.r - b.b) / (b.r - b.g)
                            } else {
                                a.h = 0
                            }
                        }
                    }
                }
            }
        }
    }
    a.h = Math.round(a.h);
    return a
}

function hsb2rgb(a) {
    var c = {};
    var g = Math.round(a.h);
    var f = Math.round(a.s * 255 / 100);
    var b = Math.round(a.b * 255 / 100);
    if (f == 0) {
        c.r = c.g = c.b = b
    } else {
        var i = b;
        var e = (255 - f) * b / 255;
        var d = (i - e) * (g % 60) / 60;
        if (g == 360) {
            g = 0
        }
        if (g < 60) {
            c.r = i;
            c.b = e;
            c.g = e + d
        } else {
            if (g < 120) {
                c.g = i;
                c.b = e;
                c.r = i - d
            } else {
                if (g < 180) {
                    c.g = i;
                    c.r = e;
                    c.b = e + d
                } else {
                    if (g < 240) {
                        c.b = i;
                        c.r = e;
                        c.g = i - d
                    } else {
                        if (g < 300) {
                            c.b = i;
                            c.g = e;
                            c.r = e + d
                        } else {
                            if (g < 360) {
                                c.r = i;
                                c.g = e;
                                c.b = i - d
                            } else {
                                c.r = 0;
                                c.g = 0;
                                c.b = 0
                            }
                        }
                    }
                }
            }
        }
    }
    return {
        r: Math.round(c.r),
        g: Math.round(c.g),
        b: Math.round(c.b)
    }
}

function split_rgb(a) {
    a = rgb2hex(a);
    var d = a.match(/^#?([\dabcdef]{2})([\dabcdef]{2})([\dabcdef]{2})$/i);
    if (!d) {
        return false
    }
    for (var c = 1, b = new Array(3); c <= 3; c++) {
        b[c - 1] = parseInt(d[c], 16)
    }
    return b
}

function iColorPicker() {
    var e = arguments[0] ? arguments[0] : "iColorPicker" + Math.round(Math.random() * 1000);
    var a = arguments[1] ? arguments[1] : "#f00,#ff0,#0f0,#0ff,#00f,#f0f,#fff,#ebebeb,#e1e1e1,#d7d7d7,#cccccc,#c2c2c2,#b7b7b7,#acacac,#a0a0a0,#959595,#ee1d24,#fff100,#00a650,#00aeef,#2f3192,#ed008c,#898989,#7d7d7d,#707070,#626262,#555,#464646,#363636,#262626,#111,#000,#f7977a,#fbad82,#fdc68c,#fff799,#c6df9c,#a4d49d,#81ca9d,#7bcdc9,#6ccff7,#7ca6d8,#8293ca,#8881be,#a286bd,#bc8cbf,#f49bc1,#f5999d,#f16c4d,#f68e54,#fbaf5a,#fff467,#acd372,#7dc473,#39b778,#16bcb4,#00bff3,#438ccb,#5573b7,#5e5ca7,#855fa8,#a763a9,#ef6ea8,#f16d7e,#ee1d24,#f16522,#f7941d,#fff100,#8fc63d,#37b44a,#00a650,#00a99e,#00aeef,#0072bc,#0054a5,#2f3192,#652c91,#91278f,#ed008c,#ee105a,#9d0a0f,#a1410d,#a36209,#aba000,#588528,#197b30,#007236,#00736a,#0076a4,#004a80,#003370,#1d1363,#450e61,#62055f,#9e005c,#9d0039,#790000,#7b3000,#7c4900,#827a00,#3e6617,#045f20,#005824,#005951,#005b7e,#003562,#002056,#0c004b,#30004a,#4b0048,#7a0045,#7a0026";
    var b = a.split(",");
    var d = '<table class="colorPickerTable"><thead>';
    for (var c = 0; c < b.length; c++) {
        if (c % 16 == 0) {
            d += (c > 0 ? "</tr>" : "") + "<tr>"
        }
        d += '<td style="background-color:' + b[c] + '">&nbsp;</td>'
    }
    d += '</tr></thead><tbody><tr style="height:60px;"><td colspan="8" id="' + e + '_colorPreview" style="vertical-align:middle;text-align:center;border:1px solid #000;background:#fff;"><input style="width:55px;color:#000;border:1px solid rgb(0, 0, 0);padding:5px;background-color:#fff;font:11px Arial, Helvetica, sans-serif;" maxlength="7" /><a href="#" id="' + e + '_moreColors" class="iColorPicker_moreColors"></a></td><td colspan="8" id="' + e + '_colorOriginal" style="vertical-align:middle;text-align:center;border:1px solid #000;background:#fff;"><input style="width:55px;color:#000;border:1px solid rgb(0, 0, 0);padding:5px;background-color:#fff;font:11px Arial, Helvetica, sans-serif;" readonly="readonly" /></td></tr></tbody></table>';
    jQuery(document.createElement("div")).attr("id", e).css("display", "none").html(d).appendTo("body").addClass("iColorPickerTable").on("mouseover", "thead td", function() {
        var f = rgb2hex(jQuery(this).css("background-color"));
        jQuery("#" + e + "_colorPreview").css("background", f);
        jQuery("#" + e + "_colorPreview input").val(f)
    }).on("keypress", "#" + e + "_colorPreview input", function(g) {
        var h = jQuery(this).val();
        if (h.length < 7 && ((g.which >= 48 && g.which <= 57) || (g.which >= 97 && g.which <= 102) || (g.which === 35 || h.length === 0))) {
            h += String.fromCharCode(g.which)
        } else {
            if (g.which == 8 && h.length > 0) {
                h = h.substring(0, h.length - 1)
            } else {
                if (g.which === 13 && (h.length === 4 || h.length === 7)) {
                    var f = jQuery("#" + e).data("field");
                    var i = jQuery("#" + e).data("func");
                    if (i != null && i != "undefined") {
                        i(f, h)
                    } else {
                        f.val(h).css("backgroundColor", h).trigger("change")
                    }
                    jQuery("#" + e + "_Bg").fadeOut(500);
                    jQuery("#" + e).fadeOut(500)
                } else {
                    g.preventDefault();
                    return false
                }
            }
        }
        if (h.substr(0, 1) === "#" && (h.length === 4 || h.length === 7)) {
            jQuery("#" + e + "_colorPreview").css("background", h)
        }
    }).on("click", "thead td", function(i) {
        var f = jQuery("#" + e).data("field");
        var h = jQuery("#" + e).data("func");
        var g = rgb2hex(jQuery(this).css("background-color"));
        if (h != null && h != "undefined") {
            h(f, g)
        } else {
            f.val(g).css("backgroundColor", g).trigger("change")
        }
        jQuery("#" + e + "_Bg").fadeOut(500);
        jQuery("#" + e).fadeOut(500);
        i.preventDefault();
        return false
    }).on("click", "tbody .iColorPicker_moreColors", function(m) {
        var l = jQuery(this).parents("table").find("thead");
        var h = "";
        if (l.hasClass("more_colors")) {
            for (var k = 0; k < b.length; k++) {
                if (k % 16 == 0) {
                    h += (k > 0 ? "</tr>" : "") + "<tr>"
                }
                h += '<td style="background-color:' + b[k] + '">&nbsp;</td>'
            }
            l.removeClass("more_colors").empty().html(h + "</tr>");
            jQuery("#" + e + "_colorPreview").attr("colspan", 8);
            jQuery("#" + e + "_colorOriginal").attr("colspan", 8)
        } else {
            var g = [0, 0, 0],
                k = 0,
                f = -1;
            while (g[0] < 15 || g[1] < 15 || g[2] < 15) {
                if (k % 18 == 0) {
                    h += (k > 0 ? "</tr>" : "") + "<tr>"
                }
                k++;
                h += '<td style="background-color:' + _rgb2hex(g[0] * 16 + g[0], g[1] * 16 + g[1], g[2] * 16 + g[2]) + '">&nbsp;</td>';
                g[2] += 3;
                if (g[2] > 15) {
                    g[1] += 3;
                    if (g[1] > (f === 0 ? 6 : 15)) {
                        g[0] += 3;
                        if (g[0] > 15) {
                            if (f === 0) {
                                f = 1;
                                g[0] = 0;
                                g[1] = 9;
                                g[2] = 0
                            } else {
                                break
                            }
                        } else {
                            g[1] = (f < 1 ? 0 : 9);
                            g[2] = 0
                        }
                    } else {
                        g[2] = 0
                    }
                }
            }
            l.addClass("more_colors").empty().html(h + '<td  style="background-color:#ffffff" colspan="8">&nbsp;</td></tr>');
            jQuery("#" + e + "_colorPreview").attr("colspan", 9);
            jQuery("#" + e + "_colorOriginal").attr("colspan", 9)
        }
        jQuery("#" + e + " table.colorPickerTable thead td").css({
            width: "12px",
            height: "14px",
            border: "1px solid #000",
            cursor: "pointer"
        });
        m.preventDefault();
        return false
    });
    jQuery(document.createElement("div")).attr("id", e + "_Bg").on("click", function(f) {
        jQuery("#" + e + "_Bg").fadeOut(500);
        jQuery("#" + e).fadeOut(500);
        f.preventDefault();
        return false
    }).appendTo("body");
    jQuery("#" + e + " table.colorPickerTable thead td").css({
        width: "12px",
        height: "14px",
        border: "1px solid #000",
        cursor: "pointer"
    });
    jQuery("#" + e + " table.colorPickerTable").css({
        "border-collapse": "collapse"
    });
    jQuery("#" + e).css({
        border: "1px solid #ccc",
        background: "#333",
        padding: "5px",
        color: "#fff",
        "z-index": 999999
    });
    jQuery("#" + e + "_colorPreview").css({
        height: "50px"
    });
    return e
}

function iColorShow(a, d, c) {
    if (a === null || a === "") {
        a = jQuery(".iColorPickerTable").attr("id")
    }
    var g = d.offset();
    var i = jQuery("#" + a).width();
    var f = jQuery("#" + a).height();
    var e = g.left + i < jQuery(window).width() - 10 ? g.left : jQuery(window).width() - 10 - i;
    var j = g.top + d.outerHeight() + f < jQuery(document).scrollTop() + jQuery(window).height() - 10 ? g.top + d.outerHeight() : g.top - f - 13;
    jQuery("#" + a).data({
        field: d,
        func: c
    }).css({
        top: j + "px",
        left: e + "px",
        position: "absolute",
        "z-index": 100001
    }).fadeIn(500);
    jQuery("#" + a + "_Bg").css({
        position: "fixed",
        "z-index": 100000,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
    }).fadeIn(500);
    var b = d.val().substr(0, 1) == "#" ? d.val() : rgb2hex(d.css("backgroundColor"));
    jQuery("#" + a + "_colorPreview input,#" + a + "_colorOriginal input").val(b);
    jQuery("#" + a + "_colorPreview,#" + a + "_colorOriginal").css("background", b)
}

// Cookies manipulations
function getCookie(c) {
    var d = arguments[1] != "undefined" ? arguments[1] : null;
    var e = document.cookie.indexOf(c + "=");
    var a = e + c.length + 1;
    if ((!e) && (c != document.cookie.substring(0, c.length))) {
        return d
    }
    if (e == -1) {
        return d
    }
    var b = document.cookie.indexOf(";", a);
    if (b == -1) {
        b = document.cookie.length
    }
    return unescape(document.cookie.substring(a, b))
}

function setCookie(c, e, a, h, d, g) {
    var b = new Date();
    b.setTime(b.getTime());
    if (a) {
        a = a * 1000
    }
    var f = new Date(b.getTime() + (a));
    document.cookie = c + "=" + escape(e) + ((a) ? ";expires=" + f.toGMTString() : "") + ((h) ? ";path=" + h : "") + ((d) ? ";domain=" + d : "") + ((g) ? ";secure" : "")
}

function deleteCookie(a, c, b) {
    if (getCookie(a)) {
        document.cookie = a + "=" + ((c) ? ";path=" + c : "") + ((b) ? ";domain=" + b : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT"
    }
}

// Date manipulations
// Return array[Year, Month, Day, Hours, Minutes, Seconds]
// from string: Year[-/.]Month[-/.]Day[T ]Hours:Minutes:Seconds
function dateParse(c) {
    c = c.replace(/\//g, "-").replace(/\./g, "-").replace(/T/g, " ").split("+")[0];
    var a = c.split(" ");
    var e = a[0].split("-");
    var b = a[1].split(":");
    e.push(b[0], b[1], b[2]);
    return e
}

function dateDifference(d) {
    var c = arguments[1] !== undefined ? arguments[1] : "";
    var g = arguments[2] !== undefined ? arguments[2] : true;
    var f = arguments[3] !== undefined ? arguments[3] : false;
    var b = dateParse(d);
    d = Date.UTC(b[0], b[1], b[2], b[3], b[4], b[5]);
    if (c == "") {
        c = new Date();
        var a = [c.getFullYear(), c.getMonth() + 1, c.getDate(), c.getHours(), c.getMinutes(), c.getSeconds()]
    } else {
        var a = dateParse(c)
    }
    c = Date.UTC(a[0], a[1], a[2], a[3], a[4], a[5]);
    var i = Math.round((c - d) / 1000);
    var j = Math.floor(i / (24 * 3600));
    i -= j * 24 * 3600;
    var h = Math.floor(i / 3600);
    i -= h * 3600;
    var e = Math.floor(i / 60);
    i -= e * 60;
    rez = "";
    if (j > 0) {
        rez += (rez != "" ? " " : "") + j + " day" + (j > 1 ? "s" : "")
    }
    if ((!g || rez == "") && h > 0) {
        rez += (rez != "" ? " " : "") + h + " hour" + (h > 1 ? "s" : "")
    }
    if ((!g || rez == "") && e > 0) {
        rez += (rez != "" ? " " : "") + e + " minute" + (e > 1 ? "s" : "")
    }
    if (f || rez == "") {
        rez += rez != "" || f ? (" " + i + " second" + (i > 1 ? "s" : "")) : "less then minute"
    }
    return rez
}

// Form validation
function formValidate(c, b) {
    var a = "";
    c.find(":input").each(function() {
        if (a != "" && b.exit_after_first_error) {
            return
        }
        for (var e = 0; e < b.rules.length; e++) {
            if (jQuery(this).attr("name") == b.rules[e].field) {
                var g = jQuery(this).val();
                var d = false;
                if (typeof(b.rules[e].min_length) == "object") {
                    if (b.rules[e].min_length.value > 0 && g.length < b.rules[e].min_length.value) {
                        if (a == "") {
                            jQuery(this).get(0).focus()
                        }
                        a += '<p class="error_item">' + (typeof(b.rules[e].min_length.message) != "undefined" ? b.rules[e].min_length.message : b.error_message_text) + "</p>";
                        d = true
                    }
                }
                if ((!d || !b.exit_after_first_error) && typeof(b.rules[e].max_length) == "object") {
                    if (b.rules[e].max_length.value > 0 && g.length > b.rules[e].max_length.value) {
                        if (a == "") {
                            jQuery(this).get(0).focus()
                        }
                        a += '<p class="error_item">' + (typeof(b.rules[e].max_length.message) != "undefined" ? b.rules[e].max_length.message : b.error_message_text) + "</p>";
                        d = true
                    }
                }
                if ((!d || !b.exit_after_first_error) && typeof(b.rules[e].mask) == "object") {
                    if (b.rules[e].mask.value != "") {
                        var f = new RegExp(b.rules[e].mask.value);
                        if (!f.test(g)) {
                            if (a == "") {
                                jQuery(this).get(0).focus()
                            }
                            a += '<p class="error_item">' + (typeof(b.rules[e].mask.message) != "undefined" ? b.rules[e].mask.message : b.error_message_text) + "</p>";
                            d = true
                        }
                    }
                }
                if ((!d || !b.exit_after_first_error) && typeof(b.rules[e].equal_to) == "object") {
                    if (b.rules[e].equal_to.value != "" && g != jQuery(jQuery(this).get(0).form[b.rules[e].equal_to.value]).val()) {
                        if (a == "") {
                            jQuery(this).get(0).focus()
                        }
                        a += '<p class="error_item">' + (typeof(b.rules[e].equal_to.message) != "undefined" ? b.rules[e].equal_to.message : b.error_message_text) + "</p>";
                        d = true
                    }
                }
                if (b.error_fields_class != "") {
                    jQuery(this).toggleClass(b.error_fields_class, d)
                }
            }
        }
    });
    if (a != "" && b.error_message_show) {
        THEMEREX_error_msg_box = c.find(".result");
        if (THEMEREX_error_msg_box.length == 0) {
            THEMEREX_error_msg_box = c.parent().find(".result")
        }
        if (THEMEREX_error_msg_box.length == 0) {
            c.append('<div class="result"></div>');
            THEMEREX_error_msg_box = c.find(".result")
        }
        if (b.error_message_class) {
            THEMEREX_error_msg_box.toggleClass(b.error_message_class, true)
        }
        THEMEREX_error_msg_box.html(a).fadeIn();
        setTimeout(function() {
            THEMEREX_error_msg_box.fadeOut()
        }, b.error_message_time)
    }
    return a != ""
}

// Document manipulations

// Animated scroll to selected id
function animateTo(e) {
    if (e.indexOf("#") == -1) {
        e = "#" + e
    }
    var d = jQuery(e).eq(0);
    if (d.length == 0) {
        return
    }
    var b = jQuery(e).offset().top;
    var a = jQuery(window).scrollTop();
    var c = Math.min(1600, Math.max(400, Math.round(Math.abs(b - a) / jQuery(window).height() * 100)));
    jQuery("body,html").animate({
        scrollTop: b - jQuery("#wpadminbar").height() - jQuery("header.fixedTopMenu .topWrap").height()
    }, c, "swing")
}

// Change browser address without reload page
function setLocation(a) {
    try {
        history.pushState(null, null, a);
        return
    } catch (b) {}
    location.href = a
}

// Browser detection
function isMobile() {
    var a = false;
    (function(b) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))) {
            a = true
        }
    })(navigator.userAgent || navigator.vendor || window.opera);
    return a
}

function isiOS() {
    return navigator.userAgent.match(/iPad|iPhone|iPod/i) != null
}

// File functions
function getFileName(a) {
    a = a.replace(/\\/g, "/");
    var b = a.lastIndexOf("/");
    if (b >= 0) {
        a = a.substr(b + 1)
    }
    return a
}

function getFileExt(a) {
    var b = a.lastIndexOf(".");
    a = b >= 0 ? a.substr(b + 1) : "";
    return a
}

// PHP-style functions
function isset(a) {
    return a != undefined
}

function empty(a) {
    return a == undefined || (typeof(a) == "object" && a == null) || (typeof(a) == "array" && a.length == 0) || (typeof(a) == "string" && alltrim(a) == "")
}

function is_array(a) {
    return typeof(a) == "array"
}

function is_object(a) {
    return typeof(a) == "object"
}

function in_array(d, b) {
    var c = false;
    for (var a = 0; a < b.length - 1; a++) {
        if (b[a] == d) {
            c = true;
            break
        }
    }
    return c
}

function clone(c) {
    if (c == null || typeof(c) != "object") {
        return c
    }
    var a = {};
    for (var b in c) {
        a[b] = clone(c[b])
    }
    return a
}

// Debug functions
function objDisplay(e) {
    var c = arguments[1] ? arguments[1] : false;
    var b = arguments[2] ? arguments[2] : false;
    var d = arguments[3] ? arguments[3] : false;
    var h = arguments[4] ? arguments[4] : 0;
    var g = "";
    var a = "";
    if (h > 0) {
        g += (e === null ? "null" : typeof(e)) + (c ? "\n<br />" : "\n");
        a = replicate(c ? "&nbsp;" : " ", h * 2)
    }
    if (e !== null) {
        for (var f in e) {
            if (!d && typeof(e[f]) == "function") {
                continue
            }
            if (b && (typeof(e[f]) == "object" || typeof(e[f]) == "array") && e[f] != e) {
                g += a + (c ? "<b>" : "") + f + (c ? "</b>" : "") + "=" + objDisplay(e[f], c, b, d, h + 1)
            } else {
                g += a + (c ? "<b>" : "") + f + (c ? "</b>" : "") + "=" + (typeof(e[f]) == "string" ? '"' : "") + e[f] + (typeof(e[f]) == "string" ? '"' : "") + (c ? "\n<br />" : "\n")
            }
        }
    }
    return g
}

function cl(a) {
    console.log(a)
}

function cd(a) {
    console.log(objDisplay(a))
}

function al(a) {
    if (typeof THEMEREX_userLoggedIn != "undefined" && THEMEREX_userLoggedIn) {
        alert(a)
    }
}

function ad(a) {
    if (typeof THEMEREX_userLoggedIn != "undefined" && THEMEREX_userLoggedIn) {
        alert(objDisplay(a))
    }
}

/* Reviews */
function setAverageMark(c) {
    var b = 0;
    var a = 0;
    c.find(".ratingEdit").each(function() {
        b += parseFloat(jQuery(this).data("mark"));
        a++
    });
    b = a > 0 ? Math.round(b / a * 10) / 10 : "0";
    if (reviews_max_level < 100 && String(b).indexOf(".") < 0) {
        b += ".0"
    }
    c.find(".infoTotal").find(".totalRating").html(b).end().find(".ratingItem").data("mark", b).find(".starHover").css("width", Math.round(b / reviews_max_level * 100) + "%")
}

function marksToDisplay(a) {
    if (reviews_max_level < 100) {
        a = Math.round(a / 100 * reviews_max_level * 10) / 10;
        if (String(a).indexOf(".") < 0) {
            a += ".0"
        }
    }
    return a
}

function getReviewsRatingWordValue(b) {
    var c = reviews_levels.split(",");
    var a = reviews_max_level / c.length;
    b = Math.max(0, Math.min(c.length - 1, Math.floor(b / a)));
    return c[b]
};

/* Contact form error */
var THEMEREX_validateForm = null;

function userSubmitForm(e, c, d) {
    var b = false;
    var a = e.data("formtype") == "custom";
    if (!a) {
        b = formValidate(e, {
            error_message_show: true,
            error_message_time: 5000,
            error_message_class: "sc_infobox sc_infobox_style_error",
            error_fields_class: "error_fields_class",
            exit_after_first_error: false,
            rules: [{
                field: "username",
                min_length: {
                    value: 1,
                    message: THEMEREX_NAME_EMPTY
                },
                max_length: {
                    value: 60,
                    message: THEMEREX_NAME_LONG
                }
            }, {
                field: "email",
                min_length: {
                    value: 7,
                    message: THEMEREX_EMAIL_EMPTY
                },
                max_length: {
                    value: 60,
                    message: THEMEREX_EMAIL_LONG
                },
                mask: {
                    value: THEMEREX_EMAIL_MASK,
                    message: THEMEREX_EMAIL_NOT_VALID
                }
            }, {
                field: "subject",
                min_length: {
                    value: 1,
                    message: THEMEREX_SUBJECT_EMPTY
                },
                max_length: {
                    value: 100,
                    message: THEMEREX_SUBJECT_LONG
                }
            }, {
                field: "message",
                min_length: {
                    value: 1,
                    message: THEMEREX_MESSAGE_EMPTY
                },
                max_length: {
                    value: THEMEREX_msg_maxlength_contacts,
                    message: THEMEREX_MESSAGE_LONG
                }
            }]
        })
    }
    if (!b && c != "#") {
        THEMEREX_validateForm = e;
        var f = {
            action: "send_contact_form",
            nonce: d,
            type: a ? "custom" : "contact",
            data: e.serialize()
        };
        jQuery.post(c, f, userSubmitFormResponse, "text")
    }
}

function userSubmitFormResponse(b) {
    var c = JSON.parse(b);
    var a = THEMEREX_validateForm.find(".result").toggleClass("sc_infobox_style_error", false).toggleClass("sc_infobox_style_success", false);
    if (c.error == "") {
        a.addClass("sc_infobox_style_success").html(THEMEREX_SEND_COMPLETE);
        setTimeout(function() {
            a.fadeOut();
            THEMEREX_validateForm.get(0).reset()
        }, 3000)
    } else {
        a.addClass("sc_infobox_style_error").html(THEMEREX_SEND_ERROR + " " + c.error)
    }
    a.fadeIn()
}

function ready() {

    // Show system message
    if (THEMEREX_systemMessage.message) {
        if (THEMEREX_systemMessage.status == "success") {
            themerex_message_success(THEMEREX_systemMessage.message, THEMEREX_systemMessage.header)
        } else {
            if (THEMEREX_systemMessage.status == "info") {
                themerex_message_info(THEMEREX_systemMessage.message, THEMEREX_systemMessage.header)
            } else {
                if (THEMEREX_systemMessage.status == "error" || THEMEREX_systemMessage.status == "warning") {
                    themerex_message_warning(THEMEREX_systemMessage.message, THEMEREX_systemMessage.header)
                }
            }
        }
    }

    // Top menu height
    THEMEREX_top_height = jQuery("header .topWrap").height();
    jQuery(".topWrapFixed").css("backgroundColor", jQuery(".topWrap").css("backgroundColor"));
    THEMEREX_use_fixed_wrapper = jQuery(".topWrapFixed").parents(".fullScreenSlider").length == 0 || !jQuery(".topWrapFixed").parent().next().hasClass("sliderHomeBullets");
    
    // Close all dropdown elements
    jQuery(document).on("click", function(n) {
        jQuery(".pageFocusBlock").slideUp();
        jQuery(".inputSubmitAnimation:not(.opened)").removeClass("sFocus rad4").addClass("radCircle", 100);
        jQuery("ul.shareDrop").slideUp().siblings("a.shareDrop").removeClass("selected")
    });

    // Calendar handlers - change months lock
    jQuery(".widget_calendar").on("click", ".prevMonth a, .nextMonth a", function(q) {
        q.preventDefault();
        return false
    });

    // Tabs for top widgets
    if (jQuery(".widgetTabs").length > 0) {
        var k = "";
        var m = 0;
        jQuery(".widgetTop .titleHide").each(function() {
            m++;
            var n = jQuery(this).parents(".widgetTop").attr("id");
            var e = jQuery(this).text();
            if (e == "") {
                e = "#" + m
            }
            k += '<li><a href="#' + n + '"><span>' + e + "</span></a></li>"
        });
        jQuery(".widgetTabs .tabsButton ul").append(k);
        jQuery(".widgetTop > ul:not(.tabs),.widgetTop > div > ul:not(.tabs)").each(function() {
            var o = jQuery(this).clone();
            var e = jQuery(this).find(">li");
            var n = Math.ceil(e.length / 2) - 1;
            e.eq(n).nextAll().remove();
            o.find(">li").eq(n + 1).prevAll().remove();
            jQuery(this).after(o)
        });
        jQuery(".widgetTabs").tabs({
            show: {
                effect: "drop",
                direction: "right",
                duration: 500
            },
            hide: {
                effect: "drop",
                direction: "left",
                duration: 500
            },
            activate: function(e, n) {
                initShortcodes(n.newPanel)
            }
        })
    }

    // Add bookmarks
    if (jQuery("#tabsFavorite").length > 0) {
        jQuery(".addBookmark").on("click", function(s) {
            var t = window.document.title.split("|")[0];
            var n = window.location.href;
            var r = jQuery.cookie("themerex_bookmarks");
            var q = false;
            if (r) {
                r = JSON.parse(r);
                for (var p = 0; p < r.length; p++) {
                    if (r[p].url == n) {
                        q = true;
                        break
                    }
                }
            } else {
                r = new Array()
            }
            if (!q) {
                var o = themerex_message_dialog('<label for="bookmark_title">' + THEMEREX_MESSAGE_BOOKMARK_TITLE + '</label><br><input type="text" id="bookmark_title" name="bookmark_title" value="' + t + '">', THEMEREX_MESSAGE_BOOKMARK_ADD, null, function(u, e) {
                    if (u != 1) {
                        return
                    }
                    t = o.find("#bookmark_title").val();
                    r.push({
                        title: t,
                        url: n
                    });
                    jQuery(".listBookmarks").append('<li><a href="' + n + '">' + t + '</a><a href="#" class="delBookmark fa fa-close"></a></li>');
                    jQuery.cookie("themerex_bookmarks", JSON.stringify(r), {
                        expires: 365,
                        path: "/"
                    });
                    if (THEMEREX_Swipers.bookmarks_scroll !== undefined) {
                        THEMEREX_Swipers.bookmarks_scroll.reInit()
                    }
                    setTimeout(function() {
                        themerex_message_success(THEMEREX_MESSAGE_BOOKMARK_ADDED, THEMEREX_MESSAGE_BOOKMARK_ADD)
                    }, THEMEREX_MESSAGE_TIMEOUT / 4)
                })
            } else {
                themerex_message_warning(THEMEREX_MESSAGE_BOOKMARK_EXISTS, THEMEREX_MESSAGE_BOOKMARK_ADD)
            }
            s.preventDefault();
            return false
        });
        jQuery(".listBookmarks").on("click", ".delBookmark", function(p) {
            var n = jQuery(this).parent().index();
            var o = jQuery.cookie("themerex_bookmarks");
            if (o) {
                o = JSON.parse(o);
                o.splice(n, 1);
                jQuery.cookie("themerex_bookmarks", JSON.stringify(o), {
                    expires: 365,
                    path: "/"
                })
            }
            jQuery(this).parent().remove();
            p.preventDefault();
            return false
        });
        jQuery(".listBookmarks").sortable({
            items: "li",
            update: function(e, o) {
                var n = new Array();
                o.item.parent().find("li").each(function() {
                    var p = jQuery(this).find("a:not(.delBookmark)").eq(0);
                    n.push({
                        title: p.text(),
                        url: p.attr("href")
                    })
                });
                jQuery.cookie("themerex_bookmarks", JSON.stringify(n), {
                    expires: 365,
                    path: "/"
                })
            }
        }).disableSelection()
    }

    // Decorate nested lists in widgets and sidemenu
    jQuery(".widgetWrap ul > li,.sidemenu_area ul > li,.panelmenu_area ul > li,.widgetTop ul > li").each(function() {
        if (jQuery(this).find("ul").length > 0) {
            jQuery(this).addClass("dropMenu")
        }
    });
    jQuery(".widgetWrap ul > li.dropMenu,.sidemenu_area ul > li.dropMenu,.panelmenu_area ul > li.dropMenu,.widgetTop ul > li.dropMenu").on("click", function(n) {
        jQuery(this).toggleClass("dropOpen");
        jQuery(this).find("ul").first().slideToggle(200, function() {
            if (jQuery(this).parents(".sidemenu_area").length > 0) {

            } else {
                if (jQuery(this).parents(".panelmenu_area").length > 0) {

                }
            }
        });
        n.preventDefault();
        return false
    });
    jQuery(".widgetWrap ul:not(.tabs) li > a,.sidemenu_area ul:not(.tabs) li > a,.panelmenu_area ul:not(.tabs) li > a,.widgetTop ul:not(.tabs) li > a").on("click", function(n) {
        if (jQuery(this).attr("href") != "#") {
            n.stopImmediatePropagation();
            if (jQuery(this).parent().hasClass("menu-item-has-children") && jQuery(this).parents(".sidemenu_area,.panelmenu_area").length > 0) {
                jQuery(this).parent().trigger("click");
                n.preventDefault();
                return false
            }
        }
    });
    
    // Archive widget decoration
    jQuery(".widget_archive a").each(function() {
        var e = jQuery(this).html().split(" ");
        if (e.length > 1) {
            e[e.length - 1] = "<span>" + e[e.length - 1] + "</span>";
            jQuery(this).html(e.join(" "))
        }
    });

    //video bg
    if (jQuery(".videoBackground").length > 0) {
        jQuery(".videoBackground").each(function() {
            var e = jQuery(this).data("youtube-code");
            if (e) {
                jQuery(this).tubular({
                    videoId: e
                })
            }
        })
    }

    //isotope
    if (jQuery(".isotopeNOanim,.isotope").length > 0) {
        initIsotope();
        try {
            jQuery(window).smartresize(resizeIsotope)
        } catch (h) {
            jQuery(window).resize(resizeIsotope)
        }
        //isotope filter
        jQuery(".isotopeFiltr").on("click", "li a", function(o) {
            jQuery(this).parents(".isotopeFiltr").find("li").removeClass("active");
            jQuery(this).parent().addClass("active");
            var n = jQuery(this).data("filter");
            jQuery(this).parents(".isotopeFiltr").siblings(".isotope").eq(0).isotope({
                filter: n
            });
            if (n == "*") {
                jQuery("#viewmore_link").fadeIn()
            } else {
                jQuery("#viewmore_link").fadeOut()
            }
            o.preventDefault();
            return false
        })
    }

    // main Slider
    if (jQuery(".sliderBullets, .sliderHomeBullets").length > 0) {
        if (jQuery.rsCSS3Easing != undefined && jQuery.rsCSS3Easing != null) {
            jQuery.rsCSS3Easing.easeOutBack = "cubic-bezier(0.175, 0.885, 0.320, 1.275)"
        }

        // Show Slider
        jQuery(".sliderHomeBullets").slideDown(200, function() {
            REX_parallax();
            fullSlider();
            initShortcodes(jQuery(this));
            if (jQuery("body").hasClass("boxed")) {
                jQuery(this).trigger("resize")
            }
        })
    }

    //fullScreen effect for Main Slider
    var d = jQuery(".sliderHomeBullets");
    if (d.length > 0 && d.hasClass("slider_engine_royal")) {
        var l = d.find(".slideContent").eq(0);
        l.addClass("sliderBGanima " + l.data("effect"));
        setTimeout(checkFullSlider, 500)
    }

    // Page Navigation
    jQuery(".pageFocusBlock").on("click", function(n) {
        if (n.target.nodeName.toUpperCase() != "A") {
            n.preventDefault();
            return false
        }
    });
    jQuery(".navInput").on("click", function(n) {
        jQuery(".pageFocusBlock").slideDown(300, function() {
            initShortcodes(jQuery(".pageFocusBlock").eq(0))
        });
        n.preventDefault();
        return false
    });

    // Responsive Show menu
    jQuery(".openResponsiveMenu").on("click", function(n) {
        jQuery(".menuTopWrap").slideToggle();
        n.preventDefault();
        return false
    });

    // Main Menu
    initSfMenu(".menuTopWrap > ul#mainmenu, .usermenu_area ul.usermenu_list");
    // Enable click on root menu items (without submenu) in iOS
    if (false && isiOS()) {
        jQuery("#mainmenu li:not(.menu-item-has-children) > a").on("click touchend", function(n) {
            if (jQuery(this).attr("href") != "#") {
                window.location.href = jQuery(this).attr("href")
            }
        });

        jQuery("#mainmenu li.menu-item-has-children > a").on({
          mouseenter: function(){
            if (jQuery("body").hasClass("responsive_menu")) {
                jQuery(this).trigger("click")
            }
          },
          mouseleave: function(){}
        });

    }

    // Submenu click handler
    jQuery(".menuTopWrap ul li a, .usermenu_area ul.usermenu_list li a").on("click", function(n) {
        if ((THEMEREX_responsive_menu_click || isMobile()) && jQuery("body").hasClass("responsive_menu") && jQuery(this).parent().hasClass("menu-item-has-children")) {
            if (jQuery(this).siblings("ul:visible").length > 0) {
                jQuery(this).siblings("ul").slideUp()
            } else {
                jQuery(this).siblings("ul").slideDown()
            }
        }
        if (jQuery(this).attr("href") == "#" || (jQuery("body").hasClass("responsive_menu") && jQuery(this).parent().hasClass("menu-item-has-children"))) {
            n.preventDefault();
            return false
        }
    });

    // One page mode for menu links (scroll to anchor)
    jQuery("#toc, .menuTopWrap ul li, .usermenu_area ul.usermenu_list li").on("click", "a", function(q) {
        var n = jQuery(this).attr("href");
        var s = n.indexOf("#");
        if (s < 0 || n.length == 1) {
            return
        }
        var r = window.location.href;
        var p = r.indexOf("#");
        if (p > 0) {
            r = r.substring(0, p)
        }
        var o = s == 0;
        if (!o) {
            o = r == n.substring(0, s)
        }
        if (o) {
            animateTo(n.substr(s));
            setLocation(s == 0 ? r + n : n);
            q.preventDefault();
            return false
        }
    });

    // Open sidemenu
    jQuery(".sidemenu_wrap .sidemenu_button").on("click", function(n) {
        jQuery("body").addClass("openMenuFix");
        if (jQuery(".sidemenu_overflow").length == 0) {
            jQuery("body").append('<div class="sidemenu_overflow"></div>')
        }
        jQuery(".sidemenu_overflow").fadeIn(400);
        n.preventDefault();
        return false
    });

    // Close sidemenu and right panel
    jQuery(document).on("click", ".sidemenu_overflow, .sidemenu_close", function(n) {
        jQuery("body").removeClass("openMenuFixRight openMenuFix");
        if (!isMobile()) {
            jQuery(".swpRightPosButton").fadeIn(400)
        }
        jQuery(".sidemenu_overflow").fadeOut(400)
    });
    
    // Demo sidemenu
    var i = false;
    if (THEMEREX_demo_time > 0 && jQuery(window).width() > 800 && jQuery(".sidemenu_wrap .sidemenu_button").length > 0) {
        i = jQuery.cookie("themerex_demo_sidemenu");
        if (!i) {
            jQuery.cookie("themerex_demo_sidemenu", "1", {
                expires: 7,
                path: "/"
            });
            i = 1;
            setTimeout(function() {
                jQuery(".sidemenu_wrap .sidemenu_button").trigger("click");
                setTimeout(function() {
                    jQuery(".sidemenu_overflow").trigger("click")
                }, THEMEREX_demo_time)
            }, THEMEREX_demo_time)
        }
    }

    // Open right menu
    jQuery(".openRightMenu,.swpRightPosButton").on("click", function(n) {
        if (jQuery("body").hasClass("openMenuFixRight")) {
            jQuery("body").removeClass("openMenuFixRight");
            if (!isMobile()) {
                jQuery(".swpRightPosButton").fadeIn(400)
            }
            jQuery(".sidemenu_overflow").fadeOut(400)
        } else {
            jQuery("body").addClass("openMenuFixRight");
            if (jQuery(".sidemenu_overflow").length == 0) {
                jQuery("body").append('<div class="sidemenu_overflow"></div>')
            }
            if (!isMobile()) {
                jQuery(".swpRightPosButton").fadeOut(400)
            }
            jQuery(".sidemenu_overflow").fadeIn(400)
        }
        n.preventDefault();
        return false
    });
    if (!i && THEMEREX_demo_time > 0 && jQuery(window).width() > 800 && jQuery(".openRightMenu,.swpRightPosButton").length > 0) {
        i = jQuery.cookie("themerex_demo_rightpanel");
        if (!i) {
            var c = "";
            if (jQuery(".openRightMenu").length > 0) {
                c = ".openRightMenu"
            } else {
                if (jQuery(".swpRightPosButton").length > 0) {
                    c = ".swpRightPosButton"
                }
            }
            if (c) {
                jQuery.cookie("themerex_demo_rightpanel", "1", {
                    expires: 7,
                    path: "/"
                });
                setTimeout(function() {
                    jQuery(c).trigger("click");
                    setTimeout(function() {
                        jQuery(".sidemenu_overflow").trigger("click")
                    }, THEMEREX_demo_time)
                }, THEMEREX_demo_time)
            }
        }
    }

    // search
    jQuery(".topWrap .search").on("click", function(n) {
        if (jQuery(this).hasClass("searchOpen")) {
            if (n.target.nodeName.toUpperCase() != "INPUT" && n.target.nodeName.toUpperCase() != "A") {
                jQuery(".topWrap .search .searchForm").animate({
                    width: "hide"
                }, 200);
                jQuery(".topWrap .ajaxSearchResults").fadeOut();
                jQuery("header").removeClass("topSearchShow");
                jQuery(".topWrap .search").removeClass("searchOpen");
                n.preventDefault();
                return false
            }
        } else {
            jQuery(this).find(".searchForm").animate({
                width: "show"
            }, 200);
            jQuery("header").delay(200).addClass("topSearchShow");
            jQuery(this).delay(200).toggleClass("searchOpen");
            n.preventDefault();
            return false
        }
    });
    jQuery(".topWrap .search").on("click", ".searchSubmit,.post_more", function(n) {
        if (jQuery(".topWrap .searchField").val() != "") {
            jQuery(".topWrap .searchForm form").get(0).submit()
        }
        n.preventDefault();
        return false
    });
    jQuery(".search-form").on("click", ".search-button a", function(n) {
        if (jQuery(this).parents(".search-form").find('input[name="s"]').val() != "") {
            jQuery(this).parents(".search-form").get(0).submit()
        }
        n.preventDefault();
        return false
    });

    // search 404
    jQuery(".inputSubmitAnimation").on("click", function(n) {
        n.preventDefault();
        return false
    });
    jQuery(".inputSubmitAnimation a").on("click", function(s) {
        var p = jQuery(this).siblings("form");
        var o = jQuery(this).parents(".inputSubmitAnimation");
        if (o.hasClass("sFocus")) {
            if (p.length > 0 && p.find("input").val() != "") {
                if (jQuery(this).hasClass("sc_emailer_button")) {
                    var r = jQuery(this).data("group");
                    var n = p.find("input").val();
                    var q = new RegExp(THEMEREX_EMAIL_MASK);
                    if (!q.test(n)) {
                        p.find("input").get(0).focus();
                        themerex_message_warning(THEMEREX_EMAIL_NOT_VALID)
                    } else {
                        jQuery.post(THEMEREX_ajax_url, {
                            action: "emailer_submit",
                            nonce: THEMEREX_ajax_nonce,
                            group: r,
                            email: n
                        }).done(function(e) {
                            var t = JSON.parse(e);
                            if (t.error === "") {
                                themerex_message_info(THEMEREX_MESSAGE_EMAIL_CONFIRM.replace("%s", n));
                                p.find("input").val("")
                            } else {
                                themerex_message_warning(t.error)
                            }
                        })
                    }
                } else {
                    p.get(0).submit()
                }
            } else {
                jQuery(document).trigger("click")
            }
        } else {
            o.addClass("sFocus rad4").removeClass("radCircle")
        }
        s.preventDefault();
        return false
    });

    //Portfolio item Description
    if (isMobile()) {
        jQuery(".toggleButton").show();
        jQuery(".itemDescriptionWrap,.toggleButton").on("click", function(n) {
            jQuery(this).toggleClass("descriptionShow");
            jQuery(this).find(".toggleDescription").slideToggle();
            n.preventDefault();
            return false
        })
    } else {
        jQuery(".itemDescriptionWrap").on({
          mouseenter: function(){
            jQuery(this).toggleClass("descriptionShow");
            jQuery(this).find(".toggleDescription").slideToggle()
          },
          mouseleave: function(){
          }
        })

    }

    // Save placeholder for input fields
    jQuery('.formList input[type="text"], .formList input[type="password"]').focus(function() {
        jQuery(this).attr("data-placeholder", jQuery(this).attr("placeholder")).attr("placeholder", "");
        jQuery(this).parent("li").addClass("iconFocus")
    }).on("blur", function() {
        jQuery(this).attr("placeholder", jQuery(this).attr("data-placeholder"));
        jQuery(this).parent("li").removeClass("iconFocus")
    });

    // Hide empty pagination
    if (jQuery("#nav_pages > ul > li").length < 3) {
        jQuery("#nav_pages").remove()
    } else {
        jQuery(".theme_paginaton a").addClass("theme_button")
    }

    // WooCommerce handlers
    jQuery(".woocommerce .mode_buttons a,.woocommerce-page .mode_buttons a").on("click", function(n) {
        var o = jQuery(this).hasClass("woocommerce_thumbs") ? "thumbs" : "list";
        jQuery.cookie("themerex_shop_mode", o, {
            expires: 365,
            path: "/"
        });
        jQuery(this).siblings("input").val(o).parents("form").get(0).submit();
        n.preventDefault();
        return false
    });

    // Sound effect
    if (THEMEREX_sound_enable) {
        var f = jQuery.cookie("themerex_sounds");
        if (f != undefined) {
            try {
                f = JSON.parse(f)
            } catch (h) {}
            if (typeof f == "object") {
                THEMEREX_sound_state = f
            }
        }
        if (!THEMEREX_sound_state.all) {
            jQuery(".usermenu_sound > a").removeClass("fa-volume-up").addClass("fa-volume-off")
        }
        if (!THEMEREX_sound_state.mainmenu) {
            jQuery(".usermenu_sound > ul > li > a.sound_mainmenu").removeClass("fa-check").addClass("fa-close")
        }
        if (!THEMEREX_sound_state.othermenu) {
            jQuery(".usermenu_sound > ul > li > a.sound_othermenu").removeClass("fa-check").addClass("fa-close")
        }
        if (!THEMEREX_sound_state.buttons) {
            jQuery(".usermenu_sound > ul > li > a.sound_buttons").removeClass("fa-check").addClass("fa-close")
        }
        if (!THEMEREX_sound_state.links) {
            jQuery(".usermenu_sound > ul > li > a.sound_links").removeClass("fa-check").addClass("fa-close")
        }
        var b = [];
        soundManager.setup({
            url: THEMEREX_sound_folder,
            debugMode: false,
            onready: function() {
                if (THEMEREX_sound_mainmenu) {
                    b.mainmenu = soundManager.createSound({
                        id: "sound_mainmenu",
                        url: THEMEREX_sound_mainmenu
                    })
                }
                if (THEMEREX_sound_othermenu) {
                    b.othermenu = soundManager.createSound({
                        id: "sound_othermenu",
                        url: THEMEREX_sound_othermenu
                    })
                }
                if (THEMEREX_sound_buttons) {
                    b.buttons = soundManager.createSound({
                        id: "sound_buttons",
                        url: THEMEREX_sound_buttons
                    })
                }
                if (THEMEREX_sound_links) {
                    b.links = soundManager.createSound({
                        id: "sound_links",
                        url: THEMEREX_sound_links
                    })
                }
            },
            ontimeout: function() {}
        });
        var j = "a,button,.sc_accordion_title,.sc_toggles_title,.tabsButton > ul > li,.topWrap .search,.topWrap .openRightMenu";
        var a = 0;

        jQuery(j).on({
          mouseenter: function(){
            if (!THEMEREX_sound_state.all) {
                return
            }
            var n = new Date();
            var e = n.getTime();
            if (e - a < 50) {
                return
            }
            a = e;
            if (jQuery(this).parents("#mainmenu,.tabsButton").length > 0) {
                if (THEMEREX_sound_state.mainmenu && THEMEREX_sound_mainmenu && typeof b.mainmenu != "undefined") {
                    b.mainmenu.play()
                }
            } else {
                if (jQuery(this).parents("#panelmenu,#sidemenu,.usermenu_area").length > 0) {
                    if (THEMEREX_sound_state.othermenu && THEMEREX_sound_othermenu && typeof b.othermenu != "undefined") {
                        b.othermenu.play()
                    }
                } else {
                    if (jQuery(this).parents(".squareButton,.roundButton,.flex-direction-nav,.sc_accordion,.sc_toggles,.tab_names,.topWrap,.tabsMenuHead,#co_bg_pattern_list,#co_bg_images_list,.addBookmarkArea,.socPage,.page-numbers,.upToScroll").length > 0 || jQuery(this).hasClass("button")) {
                        if (THEMEREX_sound_state.buttons && THEMEREX_sound_buttons && typeof b.buttons != "undefined") {
                            b.buttons.play()
                        }
                    } else {
                        if (THEMEREX_sound_state.links && THEMEREX_sound_links && typeof b.links != "undefined") {
                            b.links.play()
                        }
                    }
                }
            }
          },
          mouseleave: function(){}
        });

        jQuery(".usermenu_sound > a").on("click", function(n) {
            THEMEREX_sound_state.all = 1 - THEMEREX_sound_state.all;
            jQuery.cookie("themerex_sounds", JSON.stringify(THEMEREX_sound_state), {
                expires: 365,
                path: "/"
            });
            jQuery(this).removeClass(THEMEREX_sound_state.all ? "fa-volume-off" : "fa-volume-up").addClass(THEMEREX_sound_state.all ? "fa-volume-up" : "fa-volume-off");
            n.preventDefault();
            return false
        });
        jQuery(".usermenu_sound > ul > li > a").on("click", function(n) {
            if (jQuery(this).hasClass("sound_mainmenu")) {
                THEMEREX_sound_state.mainmenu = 1 - THEMEREX_sound_state.mainmenu;
                jQuery(this).removeClass(THEMEREX_sound_state.mainmenu ? "fa-close" : "fa-check").addClass(THEMEREX_sound_state.mainmenu ? "fa-check" : "fa-close")
            } else {
                if (jQuery(this).hasClass("sound_othermenu")) {
                    THEMEREX_sound_state.othermenu = 1 - THEMEREX_sound_state.othermenu;
                    jQuery(this).removeClass(THEMEREX_sound_state.othermenu ? "fa-close" : "fa-check").addClass(THEMEREX_sound_state.othermenu ? "fa-check" : "fa-close")
                } else {
                    if (jQuery(this).hasClass("sound_buttons")) {
                        THEMEREX_sound_state.buttons = 1 - THEMEREX_sound_state.buttons;
                        jQuery(this).removeClass(THEMEREX_sound_state.buttons ? "fa-close" : "fa-check").addClass(THEMEREX_sound_state.buttons ? "fa-check" : "fa-close")
                    } else {
                        if (jQuery(this).hasClass("sound_links")) {
                            THEMEREX_sound_state.links = 1 - THEMEREX_sound_state.links;
                            jQuery(this).removeClass(THEMEREX_sound_state.links ? "fa-close" : "fa-check").addClass(THEMEREX_sound_state.links ? "fa-check" : "fa-close")
                        }
                    }
                }
            }
            jQuery.cookie("themerex_sounds", JSON.stringify(THEMEREX_sound_state), {
                expires: 365,
                path: "/"
            });
            n.preventDefault();
            return false
        })
    }
    initPostFormats();
    initShortcodes(jQuery("body").eq(0))
}

// Init Superfish menu
function initSfMenu(a) {
    jQuery(a).show().each(function() {
        if (isResponsiveNeed() && jQuery(this).attr("id") == "mainmenu" && (THEMEREX_responsive_menu_click || isMobile())) {
            return
        }
        jQuery(this).addClass("inited").superfish({
            delay: 500,
            animation: {
                opacity: "show",
                height: "show"
            },
            speed: "fast",
            autoArrows: false,
            dropShadows: false,
            onBeforeShow: function(c) {
                if (jQuery(this).parents("ul").length > 1) {
                    var b = jQuery(window).width();
                    var e = jQuery(this).parents("ul").offset().left;
                    var f = jQuery(this).parents("ul").outerWidth();
                    var d = jQuery(this).outerWidth();
                    if (e + f + d > b - 20 && e - d > 0) {
                        jQuery(this).addClass("submenu_left")
                    } else {
                        jQuery(this).removeClass("submenu_left")
                    }
                }
            }
        })
    })
}

// Main Menu responsive
function mainMenuResponsive() {
    if (THEMEREX_menuResponsive > 0) {
        if (isResponsiveNeed()) {
            if (!jQuery("body").hasClass("responsive_menu")) {
                jQuery("body").addClass("responsive_menu");
                jQuery(".topMenuStyleFon").removeClass("topMenuStyleFon").addClass("topMenuStyleFon2 topMenuStyleLine");
                jQuery("header").removeClass("fixedTopMenu").addClass("noFixMenu");
                if ((THEMEREX_responsive_menu_click || isMobile()) && jQuery(".menuTopWrap > ul#mainmenu").hasClass("inited")) {
                    jQuery(".menuTopWrap > ul#mainmenu").removeClass("inited").superfish("destroy")
                }
            }
        } else {
            if (jQuery("body").hasClass("responsive_menu")) {
                jQuery("body").removeClass("responsive_menu");
                jQuery(".topMenuStyleFon2").removeClass("topMenuStyleFon2 topMenuStyleLine").addClass("topMenuStyleFon");
                jQuery(".menuTopWrap").show();
                if (THEMEREX_responsive_menu_click || isMobile()) {
                    initSfMenu(".menuTopWrap > ul#mainmenu")
                }
                calcMenuColumnsWidth()
            }
        }
    }
}

// Make all columns (in custom menu) equal height
function calcMenuColumnsWidth() {
    jQuery("#mainmenu li.custom_view_item ul.menu-panel ul.columns").each(function() {
        if (jQuery("body").hasClass("responsive_menu")) {
            return
        }
        jQuery(this).parents(".menu-panel").css({
            display: "block",
            visibility: "hidden"
        });
        var b = 0,
            a = 0;
        jQuery(this).find(">li").css("height", "auto").each(function() {
            var c = jQuery(this);
            var d = parseInt(c.css("marginTop"), 10),
                h = parseInt(c.css("marginBottom"), 10),
                e = c.height() + (isNaN(d) ? 0 : d) + (isNaN(h) ? 0 : h);
            if (b < e) {
                b = e
            }
            var j = parseInt(c.css("borderLeft"), 10),
                g = parseInt(c.css("paddingLeft"), 10),
                f = parseInt(c.css("borderRight"), 10),
                i = parseInt(c.css("paddingRight"), 10);
            a += c.width() + (isNaN(j) ? 0 : j) + (isNaN(g) ? 0 : g) + (isNaN(i) ? 0 : i) + (isNaN(f) ? 0 : f)
        });
        jQuery(this).parents(".menu-panel").css({
            display: "none",
            visibility: "visible"
        });
        if (a > jQuery("#mainmenu").width()) {
            jQuery(this).width(a + 8)
        }
        jQuery(this).find(">li").height(b)
    })
}

// Check if responsive menu need
function isResponsiveNeed() {
    var b = false;
    if (THEMEREX_menuResponsive > 0) {
        var a = window.innerWidth;
        if (a == undefined) {
            a = jQuery(window).width() + (jQuery(window).height() < jQuery(document).height() || jQuery(window).scrollTop() > 0 ? 16 : 0)
        }
        b = THEMEREX_menuResponsive > a
    }
    return b
}

//itemPageFull
function itemPageFull() {
    var f = jQuery(window).height();
    var b = jQuery(window).scrollTop();
    if (b > jQuery(".noFixMenu .topWrap").height() + jQuery(".topTabsWrap").height()) {
        b = 0
    }
    var d = Math.min(jQuery(".itemPageFull").width() / 16 * 9, f - jQuery("#wpadminbar").height() - jQuery(".noFixMenu .topWrap").height() - jQuery(".topTabsWrap").height() + b);
    jQuery(".itemPageFull").height(d);
    var g = parseInt(jQuery(".sidemenu_wrap").css("paddingTop"), 10);
    if (isNaN(g)) {
        g = parseInt(jQuery(".swpRightPos").css("paddingTop"), 10)
    }
    if (isNaN(g)) {
        g = 0
    }
    var e = parseInt(jQuery(".swpRightPos .sc_tabs .tabsMenuBody").css("paddingTop"), 10) * 2;
    if (isNaN(e)) {
        e = 0
    }
    var c = jQuery(".swpRightPos .sc_tabs .tabsMenuHead").height();
    if (isNaN(c)) {
        c = 0
    }
    var a = jQuery(".swpRightPos .sc_tabs .tabsMenuBody .addBookmarkArea").height();
    if (isNaN(a)) {
        a = 0
    }
    jQuery("#sidemenu_scroll").height(f - g);
    jQuery(".swpRightPos .sc_tabs .tabsMenuBody").height(f - -g - e - c);
    jQuery("#custom_options_scroll").height(f - g - e - c);
    jQuery("#sidebar_panel_scroll").height(f - g - e - c);
    jQuery("#panelmenu_scroll").height(f - g - e - c);
    jQuery("#bookmarks_scroll").height(f - g - e - c - a)
}

//scroll Action
function scrollAction() {
    var e = jQuery(".upToScroll");
    var b = jQuery(window).scrollTop();
    var f = jQuery("header").height();
    var d = jQuery("#wpadminbar").height();
    if (b > f) {
        e.addClass("buttonShow")
    } else {
        e.removeClass("buttonShow")
    }
    if (!jQuery("body").hasClass("responsive_menu") && THEMEREX_menuFixed) {
        var a = 0;
        if (jQuery(".top_panel_below .sliderHomeBullets").length > 0) {
            a = jQuery(".top_panel_below .sliderHomeBullets").height();
            if (a < 10) {
                a = jQuery(".sliderHomeBullets").parents(".fullScreenSlider").length > 0 ? jQuery(window).height() : THEMEREX_slider_height
            }
        }
        var c = Math.max(0, jQuery(".fixedTopMenu .topWrap").height());
        if (b <= THEMEREX_top_height - c - 20 + a) {
            if (jQuery("header").hasClass("fixedTopMenu")) {
                jQuery("header").removeClass("fixedTopMenu").addClass("noFixMenu");
                if (THEMEREX_use_fixed_wrapper) {
                    jQuery(".topWrapFixed").hide()
                }
            }
        } else {
            if (b > THEMEREX_top_height + a) {
                if (!jQuery("header").hasClass("fixedTopMenu")) {
                    if (THEMEREX_use_fixed_wrapper) {
                        jQuery(".topWrapFixed").height(THEMEREX_top_height).show()
                    }
                    jQuery("header").addClass("fixedTopMenu").removeClass("noFixMenu")
                }
            }
        }
    }
    jQuery("#toc .toc_item").each(function() {
        var n = jQuery(this).find("a").attr("href");
        var m = n.indexOf("#");
        if (m < 0 || n.length == 1) {
            return
        }
        var l = window.location.href;
        var i = l.indexOf("#");
        if (i > 0) {
            l = l.substring(0, i)
        }
        var h = m == 0;
        if (!h) {
            h = l == href.substring(0, m)
        }
        if (!h) {
            return
        }
        var k = jQuery(n).offset().top;
        var g = jQuery(this).next().find("a").attr("href");
        var j = g ? jQuery(g).offset().top : 1000000;
        if (k < b + jQuery(window).height() * 0.8 && b + f < j) {
            jQuery(this).addClass("current")
        } else {
            jQuery(this).removeClass("current")
        }
    })
}

// Fullscreen slider
function fullSlider() {
    var c = jQuery(".fullScreenSlider");
    if (c.length > 0) {
        var a = jQuery(window).height() - jQuery("#wpadminbar").height() - (jQuery(".top_panel_above .fullScreenSlider header").css("position") == "static" ? jQuery(".topWrap").height() : 0);
        c.find(".sliderHomeBullets").css("height", a);
        c.find(".sliderHomeBullets.slider_engine_royal > div,.sliderHomeBullets.slider_engine_royal .rsOverflow,.sliderHomeBullets.slider_engine_royal .rsContent,.sliderHomeBullets .slideContent,.sliderHomeBullets .sc_slider,.sliderHomeBullets .sc_slider .slides,.sliderHomeBullets .sc_slider .slides li").css("height", a);
        c.find(".sliderHomeBullets.slider_engine_revo .rev_slider_wrapper,.sliderHomeBullets.slider_engine_revo .rev_slider").css({
            height: a + "px",
            maxHeight: a + "px"
        });
        c.find(".sliderHomeBullets.slider_engine_revo .rev_slider > ul").css({
            maxHeight: a + "px"
        });
        c.find(".sliderHomeBullets.slider_engine_revo .rev_slider .defaultimg").css({
            height: a + "px",
            maxWidth: "none"
        })
    } else {
        var b = jQuery(".sliderHomeBullets.slider_engine_revo");
        if (b.length > 0) {
            var a = b.find(".rev_slider").height();
            if (b.height() != a) {
                b.css("height", a)
            }
        }
    }
}

// Animation effect on fullscreen slider (only for Royal slider)
function checkFullSlider() {
    var b = jQuery(".fullScreenSlider");
    if (b.length > 0) {
        var a = b.find(".royalSlider").data("royalSlider");
        if (a == undefined || a == "") {
            setTimeout(checkFullSlider, 500)
        } else {
            a.ev.on("rsBeforeAnimStart", function(d) {
                REX_parallax();
                var e = this.currSlideId;
                var c = jQuery(".slider_engine_royal").find(".slideContent");
                c.each(function() {
                    jQuery(this).removeClass("sliderBGanima " + jQuery(this).data("effect"))
                });
                c.eq(e).addClass("sliderBGanima " + c.eq(e).data("effect"))
            })
        }
    }
}

// Resize sliders
function resizeSliders() {
    if (jQuery(".sc_slider_flex,.sc_slider_chop,.sc_slider_swiper").length > 0) {
        jQuery(".sc_slider_flex,.sc_slider_chop,.sc_slider_swiper").each(function() {
            if (jQuery(this).parents(".isotope, .isotopeNOanim").length == 0) {
                calcSliderDimensions(jQuery(this))
            }
        })
    }
}

//Time Line
function timelineResponsive() {
    var a = jQuery("#timeline_slider:not(.fixed)").eq(0);
    if (a.length > 0) {
        if (jQuery(window).width() <= 1023) {
            a.addClass("fixed")
        } else {
            var c = jQuery(window).height();
            var b = jQuery(window).height() - a.find("h2").height() - 150;
            a.find(".sc_blogger").css("height", b).find(".sc_scroll").css("height", b)
        }
    }
}

//time line Scroll
function timelineScrollFix() {
    var b = jQuery("#timeline_slider:not(.fixed)").eq(0);
    if (b.length > 0) {
        var c = jQuery(window).scrollTop();
        var a = jQuery("header").height() + jQuery(".topTabsWrap").height() - 20;
        var e = jQuery(".footerContentWrap").height();
        var d = jQuery(document).height() - e <= c + jQuery(window).height();
        if (jQuery(window).scrollTop() <= a) {
            if (parseFloat(b.css("marginTop")) > 0) {
                b.animate({
                    marginTop: 0
                }, {
                    queue: false,
                    duration: 350
                })
            }
        } else {
            if (a <= c - 10 && !d) {
                b.animate({
                    marginTop: (c - a) + "px"
                }, {
                    queue: false,
                    duration: 350
                })
            }
        }
    }
}

// Init isotope
var THEMEREX_isotopeInitCounter = 0;
function initIsotope() {
    if (jQuery(".isotopeNOanim,.isotope").length > 0) {
        jQuery(".isotopeNOanim,.isotope").each(function() {
            if (!isotopeImagesComplete(jQuery(this)) && THEMEREX_isotopeInitCounter++ < 30) {
                setTimeout(initIsotope, 200);
                return
            }
            jQuery(this).addClass("inited").find(".isotopeElement").animate({
                opacity: 1
            }, 200, function() {
                jQuery(this).addClass("isotopeElementShow")
            });
            var a = calcSizeIsotope(jQuery(this));
            jQuery(this).isotope({
                resizable: jQuery(this).parents(".fullscreen,.sc_gap").length > 0 && !jQuery(this).hasClass("folio1col"),
                masonry: {
                    columnWidth: a
                },
                itemSelector: ".isotopeElement",
                animationOptions: {
                    duration: 750,
                    easing: "linear",
                    queue: false
                }
            });
            initShortcodes(jQuery(this))
        })
    }
}

// Init isotope Appended
function initAppendedIsotope(c, d) {
    if (!isotopeImagesComplete(c) && THEMEREX_isotopeInitCounter++ < 30) {
        setTimeout(function() {
            initAppendedIsotope(c, d)
        }, 200);
        return
    }
    calcSizeIsotope(c);
    var e = c.siblings(".isotopeFiltr");
    var a = c.find(".isotopeElement:not(.isotopeElementShow)").animate({
        opacity: 1
    }, 200, function() {
        jQuery(this).addClass("isotopeElementShow")
    });
    c.isotope("appended", a);
    for (var b in d) {
        if (e.find('a[data-filter=".flt_' + b + '"]').length == 0) {
            e.find("ul").append('<li class="squareButton"><a href="#" data-filter=".flt_' + b + '">' + d[b] + "</a></li>")
        }
    }
}

// isotope Images Complete
function isotopeImagesComplete(a) {
    var b = true;
    a.find("img").each(function() {
        if (!b) {
            return
        }
        if (!jQuery(this).get(0).complete) {
            b = false
        }
    });
    return b
}

// isotope calculate size
function calcSizeIsotope(l) {
    var d = Math.max(1, Number(l.data("columns")));
    var e = l.find(".isotopeElement:not(.isotope-item)");
    var i = 0,
        f = 0,
        g = 0,
        h = 0;
    if (d > 1) {
        if (l.data("last-width") == l.width()) {
            return f
        }
        var b = l.hasClass("portfolio");
        var k = parseInt(l.css("marginRight"), 10);
        if (isNaN(k)) {
            k = 0
        }
        var j = parseInt(e.find(".isotopePadding").css("marginRight"), 10);
        if (isNaN(j)) {
            j = 0
        }
        var a = l.width() + (b ? 0 : k + j);
        l.data("last-width", a);
        i = b ? e.width() : Math.max(240, Math.floor(a / d - j));
        l.data("element-width", i);
        f = Math.floor(a / d);
        var c = f > i ? 1 : -1;
        while (c * (f - i) / i > THEMEREX_isotope_resize_delta) {
            d += c;
            if (d == 0) {
                break
            }
            f = Math.floor(a / d)
        }
        e.css({
            width: f
        });
        if (b) {
            g = e.height();
            l.data("element-height", g);
            h = Math.floor(f / i * g);
            e.css({
                height: h
            })
        }
    }
    return f
}

// Resize new Isotope elements
function resizeIsotope() {
    jQuery(".isotope, .isotopeNOanim").each(function() {
        var l = jQuery(this);
        var d = Math.max(1, Number(l.data("columns")));
        if (d == 1 || l.data("last-width") == l.width()) {
            return
        }
        var b = l.hasClass("portfolio");
        var e = l.find(".isotopeElement");
        var k = parseInt(l.css("marginRight"), 10);
        if (isNaN(k)) {
            k = 0
        }
        var j = parseInt(e.find(".isotopePadding").css("marginRight"), 10);
        if (isNaN(j)) {
            j = 0
        }
        var a = l.width() + (b ? 0 : k + j);
        l.data("last-width", a);
        var i = parseFloat(l.data("element-width"));
        var f = Math.floor(a / d);
        var c = f > i ? 1 : -1;
        while (c * (f - i) / i > THEMEREX_isotope_resize_delta) {
            d += c;
            if (d == 0) {
                break
            }
            f = Math.floor(a / d)
        }
        e.css({
            width: f
        });
        if (b) {
            var g = parseFloat(l.data("element-height"));
            var h = Math.floor(f / i * g);
            e.css({
                height: h
            })
        }
        jQuery(this).isotope({
            masonry: {
                columnWidth: f
            }
        });
        l.find(".sc_slider_flex,.sc_slider_chop,.sc_slider_swiper").each(function() {
            calcSliderDimensions(jQuery(this))
        })
    })
}


function initPostFormats() {
    // MediaElement init
    initMediaElements(jQuery("body"));

    //hoverZoom img effect
    if (jQuery(".hoverIncrease:not(.inited)").length > 0) {
        jQuery(".hoverIncrease:not(.inited)").addClass("inited").each(function() {
            var a = jQuery(this).data("image");
            var b = jQuery(this).data("title");
            if (a) {
                jQuery(this).append('<span class="hoverShadow"></span><a href="' + a + '" title="' + b + '"><span class="hoverIcon"></span></a>')
            }
        })
    }

    // Popup init
    if (THEMEREX_popupEngine == "pretty") {
        jQuery("a[href$='jpg'],a[href$='jpeg'],a[href$='png'],a[href$='gif']").attr("rel", "prettyPhoto" + (THEMEREX_popupGallery ? "[slideshow]" : ""));
        jQuery("a[rel*='prettyPhoto']:not(.inited):not([rel*='magnific']):not([data-rel*='magnific'])").addClass("inited").prettyPhoto({
            social_tools: "",
            theme: "facebook",
            deeplinking: false
        }).on("click", function(a) {
            if (jQuery(window).width() < 480) {
                a.stopImmediatePropagation();
                window.location = jQuery(this).attr("href")
            }
            a.preventDefault();
            return false
        })
    } else {
        jQuery("a[href$='jpg'],a[href$='jpeg'],a[href$='png'],a[href$='gif']").attr("rel", "magnific");
        jQuery("a[rel*='magnific']:not(.inited):not(.prettyphoto):not([rel*='pretty']):not([data-rel*='pretty'])").addClass("inited").magnificPopup({
            type: "image",
            mainClass: "mfp-img-mobile",
            closeOnContentClick: true,
            closeBtnInside: true,
            showCloseBtn: true,
            fixedContentPos: true,
            midClick: true,
            preloader: true,
            tLoading: THEMEREX_MAGNIFIC_LOADING,
            gallery: {
                enabled: THEMEREX_popupGallery
            },
            image: {
                tError: THEMEREX_MAGNIFIC_ERROR,
                verticalFit: true
            }
        })
    }

    // Popup windows with any html content
    jQuery('.user-popup-link:not(.inited),a[href="#openLogin"]:not(.inited)').addClass("inited").magnificPopup({
        type: "inline",
        removalDelay: 500,
        callbacks: {
            beforeOpen: function() {
                this.st.mainClass = "mfp-zoom-in"
            },
            open: function() {
                jQuery("html").css({
                    overflow: "visible",
                    margin: 0
                })
            },
            close: function() {}
        },
        midClick: true
    });
    if (jQuery("textarea.textAreaSize:not(.inited)").length > 0) {
        jQuery("textarea.textAreaSize:not(.inited)").addClass("inited").autosize({
            append: "\n"
        })
    }

    // Share button
    if (jQuery("ul.shareDrop:not(.inited)").length > 0) {
        jQuery("ul.shareDrop:not(.inited)").addClass("inited").siblings("a").on("click", function(a) {
            if (jQuery(this).hasClass("selected")) {
                jQuery(this).removeClass("selected").siblings("ul.shareDrop").slideUp()
            } else {
                jQuery(this).addClass("selected").siblings("ul.shareDrop").slideDown()
            }
            a.preventDefault();
            return false
        }).end().find("li a").on("click", function(a) {
            jQuery(this).parents("ul.shareDrop").slideUp().siblings("a.shareDrop").removeClass("selected");
            a.preventDefault();
            return false
        })
    }

    // Like button
    if (jQuery(".postSharing:not(.inited),.masonryMore:not(.inited)").length > 0) {
        jQuery(".postSharing:not(.inited),.masonryMore:not(.inited)").addClass("inited").find(".likeButton a").on("click", function(g) {
            var d = jQuery(this).parent();
            var f = d.hasClass("like") ? 1 : -1;
            var b = d.data("postid");
            var a = Number(d.data("likes")) + f;
            var c = jQuery.cookie("themerex_likes");
            if (c === undefined) {
                c = ""
            }
            g.preventDefault();
            return false
        })
    }

    //Hover DIR
    if (jQuery(".portfolio > .isotopeElement:not(.inited)").length > 0) {
        jQuery(".portfolio > .isotopeElement:not(.inited)").addClass("inited").find("> .hoverDirShow").each(function() {
            jQuery(this).hoverdir()
        })
    }

    // Add video on thumb click
    if (jQuery(".sc_video_play_button:not(.inited)").length > 0) {
        jQuery(".sc_video_play_button:not(.inited)").each(function() {
            var c = jQuery(this).data("video");
            var d = c.indexOf("height=");
            if (d > 0) {
                d += 8;
                var a = c.indexOf('"', d);
                var b = parseInt(c.substring(d, a), 10);
                if (!isNaN(b)) {
                    jQuery(this).find("img").height(b)
                }
            }
            jQuery(this).addClass("inited").animate({
                opacity: 1
            }, 1000).on("click", function(k) {
                if (!jQuery(this).hasClass("sc_video_play_button")) {
                    return
                }
                var j = jQuery(this).removeClass("sc_video_play_button").data("video");
                if (j !== "") {
                    jQuery(this).empty().html(j);
                    videoDimensions();
                    var g = jQuery(this).find("video");
                    var f = g.width();
                    var i = g.height();
                    initMediaElements(jQuery(this));
                    jQuery(this).find("video").css({
                        width: f,
                        height: i
                    }).attr({
                        width: f,
                        height: i
                    })
                }
                k.preventDefault();
                return false
            })
        })
    }

    // IFRAME width and height constrain proportions
    if (jQuery("iframe,.sc_video_player,video.sc_video").length > 0) {
        if (!THEMEREX_video_resize_inited) {
            THEMEREX_video_resize_inited = true;
            jQuery(window).resize(function() {
                videoDimensions()
            })
        }
        videoDimensions()
    }
    jQuery(".tribe-events-nav-previous,.tribe-events-nav-next,.tribe-events-widget-link,.tribe-events-viewmore").addClass("squareButton");
    jQuery("a.tribe-events-read-more").wrap('<span class="squareButton"></span>')
}

// init Media Elements
function initMediaElements(a) {
    if (THEMEREX_useMediaElement && a.find("audio,video").length > 0) {
        if (window.mejs) {
            window.mejs.MepDefaults.enableAutosize = false;
            window.mejs.MediaElementDefaults.enableAutosize = false;
            a.find("audio:not(.wp-audio-shortcode),video:not(.wp-video-shortcode)").each(function() {

                // init Media Elements after init isotope
                if (jQuery(this).parents(".mejs-mediaelement").length == 0) {
                    var b = {
                        enableAutosize: false,
                        videoWidth: -1,
                        videoHeight: -1,
                        audioWidth: "100%",
                        audioHeight: 30
                    };
                    b.success = function(d) {
                        var e, c;
                        if ("flash" === d.pluginType) {
                            e = d.attributes.autoplay && "false" !== d.attributes.autoplay;
                            c = d.attributes.loop && "false" !== d.attributes.loop;
                            e && d.addEventListener("canplay", function() {
                                d.play()
                            }, false);
                            c && d.addEventListener("ended", function() {
                                d.play()
                            }, false)
                        }
                    };
                    jQuery(this).mediaelementplayer(b)
                }
            })
        } else {
            setTimeout(function() {
                initMediaElements(a)
            }, 400)
        }
    }
}

// Fit video frames to document width
function videoDimensions() {
    jQuery(".sc_video_player").each(function() {
        var g = jQuery(this).eq(0);
        var d = (g.data("ratio") ? g.data("ratio").split(":") : (g.find("[data-ratio]").length > 0 ? g.find("[data-ratio]").data("ratio").split(":") : [16, 9]));
        d = d.length != 2 || d[0] == 0 || d[1] == 0 ? 16 / 9 : d[0] / d[1];
        var h = jQuery(this).find(".sc_video_play_button img");
        var e = g.find(".sc_video_player_title").height();
        var f = g.data("width");
        var a = g.data("height");
        if (!f || !a) {
            return
        }
        var c = ("" + f).substr(-1) == "%";
        f = parseInt(f, 10);
        a = parseInt(a, 10);
        var i = Math.min(c ? 10000 : f, g.parents("div,article").width()),
            b = Math.round(c ? i / d : i / f * a);
        if (parseInt(g.attr("data-last-width"), 10) == i) {
            return
        }
        if (c) {
            g.height(b + (isNaN(e) ? 0 : e));
            if (h.length > 0) {
                h.height(b)
            }
        } else {
            g.css({
                width: i + "px",
                height: b + (isNaN(e) ? 0 : e) + "px"
            });
            if (h.length > 0) {
                h.height(b)
            }
        }
        g.attr("data-last-width", i)
    });
    jQuery("video.sc_video").each(function() {
        var a = jQuery(this).eq(0);
        var f = (a.data("ratio") != undefined ? a.data("ratio").split(":") : [16, 9]);
        f = f.length != 2 || f[0] == 0 || f[1] == 0 ? 16 / 9 : f[0] / f[1];
        var d = a.parents(".mejs-video");
        var h = a.parents(".sc_video_player");
        var g = h.length > 0 ? h.data("width") : a.data("width");
        var b = h.length > 0 ? h.data("height") : a.data("height");
        if (!g || !b) {
            return
        }
        var e = ("" + g).substr(-1) == "%";
        g = parseInt(g, 10);
        b = parseInt(b, 10);
        var i = Math.round(d.length > 0 ? Math.min(e ? 10000 : g, d.parents("div,article").width()) : a.width()),
            c = Math.round(e ? i / f : i / g * b);
        if (parseInt(a.attr("data-last-width"), 10) == i) {
            return
        }
        if (d.length > 0 && mejs) {
            setMejsPlayerDimensions(a, i, c)
        }
        if (e) {
            a.height(c)
        } else {
            a.attr({
                width: i,
                height: c
            }).css({
                width: i + "px",
                height: c + "px"
            })
        }
        a.attr("data-last-width", i)
    });
    jQuery("video.sc_video_bg").each(function() {
        var d = jQuery(this).eq(0);
        var k = (d.data("ratio") != undefined ? d.data("ratio").split(":") : [16, 9]);
        k = k.length != 2 || k[0] == 0 || k[1] == 0 ? 16 / 9 : k[0] / k[1];
        var j = d.parents(".mejs-video");
        var b = j.length > 0 ? j.parent() : d.parent();
        var n = b.width();
        var g = b.height();
        var i = Math.ceil(g * k);
        var m = Math.ceil(n / k);
        if (d.parents(".sc_parallax").length > 0) {
            var a = jQuery(window).height();
            var e = Number(d.parents(".sc_parallax").data("parallax-speed"));
            var c = Math.ceil(Math.abs((a - g) * e));
            if (m < g + c) {
                m = g + c;
                i = Math.ceil(m * k)
            }
        }
        if (m < g) {
            m = g;
            i = Math.ceil(m * k)
        }
        if (i < n) {
            i = n;
            m = Math.ceil(i / k)
        }
        var f = Math.round((i - n) / 2);
        var o = Math.round((m - g) / 2);
        if (parseInt(d.attr("data-last-width"), 10) == i) {
            return
        }
        if (j.length > 0) {
            setMejsPlayerDimensions(d, i, m);
            j.css({
                left: -f + "px",
                top: -o + "px"
            })
        } else {
            d.css({
                left: -f + "px",
                top: -o + "px"
            })
        }
        d.attr({
            width: i,
            height: m,
            "data-last-width": i
        }).css({
            width: i + "px",
            height: m + "px"
        });
        if (d.css("opacity") == 0) {
            d.animate({
                opacity: 1
            }, 3000)
        }
    });
    jQuery("iframe").each(function() {
        var f = jQuery(this).eq(0);
        var e = (f.data("ratio") != undefined ? f.data("ratio").split(":") : (f.find("[data-ratio]").length > 0 ? f.find("[data-ratio]").data("ratio").split(":") : [16, 9]));
        e = e.length != 2 || e[0] == 0 || e[1] == 0 ? 16 / 9 : e[0] / e[1];
        var b = f.attr("width");
        var h = f.attr("height");
        var c = f.parents(".sc_video_player");
        if (c.length > 0) {
            b = c.data("width");
            h = c.data("height")
        }
        if (!b || !h) {
            return
        }
        var g = ("" + b).substr(-1) == "%";
        b = parseInt(b, 10);
        h = parseInt(h, 10);
        var a = c.length > 0 ? c.width() : f.width(),
            d = Math.round(g ? a / e : a / b * h);
        if (parseInt(f.attr("data-last-width"), 10) == a) {
            return
        }
        f.css({
            width: a + "px",
            height: d + "px"
        })
    })
}

// Resize fullscreen video background
function resizeVideoBackground() {
    var c = jQuery(".videoBackgroundFullscreen");
    if (c.length < 1) {
        return
    }
    if (THEMEREX_useMediaElement && c.find(".mejs-video").length == 0) {
        setTimeout(resizeVideoBackground, 100);
        return
    }
    if (!c.hasClass("inited")) {
        c.addClass("inited")
    }
    var a = c.find("video");
    var f = (a.data("ratio") != undefined ? a.data("ratio").split(":") : [16, 9]);
    f = f.length != 2 || f[0] == 0 || f[1] == 0 ? 16 / 9 : f[0] / f[1];
    var i = c.width();
    var d = c.height();
    var e = Math.ceil(d * f);
    var g = Math.ceil(i / f);
    if (g < d) {
        g = d;
        e = Math.ceil(g * f)
    }
    if (e < i) {
        e = i;
        g = Math.ceil(e / f)
    }
    var b = Math.round((e - i) / 2);
    var j = Math.round((g - d) / 2);
    if (c.find(".mejs-container").length > 0) {
        setMejsPlayerDimensions(c.find("video"), e, g);
        c.find(".mejs-container").css({
            left: -b + "px",
            top: -j + "px"
        })
    } else {
        c.find("video").css({
            left: -b + "px",
            top: -j + "px"
        })
    }
    c.find("video").attr({
        width: e,
        height: g
    }).css({
        width: e + "px",
        height: g + "px"
    })
}

// Set Media Elements player dimensions
function setMejsPlayerDimensions(d, a, c) {
    if (mejs) {
        for (var b in mejs.players) {
            if (mejs.players[b].media.src == d.attr("src")) {
                if (mejs.players[b].media.setVideoSize) {
                    mejs.players[b].media.setVideoSize(a, c)
                }
                mejs.players[b].setPlayerSize(a, c);
                mejs.players[b].setControlsSize()
            }
        }
    }
}

// Parallax scroll
function REX_parallax() {
    jQuery(".sc_parallax").each(function() {
        var f = jQuery(window).height();
        var e = jQuery(window).scrollTop();
        var c = Math.max(jQuery(this).offset().top, f);
        if (c <= e + f) {
            var b = Number(jQuery(this).data("parallax-speed"));
            var a = jQuery(this).data("parallax-x-pos");
            var d = Math.round((c - e - f) * b + (b < 0 ? f * b : 0));
            jQuery(this).find(".sc_parallax_content").css("backgroundPosition", a + " " + d + "px");
            jQuery(this).find("div.sc_video_bg").css("top", d + "px")
        }
    })
};

// Scroll to top
function toTop() {

    //toTop
    if (jQuery().UItoTop) {
        jQuery().UItoTop({
            easingType: 'easeOutQuart'
        });
    }
}

// Hover effects on mobile
function hover_mobile() {
    if (jQuery("#mobile_tap_hover").length > 0) {
        $('a.taphover').on("touchstart", function(e) {
            var link = $(this); //preselect the link
            if (link.hasClass('hover')) {
                return true;
            } else {
                link.addClass("hover");
                //$(this).parent().css({'z-index': 1});
                $('a.taphover').not(this).removeClass("hover");
                e.preventDefault();
                return false; //extra, and to make sure the function has consistent return points
            }
        });

        $('.imgNav.taphover').on("touchstart", function(e) {
            var link = $(this); //preselect the link
            if (link.hasClass('hover')) {
                $('.itemNext.taphover').not(this).removeClass("hover");
                $('.itemPrev.taphover').not(this).removeClass("hover");
                return true;
            } else {
                link.addClass("hover");
                $('.imgNav.taphover').not(this).removeClass("hover");
                e.preventDefault();
                return false; //extra, and to make sure the function has consistent return points
            }
        });
    }
}



//Show cart calculator
function shop_calculator() {
    if (jQuery("#cart_stat").length > 0) {
        $(".woocommerce-shipping-calculator > a").on("click", function() {
            $(".shipping-calculator-form").slideToggle("slow");
            return false
        });
    }
}

// Popup messages init
function massage_init() {
    jQuery("body").on("click", "#themerex_modal_bg,.themerex_message .themerex_message_close", function(a) {
        themerex_message_destroy();
        if (THEMEREX_MESSAGE_CALLBACK) {
            THEMEREX_MESSAGE_CALLBACK(0);
            THEMEREX_MESSAGE_CALLBACK = null
        }
        a.preventDefault();
        return false
    })
}