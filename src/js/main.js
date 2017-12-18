$(document).ready(function(){

  //////////
  // Cache global objects
  //////////
  var _window = $(window);
  var _document = $(document);

  /////////
  /// READY - TRIGGERED WHEN PJAX DONE
  /////////
  function pageReady(){
    legacySupport();
    initHeaderScroll();
    setActiveHeaderClass();
    initSliders();
    runScrollMonitor();
    breadCrubms();
  }

  pageReady();



  // support svg
  function legacySupport(){
    svg4everybody();
  }

  // remove prevent behavior
  _document.on('click', 'a[href="#"]', function(e){
    e.preventDefault();
  });

  // breadcrumbs
  function breadCrubms(){
    if ( _document.find('.container--breadcrumbs').length > 0) {
      _document.find('.container--breadcrumbs').appendTo( _document.find('.header__empty'));
    }
  }

  // desktop menu
  _document
    .on('click', '[js-open-menu]', function(e){
      $(this).toggleClass('is-active');
      $('.header').toggleClass('is-open');
      $('.main-nav').toggleClass('is-active');

      blockScroll();

      e.preventDefault();
      e.stopPropagation();
    })
    .on('click', function(e){
      if(!$(e.target).closest('.main-nav').length) {
        if ( $('[js-open-menu]').is('.is-active') ) {
          closeMenu();
        }
      }
    });

  function blockScroll(lock){
    if ( $('[js-open-menu]').is('.is-active') ){
      _window.on('scroll, wheel', function(e){
        e.preventDefault();
      });
    } else {
      _window.off('scroll, wheel');
    }

    if ( !lock ){
      _window.off('scroll, wheel');
    }
  };

  function closeMenu(){
    blockScroll(false);
    $('[js-open-menu]').removeClass('is-active');
    $('.header').removeClass('is-open');
    $('.main-nav').removeClass('is-active');
  }


  // SET ACTIVE CLASS IN HEADER
  // * could be removed in production and server side rendering
  // user .active for li instead
  function setActiveHeaderClass(){
    $('.main-nav__menu a').each(function(i,val){
      if ( $(val).attr('href') == window.location.pathname.split('/').pop() ){
        $(val).addClass('is-active');
      } else {
        $(val).removeClass('is-active')
      }
    });
  }

  // black header on scroll
  function initHeaderScroll(){
    _window.on('scroll', throttle(function(){
      if (_window.width() > 767) {
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
    }, 50));
  }

  /////////
  /// SLIDERS
  /////////

  function initSliders(){
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

    _window.on('resize', debounce(function(e){
      if (_window.width() > 767 ) {
        if (_projectsSlick.hasClass('slick-initialized')) {
          _projectsSlick.slick('unslick');
        }
        return
      }
      if (!_projectsSlick.hasClass('slick-initialized')) {
        return _projectsSlick.slick(projectsSlickOptions);
      }
    }, 300))


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
  }

  ////////////
  // SCROLLMONITOR - WOW LIKE
  ////////////
  function runScrollMonitor(){
    _document.find('.wow').each(function(i, el){

      var elWatcher = scrollMonitor.create( $(el) );

      var delay;
      if ( $(window).width() < 768 ){
        delay = 0
      } else {
        delay = $(el).data('wow-delay');
      }

      var animationClass

      if ( $(el).data('animation-class') ){
        animationClass = $(el).data('animation-class');
      } else {
        animationClass = "wowFadeUp"
      }

      var animationName

      if ( $(el).data('animation-name') ){
        animationName = $(el).data('animation-name');
      } else {
        animationName = "wowFade"
      }

      elWatcher.enterViewport(throttle(function() {
        $(el).addClass(animationClass);
        $(el).css({
          'animation-name': animationName,
          'animation-delay': delay,
          'visibility': 'visible'
        });
      }, 100, {
        'leading': true
      }));
      elWatcher.exitViewport(throttle(function() {
        $(el).removeClass(animationClass);
        $(el).css({
          'animation-name': 'none',
          'animation-delay': 0,
          'visibility': 'hidden'
        });
      }, 100));
    });
  }


  //////////
  // BARBA PJAX
  //////////

  Barba.Pjax.Dom.containerClass = "page";

  var FadeTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function() {
      return $(this.oldContainer).animate({ opacity: .5 }, 200).promise();
    },

    fadeIn: function() {
      var _this = this;
      var $el = $(this.newContainer);

      $(this.oldContainer).hide();

      $el.css({
        visibility : 'visible',
        opacity : .5
      });

      $el.animate({ opacity: 1 }, 200, function() {
        document.body.scrollTop = 0;
        _this.done();
      });
    }
  });

  Barba.Pjax.getTransition = function() {
    return FadeTransition;
  };

  Barba.Prefetch.init();
  Barba.Pjax.start();

  Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {
    pageReady();
    closeMenu();
    initMapListener();
  });

  google.maps.event.addDomListener(window, 'load', initMapListener);

  // contacts map
   function initMapListener() {
     var cntr = {
       lat: 55.7384238,
       lng: 37.2367789
     };
     if (_document.find('#contacts-map').length > 0) {
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

});
