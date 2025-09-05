// Active link highlighting based on body[data-page]
(function () {
  const current = document.body.getAttribute('data-page');
  document.querySelectorAll('.site-nav a').forEach(a => {
    if (a.dataset.link === current) a.classList.add('active');
  });

  // Mobile menu toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      // animate icon
      const [b1,b2,b3] = toggle.querySelectorAll('.bar');
      if (open) {
        b1.style.top = '20px'; b1.style.transform = 'rotate(45deg)';
        b2.style.opacity = '0';
        b3.style.top = '20px'; b3.style.transform = 'rotate(-45deg)';
      } else {
        b1.style.top = '12px'; b1.style.transform = 'none';
        b2.style.opacity = '1';
        b3.style.top = '28px'; b3.style.transform = 'none';
      }
    });

    // close when clicking a link (mobile)
    nav.addEventListener('click', e => {
      if (e.target.tagName === 'A' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        const [b1,b2,b3] = toggle.querySelectorAll('.bar');
        b1.style.top = '12px'; b1.style.transform = 'none';
        b2.style.opacity = '1';
        b3.style.top = '28px'; b3.style.transform = 'none';
      }
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Project Search + Tag filter (projects.html)
  const search = document.getElementById('search');
  const tagFilter = document.getElementById('tagFilter');
  const grid = document.getElementById('projectGrid');
  function applyFilters(){
    if (!grid) return;
    const q = (search?.value || '').toLowerCase();
    const tag = (tagFilter?.value || 'all').toLowerCase();
    grid.querySelectorAll('.project').forEach(card => {
      const text = card.innerText.toLowerCase();
      const tags = (card.dataset.tags || '').toLowerCase();
      const matchesText = text.includes(q);
      const matchesTag = tag === 'all' || tags.includes(tag);
      card.style.display = (matchesText && matchesTag) ? '' : 'none';
    });
  }
  search?.addEventListener('input', applyFilters);
  tagFilter?.addEventListener('change', applyFilters);

  // Contact form (basic client-side validation + mailto fallback)
  const form = document.getElementById('contactForm');
  if (form) {
    const note = document.getElementById('formNote');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name')?.toString().trim();
      const email = data.get('email')?.toString().trim();
      const message = data.get('message')?.toString().trim();

      // Validation
      if (!name || name.length < 2) return setNote('Please enter your name.');
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) return setNote('Please enter a valid email.');
      if (!message || message.length < 10) return setNote('Message should be at least 10 characters.');

      // Mailto fallback (replace with your backend endpoint if available)
      const subject = encodeURIComponent('Portfolio Contact – ' + name);
      const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' <' + email + '>');
      window.location.href = mailto:sireeshapadavala8@gmail.com?subject=${subject}&body=${body};
      setNote('Opening your email app…');
      form.reset();
    });
    function setNote(msg){ note.textContent = msg; }
  }
})();