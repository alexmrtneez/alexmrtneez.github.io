/* Portfolio — small progressive enhancements. The page works without JS. */
(function () {
  "use strict";

  var root = document.documentElement;
  var isES = (root.lang || "en").toLowerCase().indexOf("es") === 0;
  var t = isES
    ? { toLight: "Cambiar a modo claro", toDark: "Cambiar a modo oscuro", open: "Abrir menú", close: "Cerrar menú" }
    : { toLight: "Switch to light mode", toDark: "Switch to dark mode", open: "Open menu", close: "Close menu" };

  /* ---------- Theme toggle (remembers choice per viewer) ---------- */
  var themeBtn = document.getElementById("theme-toggle");
  var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set) return set;
    return mq && mq.matches ? "dark" : "light";
  }
  function updateThemeLabel() {
    if (!themeBtn) return;
    themeBtn.setAttribute("aria-label", currentTheme() === "dark" ? t.toLight : t.toDark);
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
      updateThemeLabel();
    });
    updateThemeLabel();
  }

  /* ---------- Mobile menu ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var navMenu = document.getElementById("nav-menu");
  function setMenu(open) {
    navMenu.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? t.close : t.open);
  }
  if (navToggle && navMenu) {
    setMenu(false);
    navToggle.addEventListener("click", function () {
      setMenu(!navMenu.classList.contains("is-open"));
    });
    navMenu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* ---------- Language switch keeps the current section (#hash) ---------- */
  document.querySelectorAll("[data-lang-link]").forEach(function (a) {
    var base = a.getAttribute("href").split("#")[0];
    function sync() { a.setAttribute("href", base + (location.hash || "")); }
    sync();
    window.addEventListener("hashchange", sync);
    a.addEventListener("click", sync);
  });

  /* ---------- Highlight active section in nav ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav__menu a[href^='#']"));
  if ("IntersectionObserver" in window && links.length) {
    var byId = {};
    links.forEach(function (l) { byId[l.getAttribute("href").slice(1)] = l; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove("is-active"); });
        var l = byId[entry.target.id];
        if (l) l.classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) observer.observe(s);
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
