(function () {
  var LANG_LABELS = { "pt-BR": "PT", en: "EN", de: "DE", es: "ES" };
  var currentLang = "pt-BR";
  var currentTheme = null;

  function getStored(key, fallback) {
    try {
      return localStorage.getItem(key) || fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setStored(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {}
  }

  function getNested(obj, path) {
    return path.split(".").reduce(function (acc, part) {
      return acc && acc[part] !== undefined ? acc[part] : null;
    }, obj);
  }

  function interpolate(text, params) {
    if (!text || !params) return text;
    return text.replace(/\{(\w+)\}/g, function (_, key) {
      return params[key] !== undefined ? params[key] : "{" + key + "}";
    });
  }

  function t(key, params) {
    var pack = window.SITE_I18N && window.SITE_I18N[currentLang];
    var fallback = window.SITE_I18N && window.SITE_I18N["pt-BR"];
    var value = getNested(pack, key) || getNested(fallback, key) || key;
    return interpolate(value, params);
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var params = {};
      if (el.dataset.i18nCategory) params.category = el.dataset.i18nCategory;
      if (el.dataset.i18nCategoryKey) params.category = t(el.dataset.i18nCategoryKey);
      if (el.dataset.i18nTitle) params.title = el.dataset.i18nTitle;
      el.textContent = t(key, params);
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var params = {};
      if (el.dataset.i18nTitle) params.title = el.dataset.i18nTitle;
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"), params));
    });

    document.querySelectorAll("[data-i18n-status]").forEach(function (el) {
      var status = el.getAttribute("data-i18n-status");
      var map = {
        concluido: "status.completed",
        "em-desenvolvimento": "status.in_progress",
        concluida: "status.completed_f",
        "em-preparacao": "status.in_preparation",
        expirada: "status.expired"
      };
      if (map[status]) el.textContent = t(map[status]);
    });

    document.documentElement.setAttribute("lang", currentLang);
    document.dispatchEvent(new CustomEvent("site:langchange", { detail: { lang: currentLang } }));
  }

  function updateLangUi() {
    var current = document.querySelector(".lang-current");
    if (current) current.textContent = LANG_LABELS[currentLang] || currentLang;

    document.querySelectorAll(".pref-menu-item[data-lang]").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === currentLang);
    });
  }

  function setLanguage(lang) {
    if (!window.SITE_I18N || !window.SITE_I18N[lang]) return;
    currentLang = lang;
    setStored("site-lang", lang);
    updateLangUi();
    applyTranslations();
    closeMenus();
  }

  function getPreferredTheme() {
    var stored = getStored("site-theme", null);
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function updateThemeUi(theme) {
    var toggle = document.querySelector(".theme-toggle");
    var lightIcon = document.querySelector(".theme-icon-light");
    var darkIcon = document.querySelector(".theme-icon-dark");
    if (!toggle) return;

    var isDark = theme === "dark";
    toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
    toggle.setAttribute("title", t(isDark ? "prefs.theme_light" : "prefs.theme_dark"));
    if (lightIcon) lightIcon.hidden = isDark;
    if (darkIcon) darkIcon.hidden = !isDark;
  }

  function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    setStored("site-theme", theme);
    updateThemeUi(theme);
  }

  function toggleTheme() {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  }

  function closeMenus() {
    document.querySelectorAll(".pref-dropdown.is-open").forEach(function (el) {
      el.classList.remove("is-open");
      var btn = el.querySelector("button[aria-expanded]");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }

  function setupLanguageSwitcher() {
    var switcher = document.querySelector(".lang-switcher");
    if (!switcher) return;

    var toggle = switcher.querySelector(".lang-toggle");
    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      var isOpen = switcher.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    switcher.querySelectorAll(".pref-menu-item[data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLanguage(btn.getAttribute("data-lang"));
      });
    });

    switcher.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }

  function setupThemeToggle() {
    var toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", toggleTheme);
  }

  document.addEventListener("click", function () {
    closeMenus();
  });

  document.addEventListener("DOMContentLoaded", function () {
    currentLang = getStored("site-lang", window.SITE_DEFAULT_LANG || "pt-BR");
    if (!window.SITE_I18N || !window.SITE_I18N[currentLang]) currentLang = "pt-BR";

    currentTheme = getPreferredTheme();
    if (!document.documentElement.getAttribute("data-theme")) {
      document.documentElement.setAttribute("data-theme", currentTheme);
    } else {
      currentTheme = document.documentElement.getAttribute("data-theme");
    }

    setupLanguageSwitcher();
    setupThemeToggle();
    updateLangUi();
    updateThemeUi(currentTheme);
    applyTranslations();
  });

  window.SiteI18n = { t: t, setLanguage: setLanguage, setTheme: setTheme };
})();
