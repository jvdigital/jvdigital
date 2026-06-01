
document.documentElement.classList.remove('no-js');

const nav = document.querySelector('[data-site-nav]');
const menuButton = document.querySelector('[data-menu-button]');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

document.querySelectorAll('[data-current-year]').forEach(el => el.textContent = new Date().getFullYear());

const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 }) : null;
document.querySelectorAll('.reveal').forEach(el => observer ? observer.observe(el) : el.classList.add('is-visible'));

document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const value = button.getAttribute('data-copy');
    try {
      await navigator.clipboard.writeText(value);
      const original = button.textContent;
      button.textContent = 'Copiado!';
      setTimeout(() => button.textContent = original, 1500);
    } catch {
      window.prompt('Copiar:', value);
    }
  });
});

const filterInput = document.querySelector('[data-filter-cards]');
if (filterInput) {
  const cards = Array.from(document.querySelectorAll('[data-card]'));
  const empty = document.querySelector('[data-empty-state]');
  filterInput.addEventListener('input', () => {
    const term = filterInput.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const match = card.textContent.toLowerCase().includes(term);
      card.hidden = !match;
      if (match) visible++;
    });
    if (empty) empty.hidden = visible !== 0;
  });
}

const form = document.querySelector('[data-contact-form]');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const nome = data.get('nome') || '';
    const from = data.get('email') || '';
    const assunto = data.get('assunto') || 'Contacto pelo site';
    const mensagem = data.get('mensagem') || '';
    const body = `Nome: ${nome}\nEmail: ${from}\n\n${mensagem}`;
    window.location.href = `mailto:geral@clubeferraria.pt?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(body)}`;
  });
}

const cookieBanner = document.querySelector('[data-cookie-banner]');
const cookieKey = 'ccrdf-cookies-ok';
const hasCookieConsent = () => {
  try {
    if (window.localStorage && localStorage.getItem(cookieKey) === '1') return true;
  } catch (error) {
    // Alguns browsers bloqueiam localStorage em testes locais ou com definições de privacidade fortes.
  }
  return document.cookie.split(';').some(item => item.trim() === `${cookieKey}=1`);
};
const storeCookieConsent = () => {
  try {
    if (window.localStorage) localStorage.setItem(cookieKey, '1');
  } catch (error) {
    // fallback para cookie normal
  }
  document.cookie = `${cookieKey}=1; max-age=31536000; path=/; SameSite=Lax`;
};
const hideCookieBanner = () => {
  if (!cookieBanner) return;
  cookieBanner.hidden = true;
  cookieBanner.style.display = 'none';
};
if (cookieBanner && !hasCookieConsent()) {
  cookieBanner.hidden = false;
  cookieBanner.style.display = '';
} else {
  hideCookieBanner();
}
document.addEventListener('click', (event) => {
  const acceptButton = event.target.closest('[data-cookie-accept]');
  if (!acceptButton) return;
  event.preventDefault();
  storeCookieConsent();
  hideCookieBanner();
});


document.querySelectorAll('[data-tabs]').forEach(tabs => {
  const buttons = Array.from(tabs.querySelectorAll('[data-tab-button]'));
  const panels = Array.from(tabs.querySelectorAll('[data-tab-panel]'));
  if (!buttons.length || !panels.length) return;
  const activate = (name) => {
    buttons.forEach(button => {
      const active = button.getAttribute('data-tab-button') === name;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
    });
    panels.forEach(panel => {
      panel.classList.toggle('is-active', panel.getAttribute('data-tab-panel') === name);
    });
  };
  buttons.forEach(button => button.addEventListener('click', () => activate(button.getAttribute('data-tab-button'))));
});


const archiveFilter = document.querySelector('[data-filter-archive]');
if (archiveFilter) {
  const cards = Array.from(document.querySelectorAll('[data-archive-card]'));
  const empty = document.querySelector('[data-archive-empty]');
  archiveFilter.addEventListener('input', () => {
    const term = archiveFilter.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const haystack = `${card.getAttribute('data-year')} ${card.textContent}`.toLowerCase();
      const match = haystack.includes(term);
      card.hidden = !match;
      if (match) visible++;
    });
    if (empty) empty.hidden = visible !== 0;
  });
}
