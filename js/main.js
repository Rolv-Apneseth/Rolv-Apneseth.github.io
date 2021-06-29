// Apply fullpage animations
function fullpageAnimations() {
  const elements = [
    ...document.querySelectorAll(".section-header, .skill"),
    ...document.querySelectorAll("p, form, img:not(#arrow-down)"),
  ];

  const appearOptions = {
    threshold: 1,
    rootMargin: "0px 0px -30px 0px",
  };

  const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
      console.log(entry.target);
    });
  }, appearOptions);

  elements.forEach((element) => {
    // fade-in class only added if javascript is available
    element.classList.add("fade-in");
    appearOnScroll.observe(element);
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
});
