// Persistente Spiele-API (Netlify Blobs)
import { getStore } from '@netlify/blobs'

// Einfache Distanzberechnung direkt in der Function
function calculateDistance(plz1, plz2) {
  // Vereinfachte PLZ-Region-Map
  const getRegion = (plz) => {
    const region = plz.substring(0, 2)
    const regions = {
      '40': { lat: 51.23, lng: 6.78 },  // Düsseldorf
      '50': { lat: 50.94, lng: 6.96 },  // Köln
      '10': { lat: 52.52, lng: 13.40 }, // Berlin
      '80': { lat: 48.14, lng: 11.58 }, // München
    }
    return regions[region] || { lat: 51.0, lng: 9.0 }
  }
  
  const coord1 = getRegion(plz1)
  const coord2 = getRegion(plz2)
  
  const R = 6371
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180
  const dLng = (coord2.lng - coord1.lng) * Math.PI / 180
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return Math.round(R * c)
}

export async function handler(event, context) {
  const store = getStore({ name: 'games', consistency: 'strong' })
  
  if (event.httpMethod === 'GET') {
    try {
      const { plz, radius = '25', ageGroup } = event.queryStringParameters || {}
      
      const games = []
      const { blobs } = await store.list()
      
      for (const blob of blobs) {
        const data = await store.get(blob.key)
        if (data) {
          const game = JSON.parse(data)
          
          // Filter
          if (new Date(game.date) < new Date()) continue
          if (ageGroup && !game.allowedAgeGroups?.includes(ageGroup)) continue
          
          if (plz) {
            const distance = calculateDistance(plz, game.plz)
            if (distance <= parseInt(radius)) {
              games.push({ ...game, distance })
            }
          } else {
            games.push(game)
          }
        }
      }
      
      games.sort((a, b) => (a.distance || 0) - (b.distance || 0))
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(games)
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message })
      }
    }
  }
  
  if (event.httpMethod === 'POST') {
    try {
      const gameData = JSON.parse(event.body)
      const gameId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      const game = {
        id: gameId,
        ...gameData,
        likes: [],
        matches: [],
        status: 'open',
        createdAt: new Date().toISOString(),
      }
      
      await store.set(gameId, JSON.stringify(game))
      
      return {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(game)
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
