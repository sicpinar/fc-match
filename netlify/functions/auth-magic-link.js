// Projekt A: Magic Link Authentication
import jwt from 'jsonwebtoken'

export async function handler(event, context) {
  // Nur POST erlauben
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }
  
  try {
    const { email, userData } = JSON.parse(event.body)
    
    // Generiere Token
    const token = jwt.sign(
      { email, ...userData },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    )
    
    // Erstelle Magic Link
    const magicLink = `${process.env.SITE_URL}/verify?token=${token}`
    
    // TODO: E-Mail senden mit echtem Service
    // Für MVP: Console.log
    console.log(`Magic Link für ${email}: ${magicLink}`)
    
    // Simuliere E-Mail-Versand
    // await sendEmail(email, magicLink)
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Magic Link gesendet' })
    }
    
    // EXT-HOOK: SMS-Verification für Projekt B
    // EXT-HOOK: 2FA für Projekt C
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
