// Auto expand text area
const textarea = document.getElementById("message");

textarea.addEventListener("input", () => {
  textarea.style.height = textarea.scrollHeight + "px";
});

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
});
