$(window).on('load', function() {
    $(window).scroll(function() {

        var scrollPositionTop = $(window).scrollTop();
        var header = $('header');

        //console.log(scrollPositionTop);
        if (scrollPositionTop > 100) {
            if (header.hasClass('header-top')) {
                header.addClass('header-scroll');
                header.removeClass('header-top');
                console.log("biste unten");
            }
        } else {
            if (header.hasClass('header-scroll')) {
                header.addClass('header-top');
                header.removeClass('header-scroll');
                console.log("biste oben");
            }
        }


        $('.fadeIn').each(function() {
            var scrollPosition = $(window).scrollTop() + $(window).height();
            var elementPosition = $(this).offset().top + .75 * $(this).outerHeight();

            if (scrollPosition > elementPosition) {
                if (!$(this).hasClass('fadeIn-visible')) {
                    $(this).addClass('fadeIn-visible');
                }
            } else {
                if ($(this).hasClass('fadeIn-visible')) {
                    $(this).removeClass('fadeIn-visible');
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