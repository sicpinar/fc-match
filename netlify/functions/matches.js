// Likes / Matches
import { getStore } from '@netlify/blobs'
const likesStore = getStore({ name: 'likes', consistency: 'strong' })
const matchStore = getStore({ name: 'matches', consistency: 'strong' })

export async function handler(event){
  const method = event.httpMethod

  if (method === 'GET'){
    const params = event.queryStringParameters || {}
    const teamId = params.teamId
    const list=[]
    for await (const k of matchStore.list()){
      const m = await matchStore.getJSON(k.key)
      if (!m) continue
      if (!teamId || m.teams?.includes(teamId)) list.push(m)
    }
    list.sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt))
    return json(200, list)
  }

  if (method === 'POST'){
    const body = JSON.parse(event.body || '{}')
    if (body.action === 'like'){
      const likeId = `like_${body.teamId || 'unknown'}_${body.gameId}`
      await likesStore.setJSON(likeId, { ...body, createdAt:new Date().toISOString() })
      // MVP: sofort Match zu demo-Zwecken
      const matchId = `match_${Date.now()}_${Math.random().toString(36).slice(2,6)}`
      const match = {
        id: matchId,
        gameId: body.gameId,
        teams: [body.teamId || 'unknown', body.opponentTeamId || 'unknown'],
        status: 'open',
        createdAt: new Date().toISOString()
      }
      await matchStore.setJSON(matchId, match)
      return json(201, match)
    }
    return json(400, { error:'Unknown action' })
  }

  return json(405, 'Method not allowed')
}
const json=(s,d)=>({statusCode:s,headers:{'Content-Type':'application/json'},body:JSON.stringify(d)})
