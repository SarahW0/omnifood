$(document).ready(function() {
 /*
  var isInViewport =  function(element) {
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).outerHeight();
        var viewportTop = $(window).scrollTop();
        //var viewportBottom = viewportTop + $(window).height();
        var viewportBottom = viewportTop + window.innerHeight;
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };*/
    function isInViewport(elClassName) {
        var el = document.querySelector(elClassName);
        const rect = el.getBoundingClientRect();
        // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

        // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
        const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
        const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

        return (vertInView && horInView);
    }
    /*window scroll resize event*/
    $(window).on('resize scroll', function() {
        var cityImagesClass = '#section-cities .app-screen';
        if(isInViewport(cityImagesClass)) {
          if(!$(cityImagesClass).hasClass("zoomIn"))
          {
            $(cityImagesClass).addClass('animated zoomIn');
          }
        } else {
          $(cityImagesClass).removeClass('animated zoomIn');
        }

        var phoneImagesClass = '.section-steps .app-screen';
        if(isInViewport(phoneImagesClass)) {
          if(!$(phoneImagesClass).hasClass("tada"))
          {
            $(phoneImagesClass).addClass('animated tada');
          }
        } else {
          $(phoneImagesClass).removeClass('animated tada');
        }
    });

  /*add sticky nav bar effect*/
  $('.js--section-features').waypoint(function(direction) {
    if(direction == 'down') {
        $('nav').addClass('sticky');
    } else {
        $('nav').removeClass('sticky');
    }
  }, {
    offset: '100px'
  });

  $('.js--nav-icon').click(function() {
      var nav = $('.js--main-nav');
      var icon = $('.js--nav-icon i');


      nav.slideToggle(200);
      if(icon.hasClass('fa-bars')) {
        icon.removeClass('fa-bars');
        icon.addClass('fa-times');
      } else {
        icon.removeClass('fa-times');
        icon.addClass('fa-bars');
      }
      /*<i class="fas fa-times"></i>*/
  });

  $('.js--scroll-to-plans').click(function() {
    $('html, body').animate({
      scrollTop: $('.js--section-plans').offset().top - 80 +'px' }, 500);
  });

  $('.js--scroll-to-features').click(function() {
    $('html, body').animate({
      scrollTop: $('.js--section-features').offset().top - 80 +'px' }, 500);
  });
  /*click black logo on the sticky nav bar to go home*/
  $('.logo-black').click(function() {
    $('html, body').animate({
      scrollTop: 0 }, 500);
  });
  /*start: add a map */
  /*var mymap = L.map('map').setView([51.505, -0.04], 13);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);

  L.marker([51.5, -0.09]).addTo(mymap);
  */
  var lat = 51.505;
  var lon = -0.05;
  if(window.innerWidth < 767)
  {
   lat = 51.5;
   lon = -0.09;
  }
  var map = L.map('map').setView([lat, lon], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map);

  /*end: add a map*/
  /*start of anchor scroll effects*/
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 80
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
  /*end of anchor scroll effects*/
});
