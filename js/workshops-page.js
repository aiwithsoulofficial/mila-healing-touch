/* ============================================
   WORKSHOPS PAGE - Mila's Healing Touch
   GSAP animations + FAQ accordion
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

  /* ---------- SCROLL HEADER ---------- */
  function initHeader() {
    const header = document.getElementById("siteHeader");
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 100);
    });

    // Always start scrolled on workshops page (no full-screen video hero)
    if (window.scrollY > 0) header.classList.add("scrolled");

    // Mobile menu
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("mobileNav");
    const close = document.getElementById("mobileNavClose");
    if (toggle && nav && close) {
      toggle.addEventListener("click", () => nav.classList.add("open"));
      close.addEventListener("click", () => nav.classList.remove("open"));
      nav.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => nav.classList.remove("open"))
      );
    }
  }

  /* ---------- HERO WORD ANIMATION ---------- */
  function initHero() {
    const words = document.querySelectorAll(".wk-word");
    if (words.length) {
      gsap.to(words, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });
    }

    gsap.from(".wk-hero-content .label", {
      opacity: 0,
      y: 15,
      duration: 0.7,
      ease: "power3.out",
      delay: 0.1,
    });

    gsap.from(".wk-hero-body", {
      opacity: 0,
      y: 25,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.8,
    });

    gsap.from(".wk-hero-cta", {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: "power3.out",
      delay: 1.1,
    });

    gsap.from(".scroll-indicator", {
      opacity: 0,
      duration: 0.6,
      delay: 1.6,
    });
  }

  /* ---------- STAGGER ANIMATIONS ---------- */
  function initStaggerAnimations() {
    document.querySelectorAll('[data-animate="stagger"]').forEach((el) => {
      const children = el.children;
      gsap.from(children, {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });
  }

  /* ---------- SLIDE ANIMATIONS ---------- */
  function initSlideAnimations() {
    document.querySelectorAll('[data-animate="slide-left"]').forEach((el) => {
      gsap.from(el, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    document.querySelectorAll('[data-animate="slide-right"]').forEach((el) => {
      gsap.from(el, {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    document.querySelectorAll('[data-animate="scale-up"]').forEach((el) => {
      gsap.from(el, {
        scale: 0.92,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });
  }

  /* ---------- WORKSHOP CARDS ---------- */
  function initWorkshopCards() {
    const cards = document.querySelectorAll(".wk-card");
    if (!cards.length) return;

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none none",
            onEnter: () => card.classList.add("animated"),
          },
        }
      );
    });
  }

  /* ---------- BUNDLE CARD ---------- */
  function initBundleCard() {
    const bundleCard = document.querySelector(".wk-bundle-card");
    if (!bundleCard) return;

    ScrollTrigger.create({
      trigger: bundleCard,
      start: "top 80%",
      once: true,
      onEnter: () => {
        bundleCard.classList.add("animated");
      },
    });
  }

  /* ---------- FAQ ACCORDION ---------- */
  function initFAQ() {
    const questions = document.querySelectorAll(".wk-faq-question");

    questions.forEach((btn) => {
      const answerId = btn.getAttribute("aria-controls");
      const answer = document.getElementById(answerId);
      if (!answer) return;

      btn.addEventListener("click", () => {
        const isOpen = btn.getAttribute("aria-expanded") === "true";

        // Close all others
        questions.forEach((other) => {
          if (other !== btn) {
            other.setAttribute("aria-expanded", "false");
            const otherId = other.getAttribute("aria-controls");
            const otherAnswer = document.getElementById(otherId);
            if (otherAnswer) {
              otherAnswer.setAttribute("hidden", "");
            }
          }
        });

        // Toggle current
        if (isOpen) {
          btn.setAttribute("aria-expanded", "false");
          answer.setAttribute("hidden", "");
        } else {
          btn.setAttribute("aria-expanded", "true");
          answer.removeAttribute("hidden");
        }
      });
    });
  }

  /* ---------- SMOOTH ANCHOR SCROLLING ---------- */
  function initAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -80, duration: 1.6 });
        }
      });
    });
  }

  /* ---------- HEADER: always-scrolled on non-hero page ---------- */
  function setHeaderScrolled() {
    const header = document.getElementById("siteHeader");
    if (header) header.classList.add("scrolled");
  }

  /* ---------- INIT ---------- */
  function init() {
    setHeaderScrolled();
    initHeader();
    initHero();
    initStaggerAnimations();
    initSlideAnimations();
    initWorkshopCards();
    initBundleCard();
    initFAQ();
    initAnchorLinks();
  }

  window.addEventListener("load", init);
})();
