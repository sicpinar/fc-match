// Persistente Spiele-API (Netlify Blobs)
import { getStore } from '@netlify/blobs'

// --- einfache Distanzberechnung (PLZ-Regionen) ---
const REGIONS = {
  '01': { lat: 51.05, lng: 13.74 }, // Dresden
  '04': { lat: 51.34, lng: 12.37 }, // Leipzig
  '10': { lat: 52.52, lng: 13.40 }, // Berlin
  '20': { lat: 53.55, lng: 9.99 },  // Hamburg
  '30': { lat: 52.37, lng: 9.73 },  // Hannover
  '40': { lat: 51.23, lng: 6.78 },  // Düsseldorf
  '50': { lat: 50.94, lng: 6.96 },  // Köln
  '60': { lat: 50.11, lng: 8.68 },  // Frankfurt
  '70': { lat: 48.78, lng: 9.18 },  // Stuttgart
  '80': { lat: 48.14, lng: 11.58 }, // München
  '90': { lat: 49.45, lng: 11.08 }, // Nürnberg
}
const toRad = (d) => d * Math.PI / 180
const haversine = (a,b) => {
  if (!a || !b) return 9e9
  const R=6371, dLat=toRad(b.lat-a.lat), dLng=toRad(b.lng-a.lng)
  const s = Math.sin(dLat/2)**2 + Math.cos(toRad(a.lat))*Math.cos(toRad(b.lat))*Math.sin(dLng/2)**2
  return Math.round(R * (2 * Math.atan2(Math.sqrt(s), Math.sqrt(1-s))))
}
const coordForPLZ = (plz) => REGIONS[plz?.substring(0,2)] || null
// -------------------------------------------------

const store = getStore({ name: 'games', consistency: 'strong' })

async function listAll() {
  const items = []
  for await (const k of store.list()) {
    const obj = await store.getJSON(k.key)
    if (obj) items.push(obj)
  }
  return items
}

// einmalige Seed-Daten falls leer
async function seedIfEmpty() {
  const first = await store.list().next()
  if (!first || first.done) {
    const seed = [
      {
        id:'game_001', teamId:'team_001', teamName:'FC Fortuna Düsseldorf U12',
        date:'2025-10-15', time:'14:00', location:'Sportplatz Düsseldorf-Nord',
        plz:'40476', ageGroup:'U12', allowedAgeGroups:['U11','U12','U13'],
        homeAway:'Heimspiel', surface:'Kunstrasen', hasReferee:true,
        comment:'Suchen starken Gegner für Testspiel', verificationLevel:'gold',
        rating:4.5, status:'open', createdAt:new Date().toISOString()
      },
      {
        id:'game_002', teamId:'team_002', teamName:'SV Wersten 04 U10',
        date:'2025-10-20', time:'10:00', location:'Sportanlage Wersten',
        plz:'40591', ageGroup:'U10', allowedAgeGroups:['U9','U10','U11'],
        homeAway:'Heimspiel', surface:'Rasen', hasReferee:false,
        comment:'Freundschaftsspiel, gerne mit anschließendem Grillen', verificationLevel:'silver',
        rating:4.2, status:'open', createdAt:new Date().toISOString()
      }
    ]
    for (const g of seed) await store.setJSON(g.id, g)
  }
}

export async function handler(event) {
  const method = event.httpMethod

  if (method === 'GET') {
    await seedIfEmpty()
    const params = event.queryStringParameters || {}
    const plz = params.plz
    const radius = Number(params.radius || 25)
    const ageGroup = params.ageGroup || ''

    let games = (await listAll())
      .filter(g => new Date(g.date) >= new Date())
      .filter(g => !ageGroup || g.ageGroup === ageGroup || g.allowedAgeGroups?.includes(ageGroup))

    if (plz) {
      const origin = coordForPLZ(plz)
      games = games
        .map(g => ({...g, distance: haversine(origin, coordForPLZ(g.plz))}))
        .filter(g => g.distance <= radius)
        .sort((a,b)=> (a.distance||0)-(b.distance||0))
    }

    return res(200, games)
  }

  if (method === 'POST') {
    const body = JSON.parse(event.body || '{}')
    const id = body.id || `game_${Date.now()}_${Math.random().toString(36).slice(2,7)}`
    const game = {
      id,
      likes: [],
      matches: [],
      status: 'open',
      createdAt: new Date().toISOString(),
      ...body
    }
    await store.setJSON(id, game)
    return res(201, game)
  }

  if (method === 'PUT') {
    const { gameId, ...updates } = JSON.parse(event.body || '{}')
    const current = await store.getJSON(gameId)
    if (!current) return res(404, { error: 'Spiel nicht gefunden' })
    const updated = { ...current, ...updates }
    await store.setJSON(gameId, updated)
    return res(200, updated)
  }

  if (method === 'DELETE') {
    const { gameId } = JSON.parse(event.body || '{}')
    await store.delete(gameId)
    return res(200, { ok:true })
  }

  return res(405, 'Method not allowed')
}

function res(status, data) {
  return { statusCode: status, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
}
