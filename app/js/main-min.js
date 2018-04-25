$(window).on('load', function() {

    $('.on-load').each(function() {
        $(this).addClass('on-load-ready');
    });

    $(window).scroll(function() {

        var scrollPositionTop = $(window).scrollTop();
        var header = $('header');

        //console.log(scrollPositionTop);
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


        $('.fadeIn').each(function() {
            var scrollPositionTop = $(window).scrollTop();
            var scrollPosition = $(window).scrollTop() + $(window).height();
            var elementPosition = $(this).offset().top + .5 * $(this).outerHeight();

            if (scrollPositionTop > elementPosition) {
                if ($(this).hasClass('fadeIn-visible')) {
                    $(this).removeClass('fadeIn-visible');
                }
                if (!$(this).hasClass('fadeOut')) {
                    $(this).addClass('fadeOut');
                }
            } else if (scrollPosition > elementPosition) {
                if (!$(this).hasClass('fadeIn-visible')) {
                    $(this).addClass('fadeIn-visible');
                }
                if ($(this).hasClass('fadeOut')) {
                    $(this).removeClass('fadeOut');
                }
            } else {
                if ($(this).hasClass('fadeIn-visible')) {
                    $(this).removeClass('fadeIn-visible');
                }
                if ($(this).hasClass('fadeOut')) {
                    $(this).removeClass('fadeOut');
                }
            }

        });

    });


    var iconRotation = 0;

    $(window).mousemove(function() {
        iconRotation = iconRotation + 5;

        $('.head-icon').each(function() {
            var sRotate = "rotate(" + iconRotation + "deg)";
            $(this).css({"-moz-transform" : sRotate, "-webkit-transform" : sRotate});
        });
    });

});