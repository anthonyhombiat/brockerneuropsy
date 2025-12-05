$(function() {

    scrollSpy();
    smoothScroll();

});

function smoothScroll() {
    $("nav #menu ul li a, .button").click(function(event) {
        event.preventDefault();

        let hash = this.hash;
        $('html, body').animate({
            scrollTop: hash ? $(this.hash).offset().top : 0
        }, 800, function(){
            if(hash)
                window.location.hash = hash;
        });
    });
}

function scrollSpy(){

    // $("nav #menu ul li a").removeClass("active");
    // $(this).addClass("active");

    $(window).scroll(function() {
        const scroll = $(window).scrollTop();
        $(".hero").each(function() {
            const offset = $(this).offset().top;
            if(scroll >= offset && scroll < offset + $(this).height()){
                const id = $(this).attr("id");
                $("nav #menu ul li a").removeClass("active");
                $("nav #menu ul li a[href='#"+id+"']").addClass("active");
            } else {
                $("nav #menu ul li a").first().addClass("active");
            }
        });
    });
}