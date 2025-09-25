// Projekt A: Magic Link Authentication
import jwt from 'jsonwebtoken'

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }
  
  try {
    const { email, userData } = JSON.parse(event.body)
    
    // Einfacher Token für MVP (ohne externe Dependencies)
    const token = Buffer.from(JSON.stringify({ 
      email, 
      ...userData,
      exp: Date.now() + 900000 // 15 Minuten
    })).toString('base64')
    
    const magicLink = `${process.env.SITE_URL || 'http://localhost:5173'}/verify?token=${token}`
    
    console.log(`Magic Link für ${email}: ${magicLink}`)
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Magic Link gesendet' })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
