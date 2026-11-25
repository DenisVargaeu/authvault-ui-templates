/**
 * AuthVault — Modern Login System (Interactive Demo)
 * Pure Vanilla JavaScript — No frameworks, no real credential storage or transmission.
 */

(() => {
  "use strict";

  const STORAGE_KEYS = {
    THEME: "authvault_theme_pref",
    REMEMBERED_EMAIL: "authvault_demo_email",
  };

  const VIEW_COPY = {
    login: {
      title: "Welcome back!",
      subtitle: "Sign in to continue to your account",
    },
    register: {
      title: "Create account",
      subtitle: "Join AuthVault and explore the modern demo experience",
    },
    forgot: {
      title: "Account recovery",
      subtitle: "We'll help you get back into your account quickly",
    },
    success: {
      title: "You're all set!",
      subtitle: "Simulated authentication completed securely",
    },
  };

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* ========================================================================
     DOM References
     ======================================================================== */

  const root = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeToggleLabel = document.getElementById("theme-toggle-label");
  const toastContainer = document.getElementById("toast-container");

  const brandCopy = document.querySelector(".brand-copy");
  const brandHeading = document.getElementById("brand-heading");
  const brandSubtitle = document.getElementById("brand-subtitle");

  const authTabs = document.getElementById("auth-tabs");
  const tabButtons = document.querySelectorAll(".auth-tab");
  const views = {
    login: document.getElementById("view-login"),
    register: document.getElementById("view-register"),
    forgot: document.getElementById("view-forgot"),
    success: document.getElementById("view-success"),
  };

  // Login Form
  const loginForm = document.getElementById("login-form");
  const loginEmail = document.getElementById("login-email");
  const loginPassword = document.getElementById("login-password");
  const rememberMe = document.getElementById("remember-me");
  const loginSubmit = document.getElementById("login-submit");

  // Register Form
  const registerForm = document.getElementById("register-form");
  const registerName = document.getElementById("register-name");
  const registerEmail = document.getElementById("register-email");
  const registerPassword = document.getElementById("register-password");
  const registerConfirm = document.getElementById("register-confirm");
  const registerTerms = document.getElementById("register-terms");
  const registerSubmit = document.getElementById("register-submit");

  // Password Strength UI
  const strengthMeter = document.getElementById("strength-meter");
  const strengthLabel = document.getElementById("password-strength-text");
  const strengthRuleItems = document.querySelectorAll(".strength-rules li");

  // Forgot Password Form
  const forgotForm = document.getElementById("forgot-form");
  const forgotEmail = document.getElementById("forgot-email");
  const forgotSubmit = document.getElementById("forgot-submit");
  const forgotSentBox = document.getElementById("forgot-sent-box");
  const forgotSentEmail = document.getElementById("forgot-sent-email");
  const forgotResendBtn = document.getElementById("forgot-resend-btn");

  // Success View
  const successTitle = document.getElementById("success-title");
  const successUserEmail = document.getElementById("success-user-email");
  const demoSignoutBtn = document.getElementById("demo-signout-btn");

  // Live Notion Inspector (Left Canvas)
  const liveStatusPill = document.getElementById("live-status-pill");
  const liveViewValue = document.getElementById("live-view-value");
  const liveThemeValue = document.getElementById("live-theme-value");
  const quickFillBtn = document.getElementById("quick-fill-btn");

  const VIEW_LABELS = {
    login: "Sign In",
    register: "Register",
    forgot: "Account Recovery",
    success: "Authenticated (Demo)",
  };

  let activeView = "login";

  function updateInspector({ status, state = "" } = {}) {
    if (liveViewValue) {
      liveViewValue.textContent = VIEW_LABELS[activeView] || "Sign In";
    }
    if (liveThemeValue) {
      const isLight = root.getAttribute("data-theme") === "light";
      liveThemeValue.textContent = isLight ? "Sage Paper Light" : "Forest Dark";
    }
    if (liveStatusPill && status) {
      liveStatusPill.textContent = status;
      liveStatusPill.classList.remove("is-active", "is-success");
      if (state) liveStatusPill.classList.add(state);
    }
  }

  /* ========================================================================
     Theme Management (Dark / Light)
     ======================================================================== */

  function applyTheme(theme) {
    const normalized = theme === "light" ? "light" : "dark";
    root.setAttribute("data-theme", normalized);
    const isLight = normalized === "light";
    themeToggleBtn.setAttribute("aria-pressed", String(isLight));
    themeToggleBtn.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme"
    );
    themeToggleLabel.textContent = isLight ? "Light" : "Dark";
    updateInspector();
  }

  function initTheme() {
    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEYS.THEME);
    } catch {
      saved = null;
    }
    applyTheme(saved || "dark");

    themeToggleBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEYS.THEME, next);
      } catch {
        // Ignore storage errors in restricted contexts
      }
      showToast({
        type: "info",
        title: `${next === "dark" ? "Dark" : "Light"} theme enabled`,
        message: "Interface appearance updated.",
        duration: 2400,
      });
    });
  }

  /* ========================================================================
     Toast Notifications
     ======================================================================== */

  function showToast({ type = "info", title, message, duration = 4200 }) {
    const iconMap = {
      success: "fa-circle-check",
      error: "fa-circle-exclamation",
      info: "fa-circle-info",
    };

    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.setAttribute("role", type === "error" ? "alert" : "status");

    toast.innerHTML = `
      <span class="toast__icon" aria-hidden="true">
        <i class="fa-solid ${iconMap[type] || iconMap.info}"></i>
      </span>
      <div class="toast__body">
        <div class="toast__title"></div>
        <div class="toast__message"></div>
      </div>
      <button type="button" class="toast__close" aria-label="Dismiss notification">
        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
      <div class="toast__progress" style="animation-duration: ${duration}ms"></div>
    `;

    toast.querySelector(".toast__title").textContent = title;
    toast.querySelector(".toast__message").textContent = message;

    const dismiss = () => {
      if (toast.classList.contains("is-leaving")) return;
      toast.classList.add("is-leaving");
      window.setTimeout(() => toast.remove(), 250);
    };

    toast.querySelector(".toast__close").addEventListener("click", dismiss);
    toastContainer.appendChild(toast);

    window.setTimeout(dismiss, duration);
  }

  /* ========================================================================
     View Switching & Brand Copy Transitions
     ======================================================================== */

  function updateBrandCopy(viewName) {
    const copy = VIEW_COPY[viewName] || VIEW_COPY.login;
    if (brandHeading.textContent === copy.title) return;

    brandCopy.classList.add("is-swapping");
    window.setTimeout(() => {
      brandHeading.textContent = copy.title;
      brandSubtitle.textContent = copy.subtitle;
      brandCopy.classList.remove("is-swapping");
    }, 150);
  }

  function switchView(targetView) {
    if (!views[targetView]) return;
    activeView = targetView;

    // Show or hide Login/Register tab bar
    const isTabbed = targetView === "login" || targetView === "register";
    authTabs.hidden = !isTabbed;

    if (isTabbed) {
      authTabs.setAttribute("data-active", targetView);
      tabButtons.forEach((btn) => {
        const isCurrent = btn.dataset.view === targetView;
        btn.classList.toggle("is-active", isCurrent);
        btn.setAttribute("aria-selected", String(isCurrent));
      });
    }

    // Toggle panels
    Object.entries(views).forEach(([name, el]) => {
      const show = name === targetView;
      el.hidden = !show;
      el.classList.toggle("is-active", show);
    });

    // Reset forgot password view when entering it
    if (targetView === "forgot") {
      forgotForm.hidden = false;
      forgotSentBox.hidden = true;
      clearFieldState(forgotEmail);
      if (loginEmail.value.trim() && EMAIL_REGEX.test(loginEmail.value.trim())) {
        forgotEmail.value = loginEmail.value.trim();
      }
    }

    updateBrandCopy(targetView);
    if (targetView === "success") {
      updateInspector({ status: "Session Active", state: "is-success" });
    } else if (targetView === "forgot") {
      updateInspector({ status: "Recovery Mode", state: "is-active" });
    } else {
      updateInspector({ status: "Ready", state: "" });
    }

    // Move focus to first interactive field for keyboard accessibility
    window.requestAnimationFrame(() => {
      const firstInput = views[targetView].querySelector("input:not([type='checkbox']), button");
      if (firstInput && targetView !== "login") {
        firstInput.focus({ preventScroll: true });
      }
    });
  }

  /* ========================================================================
     Field Validation Helpers
     ======================================================================== */

  function setFieldState(input, isValid, errorMessage = "") {
    const group = input.closest(".form-group");
    if (!group) return;

    const errorEl = group.querySelector(".field-error");
    const statusIcon = group.querySelector(".input-status-icon");

    group.classList.toggle("is-invalid", !isValid);
    group.classList.toggle("is-valid", isValid);
    input.setAttribute("aria-invalid", String(!isValid));

    if (errorEl) {
      errorEl.textContent = isValid ? "" : errorMessage;
    }

    if (statusIcon) {
      statusIcon.innerHTML = isValid
        ? '<i class="fa-solid fa-circle-check"></i>'
        : '<i class="fa-solid fa-circle-exclamation"></i>';
    }
  }

  function clearFieldState(input) {
    const group = input.closest(".form-group");
    if (!group) return;

    group.classList.remove("is-invalid", "is-valid");
    input.removeAttribute("aria-invalid");

    const errorEl = group.querySelector(".field-error");
    if (errorEl) errorEl.textContent = "";

    const statusIcon = group.querySelector(".input-status-icon");
    if (statusIcon) statusIcon.innerHTML = "";
  }

  function validateEmailField(input) {
    const value = input.value.trim();
    if (!value) {
      setFieldState(input, false, "Please enter your email address.");
      return false;
    }
    if (!EMAIL_REGEX.test(value)) {
      setFieldState(input, false, "Please enter a valid email address (e.g. alex@domain.com).");
      return false;
    }
    setFieldState(input, true);
    return true;
  }

  function validateNameField(input) {
    const value = input.value.trim();
    if (!value) {
      setFieldState(input, false, "Please enter your full name.");
      return false;
    }
    if (value.length < 2) {
      setFieldState(input, false, "Name must be at least 2 characters.");
      return false;
    }
    setFieldState(input, true);
    return true;
  }

  function validateLoginPassword(input) {
    const value = input.value;
    if (!value) {
      setFieldState(input, false, "Please enter your password.");
      return false;
    }
    if (value.length < 6) {
      setFieldState(input, false, "Password must be at least 6 characters.");
      return false;
    }
    setFieldState(input, true);
    return true;
  }

  function evaluatePasswordStrength(password) {
    const checks = {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;
    const labels = ["Enter password", "Weak", "Fair", "Good", "Strong"];

    return {
      checks,
      score: password.length === 0 ? 0 : Math.max(1, score),
      label: password.length === 0 ? labels[0] : labels[Math.max(1, score)],
    };
  }

  function updateStrengthUI(password) {
    const result = evaluatePasswordStrength(password);
    strengthMeter.setAttribute("data-strength", String(result.score));
    strengthLabel.textContent = result.label;

    strengthRuleItems.forEach((item) => {
      const rule = item.dataset.rule;
      const met = Boolean(result.checks[rule]);
      item.classList.toggle("is-met", met);
      const icon = item.querySelector("i");
      if (icon) {
        icon.className = met ? "fa-solid fa-circle-check" : "fa-solid fa-circle-dot";
      }
    });

    return result;
  }

  function validateRegisterPassword(input) {
    const value = input.value;
    const result = updateStrengthUI(value);

    if (!value) {
      setFieldState(input, false, "Please create a password.");
      return false;
    }
    if (value.length < 8) {
      setFieldState(input, false, "Password must be at least 8 characters long.");
      return false;
    }
    if (result.score < 2) {
      setFieldState(input, false, "Add an uppercase letter, number, or symbol for stronger security.");
      return false;
    }
    setFieldState(input, true);
    return true;
  }

  function validateConfirmPassword(input) {
    const value = input.value;
    if (!value) {
      setFieldState(input, false, "Please confirm your password.");
      return false;
    }
    if (value !== registerPassword.value) {
      setFieldState(input, false, "Passwords do not match.");
      return false;
    }
    setFieldState(input, true);
    return true;
  }

  function validateTerms(checkbox) {
    const group = checkbox.closest(".form-group");
    const errorEl = document.getElementById("register-terms-error");
    if (!checkbox.checked) {
      group.classList.add("is-invalid");
      errorEl.textContent = "Please acknowledge the demo notice to continue.";
      return false;
    }
    group.classList.remove("is-invalid");
    errorEl.textContent = "";
    return true;
  }

  /* ========================================================================
     Loading Button Helper
     ======================================================================== */

  function setButtonLoading(button, isLoading) {
    button.classList.toggle("is-loading", isLoading);
    button.disabled = isLoading;
  }

  /* ========================================================================
     Password Visibility Toggles
     ======================================================================== */

  function initPasswordToggles() {
    document.querySelectorAll(".password-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.target;
        const input = document.getElementById(targetId);
        if (!input) return;

        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        btn.setAttribute("aria-pressed", String(isHidden));
        btn.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");

        const icon = btn.querySelector("i");
        if (icon) {
          icon.className = isHidden ? "fa-regular fa-eye-slash" : "fa-regular fa-eye";
        }
      });
    });
  }

  /* ========================================================================
     Remember Me (Email only — never stores passwords)
     ======================================================================== */

  function initRememberMe() {
    try {
      const savedEmail = localStorage.getItem(STORAGE_KEYS.REMEMBERED_EMAIL);
      if (savedEmail) {
        loginEmail.value = savedEmail;
        rememberMe.checked = true;
      }
    } catch {
      // Ignore storage errors
    }
  }

  function persistRememberedEmail(email) {
    try {
      if (rememberMe.checked && email) {
        localStorage.setItem(STORAGE_KEYS.REMEMBERED_EMAIL, email);
      } else {
        localStorage.removeItem(STORAGE_KEYS.REMEMBERED_EMAIL);
      }
    } catch {
      // Ignore storage errors
    }
  }

  /* ========================================================================
     Form Submission Handlers (Simulated Authentication Only)
     ======================================================================== */

  function handleLoginSubmit(event) {
    event.preventDefault();

    const emailOk = validateEmailField(loginEmail);
    const passOk = validateLoginPassword(loginPassword);

    if (!emailOk || !passOk) {
      showToast({
        type: "error",
        title: "Check your details",
        message: "Please fix the highlighted fields before signing in.",
      });
      const firstInvalid = loginForm.querySelector(".is-invalid input");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const email = loginEmail.value.trim();
    persistRememberedEmail(email);

    setButtonLoading(loginSubmit, true);

    window.setTimeout(() => {
      setButtonLoading(loginSubmit, false);
      // Immediately clear password from memory/DOM — demo never stores credentials
      loginPassword.value = "";
      clearFieldState(loginPassword);

      successTitle.textContent = "Signed in successfully";
      successUserEmail.textContent = email;
      switchView("success");

      showToast({
        type: "success",
        title: "Welcome back!",
        message: `Simulated login succeeded for ${email}.`,
      });
    }, 1050);
  }

  function handleRegisterSubmit(event) {
    event.preventDefault();

    const nameOk = validateNameField(registerName);
    const emailOk = validateEmailField(registerEmail);
    const passOk = validateRegisterPassword(registerPassword);
    const confirmOk = validateConfirmPassword(registerConfirm);
    const termsOk = validateTerms(registerTerms);

    if (!nameOk || !emailOk || !passOk || !confirmOk || !termsOk) {
      showToast({
        type: "error",
        title: "Registration incomplete",
        message: "Please review the highlighted fields and try again.",
      });
      const firstInvalid = registerForm.querySelector(".is-invalid input");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const name = registerName.value.trim();
    const email = registerEmail.value.trim();

    setButtonLoading(registerSubmit, true);

    window.setTimeout(() => {
      setButtonLoading(registerSubmit, false);
      // Clear password inputs immediately
      registerPassword.value = "";
      registerConfirm.value = "";
      updateStrengthUI("");
      clearFieldState(registerPassword);
      clearFieldState(registerConfirm);

      successTitle.textContent = `Welcome, ${name}!`;
      successUserEmail.textContent = email;
      switchView("success");

      showToast({
        type: "success",
        title: "Account created (Demo)",
        message: `Simulated account ready for ${email}.`,
      });
    }, 1150);
  }

  function handleForgotSubmit(event) {
    event.preventDefault();

    if (!validateEmailField(forgotEmail)) {
      forgotEmail.focus();
      showToast({
        type: "error",
        title: "Invalid email",
        message: "Enter a valid email address to receive a simulated reset link.",
      });
      return;
    }

    const email = forgotEmail.value.trim();
    setButtonLoading(forgotSubmit, true);

    window.setTimeout(() => {
      setButtonLoading(forgotSubmit, false);
      forgotSentEmail.textContent = email;
      forgotForm.hidden = true;
      forgotSentBox.hidden = false;

      showToast({
        type: "success",
        title: "Reset link simulated",
        message: `Recovery preview shown for ${email}.`,
      });
    }, 950);
  }

  /* ========================================================================
     Event Binding & Initialization
     ======================================================================== */

  function initLiveValidation() {
    loginEmail.addEventListener("blur", () => {
      if (loginEmail.value.trim()) validateEmailField(loginEmail);
    });
    loginEmail.addEventListener("input", () => {
      if (loginEmail.closest(".form-group").classList.contains("is-invalid")) {
        validateEmailField(loginEmail);
      }
    });

    loginPassword.addEventListener("input", () => {
      if (loginPassword.closest(".form-group").classList.contains("is-invalid")) {
        validateLoginPassword(loginPassword);
      }
    });

    registerName.addEventListener("blur", () => {
      if (registerName.value.trim()) validateNameField(registerName);
    });
    registerName.addEventListener("input", () => {
      if (registerName.closest(".form-group").classList.contains("is-invalid")) {
        validateNameField(registerName);
      }
    });

    registerEmail.addEventListener("blur", () => {
      if (registerEmail.value.trim()) validateEmailField(registerEmail);
    });
    registerEmail.addEventListener("input", () => {
      if (registerEmail.closest(".form-group").classList.contains("is-invalid")) {
        validateEmailField(registerEmail);
      }
    });

    registerPassword.addEventListener("input", () => {
      updateStrengthUI(registerPassword.value);
      if (registerPassword.closest(".form-group").classList.contains("is-invalid")) {
        validateRegisterPassword(registerPassword);
      }
      if (registerConfirm.value) {
        validateConfirmPassword(registerConfirm);
      }
    });

    registerConfirm.addEventListener("input", () => {
      if (
        registerConfirm.value ||
        registerConfirm.closest(".form-group").classList.contains("is-invalid")
      ) {
        validateConfirmPassword(registerConfirm);
      }
    });

    registerTerms.addEventListener("change", () => {
      if (registerTerms.closest(".form-group").classList.contains("is-invalid")) {
        validateTerms(registerTerms);
      }
    });

    forgotEmail.addEventListener("input", () => {
      if (forgotEmail.closest(".form-group").classList.contains("is-invalid")) {
        validateEmailField(forgotEmail);
      }
    });
  }

  function initNavigation() {
    // Tab switcher buttons
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        switchView(btn.dataset.view);
      });
    });

    // Keyboard arrow navigation on tabs
    authTabs.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const next = activeView === "login" ? "register" : "login";
      switchView(next);
      const nextBtn = authTabs.querySelector(`[data-view="${next}"]`);
      if (nextBtn) nextBtn.focus();
    });

    // Any element with data-switch-view
    document.querySelectorAll("[data-switch-view]").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        switchView(trigger.dataset.switchView);
      });
    });

    // Try another email in forgot password screen
    forgotResendBtn.addEventListener("click", () => {
      forgotSentBox.hidden = true;
      forgotForm.hidden = false;
      forgotEmail.focus();
    });

    // Demo Google button
    document.querySelectorAll("[data-demo-provider]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const provider = btn.dataset.demoProvider;
        showToast({
          type: "info",
          title: `${provider} Sign-In (Demo)`,
          message: "Social authentication is visual only in this simulated demo.",
        });
      });
    });

    // Sign out from simulated success screen
    demoSignoutBtn.addEventListener("click", () => {
      switchView("login");
      showToast({
        type: "info",
        title: "Signed out",
        message: "Demo session cleared. You can test another flow anytime.",
      });
    });

    // Quick-fill demo credentials from the left Notion inspector
    if (quickFillBtn) {
      quickFillBtn.addEventListener("click", () => {
        if (activeView === "register") {
          registerName.value = "Alex Mercer";
          registerEmail.value = "demo@authvault.dev";
          registerPassword.value = "VaultDemo#2026";
          registerConfirm.value = "VaultDemo#2026";
          registerTerms.checked = true;
          validateNameField(registerName);
          validateEmailField(registerEmail);
          validateRegisterPassword(registerPassword);
          validateConfirmPassword(registerConfirm);
          validateTerms(registerTerms);
        } else {
          if (activeView !== "login") switchView("login");
          loginEmail.value = "demo@authvault.dev";
          loginPassword.value = "VaultDemo#2026";
          rememberMe.checked = true;
          validateEmailField(loginEmail);
          validateLoginPassword(loginPassword);
        }
        updateInspector({ status: "Demo Filled", state: "is-active" });
        showToast({
          type: "info",
          title: "Demo credentials filled",
          message: "Ready to test the simulated authentication flow.",
          duration: 2800,
        });
      });
    }

    // Keyboard shortcut: Alt + T toggles theme
    document.addEventListener("keydown", (event) => {
      if (event.altKey && event.key.toLowerCase() === "t") {
        event.preventDefault();
        themeToggleBtn.click();
      }
    });
  }

  function init() {
    initTheme();
    initPasswordToggles();
    initRememberMe();
    initLiveValidation();
    initNavigation();

    loginForm.addEventListener("submit", handleLoginSubmit);
    registerForm.addEventListener("submit", handleRegisterSubmit);
    forgotForm.addEventListener("submit", handleForgotSubmit);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
