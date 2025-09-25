// src/lib/auth.js

// Minimal-Auth fürs MVP: zeigt die App ohne echtes Backend an.
// Später ersetzen wir das durch die echte Magic-Link-Logik.

export async function checkAuth() {
  // Falls ein Magic-Link-Token in der URL steht, speichern wir einen "Login"
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      const user = { id: 'magic-link', email: 'trainer@example.com', token };
      localStorage.setItem('fc_user', JSON.stringify(user));
      // URL aufräumen (ohne ?token)
      window.history.replaceState({}, '', window.location.pathname);
    }
    // Bereits gespeicherten Nutzer zurückgeben (oder Demo-User)
    const raw = localStorage.getItem('fc_user');
    if (raw) return JSON.parse(raw);
  }

  // Demo-User, damit Suche/Navigation sichtbar ist
  return { id: 'demo-user', email: 'demo@example.com' };
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('fc_user');
  }
}
