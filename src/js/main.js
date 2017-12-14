// remove prevent behavior
$('a[href="#"]').on('click', function(e){
  e.preventDefault();
});

// desktop menu
$('[js-open-menu]').on('click', function(){
  if ($(this).hasClass('is-active')) {
    $('body').removeClass('no-scroll');
    $(this).removeClass('is-active');
    $('.main-nav').removeClass('is-active');
  } else {
    $('body').addClass('no-scroll');
    $(this).addClass('is-active');
    $('.main-nav').addClass('is-active');
  }
});

// animation
new WOW().init();

/////////
/// HOMEPAGE
/////////
if ($('body').hasClass('homepage-body')) {
  $('.footer').addClass('footer--white');
}


// black header on scroll
$(window).on('scroll', function(){
  var sectionHeight = $('.main-slider__slide').innerHeight();
  if ($(window).width > 767) {
    if ($(window).scrollTop() > (sectionHeight - 93)) {
      $('.header').css({
        'background-color' : '#000',
        'border-color' : 'transparent',
      })
    } else {
      $('.header').css({
        'background-color' : 'transparent',
        'border-color' : '#fff',
      })
    }
  } else {
    if ($(window).scrollTop() > (sectionHeight - 73)) {
      $('.header').css({
        'background-color' : '#000',
        'border-color' : 'transparent',
      })
    } else {
      $('.header').css({
        'background-color' : 'transparent',
        'border-color' : '#fff',
      })
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

var _projectsSlick = $('.projects-row');
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
if ($(window).width() < 768) { 
  _projectsSlick.slick(projectsSlickOptions);
}
  
$(window).resize(300, function(e){
  if ($(window).width() > 768 ) {
    if (_projectsSlick.hasClass('slick-initialized')) {
      _projectsSlick.slick('unslick');
    }
    return
  }
  if (!_projectsSlick.hasClass('slick-initialized')) {
    return _projectsSlick.slick(projectsSlickOptions);
  }
});

