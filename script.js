let btn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    btn.style.display = window.scrollY > 300 ? "block" : "none";

});

btn.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.getAttribute("data-target");

        const count = +counter.innerText;

        const increment = target / 100;

        if (count < target) {

            counter.innerText = Math.ceil(count + increment);

            setTimeout(updateCounter, 20);

        } else {

            counter.innerText = target + "+";

        }

    };

    updateCounter();

});
window.addEventListener("load", function () {

    document.getElementById("preloader").style.display = "none";

});

new Typed(".typing", {

    strings: [

        "Industrial Automation",

        "PLC Programming",

        "SCADA Development",

        "Panel Manufacturing",

        "Instrumentation",

        "Industrial IIoT",

        "Pharma Automation",

        "Water Systems"

    ],

    typeSpeed: 70,

    backSpeed: 45,

    backDelay: 1800,

    loop: true

});
// Sticky Navbar

window.addEventListener("scroll",function(){

const navbar=document.querySelector(".navbar");

navbar.classList.toggle("scrolled",window.scrollY>80);

});