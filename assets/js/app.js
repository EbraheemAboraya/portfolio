"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#nav-links");

if (menuButton && navigation) {
  menuButton.hidden = false;
  navigation.dataset.enhanced = "true";
  const closeMenu = (restoreFocus = false) => {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    if (restoreFocus) menuButton.focus();
  };
  menuButton.addEventListener("click", () => {
    const open = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) closeMenu(true);
  });
  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
  window.matchMedia("(min-width: 761px)").addEventListener("change", () => closeMenu());
}

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

if ("IntersectionObserver" in window) {
  const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of links) {
        if (link.hash === "#" + entry.target.id) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    }
  }, { rootMargin: "-15% 0px -55% 0px", threshold: 0 });
  document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
}

const form = document.querySelector("#contact-form");
if (form) {
  const button = form.querySelector('button[type="submit"]');
  const status = document.querySelector("#form-status");
  const emailField = form.querySelector("#email");
  const messageField = form.querySelector("#message");
  const buttonLabel = button.innerHTML;
  let submitting = false;
  button.disabled = false;

  messageField.addEventListener("input", () => messageField.setCustomValidity(""));
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitting) return;
    messageField.setCustomValidity(messageField.value.trim().length < 10 ? "Please write at least 10 characters." : "");
    if (!form.reportValidity()) return;

    const email = emailField.value.trim();
    const description = messageField.value.trim();
    submitting = true;
    button.disabled = true;
    button.textContent = "Sending…";
    form.setAttribute("aria-busy", "true");
    status.dataset.state = "loading";
    status.textContent = "Sending your message…";
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(form.dataset.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, description }),
        signal: controller.signal
      });
      if (!response.ok) throw new Error("Request failed");
      // Some Lambda integrations return a JSON error inside an HTTP 200 response.
      const responseBody = await response.text();
      if (responseBody.trim()) {
        let payload;
        try { payload = JSON.parse(responseBody); } catch { /* Plain-text success responses are valid. */ }
        if (payload && (payload.success === false || payload.error || Number(payload.statusCode) >= 400)) {
          throw new Error("Message was not accepted");
        }
      }
      status.dataset.state = "success";
      status.textContent = "Your message was submitted successfully. Thank you for getting in touch!";
      // Preserve any new text typed while the previous message was being sent.
      if (emailField.value.trim() === email && messageField.value.trim() === description) form.reset();
    } catch (error) {
      status.dataset.state = "error";
      status.textContent = error.name === "AbortError"
        ? "The request timed out. Your message is still here; please try again or email me directly."
        : "Your message could not be sent. Please try again or use the direct email link below.";
    } finally {
      window.clearTimeout(timeout);
      submitting = false;
      button.disabled = false;
      button.innerHTML = buttonLabel;
      form.removeAttribute("aria-busy");
    }
  });
}
