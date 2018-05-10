/** =========================================================================== D E E P - L I N K I N G - E V E N T S
 */

var existingSubPages = [
    "space",
    "casino-bregenz",
    "grenzkunst",
    "hypernet",
    "el-presidente"
];

/** ========================= On Page Load & Back and Forward Button
 */

$(window).ready(function() {
    loadCurrentPage();
});
$(window).on('popstate', function() {
    loadCurrentPage();
});

/** ========================= On Link Click (also Pager Internal Links)
 */

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();
    var linkTarget = $(this).attr("href");
    if (linkTarget.match("^#page")) {
        if (linkTarget == "#page--main") {
            closeModal();
            history.pushState({}, '', '/');
        } else {
            var targetPageDomain = linkTarget.split('--').slice(-1)[0];
            openModal(targetPageDomain);
            history.pushState({}, '', window.location.pathname + targetPageDomain);
        }
    } else {
        pageInternalLink($(this));
    }
});

/** =========================================================================== L I N K - M O D U L E S
 */

function loadCurrentPage() {
    var pagePath = window.location.pathname;
    var subPage = pagePath.split('/').slice(-1)[0];
    if(existingSubPages.indexOf(subPage) > -1) {
        openModal(subPage);
    } else  if(subPage == '') {
        closeModal();
    } else {
        history.replaceState({}, '', '/');
    }
}

function openModal(target) {
    lazyLoadImages('#page--' + target);
    $('body').addClass('modal-is-active');
    $('body').addClass('modal--' + target);
    console.log(target);
}

function closeModal() {
    lazyLoadImages('#page--main');
    var bodyClassList = $('body').attr('class').split(' ');
    for (var i = 0; i < bodyClassList.length; i++) {
        if (bodyClassList[i].includes('modal')) $('body').removeClass(bodyClassList[i]);
    }
}

function pageInternalLink(link) {
    var currentPage = '#' + link.closest(".page").attr('id');
    $($(currentPage)).animate({
        scrollTop: $(link.attr("href")).position().top
    }, 1000);
}

function lazyLoadImages(page) {
    $(page).find('img').each(function() {
        var lazySrc = $(this).attr('data-src');
        $(this).attr('src', lazySrc);
    });
}

/** =========================================================================== P A G E - I N T E R N A L - E V E N T S
 */

$(window).on('load', function() {

    $('.on-load').each(function() {
        $(this).addClass('on-load-ready');
    });

    /** ========================= Header and Scroll Marker Animation on Scroll
     */

    var scrollDistance = ($(window).scrollTop() + $('#about-text').offset().top) * .9;
    headerScrollAnimation(scrollDistance);
    arrowScrollAnimation(scrollDistance);

    /** ========================= Header and Scroll Marker Animation on Scroll
     */

    $('.fade-in').each(function() {
        objectScrollAnimation($(this));
    });

    /*
     var spanPositionWir = $("#span--wir").offset();
     console.log("Wir – Top: " + spanPositionWir.top + " Left: " + spanPositionWir.left);
     var spanPositionWebseiten = $("#span--webseiten").offset();
     console.log("Webseiten – Top: " + spanPositionWebseiten.top + " Left: " + spanPositionWebseiten.left);
     $('#about-image--wir').css('top', spanPositionWir.top).css('left', spanPositionWir.left);
     */

    AboutImageFade($('#span--wir'), $('#about-image--wir'));

    var iconRotation = 0;
    $(window).mousemove(function() {
        iconRotation = iconRotation - 5;
        var kRotate = "rotate(" + iconRotation + "deg)";
        var rRotate = "rotate(" + (-iconRotation) + "deg)";
        $('#head-icon--kraut').css({"-moz-transform" : kRotate, "-webkit-transform" : kRotate});
        $('#head-icon--ruebe').css({"-moz-transform" : rRotate, "-webkit-transform" : rRotate});
    });

    $('#page--main').scroll(function() {
        scrollDistance = ($(window).scrollTop() + $('#about-text').offset().top) * .9;
        headerScrollAnimation(scrollDistance);
        arrowScrollAnimation(scrollDistance);
        $('.fade-in').each(function() {
            objectScrollAnimation($(this));
        });
    });
});

/** =========================================================================== H O V E R - M O D U L E S
 */

/** ================================================== Fading Title Images in About Section on Hover
 */

function AboutImageFade(selector, image) {
    selector.mouseenter(function() {
        image.addClass('about-image-visible');
    });
    selector.mouseleave(function() {
        image.removeClass('about-image-visible');
    });
}

/** =========================================================================== S C R O L L - M O D U L E S
 */

/** ================================================== Header Scroll Animation
 */

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

/** ================================================== Scroll Marker Scroll Animation
 */

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

/** ================================================== Object Scroll Animation
 */

function objectScrollAnimation(object) {
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