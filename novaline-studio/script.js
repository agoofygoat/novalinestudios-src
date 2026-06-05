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

const lightboxOverlay = document.querySelector(".lightbox");
if (lightboxOverlay) {
  const lightboxImage = lightboxOverlay.querySelector(".lightbox__image");
  const lightboxCaption = lightboxOverlay.querySelector(".lightbox__caption");
  const closeButton = lightboxOverlay.querySelector(".lightbox__close");
  const imageTriggers = document.querySelectorAll(".series-slide img, .portfolio-grid img");

  const toggleLightbox = (show) => {
    lightboxOverlay.classList.toggle("lightbox--open", show);
    document.body.style.overflow = show ? "hidden" : "";
    lightboxOverlay.setAttribute("aria-hidden", show ? "false" : "true");
    if (!show) {
      lightboxImage.src = "";
      lightboxImage.alt = "";
      lightboxCaption.textContent = "";
    }
  };

  const onImageClick = (event) => {
    const img = event.currentTarget;
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = img.alt || "Full-size artwork preview";
    toggleLightbox(true);
  };

  imageTriggers.forEach((img) => {
    img.addEventListener("click", onImageClick);
    img.setAttribute("role", "button");
    img.setAttribute("tabindex", "0");
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onImageClick(event);
      }
    });
  });

  closeButton.addEventListener("click", () => toggleLightbox(false));
  lightboxOverlay.addEventListener("click", (event) => {
    if (event.target === lightboxOverlay) toggleLightbox(false);
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightboxOverlay.classList.contains("lightbox--open")) {
      toggleLightbox(false);
    }
  });
}
