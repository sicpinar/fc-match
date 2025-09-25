
import { sampleTeams } from './data.mjs'

export async function handler(event, context){
  const method = event.httpMethod
  if(method === 'GET'){
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sampleTeams) }
  }
  if(method === 'POST'){
    const body = JSON.parse(event.body || '{}')
    const team = { id:`team_${Date.now()}`, verificationLevel:'bronze', rating:null, ratingCount:0, ...body }
    return { statusCode: 201, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(team) }
  }
  return { statusCode: 405, body: 'Method not allowed' }
}
