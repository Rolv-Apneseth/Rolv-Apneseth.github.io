function lazyLoadIframes() {
  const iframes = document.querySelectorAll("iframe");

  const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        iframe.setAttribute("src", iframe.getAttribute("src-lazy"));

        observer.unobserve(iframe);
      }
    });
  });

  iframes.forEach((iframe) => {
    lazyLoadObserver.observe(iframe);
  });
}

// ON DOM LOADED
window.addEventListener("DOMContentLoaded", function () {
  lazyLoadIframes();
});
