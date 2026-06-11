const motionElements = document.querySelectorAll(".portfolio_content, .theme_card");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion && "IntersectionObserver" in window) {
  motionElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(2rem)";
    element.style.transition = "opacity 700ms ease, transform 700ms ease";
  });

  const motionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  motionElements.forEach((element) => {
    motionObserver.observe(element);
  });
} else {
  motionElements.forEach((element) => {
    element.style.opacity = "1";
    element.style.transform = "none";
  });
}
