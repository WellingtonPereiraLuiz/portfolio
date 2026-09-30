// Supabase connection shared by the public site and the panel.
//
// A URL do projeto e a chave pública ("publishable" / "anon") podem ficar no
// código: foram feitas para isso. A chave pública só enxerga o que as
// políticas de RLS liberam (ver supabase/schema.sql). A service_role key dá
// acesso total ao banco e NUNCA entra em nenhum arquivo do site.
//
// Enquanto os dois valores estiverem vazios, o site usa o PORTFOLIO_DATA do
// js/app.js e o painel mostra como configurar.
const SUPABASE_URL = '';       // ex.: 'https://abcdefghijkl.supabase.co'
const SUPABASE_ANON_KEY = '';  // ex.: 'sb_publishable_...'

function supabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

// Calls the Supabase HTTP API (REST or Auth). `token` is the signed-in user's
// access token; without it the request runs as the anonymous visitor.
async function supabaseFetch(path, { method = 'GET', body, token, prefer, timeoutMs = 10000 } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const headers = { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + (token || SUPABASE_ANON_KEY) };
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (prefer) headers.Prefer = prefer;
    const resp = await fetch(SUPABASE_URL + path, {
      method, headers, signal: ctrl.signal,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const text = await resp.text();
    let json = null;
    try { json = text ? JSON.parse(text) : null; } catch (e) {}
    if (!resp.ok) {
      const err = new Error((json && (json.msg || json.message || json.error_description)) || `HTTP ${resp.status}`);
      err.status = resp.status;
      err.body = json;
      throw err;
    }
    return json;
  } finally {
    clearTimeout(timer);
  }
}

// Reads the portfolio row ({ data, updated_at }). Public: RLS allows anyone to read it.
async function fetchPortfolioContent({ token, timeoutMs } = {}) {
  const rows = await supabaseFetch('/rest/v1/portfolio_content?id=eq.1&select=data,updated_at', { token, timeoutMs });
  if (!rows || !rows.length) throw new Error('a linha de conteúdo não existe (rode supabase/seed.sql)');
  return rows[0];
}
