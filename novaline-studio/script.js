const revealTargets = [
  ".service-card",
  ".project-card",
  ".real-project",
  ".series-slide",
  ".offer-card",
  ".process-card",
  ".quote-card",
  ".social-card",
  ".contact-card",
  ".portfolio-feature",
  ".feature-board"
];

const elements = document.querySelectorAll(revealTargets.join(","));

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  elements.forEach((element) => element.classList.add("is-visible"));
} else {
  elements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -48px 0px" }
  );

  elements.forEach((element) => observer.observe(element));
}
