const topOffset = 50;

$(function() {

    let currentSection = getSection();
    activateSection(currentSection);
    initMap();
    revealOnScroll();

    $(window).scroll(function() {
        const section = getSection();
        if(section !== currentSection){
            activateSection(section);
            currentSection = section;
        }
        revealOnScroll();
    });

    $(".button[href^='#'], #fixed-navbar a[href^='#']").on('click', function(event) {
        event.preventDefault();
        const hash = $(this).attr('href');
        let scrollTop = 0;
        if(hash != "#presentation")
            scrollTop = $(hash).offset().top - topOffset;
        smoothScrollTo(scrollTop);
        window.location.hash = this.hash;
    });

    // Burger menu behaviour
    $("#burger").on('click', event => {
        event.preventDefault();
        $("#mobile-menu").hasClass("active") ? closeMobileMenu() : openMobileMenu();
    });

    // Close mobile menu on click on menu items
    $("#mobile-menu li a").on('click', event => {
        closeMobileMenu();
    });

});

function smoothScrollTo(scrollTop) {
    $('html, body').stop().animate({
        scrollTop: scrollTop
    }, 800);
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
    $("#menu a").removeClass("active");
    $("#menu a[href='#" + section + "']").addClass("active");
    // $(".hero").removeClass("visible");
    // $(".hero#" + section).addClass("visible");
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

function closeMobileMenu(){
    $("#mobile-menu").removeClass("active");
    $("#burger").text('☰');
}

function openMobileMenu(){
    $("#mobile-menu").addClass("active");
    $("#burger").text('⨯');
}

function revealOnScroll() {
    $('.hero').each(function() {
        var sectionTop = $(this).offset().top;
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();

        // If section is within viewport
        if (scrollTop + windowHeight > sectionTop + 100) {
            $(this).addClass('visible');
        }
    });
  }