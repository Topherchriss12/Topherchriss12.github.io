(function () {
  const el = document.getElementById('greeting');
  if (!el) return;

  const h = new Date().getHours();
  let greeting = 'Working late?';

  if (h < 5) greeting = 'Still up?';
  else if (h < 12) greeting = 'Good morning.';
  else if (h < 17) greeting = 'Good afternoon.';
  else if (h < 21) greeting = 'Good evening.';

  el.textContent = greeting;
})();

document.querySelectorAll('.bento-card').forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const section = entry.target.closest('section, footer');
      const siblings = section ? section.querySelectorAll('.reveal') : [];

      siblings.forEach((sib, index) => {
        setTimeout(() => {
          sib.classList.add('visible');
        }, index * 100);
      });

      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));

    if (!target) return;

    const offset = 80;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
