// Panel login with Supabase Auth (e-mail + password), called over plain fetch like
// the rest of the site. The session (access + refresh token) lives in this
// browser's localStorage and is only ever sent to Supabase itself.
const AUTH_KEY = 'wl_painel_sessao';
let authMemorySession = null;

function authSaveSession(resp) {
  const session = {
    access_token: resp.access_token,
    refresh_token: resp.refresh_token,
    expires_at: Date.now() + resp.expires_in * 1000,
    email: resp.user && resp.user.email,
  };
  // storage can be blocked (private mode); the session then lasts until the tab closes
  authMemorySession = session;
  try { localStorage.setItem(AUTH_KEY, JSON.stringify(session)); } catch (e) {}
  return session;
}

function authSession() {
  if (authMemorySession) return authMemorySession;
  try { authMemorySession = JSON.parse(localStorage.getItem(AUTH_KEY)); } catch (e) {}
  return authMemorySession;
}

function authClearSession() {
  authMemorySession = null;
  try { localStorage.removeItem(AUTH_KEY); } catch (e) {}
}

async function authLogin(email, password) {
  try {
    return authSaveSession(await supabaseFetch('/auth/v1/token?grant_type=password', {
      method: 'POST', body: { email, password },
    }));
  } catch (err) {
    const code = err.body && err.body.error_code;
    if (code === 'invalid_credentials') throw new Error('E-mail ou senha incorretos.');
    if (code === 'email_not_confirmed') throw new Error('Este e-mail ainda não foi confirmado no Supabase.');
    if (!err.status) throw new Error('Sem conexão com o Supabase. Tente de novo.');
    throw new Error('Não foi possível entrar: ' + err.message);
  }
}

function authLogout() {
  const session = authSession();
  authClearSession();
  // revokes the refresh token; the local session is already gone if this fails
  if (session) supabaseFetch('/auth/v1/logout', { method: 'POST', token: session.access_token }).catch(() => {});
}

// Returns a valid access token, trading the refresh token for a new one when the
// current token (valid for 1 hour) is about to expire. Throws when signed out.
async function authToken() {
  const session = authSession();
  if (!session) throw new Error('sessão encerrada');
  if (session.expires_at - Date.now() > 60 * 1000) return session.access_token;
  try {
    const resp = await supabaseFetch('/auth/v1/token?grant_type=refresh_token', {
      method: 'POST', body: { refresh_token: session.refresh_token },
    });
    return authSaveSession(resp).access_token;
  } catch (err) {
    // a rejected refresh token means signing in again; a network error does not
    if (err.status >= 400 && err.status < 500) {
      authClearSession();
      throw new Error('sessão expirada');
    }
    throw new Error('Sem conexão com o Supabase. Tente de novo.');
  }
}
