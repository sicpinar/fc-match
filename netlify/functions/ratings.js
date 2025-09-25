// Bewertungen: speichert Review & aktualisiert Team-Score
import { getStore } from '@netlify/blobs'

export async function handler(event, context) {
  const store = getStore({ name: 'ratings', consistency: 'strong' })
  
  if (event.httpMethod === 'POST') {
    try {
      const { teamId, rating, comment } = JSON.parse(event.body)
      const ratingId = `rating_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      const ratingData = {
        id: ratingId,
        teamId,
        rating,
        comment,
        createdAt: new Date().toISOString()
      }
      
      await store.set(ratingId, JSON.stringify(ratingData))
      
      return {
        statusCode: 201,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ratingData)
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message })
      }
    }
  }
  
  return { statusCode: 405, body: 'Method not allowed' }
}
