const root = document.documentElement;
const header = document.querySelector('[data-header]');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const themeLabel = document.querySelector('.theme-label');
const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('.site-menu');

function setTheme(theme) {
  const isLight = theme === 'light';
  root.dataset.theme = isLight ? 'light' : 'dark';
  themeToggle.setAttribute('aria-pressed', String(isLight));
  themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  themeIcon.textContent = isLight ? '☾' : '☼';
  themeLabel.textContent = isLight ? 'Dark' : 'Light';
  localStorage.setItem('james-kyle-theme', isLight ? 'light' : 'dark');
}

const savedTheme = localStorage.getItem('james-kyle-theme');
setTheme(savedTheme === 'light' ? 'light' : 'dark');
themeToggle.addEventListener('click', () => setTheme(root.dataset.theme === 'light' ? 'dark' : 'light'));

function closeMenu() {
  siteMenu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  const open = siteMenu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
siteMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.style.setProperty('--delay', `${entry.target.dataset.delay || 0}ms`);
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element));

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 20);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
