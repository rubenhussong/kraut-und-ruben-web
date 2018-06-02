
const existingSubPages = [
    "space",
    "casino-bregenz",
    "grenzkunst",
    "hypernet",
    "el-presidente"
];
var currentPage;
var body = 'body';

var pageMainTitle = document.title;

/** ========================= On Page Load & Back and Forward Button
 */

$(window).on('popstate', function() {
    $(body).removeClass('imprint-is-active');
    loadCurrentPage();
});
$(document).ready(function() {
    loadCurrentPage();
});

/** =========================================================================== D E E P - L I N K I N G - E V E N T S
 */

/** ========================= On Link Click
 */

$(document).on('click', 'a[href^="#"]', function(event) {
    event.preventDefault();
    var linkTarget = $(this).attr("href");
    if (linkTarget.match("^#page-")) {
        if (linkTarget == "#page--main") {
            var scrollPage = currentPage;
            setTimeout(function() {
                $(scrollPage).scrollTop(0);
            }, 600);
            closeModal();
            history.pushState({}, '', '/');
        } else {
            targetPageDomain = linkTarget.split('--').slice(-1)[0];
            var currentSubPage = window.location.pathname.split('/').slice(-1)[0];
            if (targetPageDomain == 'prev-project') {
                if (existingSubPages.indexOf(currentSubPage) > 0) {
                    targetPageDomain = existingSubPages[existingSubPages.indexOf(currentSubPage) - 1];
                } else {
                    targetPageDomain = existingSubPages[existingSubPages.length - 1];
                }
            } else if (targetPageDomain == 'next-project') {
                if (existingSubPages.indexOf(currentSubPage) < existingSubPages.length - 1) {
                    targetPageDomain = existingSubPages[existingSubPages.indexOf(currentSubPage) + 1];
                } else {
                    targetPageDomain = existingSubPages[0];
                }
            }
            openModal(targetPageDomain);
            history.pushState({}, '', '/' + targetPageDomain);
        }
    } else {
        pageInternalLink(linkTarget);
    }
});

/** =========================================================================== L I N K - M O D U L E S
 */

function loadCurrentPage() {
    var pagePath = window.location.pathname;
    var subPage;
    if (pagePath.substring(pagePath.length - 1) == '/') {
        subPage = pagePath.slice(0,-1).split('/').slice(-1)[0];
    } else {
        subPage = pagePath.split('/').slice(-1)[0];
    }
    if(existingSubPages.indexOf(subPage) > -1) {
        openModal(subPage);
        history.replaceState({}, '', '/' + subPage);
    } else {
        closeModal();
        history.replaceState({}, '', '/');
    }
}

function openModal(target) {
    var bodyClassList = $('body').attr('class').split(' ');
    for (var i = 0; i < bodyClassList.length; i++) {
        if (bodyClassList[i].includes('modal')) {
            $(body).removeClass(bodyClassList[i]);
        }
    }
    currentPage = '#page--' + target;
    lazyLoadImages(currentPage);
    changeDocumentTitle(target);
    bodyColorChange($(currentPage), '.change-color');
    $(body).addClass('modal-is-active');
    $(body).addClass('modal--' + target);
}

function closeModal() {
    /*
    var scrollTarget = $(currentPage).scrollTop() - (.8 * $(window).height());
    $(currentPage).animate({
        scrollTop: scrollTarget
    }, {
        duration: 600,
        easing: "linear"
    });
    */
    currentPage = '#page--main';
    lazyLoadImages('#page--main');
    changeDocumentTitle('main');
    bodyColorChange($(currentPage), '.change-color');
    var bodyClassList = $(body).attr('class').split(' ');
    for (var i = 0; i < bodyClassList.length; i++) {
        if (bodyClassList[i].includes('modal')) {
            $(body).removeClass(bodyClassList[i]);
        }
    }
}

function lazyLoadImages(page) {
    $(page).find('img').each(function() {
        var lazySrc = $(this).attr('data-src');
        $(this).attr('src', lazySrc);
    });
}

function changeDocumentTitle(target) {
    if (target == 'main') {
        document.title = pageMainTitle;
    } else {
        var pageSubTitle = target.replace('-', ' ' );
        pageSubTitle = pageSubTitle.replace(pageSubTitle.charAt(0), pageSubTitle.charAt(0).toUpperCase());
        for (var i = 0; i < pageSubTitle.length; i++) {
            if (pageSubTitle.charAt(i) == ' ') {
                pageSubTitle = pageSubTitle.replace(pageSubTitle.charAt(i + 1), pageSubTitle.charAt(i + 1).toUpperCase());
            }
        }
        document.title = pageMainTitle + ' – ' + pageSubTitle;
    }
}

function pageInternalLink(link) {
    if (link == "#imprint") {
        $(body).addClass('imprint-is-active');
    } else if (link == "#close-imprint") {
        $(body).removeClass('imprint-is-active');
    } else {
        $($(currentPage)).animate({
            scrollTop: $(link).position().top
        }, 600);
    }
}

/** =========================================================================== P A G E - I N T E R N A L - E V E N T S
 */

$(window).on('load', function() {
    $('.on-load').each(function() {
        $(this).addClass('on-load-ready');
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
        $('.object-rotate--left').css({"-moz-transform" : kRotate, "-webkit-transform" : kRotate});
        $('.object-rotate--right').css({"-moz-transform" : rRotate, "-webkit-transform" : rRotate});
    });

    $('.page').each(function() {
        var thisPage = '#' + $(this).attr('id');
        objectScrollAnimation($(thisPage), '.scroll-animation');
        if (thisPage == '#page--main') {
            scrollDistance = ($(window).scrollTop() + $('#about-text').offset().top) * .9;
            headerScrollAnimation(scrollDistance);
            arrowScrollAnimation(scrollDistance);
        }
        $(thisPage).scroll(function() {
            objectScrollAnimation($(thisPage), '.scroll-animation');
            bodyColorChange($(thisPage), '.change-color');
            if (thisPage == '#page--main') {
                scrollDistance = ($(window).scrollTop() + $('#about-text').offset().top) * .9;
                headerScrollAnimation(scrollDistance);
                arrowScrollAnimation(scrollDistance);
            }
        });
    });
    $('.page--project').each(function() {
        var prev = 0;
        var nav = $('#header--page-project');
        $('#' + $(this).attr('id')).scroll(function() {
            var scrollPosition = $(this).scrollTop();
            nav.toggleClass('hidden', scrollPosition > prev);
            prev = scrollPosition;
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
        header.addClass('scroll-down').removeClass('scroll-top');
    } else {
        header.addClass('scroll-top').removeClass('scroll-down');
    }
}

/** ================================================== Scroll Marker Scroll Animation
 */

function arrowScrollAnimation(distance) {
    var scrollPositionTop = $('#page--main').scrollTop();
    var scrollMarker = $('#scroll-marker-wrapper');
    if (scrollPositionTop > distance) {
        scrollMarker.addClass('scroll-down').removeClass('scroll-top');
    } /*else {
        nav.addClass('scroll-top').removeClass('scroll-down');
    }*/
}

/** ================================================== Object Scroll Animation
 */

function objectScrollAnimation(page, selector) {
    var scrollArea = .2;
    var windowTop = 0;
    var windowHeight = $(window).height();
    var visiblePartTop = scrollArea * windowHeight;
    var visiblePartBottom = (1 - scrollArea) * windowHeight;
    $(page).find(selector).each(function() {
        var object = $(this);
        var objectHeight = object.height();
        var objectTop = object.offset().top - page.offset().top;
        var objectCenter = objectTop + .5 * objectHeight;
        var objectBottom = objectTop + objectHeight;
        if (objectHeight >= visiblePartTop) {
            if (objectBottom < visiblePartTop) {
                object.addClass('scroll-animation-top');
            } else if (objectTop < visiblePartBottom) {
                object.removeClass('scroll-animation-bottom').removeClass('scroll-animation-top');
            } else {
                object.addClass('scroll-animation-bottom');
            }
        } else {
            if (objectCenter < windowTop) {
                object.addClass('scroll-animation-top');
            } else if (objectCenter < windowHeight) {
                object.removeClass('scroll-animation-bottom').removeClass('scroll-animation-top');
            } else {
                object.addClass('scroll-animation-bottom');
            }
        }
    });
}

/** ================================================== Body Color Change
 */

function bodyColorChange(page, selector) {
    var changeColor = false;
    var scrollArea = .4;
    var windowTop = 0;
    var windowHeight = $(window).height();
    var visiblePartTop = scrollArea * windowHeight;
    var visiblePartBottom = (1 - scrollArea) * windowHeight;
    $(page).find(selector).each(function() {
        var object = $(this);
        var objectHeight = object.height();
        var objectTop = object.offset().top - page.offset().top;
        var objectCenter = object.offset().top + .5 * objectHeight - page.offset().top;
        var objectBottom = object.offset().top + objectHeight - page.offset().top;
        if (objectHeight >= visiblePartTop) {
            if (objectBottom > visiblePartTop && objectTop < visiblePartBottom) {
                changeColor = true;
            }
        } else {
            if (objectCenter > windowTop && objectCenter < windowHeight) {
                changeColor = true;
            }
        }
    });
    $(body).toggleClass('color-background-red', changeColor);
}

/** ================================================== Slideshow
 */
/*
&(window).setInterval(function() {
     $(this).find('.fade-in-visible').each(function() {
     $(this).find('.slider').each(function() {
     slideshow($(this), 500);
     });

}, 500);

function slideshow(slider, time) {
    var count = slider.find('img').length;
    var selector = 1;
    setInterval(function() {
        slider.find('>:nth-child(' + selector + ')').removeClass('slide--visible');
        selector++;
        if (selector > count) selector = 1;
        slider.find('>:nth-child(' + selector + ')').addClass('slide--visible');
    }, time);
}
*/