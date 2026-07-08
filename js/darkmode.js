/* ==========================================================================
   MERIDIAN — darkmode.js
   Toggles data-theme on <html>, persists choice in localStorage, updates icon.
   ========================================================================== */

(function () {
  const STORAGE_KEY = 'meridian-theme';
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    document.querySelectorAll('.theme-toggle i').forEach(icon => {
      icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });
  }

  // Apply saved theme immediately (before DOMContentLoaded) to avoid flash
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) applyTheme(saved);

  document.addEventListener('DOMContentLoaded', () => {
    const current = localStorage.getItem(STORAGE_KEY) || 'light';
    applyTheme(current);

    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const now = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(now);
        localStorage.setItem(STORAGE_KEY, now);
      });
    });
  });
})();
