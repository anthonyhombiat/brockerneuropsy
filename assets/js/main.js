let currentSection = "presentation";

$(function() {

    $(window).scroll(function() {
        const section = getSection();
        if(section !== currentSection){
            activateSection(section);
            currentSection = section;
        }
    });
    activateSection(getSection());
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

function getSection(){
    const scroll = $(window).scrollTop() + 100;
    let section = "presentation";
    $(".hero").each(function(index) {
        if(index === 0) return;
        const offset = $(this).offset().top;
        if(scroll >= offset && scroll){
            section = $(this).attr("id");
        } else {
            return false;
        }
    });
    return section;
}

function activateSection(section) {
    $("nav #menu ul li a").removeClass("active");
    $("nav #menu ul li a[href='#" + section + "']").addClass("active");
}

function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}