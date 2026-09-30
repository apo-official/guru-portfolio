const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn?.addEventListener('click', () => navLinks?.classList.toggle('open'));
document.querySelectorAll('#navLinks a').forEach(link => link.addEventListener('click', () => navLinks?.classList.remove('open')));
document.getElementById('year').textContent = new Date().getFullYear();
const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }); }, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
