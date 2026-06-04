(() => {
  'use strict';

  const cfg = window.LUMEA_CONFIG;
  const seed = window.LUMEA_DEFAULT_DATA;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const translations = {
    pt: {
      skip: 'Saltar para o conteúdo',
      nav: { services: 'Serviços', booking: 'Marcações', gallery: 'Galeria', seo: 'SEO Local', admin: 'Gestão interna', cta: 'Marcar visita' },
      hero: {
        eyebrow: 'Atelier botânico · Porto',
        title: 'Objectos sensoriais para casas com alma.',
        text: 'Velas vegetais, cerâmica artesanal, fragrâncias de casa e presentes premium, com marcações online e atendimento imediato por WhatsApp.',
        primary: 'Agendar consultoria', secondary: 'Ver galeria', ai: 'Falar com assistente IA',
        cardTitle: 'Experiência premium', cardText: 'Escolha produtos, marque visita e fale connosco num clique.'
      },
      stats: { delivery: 'preparação média', local: 'dados locais', lang: 'site bilingue' },
      services: { eyebrow: 'Serviços', title: 'Uma gestão preparada para vender, marcar e encantar.', text: 'O sistema combina presença pública, dados locais, marcações e uma área interna simples para gerir pedidos e conteúdo.' },
      booking: { eyebrow: 'Marcações online', title: 'Reserve uma experiência no atelier.', text: 'Escolha o serviço, indique a data e confirme. A marcação fica guardada no painel interno local.', detail1Title: 'Horário:', detail2Title: 'Duração:', detail2Text: '45 a 90 minutos, conforme o serviço.' },
      form: { service: 'Serviço', date: 'Data', time: 'Hora', name: 'Nome', phone: 'Telefone', email: 'Email', message: 'Mensagem', submit: 'Confirmar marcação', whatsapp: 'Enviar também por WhatsApp', success: 'Marcação registada com sucesso. Pode consultá-la no painel interno.', errorDay: 'Esta data não está disponível. Escolha um dia útil do atelier.', errorSlot: 'Esta hora já está ocupada. Escolha outra hora.', required: 'Preencha todos os campos obrigatórios.' },
      gallery: { eyebrow: 'Galeria com lightbox', title: 'Produtos que contam histórias.', text: 'Clique em qualquer produto para abrir a fotografia em destaque. Pode alterar tudo no painel interno.' },
      seo: { eyebrow: 'SEO avançado', title: 'Pronto para pesquisa local, Google Business e Analytics.', text: 'O site inclui dados estruturados, Open Graph, hreflang, sitemap, robots, consentimento de cookies e integração Google Analytics pronta a configurar.', item1: 'Schema LocalBusiness, FAQ e produtos para reforçar sinais de pesquisa.', item2: 'Ligação preparada para o Perfil de Empresa no Google.', item3: 'Google Analytics 4 só é carregado após consentimento.', item4: 'Conteúdo bilingue PT/EN com alternates e texto traduzido.' },
      faq: { title: 'Perguntas rápidas.', text: 'Tudo foi pensado para ser editável, exportável e simples de publicar.' },
      footer: { text: 'Atelier botânico de objectos sensoriais, criado para uma presença digital premium e funcional.', contacts: 'Contactos', internal: 'Gestão', admin: 'Abrir painel interno', local: 'Sistema com dados locais, marcações e galeria editável.' },
      lightbox: { cta: 'Pedir por WhatsApp' },
      ai: { title: 'Assistente IA LUMEA', subtitle: 'Responde com base nos dados locais.', placeholder: 'Pergunte sobre produtos, horários ou marcações...', send: 'Enviar', welcome: 'Olá. Sou o assistente local da LUMEA. Posso ajudar com produtos, horários, marcações, preços e contactos.', fallback: 'Posso ajudar com horários, marcações, produtos, preços, WhatsApp e localização. Experimente perguntar: “Que serviços têm?”', booking: 'Pode marcar directamente na secção de marcações. Escolha serviço, data e hora. As marcações ficam guardadas no painel interno.', hours: 'O horário actual é: {hours}.', products: 'Temos estes produtos em destaque: {products}. Clique na galeria para ver fotografias e detalhes.', prices: 'Preços em destaque: {prices}. Para propostas personalizadas, envie mensagem por WhatsApp.', contact: 'Pode contactar por WhatsApp através do botão flutuante, por telefone {phone} ou por email {email}.', location: 'Estamos em {address}. Também pode ligar o site ao Perfil de Empresa no Google.' },
      cookies: { title: 'Privacidade e Analytics', text: 'Usamos Google Analytics apenas com o seu consentimento para melhorar o site.', accept: 'Aceitar', reject: 'Recusar' },
      productWhats: 'Olá, tenho interesse em {product}. Podem ajudar-me?',
      bookingWhats: 'Olá, fiz uma marcação no site LUMEA: {service}, dia {date} às {time}. Nome: {name}. Contacto: {phone}.',
      metaTitle: 'LUMEA — Atelier botânico no Porto | Marcações, galeria e presentes sensoriais',
      metaDescription: 'LUMEA é um atelier botânico no Porto com velas artesanais, cerâmica, fragrâncias naturais, presentes premium, marcações online, galeria e WhatsApp.'
    },
    en: {
      skip: 'Skip to content',
      nav: { services: 'Services', booking: 'Bookings', gallery: 'Gallery', seo: 'Local SEO', admin: 'Internal management', cta: 'Book a visit' },
      hero: {
        eyebrow: 'Botanical atelier · Porto',
        title: 'Sensory objects for soulful homes.',
        text: 'Vegetable wax candles, handmade ceramics, home fragrances and premium gifts, with online bookings and instant WhatsApp contact.',
        primary: 'Book consultation', secondary: 'View gallery', ai: 'Talk to AI assistant',
        cardTitle: 'Premium experience', cardText: 'Choose products, book a visit and contact us in one click.'
      },
      stats: { delivery: 'average preparation', local: 'local data', lang: 'bilingual site' },
      services: { eyebrow: 'Services', title: 'A management system ready to sell, book and delight.', text: 'The system combines a public website, local data, bookings and a simple internal area to manage requests and content.' },
      booking: { eyebrow: 'Online bookings', title: 'Book an atelier experience.', text: 'Choose the service, date and confirm. The booking is saved in the local internal panel.', detail1Title: 'Hours:', detail2Title: 'Duration:', detail2Text: '45 to 90 minutes, depending on the service.' },
      form: { service: 'Service', date: 'Date', time: 'Time', name: 'Name', phone: 'Phone', email: 'Email', message: 'Message', submit: 'Confirm booking', whatsapp: 'Also send via WhatsApp', success: 'Booking saved successfully. You can check it in the internal panel.', errorDay: 'This date is not available. Choose an atelier working day.', errorSlot: 'This time slot is already booked. Choose another time.', required: 'Please fill in all required fields.' },
      gallery: { eyebrow: 'Lightbox gallery', title: 'Products that tell stories.', text: 'Click any product to open the highlighted photo. You can change everything in the internal panel.' },
      seo: { eyebrow: 'Advanced SEO', title: 'Ready for local search, Google Business and Analytics.', text: 'The site includes structured data, Open Graph, hreflang, sitemap, robots, cookie consent and Google Analytics integration ready to configure.', item1: 'LocalBusiness, FAQ and product schema to reinforce search signals.', item2: 'Prepared link for Google Business Profile.', item3: 'Google Analytics 4 only loads after consent.', item4: 'Bilingual PT/EN content with alternates and translated copy.' },
      faq: { title: 'Quick questions.', text: 'Everything was designed to be editable, exportable and easy to publish.' },
      footer: { text: 'Botanical atelier for sensory objects, created for a premium and functional digital presence.', contacts: 'Contacts', internal: 'Management', admin: 'Open internal panel', local: 'System with local data, bookings and editable gallery.' },
      lightbox: { cta: 'Ask via WhatsApp' },
      ai: { title: 'LUMEA AI Assistant', subtitle: 'Replies using local data.', placeholder: 'Ask about products, hours or bookings...', send: 'Send', welcome: 'Hello. I am LUMEA’s local assistant. I can help with products, hours, bookings, prices and contacts.', fallback: 'I can help with hours, bookings, products, prices, WhatsApp and location. Try asking: “What services do you offer?”', booking: 'You can book directly in the bookings section. Choose service, date and time. Bookings are stored in the internal panel.', hours: 'The current schedule is: {hours}.', products: 'Featured products: {products}. Click the gallery to see photos and details.', prices: 'Featured prices: {prices}. For custom proposals, send a WhatsApp message.', contact: 'You can contact us through the floating WhatsApp button, by phone {phone} or email {email}.', location: 'We are at {address}. The site can also link to the Google Business Profile.' },
      cookies: { title: 'Privacy and Analytics', text: 'We use Google Analytics only with your consent to improve the site.', accept: 'Accept', reject: 'Reject' },
      productWhats: 'Hello, I am interested in {product}. Can you help me?',
      bookingWhats: 'Hello, I made a booking on the LUMEA website: {service}, {date} at {time}. Name: {name}. Contact: {phone}.',
      metaTitle: 'LUMEA — Botanical atelier in Porto | Bookings, gallery and sensory gifts',
      metaDescription: 'LUMEA is a botanical atelier in Porto with handmade candles, ceramics, natural fragrances, premium gifts, online bookings, gallery and WhatsApp.'
    }
  };

  let data = getData();
  let lang = getInitialLang();

  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

  function getData() {
    try {
      const raw = localStorage.getItem(cfg.storageKey);
      if (raw) return mergeData(seed, JSON.parse(raw));
    } catch (err) {
      console.warn('Não foi possível ler dados locais:', err);
    }
    const initial = clone(seed);
    persistData(initial);
    return initial;
  }

  function mergeData(base, saved) {
    return {
      ...clone(base),
      ...saved,
      settings: { ...clone(base.settings), ...(saved.settings || {}) },
      services: Array.isArray(saved.services) ? saved.services : clone(base.services),
      products: Array.isArray(saved.products) ? saved.products : clone(base.products),
      faqs: Array.isArray(saved.faqs) ? saved.faqs : clone(base.faqs),
      bookings: Array.isArray(saved.bookings) ? saved.bookings : []
    };
  }

  function persistData(nextData) {
    localStorage.setItem(cfg.storageKey, JSON.stringify(nextData));
  }

  function t(path) {
    return path.split('.').reduce((acc, key) => acc && acc[key], translations[lang]) || path;
  }

  function valueFor(item, key) {
    const value = item?.[key];
    if (value && typeof value === 'object') return value[lang] || value.pt || value.en || '';
    return value || '';
  }

  function getInitialLang() {
    const params = new URLSearchParams(window.location.search);
    const param = params.get('lang');
    const stored = localStorage.getItem('lumea.lang');
    if (param === 'en' || param === 'pt') return param;
    if (stored === 'en' || stored === 'pt') return stored;
    return (navigator.language || '').toLowerCase().startsWith('en') ? 'en' : 'pt';
  }

  function setLang(nextLang) {
    lang = nextLang;
    localStorage.setItem('lumea.lang', lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-PT' : 'en';
    document.title = t('metaTitle');
    const desc = $('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('metaDescription'));
    $$('.lang-toggle button').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    renderAll();
  }

  function renderAll() {
    renderDynamicSettings();
    renderServices();
    renderBookingForm();
    renderGallery();
    renderFaqs();
    renderAssistantWelcome(false);
  }

  function renderDynamicSettings() {
    const s = data.settings;
    const cleanPhone = (s.phone || cfg.businessPhone).replace(/\s+/g, '');
    const waNumber = s.whatsappNumber || cfg.whatsappNumber;
    $$('[data-dynamic="openingHours"]').forEach(el => { el.textContent = valueFor(s, 'openingHours'); });
    $$('[data-dynamic="phone"]').forEach(el => { el.textContent = s.phone || cfg.businessPhone; });
    $$('[data-dynamic="email"]').forEach(el => { el.textContent = s.email || cfg.businessEmail; el.href = `mailto:${s.email || cfg.businessEmail}`; });
    $$('[data-dynamic="phoneLink"]').forEach(el => { el.textContent = s.phone || cfg.businessPhone; el.href = `tel:${cleanPhone}`; });
    $$('[data-dynamic="businessLink"]').forEach(el => { el.href = s.googleBusinessUrl || cfg.googleBusinessUrl; });
    $$('[data-dynamic="address"]').forEach(el => { el.textContent = s.address || cfg.businessAddress; });
    const whatsappMsg = encodeURIComponent(lang === 'pt' ? 'Olá, gostava de saber mais sobre a LUMEA.' : 'Hello, I would like to know more about LUMEA.');
    const waLink = `https://wa.me/${waNumber}?text=${whatsappMsg}`;
    const float = $('#whatsAppFloat');
    if (float) float.href = waLink;
  }

  function renderServices() {
    const root = $('#servicesGrid');
    if (!root) return;
    root.innerHTML = data.services.map(service => `
      <article class="card service-card">
        <div>
          <div class="service-icon" aria-hidden="true">${escapeHTML(service.icon || '✦')}</div>
          <h3>${escapeHTML(valueFor(service, 'title'))}</h3>
          <p style="margin-top:.75rem">${escapeHTML(valueFor(service, 'description'))}</p>
        </div>
        <div class="service-meta">
          <span class="badge">${Number(service.duration || 45)} min</span>
          <span class="badge">${escapeHTML(service.price || '')}</span>
        </div>
      </article>
    `).join('');
  }

  function renderBookingForm() {
    const serviceSelect = $('#service');
    const timeSelect = $('#time');
    const dateInput = $('#date');
    if (!serviceSelect || !timeSelect || !dateInput) return;

    serviceSelect.innerHTML = data.services.map(service => `
      <option value="${escapeAttr(service.id)}">${escapeHTML(valueFor(service, 'title'))} · ${escapeHTML(service.price || '')}</option>
    `).join('');

    const today = new Date();
    today.setHours(0,0,0,0);
    dateInput.min = today.toISOString().slice(0,10);
    if (!dateInput.value) dateInput.value = nextAvailableDate(today).toISOString().slice(0,10);
    renderTimeSlots();
  }

  function nextAvailableDate(start) {
    const available = data.settings.availableDays || [2,3,4,5,6];
    const d = new Date(start);
    for (let i = 0; i < 14; i += 1) {
      if (available.includes(d.getDay())) return d;
      d.setDate(d.getDate() + 1);
    }
    return start;
  }

  function renderTimeSlots() {
    const timeSelect = $('#time');
    const dateInput = $('#date');
    if (!timeSelect || !dateInput) return;
    const slots = data.settings.timeSlots || [];
    const bookings = data.bookings || [];
    const selectedDate = dateInput.value;
    const used = new Set(bookings.filter(b => b.date === selectedDate && b.status !== 'cancelada').map(b => b.time));
    timeSelect.innerHTML = slots.map(slot => {
      const disabled = used.has(slot) ? 'disabled' : '';
      const label = used.has(slot) ? `${slot} — ${lang === 'pt' ? 'ocupado' : 'booked'}` : slot;
      return `<option value="${escapeAttr(slot)}" ${disabled}>${escapeHTML(label)}</option>`;
    }).join('');
  }

  function renderGallery() {
    const root = $('#galleryGrid');
    if (!root) return;
    root.innerHTML = data.products.map(product => `
      <article class="card product-card">
        <button type="button" data-product-id="${escapeAttr(product.id)}" aria-label="${escapeAttr(valueFor(product, 'title'))}">
          <div class="product-media"><img loading="lazy" src="${escapeAttr(product.image)}" alt="${escapeAttr(valueFor(product, 'alt') || valueFor(product, 'title'))}"></div>
          <div class="product-body">
            <div class="product-top">
              <h3>${escapeHTML(valueFor(product, 'title'))}</h3>
              <span class="product-price">${escapeHTML(product.price || '')}</span>
            </div>
            <p>${escapeHTML(valueFor(product, 'description'))}</p>
          </div>
        </button>
      </article>
    `).join('');
    $$('[data-product-id]', root).forEach(btn => btn.addEventListener('click', () => openLightbox(btn.dataset.productId)));
  }

  function renderFaqs() {
    const root = $('#faqGrid');
    if (!root) return;
    root.innerHTML = data.faqs.map(item => `
      <details class="card">
        <summary>${escapeHTML(valueFor(item, 'q'))}</summary>
        <p>${escapeHTML(valueFor(item, 'a'))}</p>
      </details>
    `).join('');
  }

  function openLightbox(productId) {
    const product = data.products.find(item => item.id === productId);
    if (!product) return;
    $('#lightboxImage').src = product.image;
    $('#lightboxImage').alt = valueFor(product, 'alt') || valueFor(product, 'title');
    $('#lightboxCategory').textContent = product.category || '';
    $('#lightboxTitle').textContent = valueFor(product, 'title');
    $('#lightboxDescription').textContent = valueFor(product, 'description');
    $('#lightboxPrice').textContent = product.price || '';
    const message = t('productWhats').replace('{product}', valueFor(product, 'title'));
    $('#lightboxWhatsapp').href = `https://wa.me/${data.settings.whatsappNumber || cfg.whatsappNumber}?text=${encodeURIComponent(message)}`;
    $('#lightbox').classList.add('open');
    document.body.classList.add('no-scroll');
  }

  function closeLightbox() {
    $('#lightbox')?.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  function handleBookingSubmit(evt) {
    evt.preventDefault();
    const form = evt.currentTarget;
    const formData = new FormData(form);
    const booking = Object.fromEntries(formData.entries());
    const notice = $('#bookingNotice');
    const sendWhatsApp = $('#sendWhatsAppBooking');
    const selectedDate = new Date(`${booking.date}T00:00:00`);
    const day = selectedDate.getDay();
    const available = data.settings.availableDays || [];

    if (!booking.service || !booking.date || !booking.time || !booking.name || !booking.phone || !booking.email) {
      showNotice(notice, t('form.required'), 'error');
      return;
    }
    if (!available.includes(day)) {
      showNotice(notice, t('form.errorDay'), 'error');
      return;
    }
    const isUsed = (data.bookings || []).some(b => b.date === booking.date && b.time === booking.time && b.status !== 'cancelada');
    if (isUsed) {
      showNotice(notice, t('form.errorSlot'), 'error');
      renderTimeSlots();
      return;
    }

    const service = data.services.find(item => item.id === booking.service);
    const record = {
      id: `BK-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pendente',
      serviceId: booking.service,
      serviceTitle: service ? valueFor(service, 'title') : booking.service,
      date: booking.date,
      time: booking.time,
      name: booking.name.trim(),
      phone: booking.phone.trim(),
      email: booking.email.trim(),
      message: booking.message.trim(),
      lang
    };
    data.bookings.unshift(record);
    persistData(data);
    showNotice(notice, t('form.success'), 'ok');
    form.reset();
    renderBookingForm();
    const whatsText = t('bookingWhats')
      .replace('{service}', record.serviceTitle)
      .replace('{date}', record.date)
      .replace('{time}', record.time)
      .replace('{name}', record.name)
      .replace('{phone}', record.phone);
    sendWhatsApp.href = `https://wa.me/${data.settings.whatsappNumber || cfg.whatsappNumber}?text=${encodeURIComponent(whatsText)}`;
    sendWhatsApp.classList.remove('hidden');
    trackEvent('booking_created', { service: record.serviceId });
  }

  function showNotice(el, text, type) {
    el.textContent = text;
    el.className = `notice show ${type}`;
  }

  function initAssistant() {
    $('#assistantFloat')?.addEventListener('click', openAssistant);
    $('#heroAssistant')?.addEventListener('click', openAssistant);
    $('#assistantClose')?.addEventListener('click', closeAssistant);
    $('#assistantForm')?.addEventListener('submit', evt => {
      evt.preventDefault();
      const input = $('#assistantInput');
      const question = input.value.trim();
      if (!question) return;
      addMessage(question, 'user');
      input.value = '';
      setTimeout(() => addMessage(answerQuestion(question), 'bot'), 180);
      trackEvent('assistant_question', { language: lang });
    });
    renderAssistantWelcome(true);
  }

  function renderAssistantWelcome(force) {
    const messages = $('#assistantMessages');
    if (!messages) return;
    if (force || messages.children.length === 0) {
      messages.innerHTML = '';
      addMessage(t('ai.welcome'), 'bot');
    }
  }

  function openAssistant() {
    $('#assistantPanel')?.classList.add('open');
    setTimeout(() => $('#assistantInput')?.focus(), 80);
  }
  function closeAssistant() { $('#assistantPanel')?.classList.remove('open'); }

  function addMessage(text, type) {
    const messages = $('#assistantMessages');
    if (!messages) return;
    const div = document.createElement('div');
    div.className = `message ${type === 'user' ? 'user' : 'bot'}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function answerQuestion(question) {
    const q = question.toLowerCase();
    const products = data.products.map(p => valueFor(p, 'title')).join(', ');
    const prices = data.products.map(p => `${valueFor(p, 'title')} (${p.price})`).join(', ');
    const hours = valueFor(data.settings, 'openingHours');
    const phone = data.settings.phone || cfg.businessPhone;
    const email = data.settings.email || cfg.businessEmail;
    const address = data.settings.address || cfg.businessAddress;

    if (/(marc|book|agenda|reserva|appointment|schedule)/i.test(q)) return t('ai.booking');
    if (/(hor[aá]rio|abert|hours|open|opening)/i.test(q)) return t('ai.hours').replace('{hours}', hours);
    if (/(produto|galeria|vela|cer[aâ]mica|difusor|gift|product|candle|ceramic|fragrance)/i.test(q)) return t('ai.products').replace('{products}', products);
    if (/(pre[cç]o|valor|custa|price|cost|€|euro)/i.test(q)) return t('ai.prices').replace('{prices}', prices);
    if (/(contact|whatsapp|telefone|email|mail|phone)/i.test(q)) return t('ai.contact').replace('{phone}', phone).replace('{email}', email);
    if (/(morada|onde|local|porto|address|where|location)/i.test(q)) return t('ai.location').replace('{address}', address);
    return t('ai.fallback');
  }

  function initCookiesAndAnalytics() {
    const banner = $('#cookieBanner');
    const consent = localStorage.getItem('lumea.analytics.consent');
    if (!consent && banner) banner.classList.add('show');
    $('#acceptCookies')?.addEventListener('click', () => {
      localStorage.setItem('lumea.analytics.consent', 'accepted');
      banner?.classList.remove('show');
      loadAnalytics();
    });
    $('#rejectCookies')?.addEventListener('click', () => {
      localStorage.setItem('lumea.analytics.consent', 'rejected');
      banner?.classList.remove('show');
    });
    if (consent === 'accepted') loadAnalytics();
  }

  function loadAnalytics() {
    const id = data.settings.googleAnalyticsId || cfg.googleAnalyticsId;
    if (!id || id === 'G-XXXXXXXXXX' || window.gtag) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id, { anonymize_ip: true });
  }

  function trackEvent(name, params = {}) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
  }

  function escapeHTML(str) {
    return String(str ?? '').replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
  }
  function escapeAttr(str) { return escapeHTML(str).replace(/`/g, '&#96;'); }

  function bindEvents() {
    $$('.lang-toggle button').forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
    $('#mobileMenuBtn')?.addEventListener('click', () => {
      const nav = $('#navLinks');
      const open = nav.classList.toggle('open');
      $('#mobileMenuBtn').setAttribute('aria-expanded', String(open));
    });
    $$('#navLinks a').forEach(link => link.addEventListener('click', () => $('#navLinks')?.classList.remove('open')));
    $('#bookingForm')?.addEventListener('submit', handleBookingSubmit);
    $('#date')?.addEventListener('change', renderTimeSlots);
    $('#lightboxClose')?.addEventListener('click', closeLightbox);
    $('#lightbox')?.addEventListener('click', evt => { if (evt.target.id === 'lightbox') closeLightbox(); });
    document.addEventListener('keydown', evt => { if (evt.key === 'Escape') { closeLightbox(); closeAssistant(); } });
  }

  function updateSchema() {
    const schema = $('#schema-local-business');
    if (!schema) return;
    const s = data.settings;
    const obj = {
      '@context': 'https://schema.org',
      '@type': 'Store',
      name: `${s.brand || 'LUMEA'} Atelier Botânico`,
      image: `${cfg.canonicalUrl}assets/images/og-cover.svg`,
      url: cfg.canonicalUrl,
      telephone: s.phone || cfg.businessPhone,
      email: s.email || cfg.businessEmail,
      priceRange: '€€',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rua das Flores 88',
        postalCode: '4050-263',
        addressLocality: 'Porto',
        addressCountry: 'PT'
      },
      geo: { '@type': 'GeoCoordinates', latitude: cfg.businessGeo.lat, longitude: cfg.businessGeo.lng },
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '10:00', closes: '19:00' }],
      sameAs: [s.googleBusinessUrl || cfg.googleBusinessUrl],
      makesOffer: data.services.map(service => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: valueFor(service, 'title'), description: valueFor(service, 'description') }, price: service.price || undefined }))
    };
    schema.textContent = JSON.stringify(obj, null, 2);
  }

  document.addEventListener('DOMContentLoaded', () => {
    $('#year').textContent = new Date().getFullYear();
    bindEvents();
    initAssistant();
    initCookiesAndAnalytics();
    updateSchema();
    setLang(lang);
  });
})();
