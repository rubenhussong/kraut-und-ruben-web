$(document).ready(function() {

    $('.on-load').each(function() {
        $(this).addClass('on-load-ready');
    });

    $('.fadeIn').each(function() {
        imageScrollAnimation($(this));
    });

});


$(window).on('load', function() {

    $(window).scroll(function() {

        headerScrollAnimation();

        $('.fadeIn').each(function() {
            imageScrollAnimation($(this));
        });
    });


    var iconRotation = 0;

    $(window).mousemove(function() {
        iconRotation = iconRotation - 5;

        var kRotate = "rotate(" + iconRotation + "deg)";
        var rRotate = "rotate(" + (-iconRotation) + "deg)";
        $('#head-icon--kraut').css({"-moz-transform" : kRotate, "-webkit-transform" : kRotate});
        $('#head-icon--ruebe').css({"-moz-transform" : rRotate, "-webkit-transform" : rRotate});
    });

});

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);
});


// Scroll Functions

function headerScrollAnimation() {
    var scrollPositionTop = $(window).scrollTop();
    var header = $('header');
    if (scrollPositionTop > 100) {
        if (header.hasClass('header-top')) {
            header.addClass('header-scroll');
            header.removeClass('header-top');
        }
    } else {
        if (header.hasClass('header-scroll')) {
            header.addClass('header-top');
            header.removeClass('header-scroll');
        }
    }
}

function imageScrollAnimation(object) {
    var scrollPositionTop = $(window).scrollTop();
    var scrollPosition = $(window).scrollTop() + $(window).height();
    var elementPosition = object.offset().top + .5 * object.outerHeight();

    if (scrollPositionTop > elementPosition) {
        if (object.hasClass('fadeIn-visible')) {
            object.removeClass('fadeIn-visible');
        }
        if (!object.hasClass('fadeOut')) {
            object.addClass('fadeOut');
        }
    } else if (scrollPosition > elementPosition) {
        if (!object.hasClass('fadeIn-visible')) {
            object.addClass('fadeIn-visible');
        }
        if (object.hasClass('fadeOut')) {
            object.removeClass('fadeOut');
        }
    } else {
        if (object.hasClass('fadeIn-visible')) {
            object.removeClass('fadeIn-visible');
        }
        if (object.hasClass('fadeOut')) {
            object.removeClass('fadeOut');
        }
    }
}