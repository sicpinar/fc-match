// Chat pro Match persistieren
import { getStore } from '@netlify/blobs'
const chatStore = getStore({ name: 'chat', consistency: 'strong' })

export async function handler(event){
  const method = event.httpMethod

  if (method === 'GET'){
    const { matchId } = event.queryStringParameters || {}
    if (!matchId) return json(400, { error:'matchId required' })
    const msgs=[]
    for await (const k of chatStore.list({ prefix: `${matchId}_` })){
      const m = await chatStore.getJSON(k.key)
      if (m) msgs.push(m)
    }
    msgs.sort((a,b)=> new Date(a.at)-new Date(b.at))
    return json(200, msgs)
  }

  if (method === 'POST'){
    const { matchId, from, text } = JSON.parse(event.body || '{}')
    if (!matchId || !text) return json(400, { error:'matchId & text required' })
    const id = `${matchId}_${Date.now()}_${Math.random().toString(36).slice(2,5)}`
    const msg = { id, matchId, from: from || 'unknown', text, at: new Date().toISOString() }
    await chatStore.setJSON(id, msg)
    return json(201, msg)
  }

  return json(405, 'Method not allowed')
}
const json=(s,d)=>({statusCode:s,headers:{'Content-Type':'application/json'},body:JSON.stringify(d)})
