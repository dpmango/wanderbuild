// remove prevent behavior
$('a[href="#"]').on('click', function(e){
  e.preventDefault();
});

// desktop menu
$('[js-open-menu]').on('click', function(){
  $(this).toggleClass('is-active')
})

/////////
/// HOMEPAGE
/////////
if ($('body').hasClass('homepage-body')) {
  $('.footer').addClass('footer--white');
}

// black header on scroll
var sectionHeight = $('.main-slider__slide').innerHeight();
$(window).on('scroll', function(){
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
});

// first section slider
$('.main-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  autoplay: false,
  accessibility: false,
  pauseOnHover: false,
  pauseOnFocus: false
})

