// Persistente Teams-API
import { getStore } from '@netlify/blobs'
const store = getStore({ name: 'teams', consistency: 'strong' })

async function seedIfEmpty() {
  const first = await store.list().next()
  if (!first || first.done) {
    const teams = [
      { id:'team_001', dfbNumber:'1234567', clubName:'FC Fortuna Düsseldorf', teamName:'U12 1. Mannschaft', ageGroup:'U12', plz:'40476', verificationLevel:'gold', rating:4.5, ratingCount:12, trainerName:'Thomas Müller', email:'trainer@fortuna-duesseldorf.de' },
      { id:'team_002', dfbNumber:'2345678', clubName:'SV Wersten 04', teamName:'U10', ageGroup:'U10', plz:'40591', verificationLevel:'silver', rating:4.2, ratingCount:8, trainerName:'Klaus Schmidt', email:'klaus@sv-wersten.de' }
    ]
    for (const t of teams) await store.setJSON(t.id, t)
  }
}
async function all() {
  const arr=[]
  for await (const k of store.list()) {
    const t = await store.getJSON(k.key)
    if (t) arr.push(t)
  }
  return arr
}

export async function handler(event) {
  const method = event.httpMethod

  if (method === 'GET') {
    await seedIfEmpty()
    return json(200, await all())
  }

  if (method === 'POST') {
    const body = JSON.parse(event.body || '{}')
    const id = body.id || `team_${Date.now()}_${Math.random().toString(36).slice(2,7)}`
    const team = { id, verificationLevel:'bronze', rating:null, ratingCount:0, createdAt:new Date().toISOString(), ...body }
    await store.setJSON(id, team)
    return json(201, team)
  }

  if (method === 'PUT') {
    const { teamId, ...updates } = JSON.parse(event.body || '{}')
    const current = await store.getJSON(teamId)
    if (!current) return json(404, { error:'Team nicht gefunden' })
    const updated = { ...current, ...updates }
    await store.setJSON(teamId, updated)
    return json(200, updated)
  }

  if (method === 'DELETE') {
    const { teamId } = JSON.parse(event.body || '{}')
    await store.delete(teamId)
    return json(200, { ok:true })
  }

  return json(405, 'Method not allowed')
}
const json = (s,d)=>({ statusCode:s, headers:{'Content-Type':'application/json'}, body:JSON.stringify(d) })
