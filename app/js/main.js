$(document).ready(function() {

    $('.on-load').each(function() {
        $(this).addClass('on-load-ready');
    });

    $('.fade-in').each(function() {
        imageScrollAnimation($(this));
    });

    var windowWidth = $(window).width();
    var scrollDistance = windowWidth / 15;
    headerScrollAnimation(scrollDistance);
    arrowScrollAnimation(scrollDistance);

/*
    var spanPositionWir = $("#span--wir").offset();
    console.log("Wir – Top: " + spanPositionWir.top + " Left: " + spanPositionWir.left);
    var spanPositionWebseiten = $("#span--webseiten").offset();
    console.log("Webseiten – Top: " + spanPositionWebseiten.top + " Left: " + spanPositionWebseiten.left);
    $('#about-image--wir').css('top', spanPositionWir.top).css('left', spanPositionWir.left);
*/
    AboutImageFade($('#span--wir'), $('#about-image--wir'))

    $('#project-link--space').click(function() {
        $('body').addClass('modal-is-active');
        $('body').addClass('project-modal--space');
    });

    $('.close-modal').click(function() {
        $('body').removeClass('modal-is-active');
        $('body').removeClass('project-modal--space');
    });


});


$(window).on('load', function() {

    $('#page-main').scroll(function() {

        var windowWidth = $(window).width();
        var scrollDistance = windowWidth / 12.5;
        headerScrollAnimation(scrollDistance);
        arrowScrollAnimation(scrollDistance);

        $('.fade-in').each(function() {
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



// ================================================== F U N C T I O N S

// About Image Fade Function

function AboutImageFade(selector, image) {
    selector.mouseenter(function() {
        image.addClass('about-image-visible');
    });
    selector.mouseleave(function() {
        image.removeClass('about-image-visible');
    });
}

// Scroll Functions

function headerScrollAnimation(distance) {
    var scrollPositionTop = $('#page-main').scrollTop();
    var header = $('header');
    if (scrollPositionTop > distance) {
        if (header.hasClass('scroll-top')) {
            header.addClass('scroll-down');
            header.removeClass('scroll-top');
        }
    } else {
        if (header.hasClass('scroll-down')) {
            header.addClass('scroll-top');
            header.removeClass('scroll-down');
        }
    }
}

function arrowScrollAnimation(distance) {
    var scrollPositionTop = $('#page-main').scrollTop();
    var nav = $('nav');
    if (scrollPositionTop > distance) {
        if (nav.hasClass('scroll-top')) {
            nav.addClass('scroll-down');
            nav.removeClass('scroll-top');
        }
    } /*else {
        if (nav.hasClass('scroll-down')) {
            nav.addClass('scroll-top');
            nav.removeClass('scroll-down');
        }
    }*/
}

function imageScrollAnimation(object) {
    var scrollPositionTop = $(window).scrollTop();
    var scrollPosition = $(window).scrollTop() + $(window).height();
    var elementPosition = object.offset().top + .5 * object.outerHeight();

    if (scrollPositionTop > elementPosition) {
        if (object.hasClass('fade-in-visible')) {
            object.removeClass('fade-in-visible');
        }
        if (!object.hasClass('fade-out')) {
            object.addClass('fade-out');
        }
    } else if (scrollPosition > elementPosition) {
        if (!object.hasClass('fade-in-visible')) {
            object.addClass('fade-in-visible');
        }
        if (object.hasClass('fade-out')) {
            object.removeClass('fade-out');
        }
    } else {
        if (object.hasClass('fade-in-visible')) {
            object.removeClass('fade-in-visible');
        }
        if (object.hasClass('fade-out')) {
            object.removeClass('fade-out');
        }
    }
}