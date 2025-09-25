import { getStore } from '@netlify/blobs'

export async function handler(event, context) {
  const store = getStore({ name: 'matches', consistency: 'strong' })
  
  if (event.httpMethod === 'POST') {
    try {
      const { action, gameId, teamId } = JSON.parse(event.body)
      
      if (action === 'like') {
        const matchId = `match_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const match = {
          id: matchId,
          gameId,
          teamId,
          status: 'pending',
          createdAt: new Date().toISOString()
        }
        
        await store.set(matchId, JSON.stringify(match))
        
        return {
          statusCode: 201,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(match)
        }
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
const json=(s,d)=>({statusCode:s,headers:{'Content-Type':'application/json'},body:JSON.stringify(d)})
