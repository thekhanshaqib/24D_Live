const toggle = document.getElementById("simpleToggle");
const mobileMenu = document.getElementById("simpleMobileMenu");
const closeBtn = document.getElementById("simpleClose");

toggle.addEventListener("click", () => {
  mobileMenu.classList.add("open");
  toggle.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
  toggle.classList.remove("active");
  document.body.style.overflow = "";
});

document.querySelectorAll(".mobile-submenu-header").forEach(header => {
  header.addEventListener("click", () => {
    const parent = header.parentElement;
    const submenu = header.nextElementSibling;

    parent.classList.toggle("open");

    submenu.style.display =
      submenu.style.display === "block" ? "none" : "block";
  });
});

const submenuLinks = document.querySelectorAll(".submenu-links a");
const submenuImages = document.querySelectorAll(".submenu-img");

submenuLinks.forEach(link => {
  link.addEventListener("mouseenter", () => {
    const target = link.getAttribute("data-target");

    submenuImages.forEach(img => {
      img.classList.toggle(
        "active",
        img.getAttribute("data-image") === target
      );
    });
  });
});



/* ================= HERO CAROUSEL ================= */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".hero-video video").forEach(video => {
    video.play().catch(() => {
      // Autoplay fallback (iOS)
      video.muted = true;
      video.play();
    });
  });
});


/* ================= COUNTER ANIMATION ================= */
const counters = document.querySelectorAll(".counter-item h3");

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const isCurrency = el.textContent.includes("$");
      let count = 0;
      const increment = target / 80;

      const updateCounter = () => {
        count += increment;
        if (count < target) {
          el.textContent = isCurrency
            ? `$${count.toFixed(1)}M`
            : `${Math.floor(count)}+`;
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = isCurrency
            ? `$${target}M`
            : `${target}+`;
        }
      };

      updateCounter();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });

counters.forEach(counter => counterObserver.observe(counter));

/* ================= Slider Button ================= */
document.querySelectorAll(".slider-btn").forEach(button => {
  button.addEventListener("click", () => {
    const slider = document.getElementById(button.dataset.target);
    const scrollAmount = slider.clientWidth * 0.8;

    slider.scrollBy({
      left: button.classList.contains("next") ? scrollAmount : -scrollAmount,
      behavior: "smooth"
    });
  });
});



/* ================= Our Process ================= */
const steps = document.querySelectorAll(".process-step");

const stepObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.4 }
);

steps.forEach(step => stepObserver.observe(step));

/* ================= Home Press Events ================= */


  const event_slides = document.querySelectorAll('.home-press-event-slide');
  const prevBtn = document.querySelector('.home-press-event-nav.prev');
  const nextBtn = document.querySelector('.home-press-event-nav.next');

  let event_currentIndex = 1;

 function updateSlides() {
  event_slides.forEach(slide => slide.classList.remove('active'));
  event_slides[event_currentIndex].classList.add('active');

  /* Mobile slider movement */
  if (window.innerWidth <= 768) {
    const slider = document.querySelector('.home-press-event-slider');
    slider.style.transform = `translateX(-${event_currentIndex * 100}%)`;
  }
}

/* ================= Touch Swipe Support (Mobile) ================= */

const slider = document.querySelector('.home-press-event-slider');

let startX = 0;
let currentX = 0;
let isDragging = false;

if (slider) slider.addEventListener('touchstart', (e) => {
  if (window.innerWidth > 768) return;

  startX = e.touches[0].clientX;
  isDragging = true;
});

if (slider) slider.addEventListener('touchmove', (e) => {
  if (!isDragging || window.innerWidth > 768) return;

  currentX = e.touches[0].clientX;
});

if (slider) slider.addEventListener('touchend', () => {
  if (!isDragging || window.innerWidth > 768) return;

  const diff = startX - currentX;
  const swipeThreshold = 50;

  if (diff > swipeThreshold) {
    // Swipe left → Next
    event_currentIndex =
      (event_currentIndex + 1) % event_slides.length;
  } else if (diff < -swipeThreshold) {
    // Swipe right → Prev
    event_currentIndex =
      (event_currentIndex - 1 + event_slides.length) % event_slides.length;
  }

  updateSlides();
  isDragging = false;
});


  if (nextBtn) nextBtn.addEventListener('click', () => {
    event_currentIndex = (event_currentIndex + 1) % event_slides.length;
    updateSlides();
  });

  if (prevBtn) prevBtn.addEventListener('click', () => {
    event_currentIndex = (event_currentIndex - 1 + event_slides.length) % event_slides.length;
    updateSlides();
  });

  /* 👉 Hover Behavior (NEW) */
event_slides.forEach((slide, index) => {
  slide.addEventListener('mouseenter', () => {
    event_currentIndex = index;
    updateSlides();
  });
});

  if (event_slides.length) updateSlides();


// ================= Floating Action ================= */
document.addEventListener("DOMContentLoaded", () => {
  // Floating actions are now written directly in HTML
});

function openCallbackForm() {
  alert("Open Call Back Form");
}

/* ================= Scroll to Top Button ================= */
document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  console.log("Scroll to top button:", scrollToTopBtn);

  // Scroll to top on click
  if (scrollToTopBtn) scrollToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

