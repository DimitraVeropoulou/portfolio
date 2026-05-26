/* ============================================================
   THEME TOGGLE — light / dark mode
   ============================================================ */
(function () {
  const root        = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');

  // Detect system preference on first load
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  function renderThemeIcon(current) {
    if (!themeToggle) return;
    themeToggle.setAttribute(
      'aria-label',
      current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
    themeToggle.innerHTML = current === 'dark'
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
           <path d="M12 3a6 6 0 1 0 9 9A9 9 0 1 1 12 3Z"></path>
         </svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
           <circle cx="12" cy="12" r="4"></circle>
           <path d="M12 2v2"></path><path d="M12 20v2"></path>
           <path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path>
           <path d="M2 12h2"></path><path d="M20 12h2"></path>
           <path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>
         </svg>`;
  }

  // Apply initial theme
  root.setAttribute('data-theme', theme);
  renderThemeIcon(theme);

  // Toggle on click
  themeToggle?.addEventListener('click', function () {
    theme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    renderThemeIcon(theme);
  });
})();


/* ============================================================
   MOBILE NAVIGATION — hamburger menu
   ============================================================ */
(function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks   = document.getElementById('nav-links');

  menuToggle?.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a nav link is clicked
  navLinks?.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('is-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* ============================================================
   SCROLL REVEAL — fade + slide-up animation on scroll
   ============================================================ */
(function () {
  const revealItems = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // animate once only
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ============================================================
   LUCIDE ICONS — initialise icon library
   ============================================================ */
window.addEventListener('load', function () {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
