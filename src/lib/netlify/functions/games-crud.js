
import { sampleGames } from './data.mjs'

export async function handler(event, context){
  const method = event.httpMethod
  if(method === 'GET'){
    const params = new URLSearchParams(event.rawQuery || '')
    const plz = params.get('plz')
    const radius = Number(params.get('radius') || 25)
    const ageGroup = params.get('ageGroup') || ''

    let results = sampleGames.filter(g => new Date(g.date) >= new Date())
    if (ageGroup) results = results.filter(g => g.allowedAgeGroups.includes(ageGroup) || g.ageGroup === ageGroup)
    if (plz) results = results.filter(g => g.distance <= radius) // demo: distance vorgegeben

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(results) }
  }

  if(method === 'POST'){
    const body = JSON.parse(event.body || '{}')
    const game = { id:`game_${Date.now()}`, ...body, status:'open', distance: 0 }
    // NOTE: MVP ohne Persistenz – nur Echo
    return { statusCode: 201, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(game) }
  }

  return { statusCode: 405, body: 'Method not allowed' }
}
