// src/views/CreateGame.jsx
import { useEffect, useState } from 'react'
import { getMyTeam, createGame } from '../lib/api'

const AGE_GROUPS = [
  'U8','U9','U10','U11','U12','U13','U14','U15','U16','U17','U18','U19',
  'Herren','Damen','Alte Herren'
]
const SURFACES = ['Rasen', 'Kunstrasen', 'Acker', 'Egal']
const HOME_AWAY = ['Heimspiel', 'Auswärtsspiel', 'Flexibel']

export default function CreateGame() {
  const [team, setTeam] = useState(null)
  const [msg, setMsg] = useState('')
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    date: '',
    time: '',
    location: '',
    plz: '',
    ageGroup: '',
    allowedAgeGroups: [],
    homeAway: 'Heimspiel',
    surface: 'Rasen',
    hasReferee: false,
    comment: '',
  })

  useEffect(() => {
    async function init() {
      const t = await getMyTeam()
      setTeam(t)
      setForm(s => ({
        ...s,
        ageGroup: t?.ageGroup || '',
        plz: t?.plz || '',
        location: t ? `${t.clubName} - ${t.teamName}` : '',
      }))
    }
    init()
  }, [])

  function toggleAllowed(group) {
    setForm(s => {
      const exists = s.allowedAgeGroups.includes(group)
      const next = exists ? s.allowedAgeGroups.filter(g => g !== group)
                          : [...s.allowedAgeGroups, group]
      return { ...s, allowedAgeGroups: next }
    })
  }

  async function onSubmit(e) {
    e.preventDefault()
    setSaving(true); setMsg('')
    try {
      if (!team?.id) {
        setMsg('❗ Bitte lege zuerst dein Profil/Team an.')
        setSaving(false); return
      }
      const payload = {
        teamId: team.id,
        teamName: `${team.clubName} ${team.teamName}`,
        date: form.date,
        time: form.time,
        location: form.location,
        plz: form.plz || team.plz,
        ageGroup: form.ageGroup || team.ageGroup,
        allowedAgeGroups: form.allowedAgeGroups.length
          ? form.allowedAgeGroups
          : [form.ageGroup || team.ageGroup],
        homeAway: form.homeAway,
        surface: form.surface,
        hasReferee: !!form.hasReferee,
        comment: form.comment,
        verificationLevel: team.verificationLevel || 'bronze',
        rating: team.rating || null,
        status: 'open',
      }
      await createGame(payload)
      setMsg('✅ Spiel erstellt! Du findest es nun in der Suche.')
      // simple reset (Datum/Zeit/Kommentar)
      setForm(s => ({...s, date:'', time:'', comment:''}))
    } catch (e) {
      console.error(e)
      setMsg('❌ Konnte Spiel nicht erstellen.')
    } finally { setSaving(false) }
  }

  if (!team) {
    return (
      <div className="p-4">
        <div className="card">
          <div className="text-sm">
            Du hast noch kein Team-Profil. Lege es unter <b>Profil</b> an, dann kannst du Spiele erstellen.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Spiel erstellen</h1>
      <form onSubmit={onSubmit} className="card space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Datum</label>
            <input type="date" className="w-full p-2 border rounded-lg"
              value={form.date} onChange={e=>setForm(s=>({...s, date:e.target.value}))} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Uhrzeit</label>
            <input type="time" className="w-full p-2 border rounded-lg"
              value={form.time} onChange={e=>setForm(s=>({...s, time:e.target.value}))} required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ort / Anlage</label>
          <input className="w-full p-2 border rounded-lg" placeholder="Sportanlage ..."
            value={form.location} onChange={e=>setForm(s=>({...s, location:e.target.value}))} required />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">PLZ</label>
            <input className="w-full p-2 border rounded-lg" maxLength={5} pattern="[0-9]{5}"
              value={form.plz} onChange={e=>setForm(s=>({...s, plz:e.target.value}))} placeholder="12345" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Altersklasse</label>
            <select className="w-full p-2 border rounded-lg"
              value={form.ageGroup} onChange={e=>setForm(s=>({...s, ageGroup:e.target.value}))} required>
              <option value="">Bitte wählen</option>
              {AGE_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Gegner darf sein…</label>
          <div className="flex flex-wrap gap-2">
            {AGE_GROUPS.map(g => (
              <label key={g} className={`px-2 py-1 rounded border text-sm cursor-pointer
                ${form.allowedAgeGroups.includes(g) ? 'bg-primary-100 border-primary-300' : 'bg-gray-50'}`}>
                <input type="checkbox" className="mr-1"
                  checked={form.allowedAgeGroups.includes(g)}
                  onChange={() => toggleAllowed(g)} />
                {g}
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Wenn leer, wird automatisch deine eigene Altersklasse verwendet.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Heim/Auswärts</label>
            <select className="w-full p-2 border rounded-lg"
              value={form.homeAway} onChange={e=>setForm(s=>({...s, homeAway:e.target.value}))}>
              {HOME_AWAY.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Platz</label>
            <select className="w-full p-2 border rounded-lg"
              value={form.surface} onChange={e=>setForm(s=>({...s, surface:e.target.value}))}>
              {SURFACES.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={form.hasReferee}
                onChange={e=>setForm(s=>({...s, hasReferee:e.target.checked}))} />
              Schiedsrichter vorhanden
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Kommentar (optional)</label>
          <textarea className="w-full p-2 border rounded-lg" rows={3}
            placeholder="Trikotfarbe, Parken, Wünsche…"
            value={form.comment} onChange={e=>setForm(s=>({...s, comment:e.target.value}))} />
        </div>

        <button className="btn-primary py-2" disabled={saving}>
          {saving ? 'Speichern…' : 'Spiel erstellen'}
        </button>

        {msg && <div className="text-sm text-gray-700">{msg}</div>}
      </form>
    </div>
  )
}
