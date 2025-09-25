export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }
  
  try {
    const { token } = JSON.parse(event.body)
    
    // Decode token
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
    
    // Check expiry
    if (decoded.exp < Date.now()) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Token expired' })
      }
    }
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `fc_match_auth=${token}; Path=/; HttpOnly; Max-Age=86400; SameSite=Strict`
      },
      body: JSON.stringify({ user: decoded })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
