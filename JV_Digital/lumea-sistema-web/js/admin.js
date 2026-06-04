(() => {
  'use strict';

  const cfg = window.LUMEA_CONFIG;
  const seed = window.LUMEA_DEFAULT_DATA;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const clone = obj => JSON.parse(JSON.stringify(obj));
  let data = loadData();
  let activeTab = 'dashboard';

  const tabTitles = {
    dashboard: ['Dashboard', 'Resumo do sistema'],
    bookings: ['Marcações', 'Gestão de marcações'],
    products: ['Galeria', 'Produtos e fotografias'],
    services: ['Serviços', 'Serviços de marcação'],
    settings: ['SEO & definições', 'Configuração do site'],
    data: ['Dados locais', 'Exportação e restauro']
  };

  function loadData() {
    try {
      const raw = localStorage.getItem(cfg.storageKey);
      if (raw) return mergeData(seed, JSON.parse(raw));
    } catch (err) {
      console.warn('Erro a carregar dados:', err);
    }
    const initial = clone(seed);
    saveData(initial);
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

  function saveData(next = data) {
    localStorage.setItem(cfg.storageKey, JSON.stringify(next));
  }

  function getPassword() {
    return localStorage.getItem('lumea.admin.password') || cfg.defaultAdminPassword;
  }

  function loggedIn() {
    return sessionStorage.getItem(cfg.adminSessionKey) === 'true';
  }

  function showApp() {
    $('#loginScreen').classList.add('hidden');
    $('#adminShell').classList.remove('hidden');
    renderAll();
  }

  function showLogin() {
    $('#loginScreen').classList.remove('hidden');
    $('#adminShell').classList.add('hidden');
  }

  function login(evt) {
    evt.preventDefault();
    const pass = $('#password').value;
    if (pass === getPassword()) {
      sessionStorage.setItem(cfg.adminSessionKey, 'true');
      showApp();
      return;
    }
    showNotice('Palavra-passe incorrecta.', 'error', '#loginNotice');
  }

  function logout() {
    sessionStorage.removeItem(cfg.adminSessionKey);
    showLogin();
  }

  function renderAll() {
    renderDashboard();
    renderBookings();
    renderProductsEditor();
    renderServicesEditor();
    renderSettings();
    renderJsonPreview();
  }

  function setTab(tab) {
    activeTab = tab;
    $$('.admin-nav button').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab));
    $$('[data-panel]').forEach(panel => panel.classList.toggle('hidden', panel.dataset.panel !== tab));
    $('#tabEyebrow').textContent = tabTitles[tab]?.[0] || tab;
    $('#tabTitle').textContent = tabTitles[tab]?.[1] || '';
  }

  function renderDashboard() {
    const now = new Date();
    const bookings = data.bookings || [];
    $('#kpiBookings').textContent = bookings.length;
    $('#kpiPending').textContent = bookings.filter(b => b.status === 'pendente').length;
    $('#kpiProducts').textContent = data.products.length;
    $('#kpiServices').textContent = data.services.length;

    const next = bookings
      .filter(b => b.status !== 'cancelada' && new Date(`${b.date}T${b.time || '00:00'}`) >= now)
      .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
      .slice(0, 6);
    $('#nextBookingsTable').innerHTML = tableHTML(['Data', 'Hora', 'Cliente', 'Serviço', 'Estado'], next.map(b => [
      b.date,
      b.time,
      `${escapeHTML(b.name)}<br><span class="tiny">${escapeHTML(b.phone)}</span>`,
      escapeHTML(b.serviceTitle || b.serviceId),
      statusPill(b.status)
    ]));
  }

  function renderBookings() {
    const bookings = data.bookings || [];
    const rows = bookings.map(b => [
      `${escapeHTML(b.date)}<br><span class="tiny">${escapeHTML(b.time)}</span>`,
      `${escapeHTML(b.name)}<br><span class="tiny">${escapeHTML(b.email)} · ${escapeHTML(b.phone)}</span>`,
      `${escapeHTML(b.serviceTitle || b.serviceId)}<br><span class="tiny">${escapeHTML(b.message || '')}</span>`,
      `<select data-booking-status="${escapeAttr(b.id)}">
        ${['pendente','confirmada','cancelada'].map(s => `<option value="${s}" ${b.status === s ? 'selected' : ''}>${s}</option>`).join('')}
      </select>`,
      `<button class="btn danger small" data-delete-booking="${escapeAttr(b.id)}" type="button">Apagar</button>`
    ]);
    $('#bookingsTable').innerHTML = tableHTML(['Data', 'Cliente', 'Serviço', 'Estado', 'Acções'], rows);
    $$('[data-booking-status]').forEach(sel => sel.addEventListener('change', () => {
      const item = data.bookings.find(b => b.id === sel.dataset.bookingStatus);
      if (item) item.status = sel.value;
      persistAndRender('Estado actualizado.');
    }));
    $$('[data-delete-booking]').forEach(btn => btn.addEventListener('click', () => {
      if (!confirm('Apagar esta marcação?')) return;
      data.bookings = data.bookings.filter(b => b.id !== btn.dataset.deleteBooking);
      persistAndRender('Marcação apagada.');
    }));
  }

  function renderProductsEditor() {
    const root = $('#productsEditor');
    root.innerHTML = data.products.map((p, index) => `
      <article class="card product-admin-card" data-product-card="${index}">
        <img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.title?.pt || '')}">
        <div class="editor-grid">
          <div class="form-field"><label>Título PT</label><input data-product-field="title.pt" value="${escapeAttr(p.title?.pt || '')}"></div>
          <div class="form-field"><label>Título EN</label><input data-product-field="title.en" value="${escapeAttr(p.title?.en || '')}"></div>
          <div class="form-field"><label>Categoria</label><input data-product-field="category" value="${escapeAttr(p.category || '')}"></div>
          <div class="form-field"><label>Preço</label><input data-product-field="price" value="${escapeAttr(p.price || '')}"></div>
          <div class="form-field full"><label>Descrição PT</label><textarea data-product-field="description.pt">${escapeHTML(p.description?.pt || '')}</textarea></div>
          <div class="form-field full"><label>Descrição EN</label><textarea data-product-field="description.en">${escapeHTML(p.description?.en || '')}</textarea></div>
          <div class="form-field full"><label>Imagem URL/Base64</label><input data-product-field="image" value="${escapeAttr(p.image || '')}"></div>
          <div class="form-field"><label>Carregar imagem</label><input type="file" accept="image/*" data-product-upload="${index}"></div>
          <div class="form-field"><label>&nbsp;</label><button class="btn danger" type="button" data-delete-product="${index}">Apagar produto</button></div>
        </div>
      </article>
    `).join('');

    $$('[data-product-field]').forEach(input => input.addEventListener('input', evt => {
      const card = evt.target.closest('[data-product-card]');
      const index = Number(card.dataset.productCard);
      setDeep(data.products[index], evt.target.dataset.productField, evt.target.value);
      if (evt.target.dataset.productField === 'title.pt') data.products[index].id = slugify(evt.target.value || `produto-${index + 1}`);
      renderJsonPreview();
    }));
    $$('[data-product-upload]').forEach(input => input.addEventListener('change', evt => handleImageUpload(evt, Number(input.dataset.productUpload))));
    $$('[data-delete-product]').forEach(btn => btn.addEventListener('click', () => {
      if (!confirm('Apagar este produto?')) return;
      data.products.splice(Number(btn.dataset.deleteProduct), 1);
      persistAndRender('Produto apagado.');
    }));
  }

  function handleImageUpload(evt, index) {
    const file = evt.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      data.products[index].image = reader.result;
      persistAndRender('Imagem carregada localmente.');
    };
    reader.readAsDataURL(file);
  }

  function renderServicesEditor() {
    const root = $('#servicesEditor');
    root.innerHTML = data.services.map((s, index) => `
      <article class="card" data-service-card="${index}">
        <div class="editor-grid">
          <div class="form-field"><label>Ícone</label><input data-service-field="icon" value="${escapeAttr(s.icon || '')}"></div>
          <div class="form-field"><label>Preço</label><input data-service-field="price" value="${escapeAttr(s.price || '')}"></div>
          <div class="form-field"><label>Duração min.</label><input type="number" data-service-field="duration" value="${escapeAttr(s.duration || 45)}"></div>
          <div class="form-field"><label>Título PT</label><input data-service-field="title.pt" value="${escapeAttr(s.title?.pt || '')}"></div>
          <div class="form-field"><label>Título EN</label><input data-service-field="title.en" value="${escapeAttr(s.title?.en || '')}"></div>
          <div class="form-field full"><label>Descrição PT</label><textarea data-service-field="description.pt">${escapeHTML(s.description?.pt || '')}</textarea></div>
          <div class="form-field full"><label>Descrição EN</label><textarea data-service-field="description.en">${escapeHTML(s.description?.en || '')}</textarea></div>
          <div class="form-field full"><button class="btn danger small" type="button" data-delete-service="${index}">Apagar serviço</button></div>
        </div>
      </article>
    `).join('');
    $$('[data-service-field]').forEach(input => input.addEventListener('input', evt => {
      const card = evt.target.closest('[data-service-card]');
      const index = Number(card.dataset.serviceCard);
      const value = evt.target.type === 'number' ? Number(evt.target.value) : evt.target.value;
      setDeep(data.services[index], evt.target.dataset.serviceField, value);
      if (evt.target.dataset.serviceField === 'title.pt') data.services[index].id = slugify(evt.target.value || `servico-${index + 1}`);
      renderJsonPreview();
    }));
    $$('[data-delete-service]').forEach(btn => btn.addEventListener('click', () => {
      if (!confirm('Apagar este serviço?')) return;
      data.services.splice(Number(btn.dataset.deleteService), 1);
      persistAndRender('Serviço apagado.');
    }));
  }

  function renderSettings() {
    const s = data.settings;
    setInput('brand', s.brand);
    setInput('email', s.email);
    setInput('phone', s.phone);
    setInput('whatsappNumber', s.whatsappNumber);
    setInput('address', s.address);
    setInput('googleBusinessUrl', s.googleBusinessUrl);
    setInput('googleAnalyticsId', s.googleAnalyticsId);
    setInput('appointmentDurationMinutes', s.appointmentDurationMinutes);
    setInput('openingHoursPt', s.openingHours?.pt);
    setInput('openingHoursEn', s.openingHours?.en);
    setInput('timeSlots', (s.timeSlots || []).join(', '));
    setInput('seoKeywords', (s.seoKeywords || []).join(', '));
  }

  function collectSettings() {
    const s = data.settings;
    s.brand = $('#brand').value.trim() || 'LUMEA';
    s.email = $('#email').value.trim();
    s.phone = $('#phone').value.trim();
    s.whatsappNumber = $('#whatsappNumber').value.trim();
    s.address = $('#address').value.trim();
    s.googleBusinessUrl = $('#googleBusinessUrl').value.trim();
    s.googleAnalyticsId = $('#googleAnalyticsId').value.trim();
    s.appointmentDurationMinutes = Number($('#appointmentDurationMinutes').value || 45);
    s.openingHours = { pt: $('#openingHoursPt').value.trim(), en: $('#openingHoursEn').value.trim() };
    s.timeSlots = $('#timeSlots').value.split(',').map(v => v.trim()).filter(Boolean);
    s.seoKeywords = $('#seoKeywords').value.split(',').map(v => v.trim()).filter(Boolean);
    const newPassword = $('#adminPassword').value.trim();
    if (newPassword) {
      localStorage.setItem('lumea.admin.password', newPassword);
      $('#adminPassword').value = '';
    }
  }

  function setInput(id, value) {
    const el = $(`#${id}`);
    if (el) el.value = value ?? '';
  }

  function addProduct() {
    const index = data.products.length + 1;
    data.products.push({
      id: `produto-${Date.now()}`,
      category: 'Novo',
      price: '0€',
      image: 'assets/images/produto-aurora.svg',
      title: { pt: `Novo produto ${index}`, en: `New product ${index}` },
      description: { pt: 'Descrição do produto.', en: 'Product description.' },
      alt: { pt: `Novo produto ${index}`, en: `New product ${index}` }
    });
    persistAndRender('Produto adicionado.');
  }

  function addService() {
    const index = data.services.length + 1;
    data.services.push({
      id: `servico-${Date.now()}`,
      icon: '✦',
      duration: 45,
      price: 'Sob orçamento',
      title: { pt: `Novo serviço ${index}`, en: `New service ${index}` },
      description: { pt: 'Descrição do serviço.', en: 'Service description.' }
    });
    persistAndRender('Serviço adicionado.');
  }

  function renderJsonPreview() {
    const preview = $('#jsonPreview');
    if (preview) preview.value = JSON.stringify(data, null, 2);
  }

  function exportData() {
    collectSettingsIfPossible();
    saveData(data);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lumea-dados-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showNotice('Exportação criada.', 'ok');
  }

  function importData(evt) {
    const file = evt.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        data = mergeData(seed, imported);
        saveData(data);
        renderAll();
        showNotice('Dados importados com sucesso.', 'ok');
      } catch (err) {
        showNotice('Ficheiro JSON inválido.', 'error');
      }
    };
    reader.readAsText(file);
  }

  function resetData() {
    if (!confirm('Repor todos os dados iniciais? Esta acção apaga alterações locais.')) return;
    data = clone(seed);
    saveData(data);
    renderAll();
    showNotice('Dados repostos.', 'ok');
  }

  function persistAndRender(message) {
    collectSettingsIfPossible();
    saveData(data);
    renderAll();
    showNotice(message || 'Alterações guardadas.', 'ok');
  }

  function collectSettingsIfPossible() {
    if ($('#brand')) collectSettings();
  }

  function tableHTML(headers, rows) {
    if (!rows.length) return `<thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody><tr><td colspan="${headers.length}">Sem registos.</td></tr></tbody>`;
    return `<thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>`;
  }

  function statusPill(status = 'pendente') {
    return `<span class="status-pill ${escapeAttr(status)}">${escapeHTML(status)}</span>`;
  }

  function setDeep(obj, path, value) {
    const parts = path.split('.');
    let current = obj;
    parts.slice(0, -1).forEach(part => {
      current[part] = current[part] || {};
      current = current[part];
    });
    current[parts.at(-1)] = value;
  }

  function slugify(text) {
    return String(text)
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `item-${Date.now()}`;
  }

  function showNotice(text, type = 'ok', selector = '#adminNotice') {
    const el = $(selector);
    if (!el) return;
    el.textContent = text;
    el.className = `notice show ${type}`;
    setTimeout(() => { el.className = 'notice'; }, 3500);
  }

  function escapeHTML(str) {
    return String(str ?? '').replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
  }
  function escapeAttr(str) { return escapeHTML(str).replace(/`/g, '&#96;'); }

  function bindEvents() {
    $('#loginForm')?.addEventListener('submit', login);
    $('#logoutBtn')?.addEventListener('click', logout);
    $$('.admin-nav button').forEach(btn => btn.addEventListener('click', () => setTab(btn.dataset.tab)));
    $('#saveAll')?.addEventListener('click', () => persistAndRender('Alterações guardadas.'));
    $('#exportData')?.addEventListener('click', exportData);
    $('#exportQuick')?.addEventListener('click', exportData);
    $('#importData')?.addEventListener('change', importData);
    $('#resetData')?.addEventListener('click', resetData);
    $('#addProduct')?.addEventListener('click', addProduct);
    $('#addService')?.addEventListener('click', addService);
    $('#clearCancelled')?.addEventListener('click', () => {
      data.bookings = data.bookings.filter(b => b.status !== 'cancelada');
      persistAndRender('Marcações canceladas removidas.');
    });
    ['brand','email','phone','whatsappNumber','address','googleBusinessUrl','googleAnalyticsId','appointmentDurationMinutes','openingHoursPt','openingHoursEn','timeSlots','seoKeywords','adminPassword'].forEach(id => {
      $(`#${id}`)?.addEventListener('input', () => {
        collectSettingsIfPossible();
        renderJsonPreview();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    if (loggedIn()) showApp(); else showLogin();
    setTab(activeTab);
  });
})();
