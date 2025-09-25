
export async function handler(event, context){
  const method = event.httpMethod
  if(method === 'GET'){
    const params = new URLSearchParams(event.rawQuery || '')
    const matchId = params.get('matchId')
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify([{id:'m1',from:'team_001',text:'Hi, Lust auf ein Spiel?',at:new Date().toISOString()}]) }
  }
  if(method === 'POST'){
    const body = JSON.parse(event.body || '{}')
    return { statusCode: 201, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: true, ...body }) }
  }
  return { statusCode: 405, body: 'Method not allowed' }
}
