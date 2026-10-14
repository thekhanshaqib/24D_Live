(() => {
  const slides = document.querySelectorAll(".home-project-card");
  const nextBtn = document.querySelector(".home-project-nav.next");
  const prevBtn = document.querySelector(".home-project-nav.prev");
  const slider = document.querySelector(".home-projects-slider");

  if (!slides.length) return;

  let index = 0;
  let interval;
  const delay = 6000; // auto-slide timing (luxury pace)

  function showSlide(newIndex) {
    slides[index].classList.remove("active");
    index = (newIndex + slides.length) % slides.length;
    slides[index].classList.add("active");
  }

  function nextSlide() {
    showSlide(index + 1);
  }

  function prevSlide() {
    showSlide(index - 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    interval = setInterval(nextSlide, delay);
  }

  function stopAutoSlide() {
    clearInterval(interval);
  }

  /* Button controls */
  nextBtn?.addEventListener("click", () => {
    nextSlide();
    startAutoSlide();
  });

  prevBtn?.addEventListener("click", () => {
    prevSlide();
    startAutoSlide();
  });

  /* Pause on hover */
  slider.addEventListener("mouseenter", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);

  /* Pause on touch */
  slider.addEventListener("touchstart", stopAutoSlide);
  slider.addEventListener("touchend", startAutoSlide);

  /* Init */
  startAutoSlide();
})();
