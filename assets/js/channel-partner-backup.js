
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".Channel-partner-how-it-works");
  const steps = document.querySelectorAll(".Channel-partner-step");
  const progressFill = document.querySelector(".Channel-partner-progress-fill");

  const totalSteps = steps.length;
  const scrollLength = window.innerHeight * 3; // controls speed

  let startScroll = 0;
  let endScroll = 0;

  function setScrollBounds() {
    startScroll = section.offsetTop;
    endScroll = startScroll + scrollLength;
  }

  function onScroll() {
    const scrollY = window.scrollY;

    // Before section
    if (scrollY < startScroll) return;

    // After section
    if (scrollY > endScroll) {
      steps.forEach(step => step.classList.remove("active"));
      steps[totalSteps - 1].classList.add("active");
      progressFill.style.width = "100%";
      section.classList.remove("pinned");
      return;
    }

    // Pin section
    section.classList.add("pinned");

    const progress = (scrollY - startScroll) / scrollLength;
    const stepIndex = Math.min(
      totalSteps - 1,
      Math.floor(progress * totalSteps)
    );

    steps.forEach((step, i) => {
      step.classList.toggle("active", i === stepIndex);
    });

    // Line grows from step 1
    const lineProgress = (stepIndex / (totalSteps - 1)) * 100;
    progressFill.style.width = `${lineProgress}%`;
  }

  setScrollBounds();
  window.addEventListener("scroll", onScroll);
  window.addEventListener("resize", setScrollBounds);
});


  document.querySelectorAll(".accordion-header-24d").forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isActive = item.classList.contains("active");

      document.querySelectorAll(".accordion-item-24d").forEach(i => {
        i.classList.remove("active");
        i.querySelector(".icon").textContent = "+";
      });

      if (!isActive) {
        item.classList.add("active");
        header.querySelector(".icon").textContent = "−";
      }
    });
  });


(() => {
  const track = document.querySelector(".Channel-partner-points");
  const cards = document.querySelectorAll(".Channel-partner-point");
  const next = document.querySelector(".cp-arrow.next");
  const prev = document.querySelector(".cp-arrow.prev");

  let index = 0;

  function update() {
    const width = cards[0].offsetWidth + 48;
    track.style.transform = `translateX(-${index * width}px)`;
  }

  next?.addEventListener("click", () => {
    if (index < cards.length - 1) index++;
    update();
  });

  prev?.addEventListener("click", () => {
    if (index > 0) index--;
    update();
  });
})();
