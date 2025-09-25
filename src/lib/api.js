// src/lib/api.js
// Zentrale API-Helpers für Frontend ⇄ Netlify Functions

const API_BASE = '/api'

// ------------------------------
// Low-level Fetch Helper
// ------------------------------
async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include',
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`API Error ${res.status}: ${res.statusText} ${text ? `- ${text}` : ''}`)
  }
  return res.json()
}

// ------------------------------
// AUTH
// ------------------------------
export async function sendMagicLink(email, userData) {
  return fetchAPI('/auth-magic-link', {
    method: 'POST',
    body: JSON.stringify({ email, userData }),
  })
}

export async function verifyMagicLink(token) {
  return fetchAPI('/auth-verify', {
    method: 'POST',
    body: JSON.stringify({ token }),
  })
}

// ------------------------------
// TEAMS (Profile)
// ------------------------------
export async function getTeams() {
  return fetchAPI('/teams-crud') // GET → Liste aller Teams (Blobs)
}

export async function createTeam(teamData) {
  return fetchAPI('/teams-crud', {
    method: 'POST',
    body: JSON.stringify(teamData),
  })
}

export async function updateTeam(teamId, updates) {
  return fetchAPI('/teams-crud', {
    method: 'PUT',
    body: JSON.stringify({ teamId, ...updates }),
  })
}

export async function deleteTeam(teamId) {
  return fetchAPI('/teams-crud', {
    method: 'DELETE',
    body: JSON.stringify({ teamId }),
  })
}

// Aktuellen „User“ aus localStorage (wird in auth.js gesetzt)
export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('fc_user')) || null
  } catch {
    return null
  }
}

// Mein Team aus Blobs finden (per E-Mail, fallback DFB-Nr.)
export async function getMyTeam() {
  const user = getCurrentUser()
  if (!user?.email) return null
  const teams = await getTeams()
  let team = teams.find(t => (t.email || '').toLowerCase() === user.email.toLowerCase())
  if (!team && user.dfbNumber) team = teams.find(t => t.dfbNumber === user.dfbNumber)
  return team || null
}

// Upsert: existiert Team → update, sonst → create
export async function saveMyTeam(data) {
  const existing = await getMyTeam()
  if (existing) {
    return updateTeam(existing.id, data)
  }
  return createTeam(data)
}

// ------------------------------
// GAMES
// ------------------------------
export async function searchGames(filters) {
  const params = new URLSearchParams(filters)
  return fetchAPI(`/games-crud?${params.toString()}`)
}

export async function createGame(gameData) {
  return fetchAPI('/games-crud', {
    method: 'POST',
    body: JSON.stringify(gameData),
  })
}

// ------------------------------
// MATCHES
// ------------------------------
export async function createLike(gameId, teamId, opponentTeamId) {
  // teamId/opponentTeamId sind optional – die Function kann sie auch ermitteln,
  // aber mitzugeben ist sauberer, wenn bekannt.
  return fetchAPI('/matches', {
    method: 'POST',
    body: JSON.stringify({ action: 'like', gameId, teamId, opponentTeamId }),
  })
}

export async function getMatches(teamId) {
  const qs = teamId ? `?teamId=${encodeURIComponent(teamId)}` : ''
  return fetchAPI(`/matches${qs}`)
}

// ------------------------------
// CHAT
// ------------------------------
export async function sendMessage(matchId, message, from) {
  return fetchAPI('/chat', {
    method: 'POST',
    body: JSON.stringify({ matchId, text: message, from }),
  })
}

export async function getMessages(matchId) {
  return fetchAPI(`/chat?matchId=${encodeURIComponent(matchId)}`)
}

// ------------------------------
// RATINGS
// ------------------------------
export async function createRating(teamId, rating, comment) {
  return fetchAPI('/ratings', {
    method: 'POST',
    body: JSON.stringify({ teamId, rating, comment }),
  })
}
