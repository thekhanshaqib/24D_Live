document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded - fetching modal HTML");
  fetch("./enquiry-modal.html")
    .then(res => {
      console.log("Modal HTML fetch response:", res.status);
      return res.text();
    })
    .then(html => {
      console.log("Modal HTML loaded successfully");
      document.body.insertAdjacentHTML("beforeend", html);
      initModal();
    })
    .catch(error => {
      console.error("Error loading modal:", error);
    });
});

function initModal() {
  const modal    = document.getElementById("luxuryModal");
  const overlay  = document.getElementById("luxuryModalOverlay");
  const closeBtn = document.getElementById("luxuryModalClose");

  const modalForm  = document.getElementById("modalEnquiryForm");  // Modal form
  const footerForm = document.getElementById("enquiryForm");        // Footer form

  console.log("Modal elements:", {
    modal: !!modal, overlay: !!overlay, closeBtn: !!closeBtn,
    modalForm: !!modalForm, footerForm: !!footerForm
  });

  document.querySelectorAll(".open-enquiry").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  });

  overlay.addEventListener("click", closeModal);
  closeBtn.addEventListener("click", closeModal);

  if (modalForm)  handleFormSubmit(modalForm);
  if (footerForm) handleFormSubmit(footerForm);
    
    // Auto-show modal after 10 seconds
  setTimeout(() => {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }, 10000);

  

  // ── Form handler ────────────────────────────────────────────
  function handleFormSubmit(form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fullName     = form.querySelector('[name="fullName"]').value.trim();
      const email        = form.querySelector('[name="email"]').value.trim();
      const phone        = form.querySelector('[name="phone"]').value.trim();
      const propertyType = form.querySelector('[name="propertyType"]').value;

      // ✅ Fixed: use class selector (.form-message) to match the HTML
      const formMessage  = form.querySelector(".form-message");

      if (!fullName || !email || !phone || !propertyType) {
        showMessage(formMessage, "Please fill in all fields", "error");
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled    = true;
      submitBtn.textContent = "Submitting...";

      try {
        const response = await fetch("./api/submit-enquiry.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, email, phone, propertyType })
        });

        const result = await response.json();

        if (result.success) {
          showMessage(formMessage,
            "Thank you! Your enquiry has been submitted successfully.",
            "success"
          );
          form.reset();
          setTimeout(() => { window.location.href = "./thankyou.html"; }, 2000);
        } else {
          showMessage(formMessage, result.message || "Failed to submit enquiry.", "error");
        }

      } catch (error) {
        console.error("Error submitting form:", error);
        showMessage(formMessage, "An error occurred. Please try again later.", "error");
      } finally {
        submitBtn.disabled    = false;
        submitBtn.textContent = "Submit Enquiry";
      }
    });
  }

  // ── Helpers ──────────────────────────────────────────────────
  function showMessage(container, message, type) {
    if (!container) return;
    container.textContent       = message;
    container.style.display     = "block";
    container.style.backgroundColor = type === "success" ? "#4CAF50" : "#f44336";
    container.style.color       = "white";
  }

  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }
}