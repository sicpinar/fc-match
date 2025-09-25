
export async function handler(event, context){
  const method = event.httpMethod
  if(method === 'GET'){
    // MVP: keine echte Speicherung – gib leere Liste zurück
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify([]) }
  }
  if(method === 'POST'){
    const body = JSON.parse(event.body || '{}')
    // antworte, als wäre ein Match/Like angelegt
    return { statusCode: 201, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: true, ...body }) }
  }
  return { statusCode: 405, body: 'Method not allowed' }
}
