/* ============================================
   MILA'S HEALING TOUCH - Cinematic GSAP Engine
   No canvas frames - pure scroll animations
   ============================================ */

(function () {
  "use strict";

  /* ---------- LENIS SMOOTH SCROLL ---------- */
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- HERO WORD ANIMATION ---------- */
  function initHero() {
    const words = document.querySelectorAll(".hero-heading .word");
    gsap.to(words, {
      opacity: 1, y: 0,
      stagger: 0.1, duration: 0.9, ease: "power3.out",
      delay: 0.4,
    });
    gsap.from(".hero-label", { opacity: 0, y: 15, duration: 0.7, ease: "power3.out", delay: 0.2 });
    gsap.from(".hero-tagline", { opacity: 0, y: 25, duration: 0.9, ease: "power3.out", delay: 1.1 });
    gsap.from(".scroll-indicator", { opacity: 0, duration: 0.6, delay: 1.8 });

    // Parallax hero video on scroll
    gsap.to(".hero-video", {
      yPercent: 20, scale: 1.1,
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(".hero-content", {
      yPercent: -30, opacity: 0,
      scrollTrigger: { trigger: ".hero", start: "top top", end: "80% top", scrub: true },
    });
  }

  /* ---------- SCROLL HEADER ---------- */
  function initHeader() {
    const header = document.getElementById("siteHeader");
    ScrollTrigger.create({
      start: "100px top",
      onUpdate: (self) => header.classList.toggle("scrolled", self.isActive || window.scrollY > 100),
    });
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 100);
    });

    // Mobile menu
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("mobileNav");
    const close = document.getElementById("mobileNavClose");
    toggle.addEventListener("click", () => nav.classList.add("open"));
    close.addEventListener("click", () => nav.classList.remove("open"));
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("open"))
    );
  }

  /* ---------- STAGGER ANIMATIONS ---------- */
  function initStaggerAnimations() {
    document.querySelectorAll('[data-animate="stagger"]').forEach((el) => {
      const children = el.children;
      gsap.from(children, {
        y: 50, opacity: 0,
        stagger: 0.12, duration: 0.9, ease: "power3.out",
        scrollTrigger: {
          trigger: el, start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });
  }

  /* ---------- SLIDE ANIMATIONS ---------- */
  function initSlideAnimations() {
    document.querySelectorAll('[data-animate="slide-left"]').forEach((el) => {
      gsap.from(el, {
        x: -60, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
      });
    });
    document.querySelectorAll('[data-animate="slide-right"]').forEach((el) => {
      gsap.from(el, {
        x: 60, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
      });
    });
    document.querySelectorAll('[data-animate="scale-up"]').forEach((el) => {
      gsap.from(el, {
        scale: 0.9, opacity: 0, duration: 1, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
      });
    });
  }

  /* ---------- PARALLAX ---------- */
  function initParallax() {
    document.querySelectorAll("[data-parallax]").forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.2;
      gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest(".section") || el.parentElement,
          start: "top bottom", end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  /* ---------- COUNTERS ---------- */
  function initCounters() {
    document.querySelectorAll(".stat-number").forEach((el) => {
      const target = parseInt(el.dataset.count);
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el.closest(".section-stats"),
          start: "top 70%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.val);
        },
      });
    });
  }

  /* ---------- ABOUT PHOTO ---------- */
  function initAbout() {
    gsap.from(".about-photo", {
      scale: 1.1, opacity: 0, duration: 1.2, ease: "power3.out",
      scrollTrigger: {
        trigger: ".section-about", start: "top 70%",
        toggleActions: "play none none none",
      },
    });
  }

  /* ---------- INTERLUDE PARALLAX ---------- */
  function initInterludes() {
    document.querySelectorAll(".interlude-video").forEach((vid) => {
      gsap.to(vid, {
        yPercent: 15, scale: 1.08,
        scrollTrigger: {
          trigger: vid.closest(".section-interlude"),
          start: "top bottom", end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  /* ---------- WORKSHOP CARDS ---------- */
  function initWorkshops() {
    gsap.from(".workshop-card", {
      y: 40, opacity: 0,
      stagger: 0.15, duration: 0.8, ease: "power3.out",
      scrollTrigger: {
        trigger: ".workshop-grid",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }

  /* ---------- INIT ---------- */
  function init() {
    initHero();
    initHeader();
    initStaggerAnimations();
    initSlideAnimations();
    initParallax();
    initCounters();
    initAbout();
    initInterludes();
    initWorkshops();
  }

  // Wait for fonts + images
  window.addEventListener("load", init);
})();
