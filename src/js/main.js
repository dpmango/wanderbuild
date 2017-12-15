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
});

