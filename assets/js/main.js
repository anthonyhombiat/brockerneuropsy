$(function() {

    smoothScroll();

});

function smoothScroll() {
    $("nav #menu ul li a, .button").click(function(event) {
        event.preventDefault();

        $("nav #menu ul li a").removeClass("active");
        $(this).addClass("active");

        let hash = this.hash;

        $('html, body').animate({
            scrollTop: hash ? $(this.hash).offset().top : 0
        }, 800, function(){
            if(hash)
                window.location.hash = hash;
        });
    });
}