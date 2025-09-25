export async function checkAuth() {
  try {
    // Check cookie or localStorage
    const token = localStorage.getItem('fc_match_token')
    if (!token) return null
    
    // Decode token
    const decoded = JSON.parse(atob(token))
    if (decoded.exp < Date.now()) {
      localStorage.removeItem('fc_match_token')
      return null
    }
    
    return decoded
  } catch {
    return null
  }
}

export async function sendMagicLink(email, userData) {
  const response = await fetch('/api/auth-magic-link', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, userData })
  })
  
  if (!response.ok) throw new Error('Failed to send magic link')
  return response.json()
}

export async function verifyMagicLink(token) {
  const response = await fetch('/api/auth-verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  })
  
  if (!response.ok) throw new Error('Invalid token')
  const data = await response.json()
  
  // Store token locally
  localStorage.setItem('fc_match_token', token)
  return data.user
}
