 // contacts map
    function initMap() {
	  var cntr = {
	  	lat: 55.7384238,
	  	lng: 37.2367789
	  };
    if ($('#contacts-map').length > 0) {
      var contactsMap = new google.maps.Map(document.getElementById('contacts-map'), {
	    	center: cntr,
	    	zoom: 14,
        styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ],
        disableDefaultUI: true
	    });
    }
    var locations = [
  	  {
  	  	lat: 55.7384238,
  	  	lng: 37.2367789
  	  }
  	];
    var markers = locations.map(function (location, i) {
	  	return new google.maps.Marker({
	  		position: location,
	  		map: contactsMap
	  	});
	  });
  }

$(document).ready(function(){
  
//////////
// Global variables
//////////
var _window = $(window);
var _document = $(document);
    
    
  // remove prevent behavior
  _document.on('click', 'a[href="#"]', function(e){
    e.preventDefault();
  });
  
  // breadcrumbs
  if ($('.container--breadcrumbs').length > 0) {
    $('.container--breadcrumbs').appendTo($('.header__empty'));
  }
  
  // desktop menu
  _document.on('click', '[js-open-menu]', function(){
    if ($(this).hasClass('is-active')) {
      $('body').removeClass('no-scroll');
      $('.header').removeClass('is-open');
      $(this).removeClass('is-active');
      $('.main-nav').removeClass('is-active');
    } else {
      $('body').addClass('no-scroll');
      $('.header').addClass('is-open');
      $(this).addClass('is-active');
      $('.main-nav').addClass('is-active');
    }
  });
  
  // animation
  new WOW().init({
    offset: 30
  });
  
  /////////
  /// HOMEPAGE
  /////////
  if ($('body').hasClass('homepage-body')) {
    $('.footer').addClass('footer--white');
    $('.header').addClass('header--white');
  }
  
  
  // black header on scroll
  _window.on('scroll', function(){
    if (_window.width > 767) {
      if (_window.scrollTop() > 140) {
        $('.header').addClass('header--black')
        $('.breadcrumbs').addClass('breadcrumbs--white')
      } else {
        $('.header').removeClass('header--black')
        $('.breadcrumbs').removeClass('breadcrumbs--white')
      }
    } else {
      if (_window.scrollTop() > 20) {
        $('.header').addClass('header--black')
        $('.breadcrumbs').addClass('breadcrumbs--white')
      } else {
        $('.header').removeClass('header--black')
        $('.breadcrumbs').removeClass('breadcrumbs--white')
      }
    }
  });
  
  // first section slider
  $('.main-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    autoplay: false,
    accessibility: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    fade: true
  })
  
  // new projects slider
  var _projectsSlick = $('[js-projects-slider]');
  var projectsSlickOptions = {
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      autoplay: false,
      accessibility: false,
      pauseOnHover: false,
      pauseOnFocus: false,
      adaptiveHeight: false,
      responsive: [
        {
          breakpoint: 568,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    }
  if (_window.width() < 767) { 
    _projectsSlick.slick(projectsSlickOptions);
  }
    
  _window.resize(300, function(e){
    if (_window.width() > 767 ) {
      if (_projectsSlick.hasClass('slick-initialized')) {
        _projectsSlick.slick('unslick');
      }
      return
    }
    if (!_projectsSlick.hasClass('slick-initialized')) {
      return _projectsSlick.slick(projectsSlickOptions);
    }
  });
  
  
  $('.how-section__header-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    centerMode: true,
    infinite: false,
    centerPadding: '20px',
    accessibility: false,
    swipe: false,
    asNavFor: '.how-section__main-slider',
    responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            centerMode: false,
            swipe: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            centerMode: false,
            swipe: true
          }
        }
      ]
  });
  $('.how-section__main-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.how-section__header-slider',
    dots: false,
    arrows: false,
    centerMode: true,
    infinite: false,
    centerPadding: '20px',
    accessibility: false,
    swipe: false,
    focusOnSelect: true,
    responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            centerMode: false,
            swipe: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            centerMode: false,
            swipe: true
          }
        }
      ]
  });
  
});

