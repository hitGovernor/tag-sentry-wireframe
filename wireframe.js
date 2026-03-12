'use strict';

const VERSION = 'v1.4.0';
const DL_FILENAME = 'tagsentry-v1.4.0.zip';

// ── Version badge ──────────────────────────────────────────────
document.querySelectorAll('.js-version').forEach(el => {
  el.textContent = VERSION;
});

// ── Download button ────────────────────────────────────────────
// Triggers a download of the extension zip bundled alongside this page.
document.querySelectorAll('.js-download').forEach(btn => {
  btn.addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = DL_FILENAME;
    a.download = DL_FILENAME;
    a.click();
  });
});

// ── Smooth-scroll nav links ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 56; // height of fixed top-bar
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Active section highlight in nav ───────────────────────────
const navLinks = document.querySelectorAll('.bar-nav a[href^="#"]');
const sections = Array.from(navLinks)
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

function updateActiveNav() {
  const scrollY = window.scrollY + 80;
  let active = sections[0];
  for (const s of sections) {
    if (s.offsetTop <= scrollY) active = s;
  }
  navLinks.forEach(a => {
    a.classList.toggle('active',
      a.getAttribute('href') === '#' + active.id);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();
