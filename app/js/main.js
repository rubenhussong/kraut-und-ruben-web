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
    AboutImageFade($('#span--wir'), $('#about-image--wir'));

    $('#project-link--space').click(function() {
    });

});


// LINK INTERACTION

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();
    var linkTarget = $(this).attr("href");
    if (linkTarget.match("^#page")) {
        //console.log('history: ' + history.state);
        var targetPageDomain = '';
        if (linkTarget == "#page--main") {
            var bodyClassList = $('body').attr('class').split(' ');
            for (var i = 0; i < bodyClassList.length; i++) {
                if (bodyClassList[i].includes('modal')) $('body').removeClass(bodyClassList[i]);
            }
            history.go(-1);
        } else {
            targetPageDomain = linkTarget.split('--').slice(-1)[0];
            $('body').addClass('modal-is-active');
            $('body').addClass('modal--' + targetPageDomain);
            history.pushState({}, '', window.location.pathname + targetPageDomain);
        }
    } else {
        var currentPage = '#' + $(this).closest(".page").attr('id');
        $($(currentPage)).animate({
            scrollTop: $(linkTarget).position().top
        }, 1000);
    }
});


$(window).on('load', function() {
    console.log('Domain: ' + window.location.href);

    $('#page--main').scroll(function() {
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
    var scrollPositionTop = $('#page--main').scrollTop();
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
    var scrollPositionTop = $('#page--main').scrollTop();
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