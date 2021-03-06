// Small function to set the correct vh to work with mobile devices
function fixVh() {
  vh = window.innerHeight * 0.01;

  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// Toggles the show-nav class on the header when any button/anchor with the nav-toggle
// class is clicked. Also blurs the main element (everything else on the page).
function navBarToggling() {
  const main = document.querySelector("main");
  const header = document.getElementById("site-header");
  const togglers = document.querySelectorAll(".nav-toggle");

  togglers.forEach((toggler) => {
    toggler.addEventListener("click", () => {
      header.classList.toggle("show-nav");
      main.classList.toggle("main-blur");
    });
  });
}

// Returns false if user has the preference of reduce-motion set to reduce
// Otherwise, retuns true (so animations can be enabled)
function isAnimationOn() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Apply fullpage animations
function fullpageAnimations() {
  // If user has reduce-motion: reduce set, exit
  if (!isAnimationOn()) {
    return;
  }

  // Intersection observer
  function getIntersectionObserver(options) {
    return new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("appear");
        observer.unobserve(entry.target);
        console.log(entry.target);
      });
    }, options);
  }

  // FADERS
  const faderObserver = getIntersectionObserver({
    threshold: 1,
    rootMargin: "0px 0px -30px 0px",
  });

  const faders = document.querySelectorAll(
    ".section-header, .skill, p, form, img:not(#arrow-down)"
  );

  faders.forEach((fader) => {
    // class only added if javascript is available
    fader.classList.add("fade-in");
    faderObserver.observe(fader);
  });

  // SLIDERS
  const sliderObserver = getIntersectionObserver({
    threshold: 0.5,
    rootMargin: "0px 0px 0px 400px",
  });

  const sliders = document.querySelectorAll(".project");

  sliders.forEach((slider) => {
    slider.classList.add("slide-in");
    sliderObserver.observe(slider);
  });
}

// Auto expand text area
function autoExpand() {
  const textarea = document.getElementById("message");

  textarea.addEventListener("input", () => {
    textarea.style.height = textarea.scrollHeight + "px";
  });
}

// Lazy load images and iframes
function lazyLoad() {
  const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        element.setAttribute("src", element.getAttribute("src-lazy"));

        observer.unobserve(element);
      }
    });
  });

  // Elements to lazy load
  const elements = [
    ...document.querySelectorAll("iframe[src-lazy]"),
    ...document.querySelectorAll("img[src-lazy]"),
  ];

  elements.forEach((element) => {
    lazyLoadObserver.observe(element);
  });
}

// ON DOM LOADED
window.addEventListener("DOMContentLoaded", function () {
  lazyLoad();
  autoExpand();
  fullpageAnimations();
  navBarToggling();
  fixVh();
});
