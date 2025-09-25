// Bewertungen: speichert Review & aktualisiert Team-Score
import { getStore } from '@netlify/blobs'
const ratings = getStore({ name: 'ratings', consistency: 'strong' })
const teams = getStore({ name: 'teams', consistency: 'strong' })

export async function handler(event){
  if (event.httpMethod !== 'POST') return json(405, 'Method not allowed')
  const { teamId, rating, comment } = JSON.parse(event.body || '{}')
  if (!teamId || !rating) return json(400, { error:'teamId & rating required' })

  const id = `rating_${teamId}_${Date.now()}_${Math.random().toString(36).slice(2,5)}`
  const review = { id, teamId, rating: Number(rating), comment: comment || '', at: new Date().toISOString() }
  await ratings.setJSON(id, review)

  const t = await teams.getJSON(teamId)
  if (t){
    const count = Number(t.ratingCount || 0) + 1
    const avg = Number(t.rating || 0)
    const newAvg = Math.round(((avg * (count-1) + Number(rating)) / count) * 10) / 10
    await teams.setJSON(teamId, { ...t, rating: newAvg, ratingCount: count })
  }
  return json(201, review)
}
const json=(s,d)=>({statusCode:s,headers:{'Content-Type':'application/json'},body:JSON.stringify(d)})
