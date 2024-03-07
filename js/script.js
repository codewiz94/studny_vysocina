// SLIDER

$(document).ready(function() {
    const slide = $('.slide');
    const next = $('.next');
    const prev = $('.prev');

    let currentIndex = 0;

    next.on('click', (event) => {
        event.preventDefault();
        currentIndex = (currentIndex + 1) % slide.children().length;
        updateSlide();
    });

    prev.on('click', (event) => {
        event.preventDefault();
        currentIndex = (currentIndex - 1 + slide.children().length) % slide.children().length;
        updateSlide();

        
    });

    function updateSlide() {
        const translateValue = -currentIndex * (100 / slide.children().length) + '%';
        slide.css('transform', 'translateX(' + translateValue + ')');
    }


});

// DRILL ROTATION

(function($){

    var win = $(window);

    var drill = $('.drill-bot');
    var rotation = 0;

    win.on('scroll', function() {
        rotation += 180;
        drill.css({
            'transform': 'rotateY(' + rotation + 'deg)'
        });
    });

})(jQuery);

// DRILL VISIBILITY

$(document).ready(function() {
    var drillMain = $('.drill-main');
    var menuTop = $('.menu-top');
    var section1 = $('.section-1');

    // Set initial opacity to 0
    drillMain.css('opacity', 0);

    $(window).scroll(function() {
        var viewportTop = $(window).scrollTop();
        var menuTopBottom = menuTop.offset().top + menuTop.height();
        var section1Top = section1.offset().top;

        // Check if menu-top has reached section-1
        if (menuTopBottom >= section1Top) {
            // Change opacity based on the scroll position
            var opacity = Math.min(1, (menuTopBottom - section1Top) / menuTop.height());
            drillMain.css('opacity', opacity);
        } else {
            // If not reached, keep the opacity at 0
            drillMain.css('opacity', 0);
        }
    });
});





   
    // DRILL OFFSET FROM TOP

    $(document).ready(function() {
        $(window).scroll(function() {
            var paralax = $('.paralax');
            var drillMain = $('.drill-main');
            var menuTop = $('.menu-top');
            var menuTopHeight = menuTop.height() + parseInt(menuTop.css('border-bottom-width'));
    
            // Adjust the offset and threshold based on your layout
            var offset = 103; // 100px + 3px
            var threshold = 0.5;
    
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            var paralaxTop = paralax.offset().top;
            var paralaxBottom = paralaxTop + paralax.height();
    
            if (paralaxBottom < viewportTop + offset || paralaxTop > viewportBottom - offset) {
                drillMain.addClass('visible').css('top', menuTopHeight + 'px');
            } else {
                drillMain.removeClass('visible').css('top', '0');
            }
        });
    });



    // AKORDEON

    $(document).ready(function () {
        var list = $('.list');
    
        list.find('dd').slideUp();
    
        list.find('dt').on('click', function (event) {
            var currentDt = $(this);
            var currentDd = currentDt.next('dd');
    
            // Toggle the visibility of the current 'dd'
            currentDd.slideToggle().siblings('dd').slideUp();
    
            // Toggle the icons based on visibility
            var icon = currentDt.find('.fa-circle-plus, .fa-circle-minus');
            icon.toggleClass('fa-circle-plus fa-circle-minus');
    
            // Reset icons for other 'dt' elements
            list.find('dt').not(currentDt).find('.fa-circle-minus').removeClass('fa-circle-minus').addClass('fa-circle-plus');
    
            event.preventDefault();
        });
    });
    
    
    
// PARALAX

$(document).ready(function () {
    const parallaxImages = $('.paralax .parallax-image');
    const parallaxSection = $('.paralax');
    const menuTop = $('.menu-top');
    const parallaxOffset = parallaxSection.offset().top;

    parallaxImages.each(function () {
        $(this).data('initial-bottom', parseFloat($(this).css('bottom')) || 0);
        $(this).data('speed', parseFloat($(this).data('speed')) || 0);
        $(this).data('direction', $(this).data('direction') || 'down');
    });

    $(window).scroll(function () {
        let scrollPosition = $(window).scrollTop();

        if (scrollPosition >= parallaxOffset - menuTop.height()) {
            parallaxImages.each(function () {
                let speed = $(this).data('speed');
                let initialBottom = $(this).data('initial-bottom');
                let direction = $(this).data('direction');
                let translateY = (direction === 'up' ? -1 : 1) * (scrollPosition - parallaxOffset) * speed;

                $(this).css('bottom', initialBottom + translateY + 'px');
            });
        } else {
            parallaxImages.css('bottom', '0');
        }
    });
});

// COUNTER

$('.count').each(function () {
    const counter = $(this);
    const target = Number(counter.attr('data-target'));
    const animationDuration = 2500; // in milliseconds
    const startTime = new Date().getTime();

    function upData() {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(1, elapsedTime / animationDuration);
        const currentValue = Math.floor(progress * (target - 0) + 0);

        counter.text(currentValue);

        if (progress < 1) {
            requestAnimationFrame(upData);
        } else {
            counter.text(target);
        }
    }

    upData();
});


// LIGHTBOX

$(document).ready(function () {
    const gallery = $('.galery');
    const lightbox = $('#lightbox');
    const lightboxImg = $('#lightbox-img');
    let currentIndex;

    gallery.on('click', 'img', function () {
        currentIndex = $(this).index();
        showLightbox();
        updateLightboxImage();
    });

    function showLightbox() {
        lightbox.fadeIn();
    }

    function hideLightbox() {
        lightbox.fadeOut();
    }

    function updateLightboxImage() {
        lightboxImg.attr('src', gallery.find('img').eq(currentIndex).attr('src'));
    }

    function changeImage(direction) {
        currentIndex += direction;
        if (currentIndex < 0) {
            currentIndex = gallery.find('img').length - 1;
        } else if (currentIndex >= gallery.find('img').length) {
            currentIndex = 0;
        }
        updateLightboxImage();
    }

    $('.lightbox-btn.prev').on('click', function () {
        changeImage(-1);
    });

    $('.lightbox-btn.next').on('click', function () {
        changeImage(1);
    });

    $('.close-btn, #lightbox').on('click', function (e) {
        if (e.target === lightbox[0] || e.target.className === 'close-btn') {
            hideLightbox();
        }
    });

    // Hide lightbox initially
    lightbox.hide();
});

    






