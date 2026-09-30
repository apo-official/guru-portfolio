const $ = (id) => document.getElementById(id);
const body = document.body;
const menuBtn = $('menuBtn');
const navLinks = $('navLinks');
const themeBtn = $('themeBtn');
const themePanel = $('themePanel');
const themeClose = $('themeClose');
const panelOverlay = $('panelOverlay');
const infoModal = $('infoModal');
const infoTitle = $('infoTitle');
const infoText = $('infoText');
const infoClose = $('infoClose');

menuBtn?.addEventListener('click', () => navLinks?.classList.toggle('open'));
document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => navLinks?.classList.remove('open'));
});

$('year').textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem('guru-theme') || 'dark';
applyTheme(savedTheme);

function applyTheme(theme) {
  body.dataset.theme = theme;
  localStorage.setItem('guru-theme', theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f4f7fb' : '#090b10');
  document.querySelectorAll('.theme-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

function openThemePanel() {
  themePanel?.classList.add('open');
  panelOverlay?.classList.add('show');
  themePanel?.setAttribute('aria-hidden', 'false');
}

function closeThemePanel() {
  themePanel?.classList.remove('open');
  panelOverlay?.classList.remove('show');
  themePanel?.setAttribute('aria-hidden', 'true');
}

themeBtn?.addEventListener('click', openThemePanel);
themeClose?.addEventListener('click', closeThemePanel);
panelOverlay?.addEventListener('click', closeThemePanel);

document.querySelectorAll('.theme-option').forEach(btn => {
  btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
});

function openInfo(title, text) {
  if (!infoModal) return;
  infoTitle.textContent = title || 'Explanation';
  infoText.textContent = text || 'No explanation added yet.';
  infoModal.classList.add('show');
  infoModal.setAttribute('aria-hidden', 'false');
}

function closeInfo() {
  infoModal?.classList.remove('show');
  infoModal?.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.explainable').forEach(el => {
  el.addEventListener('click', (event) => {
    if (event.target.closest('a')) return;
    openInfo(el.dataset.title, el.dataset.explain);
  });
});

infoClose?.addEventListener('click', closeInfo);
infoModal?.addEventListener('click', (event) => {
  if (event.target === infoModal) closeInfo();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeInfo();
    closeThemePanel();
    navLinks?.classList.remove('open');
  }
});

$('discordCopy')?.addEventListener('click', async () => {
  const username = 'guru_guru123s';
  try {
    await navigator.clipboard.writeText(username);
    $('copyNote').textContent = 'Discord username copied: ' + username;
  } catch {
    $('copyNote').textContent = 'Discord: ' + username;
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// Smooth click feedback without blue tap flashes
document.querySelectorAll('.explainable, .skill, .project, .mini-stat, .owned-list button, .hero-card, .btn').forEach(el => {
  el.addEventListener('click', () => {
    el.classList.remove('click-pop');
    void el.offsetWidth;
    el.classList.add('click-pop');
    setTimeout(() => el.classList.remove('click-pop'), 320);
  });
});
