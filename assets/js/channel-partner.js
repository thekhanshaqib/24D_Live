
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

// Form Submission Logic
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("channelPartnerForm");
  const messageDiv = document.getElementById("form-message");
  const submitBtn = form.querySelector(".form-submit-24d");

  if (!form) return;

  function showMessage(text, isError = true) {
    messageDiv.textContent = text;
    messageDiv.style.display = "block";
    messageDiv.style.backgroundColor = isError ? "#f8d7da" : "#d4edda";
    messageDiv.style.color = isError ? "#721c24" : "#155724";
    messageDiv.style.border = `1px solid ${isError ? "#f5c6cb" : "#c3e6cb"}`;
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Reset UI
    messageDiv.style.display = "none";
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "Submitting...";

    // Collect data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value.trim();
    });

    // Validation
    if (!data.name || !data.mobile || !data.email || !data.reraNumber) {
      showMessage("Please fill in all required fields (*).");
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
      return;
    }

    if (!form.querySelector('input[name="consent"]').checked) {
      showMessage("Please agree to the terms and conditions.");
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showMessage("Please enter a valid email address.");
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
      return;
    }

    // Mobile number check (numeric and length)
    const mobileRegex = /^\d{10,15}$/;
    if (!mobileRegex.test(data.mobile.replace(/\D/g, ''))) {
      showMessage("Please enter a valid mobile number.");
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
      return;
    }

    try {
      const response = await fetch("api/submit-channel-partner.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // Redirect on success
        window.location.href = "thankyou.html";
      } else {
        showMessage(result.message || "An error occurred. Please try again later.");
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    } catch (error) {
      console.error("Submission error:", error);
      showMessage("Unable to connect to the server. Please check your internet and try again.");
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
});
