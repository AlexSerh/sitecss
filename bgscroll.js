(function($) {
  $.fn.bgscroll = function(options) {
    var x = $.extend({
      bgpositionx: 50,
      direction: "bottom",
      debug: !1,
      min: 0,
      max: 100
    }, options);

    var a = $(document).height() - $(window).height(),
        b = a - (this.offset().top + this.height());

    this.offset().top < a && (b = 0);

    var c = (this.offset().top + this.height());

    if ($(window).scrollTop() > b && $(window).scrollTop() < c) {
      var d = ($(window).scrollTop() - b) / (c - b) * 100;

      if (x.direction == "top") d = 100 - d;
      if (d > x.max) d = x.max;
      if (d < x.min) d = x.min;

      if (x.debug){
        console.log('Element background position: ' + d + ' %');
      }
    }

    return this.css({
      backgroundPosition: x.bgpositionx + '% ' + d + '%'
    });
  };
})(jQuery);

$(window).on('scroll', function(){
  $('.bg1').bgscroll({ direction: 'bottom', bgpositionx: 50 });
  $('.bg2').bgscroll({ direction: 'top', bgpositionx: 50 });
  $('.bg3').bgscroll({ direction: 'top', bgpositionx: 50 });
  $('.bg4').bgscroll({ direction: 'bottom', bgpositionx: 50 });
});

function revealElements() {
  const reveals = document.querySelectorAll('.reveal');

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementBottom = reveals[i].getBoundingClientRect().bottom;

    const isVisible = elementTop < windowHeight && elementBottom > 0;

    if (isVisible) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);