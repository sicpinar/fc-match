
export async function handler(event, context){
  const method = event.httpMethod
  if(method === 'POST'){
    const body = JSON.parse(event.body || '{}')
    return { statusCode: 201, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: true, ...body }) }
  }
  return { statusCode: 405, body: 'Method not allowed' }
}
