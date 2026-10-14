
const sliderWrapper = document.querySelector(".happy-customer-slider-wrapper");
const prev = document.getElementById("hcPrev");
const next = document.getElementById("hcNext");

const cardScroll = 380; // card + gap

next.addEventListener("click", () => {
  sliderWrapper.scrollBy({ left: cardScroll, behavior: "smooth" });
});

prev.addEventListener("click", () => {
  sliderWrapper.scrollBy({ left: -cardScroll, behavior: "smooth" });
});

/* Hover video autoplay (muted only) */
document.querySelectorAll(".happy-customer-video").forEach(video => {
  video.muted = true;

  video.addEventListener("mouseenter", () => {
    video.currentTime = 0;
    video.play();
  });

  video.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});


