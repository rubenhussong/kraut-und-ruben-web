var scrollPosition = $(window).scrollTop();
var offsetTopStarting;


$( document ).ready(function() {

});



$( document ).scroll(function() {

    scrollPosition = $(window).scrollTop();

    $('.scroll-horizontal-left').each(function() {
        console.log($(this).height());

        var offset = $(this).offset().top;

        $(this).css({'transform' : 'translate(' + (scrollPosition - offset) + 'px, 0)'});
    });

    $('.scroll-horizontal-right').each(function() {
        console.log($(this).height());

        var offset = $(this).offset().top;

        $(this).css({'transform' : 'translate(' + (offset - scrollPosition) + 'px, 0)'});
    });
});
