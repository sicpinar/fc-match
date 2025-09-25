// Persistente Teams-API
import { getStore } from '@netlify/blobs'

export async function handler(event, context) {
  const store = getStore({ name: 'teams', consistency: 'strong' })
  
  // GET: Liste Teams
  if (event.httpMethod === 'GET') {
    try {
      const teams = []
      const { blobs } = await store.list()
      
      for (const blob of blobs) {
        const data = await store.get(blob.key)
        if (data) teams.push(JSON.parse(data))
      }
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teams)
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message })
      }
    }
  }
  
  // POST: Erstelle Team
  if (event.httpMethod === 'POST') {
    try {
      const teamData = JSON.parse(event.body)
      const teamId = `team_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      const team = {
        id: teamId,
        ...teamData,
        verificationLevel: 'bronze',
        rating: null,
        ratingCount: 0,
        createdAt: new Date().toISOString(),
      }
      
      await store.set(teamId, JSON.stringify(team))
      
      return {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(team)
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
