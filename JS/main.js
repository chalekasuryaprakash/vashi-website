/* Vashi Automation Solutions — v2.0 site scripts */
(function(){
  "use strict";

  document.addEventListener("DOMContentLoaded", function(){

    /* ---------- preloader ---------- */
    var pre = document.getElementById("preloader");
    window.addEventListener("load", function(){
      setTimeout(function(){ pre && pre.classList.add("hide"); }, 350);
    });
    // fallback in case load event is slow/cached
    setTimeout(function(){ pre && pre.classList.add("hide"); }, 2200);

    /* ---------- scroll progress bar ---------- */
    var bar = document.getElementById("progressBar");
    function onScroll(){
      var h = document.documentElement;
      var scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      if(bar) bar.style.width = (scrolled || 0) + "%";

      var nav = document.querySelector(".navbar");
      if(nav){ nav.classList.toggle("scrolled", h.scrollTop > 30); }

      var topBtn = document.getElementById("topBtn");
      if(topBtn){ topBtn.classList.toggle("show", h.scrollTop > 500); }
    }
    document.addEventListener("scroll", onScroll, { passive:true });
    onScroll();

    /* ---------- mobile menu ---------- */
    var hamburger = document.getElementById("hamburger");
    var navMenu = document.getElementById("navMenu");
    if(hamburger && navMenu){
      hamburger.addEventListener("click", function(){
        hamburger.classList.toggle("open");
        navMenu.classList.toggle("open");
        document.body.style.overflow = navMenu.classList.contains("open") ? "hidden" : "";
      });
      navMenu.querySelectorAll("a").forEach(function(a){
        a.addEventListener("click", function(){
          hamburger.classList.remove("open");
          navMenu.classList.remove("open");
          document.body.style.overflow = "";
        });
      });
    }

    /* ---------- back to top ---------- */
    var topBtn = document.getElementById("topBtn");
    if(topBtn){
      topBtn.addEventListener("click", function(){
        window.scrollTo({ top:0, behavior:"smooth" });
      });
    }

    /* ---------- scroll reveal ---------- */
    var revealEls = document.querySelectorAll("[data-reveal]");
    if("IntersectionObserver" in window && revealEls.length){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold:.15, rootMargin:"0px 0px -60px 0px" });
      revealEls.forEach(function(el){ io.observe(el); });
    } else {
      revealEls.forEach(function(el){ el.classList.add("in"); });
    }

    /* ---------- animated counters ---------- */
    var counters = document.querySelectorAll(".counter");
    function animateCounter(el){
      var target = parseFloat(el.getAttribute("data-target"));
      var suffix = el.getAttribute("data-suffix") || "";
      var dur = 1600, start = null;
      function step(ts){
        if(!start) start = ts;
        var progress = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if(progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(step);
    }
    if("IntersectionObserver" in window && counters.length){
      var cio = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            animateCounter(entry.target);
            cio.unobserve(entry.target);
          }
        });
      }, { threshold:.6 });
      counters.forEach(function(el){ cio.observe(el); });
    }

    /* ---------- typed rotating words (no external dependency) ---------- */
    var typedEl = document.querySelector("[data-typed]");
    if(typedEl){
      var words = typedEl.getAttribute("data-typed").split("|");
      var wi = 0, ci = 0, deleting = false;
      function tick(){
        var word = words[wi];
        if(!deleting){
          ci++;
          typedEl.textContent = word.slice(0, ci);
          if(ci === word.length){ deleting = true; setTimeout(tick, 1400); return; }
        } else {
          ci--;
          typedEl.textContent = word.slice(0, ci);
          if(ci === 0){ deleting = false; wi = (wi + 1) % words.length; }
        }
        setTimeout(tick, deleting ? 40 : 75);
      }
      tick();
    }

    /* ---------- testimonial carousel ---------- */
    var tSlides = document.querySelectorAll(".t-slide");
    var tDots = document.getElementById("tDots");
    if(tSlides.length){
      var ti = 0;
      tSlides.forEach(function(s, idx){
        if(tDots){
          var dot = document.createElement("button");
          dot.setAttribute("aria-label", "Show testimonial " + (idx+1));
          if(idx === 0) dot.classList.add("active");
          dot.addEventListener("click", function(){ showT(idx); });
          tDots.appendChild(dot);
        }
      });
      function showT(idx){
        tSlides[ti].style.display = "none";
        if(tDots) tDots.children[ti].classList.remove("active");
        ti = idx;
        tSlides[ti].style.display = "block";
        if(tDots) tDots.children[ti].classList.add("active");
      }
      tSlides.forEach(function(s,idx){ s.style.display = idx === 0 ? "block" : "none"; });
      setInterval(function(){ showT((ti + 1) % tSlides.length); }, 5500);
    }

    /* ---------- FAQ accordion ---------- */
    document.querySelectorAll(".accordion-item").forEach(function(item){
      var btn = item.querySelector(".accordion-btn");
      var panel = item.querySelector(".accordion-panel");
      if(!btn || !panel) return;
      btn.addEventListener("click", function(){
        var isOpen = item.classList.contains("open");
        document.querySelectorAll(".accordion-item.open").forEach(function(other){
          if(other !== item){
            other.classList.remove("open");
            other.querySelector(".accordion-panel").style.maxHeight = null;
          }
        });
        item.classList.toggle("open", !isOpen);
        panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
      });
    });

    /* ---------- project filter ---------- */
    var filterBtns = document.querySelectorAll(".filter-btn");
    var projectCards = document.querySelectorAll("[data-cat]");
    if(filterBtns.length){
      filterBtns.forEach(function(btn){
        btn.addEventListener("click", function(){
          filterBtns.forEach(function(b){ b.classList.remove("active"); });
          btn.classList.add("active");
          var cat = btn.getAttribute("data-filter");
          projectCards.forEach(function(card){
            var match = cat === "all" || card.getAttribute("data-cat") === cat;
            card.style.display = match ? "" : "none";
          });
        });
      });
    }

    /* ---------- cursor glow (desktop only) ---------- */
    if(window.matchMedia("(pointer:fine)").matches){
      var glow = document.createElement("div");
      glow.className = "cursor-glow";
      document.body.appendChild(glow);
      document.addEventListener("mousemove", function(e){
        glow.style.opacity = 1;
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
      });
      document.addEventListener("mouseleave", function(){ glow.style.opacity = 0; });
    }

    /* ---------- contact form (AJAX via formsubmit) ---------- */
    var form = document.getElementById("enquiryForm");
    if(form){
      form.addEventListener("submit", function(e){
        e.preventDefault();
        var status = document.getElementById("formStatus");
        var requiredFields = form.querySelectorAll("[required]");
        var valid = true;

        requiredFields.forEach(function(field){
          var wrap = field.closest(".field");
          var isEmpty = !field.value.trim();
          var isBadEmail = field.type === "email" && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
          var isBadPhone = field.getAttribute("data-phone") && field.value && !/^[0-9+\-\s()]{7,}$/.test(field.value);
          if(wrap){
            wrap.classList.toggle("error", isEmpty || isBadEmail || isBadPhone);
          }
          if(isEmpty || isBadEmail || isBadPhone) valid = false;
        });

        if(!valid){
          if(status){
            status.textContent = "Please check the highlighted fields and try again.";
            status.className = "form-status show fail";
          }
          return;
        }

        var submitBtn = form.querySelector('button[type="submit"]');
        var originalText = submitBtn ? submitBtn.textContent : "";
        if(submitBtn){ submitBtn.disabled = true; submitBtn.textContent = "Sending..."; }

        var data = new FormData(form);
        var payload = {};
        data.forEach(function(v,k){ payload[k] = v; });

        fetch(form.getAttribute("data-endpoint"), {
          method: "POST",
          headers: { "Content-Type":"application/json", "Accept":"application/json" },
          body: JSON.stringify(payload)
        }).then(function(res){
          if(!res.ok) throw new Error("Network response was not ok");
          return res.json();
        }).then(function(){
          if(status){
            status.textContent = "Thank you — your enquiry has been sent. Our team will get back to you shortly.";
            status.className = "form-status show ok";
          }
          form.reset();
        }).catch(function(){
          if(status){
            status.textContent = "Something went wrong sending your message. Please email admin@vashiautomationsolutions.com directly.";
            status.className = "form-status show fail";
          }
        }).finally(function(){
          if(submitBtn){ submitBtn.disabled = false; submitBtn.textContent = originalText; }
        });
      });
    }

    /* ---------- newsletter (front-end only feedback) ---------- */
    var newsletterForm = document.getElementById("newsletterForm");
    if(newsletterForm){
      newsletterForm.addEventListener("submit", function(e){
        e.preventDefault();
        var input = newsletterForm.querySelector("input");
        var btn = newsletterForm.querySelector("button");
        if(input && input.value.trim()){
          btn.textContent = "Subscribed ✓";
          input.value = "";
          setTimeout(function(){ btn.textContent = "Subscribe"; }, 2600);
        }
      });
    }

  });
})();
/* ===============================
   HERO IMAGE SLIDER
================================= */

const heroSlides = document.querySelectorAll(".hero-slide");

if(heroSlides.length){

let currentSlide = 0;

setInterval(function(){

heroSlides[currentSlide].classList.remove("active");

currentSlide++;

if(currentSlide >= heroSlides.length){

currentSlide = 0;

}

heroSlides[currentSlide].classList.add("active");

},5000);

}
