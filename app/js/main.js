/** =========================================================================== D E E P - L I N K I N G - E V E N T S
 */

const existingSubPages = [
    "space",
    "casino-bregenz",
    "grenzkunst",
    "hypernet",
    "el-presidente"
];

var pageMainTitle = document.title;

/*
var browserLanguage = navigator.language.substr(0, 2);
if (browserLanguage !== 'de') browserLanguage = 'en';
        --> history.pushState({}, '', browserLanguage + '/');
*/

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
            targetPageDomain = linkTarget.split('--').slice(-1)[0];
            openModal(targetPageDomain);
            history.pushState({}, '', targetPageDomain + '/');
        }
    } else {
        pageInternalLink($(this));
    }
});

/** =========================================================================== L I N K - M O D U L E S
 */

function loadCurrentPage() {
    var pagePath = window.location.pathname;
    var subPage;
    if (pagePath.substring(pagePath.length - 1) == '/') {
        subPage = pagePath.slice(0,-1).split('/').slice(-1)[0];;
    } else {
        subPage = pagePath.split('/').slice(-1)[0];
    }
    if(existingSubPages.indexOf(subPage) > -1) {
        openModal(subPage);
    } else  if(subPage == '') {
        closeModal();
    } else {
        history.replaceState({}, '', '/');
        closeModal();
    }
}

function openModal(target) {
    lazyLoadImages('#page--' + target);
    changeDocumentTitle(target);
    $('body').addClass('modal-is-active');
    $('body').addClass('modal--' + target);
}

function closeModal() {
    lazyLoadImages('#page--main');
    changeDocumentTitle('main');
    var bodyClassList = $('body').attr('class').split(' ');
    for (var i = 0; i < bodyClassList.length; i++) {
        if (bodyClassList[i].includes('modal')) {
            $('body').removeClass(bodyClassList[i]);
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
    var currentPage = '#' + link.closest(".page").attr('id');
    $($(currentPage)).animate({
        scrollTop: $(link.attr("href")).position().top
    }, 1000);
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

    $('.page').each(function() {
        var thisPage = '#' + $(this).attr('id');
        $(thisPage).scroll(function() {
            $(this).find('.fade-in').each(function() {
                objectScrollAnimation($(this));
            });
            if (thisPage == '#page--main') {
                scrollDistance = ($(window).scrollTop() + $('#about-text').offset().top) * .9;
                headerScrollAnimation(scrollDistance);
                arrowScrollAnimation(scrollDistance);
            }
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
        nav.addClass('scroll-top');
        nav.removeClass('scroll-down');
    }*/
}

/** ================================================== Object Scroll Animation
 */

function objectScrollAnimation(object) {
    var scrollPositionTop = $(window).scrollTop();
    var scrollPosition = $(window).scrollTop() + $(window).height();
    var elementPosition = object.offset().top + .5 * object.outerHeight();

    if (scrollPositionTop > elementPosition) {
        object.removeClass('fade-in-visible');
        object.addClass('fade-out');
    } else if (scrollPosition > elementPosition) {
        object.addClass('fade-in-visible');
        object.removeClass('fade-out');
    } else {
        object.removeClass('fade-in-visible');
        object.removeClass('fade-out');
    }
}