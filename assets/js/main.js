(function() {
  "use strict";

  const body = document.body;
  const header = document.querySelector("#header");
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");
  const scrollTop = document.querySelector(".scroll-top");

  function toggleScrolled() {
    if (!header || (!header.classList.contains("scroll-up-sticky") && !header.classList.contains("sticky-top") && !header.classList.contains("fixed-top"))) {
      return;
    }

    body.classList.toggle("scrolled", window.scrollY > 100);
  }

  function toggleMobileNav() {
    body.classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }

  function toggleScrollTop() {
    if (scrollTop) {
      scrollTop.classList.toggle("active", window.scrollY > 100);
    }
  }

  function updateActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('#navmenu a[href^="#"]');
    const scrollPos = window.scrollY + 150;
    let activeId = null;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
    });
  }

  document.addEventListener("scroll", () => {
    toggleScrolled();
    toggleScrollTop();
    updateActiveNav();
  });

  window.addEventListener("load", () => {
    toggleScrolled();
    toggleScrollTop();
    updateActiveNav();

    const preloader = document.querySelector("#preloader");
    if (preloader) {
      preloader.remove();
    }

    if (window.AOS) {
      AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false
      });
    }
  });

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", toggleMobileNav);
  }

  document.querySelectorAll("#navmenu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (body.classList.contains("mobile-nav-active")) {
        toggleMobileNav();
      }
    });
  });

  if (scrollTop) {
    scrollTop.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  const typedElement = document.querySelector(".typed");
  if (typedElement && window.Typed) {
    new Typed(".typed", {
      strings: typedElement.getAttribute("data-typed-items").split(","),
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  if (window.Waypoint) {
    document.querySelectorAll(".skills-animation").forEach((item) => {
      new Waypoint({
        element: item,
        offset: "80%",
        handler: function() {
          item.querySelectorAll(".progress .progress-bar").forEach((bar) => {
            bar.style.width = `${bar.getAttribute("aria-valuenow")}%`;
          });
        }
      });
    });
  }

  if (window.GLightbox) {
    GLightbox({
      selector: ".glightbox"
    });
  }

  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const loading = contactForm.querySelector(".loading");
      const errorMessage = contactForm.querySelector(".error-message");
      const sentMessage = contactForm.querySelector(".sent-message");

      loading.style.display = "block";
      errorMessage.style.display = "none";
      sentMessage.style.display = "none";

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: new FormData(contactForm)
        });
        const result = await response.json();

        if (result.success) {
          sentMessage.style.display = "block";
          contactForm.reset();
        } else {
          errorMessage.textContent = result.message || "Unable to send your message.";
          errorMessage.style.display = "block";
        }
      } catch (error) {
        errorMessage.textContent = "Unable to send your message. Please try again later.";
        errorMessage.style.display = "block";
      } finally {
        loading.style.display = "none";
      }
    });
  }
})();
