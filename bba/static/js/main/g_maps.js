"use strict";

var googlemap_lat;
var googlemap_lng;
var googlemap_1;
var googlemap_2;
var googlemap_3;
var googlemap_point = 'img/map/google_map_point.png';
var googlemap_styles = [{"stylers":[{"saturation":-100},{"gamma":1}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"saturation":50},{"gamma":0},{"hue":"#50a5d1"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#333333"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"weight":0.5},{"color":"#333333"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"gamma":1},{"saturation":50}]}];
var googlemap_styles2 = [{"stylers":[{"saturation":-100},{"gamma":1}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"saturation":50},{"gamma":0},{"hue":"#50a5d1"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#333333"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"weight":0.5},{"color":"#333333"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"gamma":1},{"saturation":50}]}];

//type your address after "address="
jQuery.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=san francisco, CA 94102, US&sensor=false', function(data) {
    googlemap_lat = data.results[0].geometry.location.lat;
    googlemap_lng = data.results[0].geometry.location.lng;
}).complete(function(){
    if (jQuery("#googlemap_1").length > 0) {
        dxmapLoadGooglemap_1();
    }
    if (jQuery("#googlemap_2").length > 0) {
        dxmapLoadGooglemap_2();
    }
    if (jQuery("#googlemap_3").length > 0) {
        dxmapLoadGooglemap_3();
    }
});

function attachSecretMessage(marker, message)
{
    var infowindow = new google.maps.InfoWindow(
        { content: message
        });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(googlemap_1,marker);
    });
}

function attachSecretMessage2(marker, message)
{
    var infowindow = new google.maps.InfoWindow(
        { content: message
        });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(googlemap_2,marker);
    });
}

function attachSecretMessage3(marker, message)
{
    var infowindow = new google.maps.InfoWindow(
        { content: message
        });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(googlemap_3,marker);
    });
}

window.dxmapLoadGooglemap_1 = function()
{
    var center = new google.maps.LatLng(googlemap_lat, googlemap_lng);
    var settings = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 14,
        draggable: true,
        scrollwheel: false,
        center: center,
        mapTypeControl: false,
        panControl: true,
        streetViewControl: false
        //styles: styles 
    };
    googlemap_1 = new google.maps.Map(document.getElementById('googlemap_1'), settings);

    var marker = new google.maps.Marker({
        position: center,
        title: 'Map title',
        map: googlemap_1,
        icon: googlemap_point
    });
    marker.setTitle('Map title'.toString());
    //type your map title and description here
    attachSecretMessage(marker, '');
} 

window.dxmapLoadGooglemap_2 = function()
{
    var center = new google.maps.LatLng(googlemap_lat, googlemap_lng);
    var settings = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 3,
        draggable: true,
        scrollwheel: false,
        center: center,
        styles: googlemap_styles,
        mapTypeControl: false,
        panControl: true,
        streetViewControl: false
    };
    googlemap_2 = new google.maps.Map(document.getElementById('googlemap_2'), settings);

    var marker = new google.maps.Marker({
        position: center,
        title: 'Map title',
        map: googlemap_2,
        icon: googlemap_point


    });
    marker.setTitle('Map title'.toString());
    //type your map title and description here
    attachSecretMessage2(marker, '');
} 

window.dxmapLoadGooglemap_3 = function()
{
    var center = new google.maps.LatLng(googlemap_lat, googlemap_lng);
    var settings = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 8,
        draggable: true,
        scrollwheel: false,
        center: center,
        styles: googlemap_styles2,
        mapTypeControl: false,
        panControl: true,
        streetViewControl: false
    };
    googlemap_3 = new google.maps.Map(document.getElementById('googlemap_3'), settings);


    var marker = new google.maps.Marker({
        position: center,
        title: 'Map title',
        map: googlemap_3,
        icon: googlemap_point
    });
    marker.setTitle('Map title'.toString());
    //type your map title and description here
    attachSecretMessage3(marker, '');
} 