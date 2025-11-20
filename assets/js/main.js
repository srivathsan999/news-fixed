(() => {
  const root = document.documentElement;
  const body = document.body;
  const THEME_KEY = 'news-theme';
  const DIR_KEY = 'news-dir';

  const applyTheme = (value) => {
    if (value === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, value);
  };

  const applyDir = (value) => {
    root.setAttribute('dir', value);
    body.classList.toggle('rtl', value === 'rtl');
    localStorage.setItem(DIR_KEY, value);
  };

  // initialize theme & direction
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(savedTheme);
  const savedDir = localStorage.getItem(DIR_KEY) || 'ltr';
  applyDir(savedDir);

  const themeToggle = document.getElementById('themeToggle');
  const adminThemeToggle = document.getElementById('adminThemeToggle');
  const handleThemeToggle = () => {
    const nextTheme = root.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(nextTheme);
  };
  themeToggle?.addEventListener('click', handleThemeToggle);
  adminThemeToggle?.addEventListener('click', handleThemeToggle);

  const rtlToggle = document.getElementById('rtlToggle');
  rtlToggle?.addEventListener('click', () => {
    const current = root.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
    applyDir(current);
  });

  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  mobileToggle?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });

  // Contact form validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const messageField = document.getElementById('formMessage');
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = (formData.get('name') || '').trim();
      const email = (formData.get('email') || '').trim();
      const msg = (formData.get('message') || '').trim();

      if (!name || !email || !msg) {
        messageField.textContent = 'Please complete all required fields.';
        messageField.classList.remove('text-emerald-500');
        messageField.classList.add('text-amber-500');
        return;
      }

      messageField.textContent = 'Thanks! We’ll be in touch shortly.';
      messageField.classList.remove('text-amber-500');
      messageField.classList.add('text-emerald-500');
      contactForm.reset();
    });
  }

  // Blog filtering & search
  const blogList = document.getElementById('blogList');
  if (blogList) {
    const cards = Array.from(blogList.querySelectorAll('[data-category]'));
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('blogSearch');
    const resetBtn = document.getElementById('resetBlog');

    let activeFilter = 'all';
    let query = '';

    const render = () => {
      cards.forEach((card) => {
        const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
        const matchesQuery = card.dataset.title.toLowerCase().includes(query.toLowerCase());
        card.style.display = matchesFilter && matchesQuery ? '' : 'none';
      });
    };

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        render();
      });
    });

    searchInput?.addEventListener('input', (event) => {
      query = event.target.value;
      render();
    });

    resetBtn?.addEventListener('click', () => {
      query = '';
      if (searchInput) searchInput.value = '';
      activeFilter = 'all';
      filterButtons.forEach((b, idx) => b.classList.toggle('active', idx === 0));
      render();
    });
  }

  // Pricing toggle
  const billingToggle = document.getElementById('billingToggle');
  if (billingToggle) {
    let annual = false;
    const priceTargets = document.querySelectorAll('[data-price-monthly]');
    billingToggle.addEventListener('click', () => {
      annual = !annual;
      billingToggle.classList.toggle('active', annual);
      priceTargets.forEach((target) => {
        const value = annual ? target.dataset.priceAnnual : target.dataset.priceMonthly;
        target.textContent = value;
      });
    });
  }
})();

