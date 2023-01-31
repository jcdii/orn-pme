var offcanvas = document.getElementById('offcanvasRight')
offcanvas.addEventListener('show.bs.offcanvas', function () {
    document.getElementById("navidentite").classList.add("lineUp-1");
    document.getElementById("navsocial").classList.add("lineUp-2");
    document.getElementById("navweb").classList.add("lineUp-3");
    document.getElementById("navmedias").classList.add("lineUp-4");
    document.getElementById("navcontact").classList.add("lineUp-5");
})

offcanvas.addEventListener('hide.bs.offcanvas', function () {
    document.getElementById("navidentite").classList.remove("lineUp-1");
    document.getElementById("navsocial").classList.remove("lineUp-2");
    document.getElementById("navweb").classList.remove("lineUp-3");
    document.getElementById("navmedias").classList.remove("lineUp-4");
    document.getElementById("navcontact").classList.remove("lineUp-5");
})


let lastKnownScrollPosition = 0;
let ticking = false;

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

var logo = document.getElementById("logo");
var logo_inverse = document.getElementById("logo_inverse");
logo_inverse.remove();

function updateUi(scrollPos) {
    var min = getPosition(document.getElementById("offre")).y;
    var max = getPosition(document.getElementById("contact")).y;

    if (scrollPos > min && scrollPos < max) {
        document.getElementById("burger").classList.remove("text-black");
        document.getElementById("burger").classList.add("text-white");
        document.getElementById("nav").classList.remove("bignav");

        if( document.getElementById("logo")) {
            document.getElementById("logo").remove();
        }

        if(!document.body.contains(document.getElementById("logo_inverse"))) {
            document.getElementById("container-logo").appendChild(logo_inverse);
        }

        if(document.body.contains(document.getElementById("logo_inverse"))) {
            document.getElementById("logo_inverse").classList.remove("color-inverse")
            document.getElementById("logo_inverse").classList.add("color-not-inverse")
        }

    } else if ( scrollPos >= min && scrollPos >= max) {
        document.getElementById("burger").classList.add("text-black");
        document.getElementById("burger").classList.remove("text-white");

        if(document.body.contains(document.getElementById("logo_inverse"))) {
            document.getElementById("logo_inverse").classList.add("color-inverse")
            document.getElementById("logo_inverse").classList.remove("color-not-inverse")
        }

    } else {
        document.getElementById("burger").classList.add("text-black");
        document.getElementById("burger").classList.remove("text-white");
        document.getElementById("nav").classList.add("bignav");

        // PARTIE AVEC LA GRANDE NAVBART
        if(document.getElementById("logo_inverse")) {
            document.getElementById("logo_inverse").remove();
        }

        if(!document.body.contains(document.getElementById("logo"))) {
            logo.classList.add("animate");
            document.getElementById("container-logo").appendChild(logo);
        }
    }
}

// EVH Desktop
document.getElementById("main").addEventListener('scroll',(event) => {
    lastKnownScrollPosition =  getPosition(document.getElementById("main")).y * -1;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateUi(lastKnownScrollPosition);
            ticking = false;
        });

        ticking = true;
    }
});

// EVH Mobile
window.addEventListener('scroll',(event) => {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateUi(lastKnownScrollPosition);
            ticking = false;
        });

        ticking = true;
    }
});

const aosAnimation = document.querySelectorAll('[data-aos]');
observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
            entry.target.classList.add('aos-animate');
        } else {
            entry.target.classList.remove('aos-animate');
        }
    });
});

aosAnimation.forEach(aosObject => {
    observer.observe(aosObject);
});
