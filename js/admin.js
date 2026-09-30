(function () {
  'use strict';

  // ────────────────────────────────────────────────────────────────────────
  // Field definitions — drive the form, cleaning and validation.
  // kinds: text | url | email | number | list (comma-separated)
  //        i18n | i18n-area (PT/EN side by side) | i18n-list | links
  // ────────────────────────────────────────────────────────────────────────
  const PERSONAL_FIELDS = [
    { key: 'name', label: 'Nome', kind: 'text', required: true },
    { key: 'location', label: 'Localização', kind: 'text', required: true },
    { key: 'title', label: 'Título', kind: 'i18n', required: true },
    { key: 'bio', label: 'Bio', kind: 'i18n-area', required: true, rows: 7 },
    { key: 'education', label: 'Educação', kind: 'i18n', required: true },
    { key: 'languages', label: 'Idiomas', kind: 'i18n', required: true },
    { key: 'quote', label: 'Citação', kind: 'i18n', required: true },
    { key: 'github', label: 'GitHub (URL)', kind: 'url', required: true },
    { key: 'email', label: 'E-mail', kind: 'email', required: true },
  ];

  // same order as the public site
  const SECTIONS = [
    {
      key: 'techStack', title: 'Arsenal técnico', itemName: 'grupo',
      summary: (g) => g.category.pt,
      fields: [
        { key: 'category', label: 'Categoria', kind: 'i18n', required: true },
        { key: 'items', label: 'Itens (separados por vírgula)', kind: 'list', required: true },
      ],
    },
    {
      key: 'roadmap', title: 'Rota de ascensão', itemName: 'meta',
      summary: (r) => r.title.pt,
      fields: [
        { key: 'title', label: 'Título', kind: 'i18n', required: true },
        { key: 'desc', label: 'Descrição', kind: 'i18n-area', required: true },
      ],
    },
    {
      key: 'career', title: 'Carreira', itemName: 'cargo', ids: true,
      summary: (j) => [j.role.pt, j.company].filter(Boolean).join(' — '),
      fields: [
        { key: 'company', label: 'Empresa', kind: 'text', required: true },
        { key: 'role', label: 'Cargo', kind: 'i18n', required: true },
        { key: 'period', label: 'Período', kind: 'i18n', required: true },
        { key: 'shortDesc', label: 'Resumo (card)', kind: 'i18n-area', required: true },
        { key: 'description', label: 'Descrição completa (janela de detalhes)', kind: 'i18n-area', required: true, rows: 6 },
        { key: 'achievements', label: 'Destaques (separados por vírgula)', kind: 'i18n-list' },
      ],
    },
    {
      key: 'projects', title: 'Projetos', itemName: 'projeto', ids: true,
      summary: (x) => x.title,
      fields: [
        { key: 'title', label: 'Título', kind: 'text', required: true },
        { key: 'tags', label: 'Tags (separadas por vírgula)', kind: 'list' },
        { key: 'badge', label: 'Selo (opcional)', kind: 'i18n' },
        { key: 'shortDesc', label: 'Resumo (card)', kind: 'i18n-area', required: true },
        { key: 'longDesc', label: 'Descrição completa (janela de detalhes)', kind: 'i18n-area', required: true, rows: 7 },
        { key: 'links', label: 'Links', kind: 'links' },
      ],
    },
    {
      key: 'certifications', title: 'Certificações', itemName: 'certificação', ids: true,
      summary: (c) => c.name.pt,
      fields: [
        { key: 'name', label: 'Nome', kind: 'i18n', required: true },
        { key: 'issuer', label: 'Emissor', kind: 'i18n' },
        { key: 'description', label: 'Descrição', kind: 'i18n-area', required: true, rows: 6 },
        { key: 'startDate', label: 'Início', kind: 'i18n' },
        { key: 'endDate', label: 'Conclusão', kind: 'i18n' },
        { key: 'institution', label: 'Instituição', kind: 'i18n' },
        { key: 'hours', label: 'Carga horária (horas)', kind: 'number', required: true },
        { key: 'links', label: 'Links', kind: 'links' },
      ],
    },
  ];

  const URL_RE = /^https?:\/\/\S+$/i;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ────────────────────────────────────────────────────────────────────────
  // State
  // ────────────────────────────────────────────────────────────────────────
  const root = document.getElementById('painel');
  const state = {
    screen: 'loading',   // setup | login | loading | editor | error
    loginEmail: '',
    loginError: '',
    loadError: '',
    saved: null,         // content as last read from / written to Supabase
    savedJson: '',
    updatedAt: null,
    draft: null,         // what the form is editing
    errors: [],          // [{ path, label }]
    history: [],         // [{ id, saved_at }] or null when it failed to load
    saving: false,
  };
  const openItems = new WeakSet();  // draft items whose body is expanded

  // ────────────────────────────────────────────────────────────────────────
  // Helpers
  // ────────────────────────────────────────────────────────────────────────
  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  const clone = (v) => JSON.parse(JSON.stringify(v));
  const isObj = (v) => v != null && typeof v === 'object' && !Array.isArray(v);
  const fieldId = (path) => 'f-' + path.replace(/\./g, '-');
  const pad = (n) => String(n).padStart(2, '0');

  function getPath(obj, path) {
    return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
  }
  function setPath(obj, path, value) {
    const keys = path.split('.');
    let o = obj;
    for (const k of keys.slice(0, -1)) {
      if (o[k] == null) o[k] = {};
      o = o[k];
    }
    o[keys[keys.length - 1]] = value;
  }
  function formatDate(iso) {
    return iso ? new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '—';
  }
  const splitList = (s) => String(s).split(',').map((x) => x.trim()).filter(Boolean);

  // ────────────────────────────────────────────────────────────────────────
  // Normalize (for the form) and clean (for saving)
  // ────────────────────────────────────────────────────────────────────────
  // Form values always use one shape per kind, e.g. i18n is always { pt, en }.
  function normalizeValue(f, v) {
    switch (f.kind) {
      case 'i18n': case 'i18n-area':
        return isObj(v) ? { pt: v.pt ?? '', en: v.en ?? '' } : { pt: v == null ? '' : String(v), en: '' };
      case 'i18n-list':
        return { pt: (isObj(v) && Array.isArray(v.pt)) ? v.pt : [], en: (isObj(v) && Array.isArray(v.en)) ? v.en : [] };
      case 'list':
        return Array.isArray(v) ? v : [];
      case 'links':
        return Array.isArray(v) ? v.map((l) => ({ label: l.label ?? '', url: l.url ?? '' })) : [];
      case 'number':
        return v == null ? '' : String(v);
      default:
        return v == null ? '' : String(v);
    }
  }
  function normalizeObject(fields, obj) {
    const out = { ...obj };
    for (const f of fields) out[f.key] = normalizeValue(f, obj[f.key]);
    return out;
  }
  function normalize(data) {
    const out = { ...data, personal: normalizeObject(PERSONAL_FIELDS, data.personal || {}) };
    for (const sec of SECTIONS) {
      out[sec.key] = (Array.isArray(data[sec.key]) ? data[sec.key] : []).map((item) => normalizeObject(sec.fields, item));
    }
    return out;
  }

  // Back to the shape the site stores: blank EN and optional fields are dropped,
  // lists are trimmed, numbers are numbers.
  function cleanValue(f, v) {
    switch (f.kind) {
      case 'i18n': case 'i18n-area': {
        const pt = String(v.pt ?? '').trim();
        const en = String(v.en ?? '').trim();
        if (!pt && !en && !f.required) return undefined;
        return en ? { pt, en } : { pt };
      }
      case 'i18n-list': {
        const pt = (v.pt || []).map((s) => s.trim()).filter(Boolean);
        const en = (v.en || []).map((s) => s.trim()).filter(Boolean);
        if (!pt.length && !en.length) return undefined;
        return en.length ? { pt, en } : { pt };
      }
      case 'list':
        return (v || []).map((s) => s.trim()).filter(Boolean);
      case 'links':
        return (v || [])
          .map((l) => ({ label: String(l.label ?? '').trim(), url: String(l.url ?? '').trim() }))
          .filter((l) => l.label || l.url);
      case 'number': {
        const s = String(v ?? '').trim();
        return s === '' ? undefined : Number(s.replace(',', '.'));
      }
      default:
        return String(v ?? '').trim();
    }
  }
  function cleanObject(fields, obj) {
    const out = { ...obj };
    for (const f of fields) {
      const v = cleanValue(f, obj[f.key]);
      if (v === undefined) delete out[f.key]; else out[f.key] = v;
    }
    return out;
  }
  function clean(draft) {
    const out = { ...clone(draft), personal: cleanObject(PERSONAL_FIELDS, draft.personal) };
    for (const sec of SECTIONS) out[sec.key] = draft[sec.key].map((item) => cleanObject(sec.fields, item));
    return out;
  }

  // ────────────────────────────────────────────────────────────────────────
  // Validation (on the cleaned data)
  // ────────────────────────────────────────────────────────────────────────
  function checkField(f, value, path, where, errors) {
    const add = (p, msg, lang) => errors.push({ path: p, label: `${where} › ${f.label}${lang ? ` (${lang})` : ''}: ${msg}` });
    switch (f.kind) {
      case 'text':
        if (f.required && !value) add(path, 'obrigatório');
        break;
      case 'url':
        if (!value) { if (f.required) add(path, 'obrigatório'); }
        else if (!URL_RE.test(value)) add(path, 'use um endereço começando com https://');
        break;
      case 'email':
        if (!value) { if (f.required) add(path, 'obrigatório'); }
        else if (!EMAIL_RE.test(value)) add(path, 'e-mail inválido');
        break;
      case 'number':
        if (value === undefined) { if (f.required) add(path, 'obrigatório'); }
        else if (!Number.isFinite(value) || value < 0) add(path, 'use um número maior ou igual a 0');
        break;
      case 'list':
        if (f.required && !value.length) add(path, 'informe pelo menos um item');
        break;
      case 'i18n': case 'i18n-area':
        if (f.required && !(value && value.pt)) add(path + '.pt', 'obrigatório', 'PT');
        break;
      case 'links':
        (value || []).forEach((l, i) => {
          if (!l.label) add(`${path}.${i}.label`, `link ${i + 1} sem nome`);
          if (!URL_RE.test(l.url)) add(`${path}.${i}.url`, `link ${i + 1} com endereço inválido (use https://…)`);
        });
        break;
    }
  }
  function validate(data) {
    const errors = [];
    for (const f of PERSONAL_FIELDS) checkField(f, data.personal[f.key], 'personal.' + f.key, 'Dados pessoais', errors);
    for (const sec of SECTIONS) {
      data[sec.key].forEach((item, i) => {
        const where = `${sec.title} › ${sec.summary(state.draft[sec.key][i]) || '#' + (i + 1)}`;
        for (const f of sec.fields) checkField(f, item[f.key], `${sec.key}.${i}.${f.key}`, where, errors);
      });
    }
    // last line of defence: the same shape check the public site runs
    const shape = errors.length ? '' : portfolioDataError(data);
    if (shape) errors.push({ path: '', label: 'Formato: ' + shape });
    return errors;
  }

  // Postgres reorders jsonb keys, so compare with keys sorted
  function canonical(v) {
    return JSON.stringify(v, (k, val) => (isObj(val) ? Object.fromEntries(Object.keys(val).sort().map((key) => [key, val[key]])) : val));
  }
  const isDirty = () => Boolean(state.draft) && canonical(clean(state.draft)) !== state.savedJson;

  // ────────────────────────────────────────────────────────────────────────
  // Rendering
  // ────────────────────────────────────────────────────────────────────────
  function render(focusSelector) {
    root.innerHTML = {
      setup: renderSetup, login: renderLogin, loading: renderLoading, editor: renderEditor, error: renderError,
    }[state.screen]();
    if (state.screen === 'editor') markErrors();
    if (focusSelector) {
      const el = root.querySelector(focusSelector);
      if (el) el.focus();
    }
  }

  function renderSetup() {
    return `
    <div class="painel-gate">
      <div class="painel-gate-box">
        <div class="painel-kicker">◆ PAINEL</div>
        <h1 class="painel-gate-title">Supabase não configurado</h1>
        <p class="painel-hint">Preencha <code>SUPABASE_URL</code> e <code>SUPABASE_ANON_KEY</code> em <code>js/supabase.js</code>. O passo a passo está no README, na seção "Painel e Supabase".</p>
        <a class="painel-btn-ghost" href="./">← VOLTAR AO PORTFÓLIO</a>
      </div>
    </div>`;
  }

  function renderLogin() {
    return `
    <div class="painel-gate">
      <form class="painel-gate-box" data-form="login">
        <div class="painel-kicker">◆ PAINEL</div>
        <h1 class="painel-gate-title">Entrar</h1>
        <p class="painel-hint">Acesso restrito ao dono do portfólio.</p>
        <div class="painel-field">
          <label class="painel-label" for="loginEmail">E-MAIL</label>
          <input class="painel-input" id="loginEmail" name="email" type="email" autocomplete="username" required value="${esc(state.loginEmail)}">
        </div>
        <div class="painel-field">
          <label class="painel-label" for="loginPass">SENHA</label>
          <input class="painel-input" id="loginPass" name="password" type="password" autocomplete="current-password" required>
        </div>
        ${state.loginError ? `<p class="painel-error" role="alert">${esc(state.loginError)}</p>` : ''}
        <button class="painel-btn-solid" type="submit">ENTRAR</button>
        <a class="painel-btn-ghost" href="./">← VOLTAR AO PORTFÓLIO</a>
      </form>
    </div>`;
  }

  function renderLoading() {
    return `<div class="painel-gate"><p class="painel-hint" role="status">Carregando…</p></div>`;
  }

  function renderError() {
    return `
    <div class="painel-gate">
      <div class="painel-gate-box">
        <div class="painel-kicker">◆ PAINEL</div>
        <h1 class="painel-gate-title">Não foi possível carregar</h1>
        <p class="painel-error" role="alert">${esc(state.loadError)}</p>
        <button class="painel-btn-solid" type="button" data-act="retry">TENTAR DE NOVO</button>
        <button class="painel-btn-ghost" type="button" data-act="logout">SAIR</button>
      </div>
    </div>`;
  }

  function renderEditor() {
    const navLinks = [['personal', 'Dados pessoais'], ...SECTIONS.map((s) => [s.key, s.title]), ['history', 'Histórico']]
      .map(([id, label]) => `<a href="#sec-${id}">${esc(label)}</a>`).join('');
    return `
    <header class="painel-head">
      <div class="painel-head-text">
        <div class="painel-kicker">◆ PAINEL</div>
        <h1 class="painel-title">Conteúdo do portfólio</h1>
        <p class="painel-status" aria-live="polite">${renderStatus()}</p>
      </div>
      <div class="painel-actions">
        <button class="painel-btn painel-btn-primary" type="button" data-act="save">${state.saving ? 'SALVANDO…' : 'SALVAR'}</button>
        <button class="painel-btn painel-btn-outline" type="button" data-act="discard">DESCARTAR ALTERAÇÕES</button>
        <button class="painel-btn painel-btn-outline" type="button" data-act="copy">COPIAR PORTFOLIO_DATA</button>
        <a class="painel-btn painel-btn-outline" href="./" target="_blank" rel="noopener">VER SITE ↗</a>
        <button class="painel-btn painel-btn-muted" type="button" data-act="logout">SAIR</button>
      </div>
      <nav class="painel-nav" aria-label="Seções do painel">${navLinks}</nav>
    </header>
    ${renderErrorSummary()}
    <section class="painel-section" id="sec-personal">
      <h2 class="painel-section-title">▸ DADOS PESSOAIS</h2>
      <div class="painel-fields">${PERSONAL_FIELDS.map((f) => renderField(f, 'personal.', state.draft.personal[f.key])).join('')}</div>
    </section>
    ${SECTIONS.map(renderSection).join('')}
    <section class="painel-section" id="sec-history">
      <h2 class="painel-section-title">▸ HISTÓRICO</h2>
      <p class="painel-hint">Cada vez que você salva, a versão anterior fica guardada aqui (até 50). Carregar uma versão só muda o formulário; o site só muda quando você clicar em SALVAR.</p>
      <div id="historyList">${renderHistory()}</div>
    </section>`;
  }

  function renderStatus() {
    const dirty = isDirty();
    return `${dirty ? '<span class="painel-dirty">● Alterações não salvas</span>' : 'Tudo salvo'} · Última publicação: ${esc(formatDate(state.updatedAt))}`;
  }

  function renderErrorSummary() {
    if (!state.errors.length) return '';
    const n = state.errors.length;
    return `
    <div class="painel-errors" role="alert" tabindex="-1">
      <p>Nada foi salvo. Corrija ${n === 1 ? 'o problema' : `os ${n} problemas`} abaixo e clique em SALVAR de novo:</p>
      <ul>${state.errors.map((e) => `<li>${e.path
        ? `<button type="button" data-act="goto-error" data-path="${esc(e.path)}">${esc(e.label)}</button>`
        : esc(e.label)}</li>`).join('')}</ul>
    </div>`;
  }

  function renderSection(sec) {
    const items = state.draft[sec.key];
    return `
    <section class="painel-section" id="sec-${sec.key}">
      <div class="painel-section-head">
        <h2 class="painel-section-title">▸ ${esc(sec.title.toUpperCase())}</h2>
        <button class="painel-btn-sm" type="button" data-act="add-item" data-section="${sec.key}">+ ADICIONAR ${esc(sec.itemName.toUpperCase())}</button>
      </div>
      <div class="painel-items">
        ${items.length ? items.map((item, i) => renderItem(sec, item, i, items.length)).join('')
          : `<p class="painel-hint">Nenhum item. Use "+ ADICIONAR ${esc(sec.itemName.toUpperCase())}".</p>`}
      </div>
    </section>`;
  }

  function renderItem(sec, item, i, total) {
    const open = openItems.has(item);
    const bodyId = `item-${sec.key}-${i}`;
    const name = sec.summary(item) || `(${sec.itemName} sem título)`;
    return `
    <div class="painel-item" data-section="${sec.key}" data-index="${i}">
      <div class="painel-item-head">
        <button class="painel-item-toggle" type="button" data-act="toggle-item" aria-expanded="${open}" aria-controls="${bodyId}">
          <span class="painel-item-n">${pad(i + 1)}</span>
          <span class="painel-item-title">${esc(name)}</span>
          <span class="painel-item-chev" aria-hidden="true">${open ? '−' : '+'}</span>
        </button>
        <div class="painel-item-tools">
          <button class="painel-btn-sm" type="button" data-act="move" data-dir="-1" ${i === 0 ? 'disabled' : ''} aria-label="Mover ${esc(name)} para cima">↑</button>
          <button class="painel-btn-sm" type="button" data-act="move" data-dir="1" ${i === total - 1 ? 'disabled' : ''} aria-label="Mover ${esc(name)} para baixo">↓</button>
          <button class="painel-btn-sm painel-btn-danger" type="button" data-act="remove-item" aria-label="Remover ${esc(name)}">REMOVER</button>
        </div>
      </div>
      <div class="painel-item-body" id="${bodyId}" ${open ? '' : 'hidden'}>
        <div class="painel-fields">${sec.fields.map((f) => renderField(f, `${sec.key}.${i}.`, item[f.key])).join('')}</div>
      </div>
    </div>`;
  }

  function renderField(f, base, value) {
    const path = base + f.key;
    const req = f.required ? ' <span class="painel-req" title="obrigatório">*</span>' : '';
    const input = (p, v, kind, extra = '') => {
      const common = `class="painel-input" id="${fieldId(p)}" data-path="${esc(p)}" data-kind="${kind}" ${extra}`;
      if (kind === 'area') return `<textarea ${common} rows="${f.rows || 4}">${esc(v)}</textarea>`;
      const type = { url: 'url', email: 'email', number: 'text' }[kind] || 'text';
      const mode = kind === 'number' ? 'inputmode="decimal"' : '';
      return `<input ${common} type="${type}" ${mode} value="${esc(v)}">`;
    };
    const reqAttr = f.required ? 'aria-required="true"' : '';

    switch (f.kind) {
      case 'i18n': case 'i18n-area': case 'i18n-list': {
        const kind = f.kind === 'i18n-area' ? 'area' : f.kind === 'i18n-list' ? 'list' : 'text';
        const val = (lang) => (f.kind === 'i18n-list' ? value[lang].join(', ') : value[lang]);
        return `
        <fieldset class="painel-field span-full painel-i18n">
          <legend class="painel-label">${esc(f.label)}${req}</legend>
          <div class="painel-pair">
            <div class="painel-lang"><label for="${fieldId(path + '.pt')}">PT</label>${input(path + '.pt', val('pt'), kind, reqAttr)}</div>
            <div class="painel-lang"><label for="${fieldId(path + '.en')}">EN</label>${input(path + '.en', val('en'), kind)}</div>
          </div>
        </fieldset>`;
      }
      case 'links': {
        const rows = value.map((l, i) => `
          <div class="painel-link-row">
            <div class="painel-lang"><label for="${fieldId(`${path}.${i}.label`)}">NOME</label>${input(`${path}.${i}.label`, l.label, 'text')}</div>
            <div class="painel-lang painel-link-url"><label for="${fieldId(`${path}.${i}.url`)}">ENDEREÇO</label>${input(`${path}.${i}.url`, l.url, 'url', 'placeholder="https://"')}</div>
            <button class="painel-btn-sm painel-btn-danger" type="button" data-act="remove-link" data-path="${esc(path)}" data-link="${i}" aria-label="Remover link ${i + 1}">✕</button>
          </div>`).join('');
        return `
        <fieldset class="painel-field span-full painel-i18n">
          <legend class="painel-label">${esc(f.label)}</legend>
          ${rows || '<p class="painel-hint">Nenhum link.</p>'}
          <div><button class="painel-btn-sm" type="button" data-act="add-link" data-path="${esc(path)}">+ ADICIONAR LINK</button></div>
        </fieldset>`;
      }
      default: {
        const kind = f.kind === 'list' ? 'list' : f.kind;
        const v = f.kind === 'list' ? value.join(', ') : value;
        return `
        <div class="painel-field ${f.kind === 'list' ? 'span-full' : ''}">
          <label class="painel-label" for="${fieldId(path)}">${esc(f.label)}${req}</label>
          ${input(path, v, kind, reqAttr)}
        </div>`;
      }
    }
  }

  function renderHistory() {
    if (state.history === null) return '<p class="painel-error">Não foi possível carregar o histórico.</p>';
    if (!state.history.length) return '<p class="painel-hint">Nenhuma versão anterior ainda.</p>';
    return `<ul class="painel-history">${state.history.map((h) => `
      <li><span>${esc(formatDate(h.saved_at))}</span>
        <button class="painel-btn-sm" type="button" data-act="load-version" data-id="${esc(h.id)}">CARREGAR ESTA VERSÃO</button></li>`).join('')}
    </ul>`;
  }

  function markErrors() {
    for (const e of state.errors) {
      const el = e.path && root.querySelector(`[data-path="${CSS.escape(e.path)}"]`);
      if (el) el.setAttribute('aria-invalid', 'true');
    }
  }

  function updateStatus() {
    const status = root.querySelector('.painel-status');
    if (status) status.innerHTML = renderStatus();
  }

  let toastTimer;
  function showToast(msg) {
    const toastRoot = document.getElementById('toastRoot');
    toastRoot.innerHTML = `<div class="toast" role="status">${esc(msg)}</div>`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastRoot.innerHTML = ''; }, 4500);
  }

  // ────────────────────────────────────────────────────────────────────────
  // Loading, saving, history
  // ────────────────────────────────────────────────────────────────────────
  const isAuthError = (err) => err.message === 'sessão encerrada' || err.message === 'sessão expirada' || err.status === 401;

  function backToLogin(message) {
    state.screen = 'login';
    state.loginError = message;
    render('#loginPass');
  }

  function setSaved(row) {
    state.saved = normalize(row.data);
    state.savedJson = canonical(clean(state.saved));
    state.updatedAt = row.updated_at;
  }

  async function openEditor() {
    state.screen = 'loading';
    render();
    // remembered so the login form is prefilled if this session expires later
    const session = authSession();
    if (session && session.email) state.loginEmail = session.email;
    try {
      const token = await authToken();
      setSaved(await fetchPortfolioContent({ token }));
      // after a re-login, keep the unsaved edits
      if (!state.draft) state.draft = normalize(clone(state.saved));
      state.screen = 'editor';
      render();
      loadHistory();
    } catch (err) {
      if (isAuthError(err)) return backToLogin('Sua sessão expirou. Entre de novo; as alterações não salvas continuam aqui.');
      state.screen = 'error';
      state.loadError = err.message;
      render();
    }
  }

  async function save() {
    if (state.saving) return;
    if (!isDirty()) { showToast('Nada para salvar: o conteúdo é igual ao publicado.'); return; }
    const data = clean(state.draft);
    state.errors = validate(data);
    if (state.errors.length) {
      for (const e of state.errors) openItemAt(e.path);
      render('.painel-errors');
      return;
    }
    state.saving = true;
    render();
    try {
      const token = await authToken();
      const rows = await supabaseFetch('/rest/v1/portfolio_content?id=eq.1&select=data,updated_at', {
        method: 'PATCH', body: { data }, token, prefer: 'return=representation',
      });
      // RLS turns an update by someone who is not the owner into "0 rows changed"
      if (!rows || !rows.length) {
        throw new Error('o Supabase não aplicou a alteração. Este usuário não é o dono do portfólio: confira o UUID em is_portfolio_owner() (supabase/schema.sql).');
      }
      setSaved(rows[0]);
      showToast('Salvo. O site já mostra a nova versão.');
      loadHistory();
    } catch (err) {
      if (isAuthError(err)) {
        state.saving = false;
        return backToLogin('Sua sessão expirou. Entre de novo e clique em SALVAR; as alterações continuam aqui.');
      }
      showToast('Não foi possível salvar: ' + err.message);
    } finally {
      state.saving = false;
      if (state.screen === 'editor') render();
    }
  }

  async function loadHistory() {
    try {
      const token = await authToken();
      state.history = await supabaseFetch('/rest/v1/portfolio_history?select=id,saved_at&order=id.desc&limit=50', { token });
    } catch (err) {
      state.history = null;
    }
    const list = root.querySelector('#historyList');
    if (list) list.innerHTML = renderHistory();
  }

  async function loadVersion(id) {
    if (isDirty() && !window.confirm('Carregar esta versão descarta as alterações não salvas. Continuar?')) return;
    try {
      const token = await authToken();
      const rows = await supabaseFetch(`/rest/v1/portfolio_history?id=eq.${Number(id)}&select=data,saved_at`, { token });
      if (!rows || !rows.length) throw new Error('versão não encontrada');
      state.draft = normalize(rows[0].data);
      state.errors = [];
      render();
      showToast(`Versão de ${formatDate(rows[0].saved_at)} carregada. Revise e clique em SALVAR para publicá-la.`);
    } catch (err) {
      if (isAuthError(err)) return backToLogin('Sua sessão expirou. Entre de novo.');
      showToast('Não foi possível carregar a versão: ' + err.message);
    }
  }

  // readable key order for the PORTFOLIO_DATA copy (Postgres returns jsonb keys reordered)
  function ordered(data) {
    const pick = (obj, keys) => {
      const out = {};
      for (const k of [...keys, ...Object.keys(obj)]) {
        if (!(k in obj) || k in out) continue;
        const v = obj[k];
        out[k] = isObj(v) && 'pt' in v ? pick(v, ['pt', 'en']) : v;
      }
      return out;
    };
    const out = { personal: pick(data.personal, PERSONAL_FIELDS.map((f) => f.key)) };
    for (const sec of SECTIONS) out[sec.key] = data[sec.key].map((item) => pick(item, ['id', ...sec.fields.map((f) => f.key)]));
    return pick(out, ['personal', 'techStack', 'roadmap', 'projects', 'certifications', 'career']);
  }

  function copyPortfolioData() {
    const block = '// Gerado pelo Painel — cole no lugar do PORTFOLIO_DATA em js/app.js\nconst PORTFOLIO_DATA = '
      + JSON.stringify(ordered(clean(state.saved)), null, 2) + ';\n';
    if (!navigator.clipboard) { showToast('Este navegador não permite copiar automaticamente aqui.'); return; }
    navigator.clipboard.writeText(block).then(
      () => showToast('PORTFOLIO_DATA (versão publicada) copiado. Cole em js/app.js para atualizar a reserva.'),
      () => showToast('Não foi possível copiar automaticamente.'),
    );
  }

  // ────────────────────────────────────────────────────────────────────────
  // Form actions
  // ────────────────────────────────────────────────────────────────────────
  function itemFromEl(el) {
    const box = el.closest('.painel-item');
    if (!box) return null;
    const sec = SECTIONS.find((s) => s.key === box.dataset.section);
    const index = Number(box.dataset.index);
    return { box, sec, index, item: state.draft[sec.key][index] };
  }

  // open the item that holds a field path such as "projects.2.links.0.url"
  function openItemAt(path) {
    const [key, index] = path.split('.');
    const list = state.draft[key];
    if (Array.isArray(list) && list[Number(index)]) openItems.add(list[Number(index)]);
  }

  function newId(list) {
    return list.reduce((max, x) => Math.max(max, Number(x.id) || 0), 0) + 1;
  }

  function addItem(sec) {
    const list = state.draft[sec.key];
    const item = normalizeObject(sec.fields, sec.ids ? { id: newId(list) } : {});
    list.push(item);
    openItems.add(item);
    render(`.painel-item[data-section="${sec.key}"][data-index="${list.length - 1}"] .painel-input`);
    updateStatus();
  }

  function moveItem(sec, index, dir) {
    const list = state.draft[sec.key];
    const to = index + dir;
    if (to < 0 || to >= list.length) return;
    [list[index], list[to]] = [list[to], list[index]];
    // keep focus on the same arrow so the item can be moved again with the keyboard
    const sel = `.painel-item[data-section="${sec.key}"][data-index="${to}"]`;
    const canRepeat = to + dir >= 0 && to + dir < list.length;
    render(`${sel} [data-act="move"][data-dir="${canRepeat ? dir : -dir}"]`);
    updateStatus();
  }

  function removeItem(sec, index) {
    const list = state.draft[sec.key];
    const name = sec.summary(list[index]) || sec.itemName;
    if (!window.confirm(`Remover "${name}"? A remoção só vale para o site quando você clicar em SALVAR.`)) return;
    list.splice(index, 1);
    render(`[data-act="add-item"][data-section="${sec.key}"]`);
    updateStatus();
  }

  function toggleItem(ctx) {
    const open = !openItems.has(ctx.item);
    if (open) openItems.add(ctx.item); else openItems.delete(ctx.item);
    const toggle = ctx.box.querySelector('.painel-item-toggle');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.painel-item-chev').textContent = open ? '−' : '+';
    ctx.box.querySelector('.painel-item-body').hidden = !open;
  }

  function gotoError(path) {
    openItemAt(path);
    let el = root.querySelector(`[data-path="${CSS.escape(path)}"]`);
    if (!el || el.closest('[hidden]')) {
      render();
      el = root.querySelector(`[data-path="${CSS.escape(path)}"]`);
    }
    if (el) {
      el.scrollIntoView({ block: 'center' });
      el.focus({ preventScroll: true });
    }
  }

  // ────────────────────────────────────────────────────────────────────────
  // Events
  // ────────────────────────────────────────────────────────────────────────
  root.addEventListener('input', (e) => {
    const el = e.target;
    const path = el.dataset.path;
    if (!path || !state.draft) return;
    setPath(state.draft, path, el.dataset.kind === 'list' ? splitList(el.value) : el.value);
    el.removeAttribute('aria-invalid');
    const ctx = itemFromEl(el);
    if (ctx) {
      ctx.box.querySelector('.painel-item-title').textContent = ctx.sec.summary(ctx.item) || `(${ctx.sec.itemName} sem título)`;
    }
    updateStatus();
  });

  root.addEventListener('submit', async (e) => {
    if (e.target.dataset.form !== 'login') return;
    e.preventDefault();
    const form = e.target;
    const button = form.querySelector('button[type="submit"]');
    state.loginEmail = form.email.value.trim();
    button.disabled = true;
    button.textContent = 'ENTRANDO…';
    try {
      await authLogin(state.loginEmail, form.password.value);
      state.loginError = '';
      openEditor();
    } catch (err) {
      state.loginError = err.message;
      render('#loginPass');
    }
  });

  root.addEventListener('click', (e) => {
    const target = e.target.closest('[data-act]');
    if (!target) return;
    const act = target.dataset.act;
    const ctx = itemFromEl(target);
    switch (act) {
      case 'save': save(); break;
      case 'discard':
        if (!isDirty()) { showToast('Não há alterações para descartar.'); break; }
        if (!window.confirm('Descartar todas as alterações não salvas?')) break;
        state.draft = normalize(clone(state.saved));
        state.errors = [];
        render();
        break;
      case 'copy': copyPortfolioData(); break;
      case 'logout':
        if (isDirty() && !window.confirm('Sair descarta as alterações não salvas. Continuar?')) break;
        authLogout();
        state.draft = null;
        state.errors = [];
        state.loginError = '';
        state.screen = 'login';
        render('#loginEmail');
        break;
      case 'retry': openEditor(); break;
      case 'add-item': addItem(SECTIONS.find((s) => s.key === target.dataset.section)); break;
      case 'move': moveItem(ctx.sec, ctx.index, Number(target.dataset.dir)); break;
      case 'remove-item': removeItem(ctx.sec, ctx.index); break;
      case 'toggle-item': toggleItem(ctx); break;
      case 'add-link': {
        const path = target.dataset.path;
        const links = getPath(state.draft, path) || [];
        links.push({ label: '', url: '' });
        setPath(state.draft, path, links);
        render(`[data-path="${CSS.escape(`${path}.${links.length - 1}.label`)}"]`);
        updateStatus();
        break;
      }
      case 'remove-link': {
        const path = target.dataset.path;
        getPath(state.draft, path).splice(Number(target.dataset.link), 1);
        render(`[data-act="add-link"][data-path="${CSS.escape(path)}"]`);
        updateStatus();
        break;
      }
      case 'goto-error': gotoError(target.dataset.path); break;
      case 'load-version': loadVersion(target.dataset.id); break;
    }
  });

  window.addEventListener('beforeunload', (e) => {
    if (isDirty()) e.preventDefault();
  });

  // ────────────────────────────────────────────────────────────────────────
  // Init
  // ────────────────────────────────────────────────────────────────────────
  if (!supabaseConfigured()) {
    state.screen = 'setup';
    render();
  } else if (!authSession()) {
    state.screen = 'login';
    render('#loginEmail');
  } else {
    openEditor();
  }
})();
