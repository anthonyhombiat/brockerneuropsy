let currentSection = "presentation";
const topOffset = 100;

$(function() {

    activateSection(getSection());
    smoothScroll();
    initMap();

    $(window).scroll(function() {
        const section = getSection();
        if(section !== currentSection){
            activateSection(section);
            currentSection = section;
        }
    });

    $("nav #menu ul li a, .button").on('click', function(event) {
        event.preventDefault();
        const scrollTop = Math.round($($(this).attr('href')).offset().top - topOffset);
        console.log(scrollTop);
        scrollTo(scrollTop);
    });

});

function scrollTo(scrollTop) {
    $('html, body').stop().animate({
        scrollTop: scrollTop
    }, 800);
}

function smoothScroll() {
    $("nav #menu ul li a, .button").on('click', function(event) {
        event.preventDefault();

        let hash = this.hash;
        $('html, body').stop().animate({
            scrollTop: hash ? $(this.hash).offset().top : 0
        }, 800, function(){
            if(hash)
                window.location.hash = hash;
        });
    });
}

function getSection(){
    const scroll = $(window).scrollTop() + topOffset;
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

function initMap(){
    const map = L.map('map').setView([45.18511879048208, 5.713807364989013], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([45.18511879048208, 5.713807364989013]).addTo(map)
        .bindPopup('<div style="text-align:center"><strong>Lynn Bröcker</strong><br>Cabinet de neuropsychologie</div>')
        .openPopup();
}