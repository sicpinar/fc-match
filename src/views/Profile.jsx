// src/views/Profile.jsx
import { useEffect, useState } from 'react'
import { getCurrentUser, getMyTeam, saveMyTeam, deleteTeam } from '../lib/api'

const AGE_GROUPS = [
  'U8','U9','U10','U11','U12','U13','U14','U15','U16','U17','U18','U19',
  'Herren','Damen','Alte Herren'
]

export default function Profile() {
  const [user, setUser] = useState(null)
  const [team, setTeam] = useState(null)
  const [form, setForm] = useState({
    dfbNumber: '',
    clubName: '',
    teamName: '',
    ageGroup: '',
    plz: '',
    trainerName: '',
    email: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function init() {
      const u = getCurrentUser()
      setUser(u)
      try {
        const t = await getMyTeam()
        setTeam(t)
        setForm({
          dfbNumber: t?.dfbNumber || '',
          clubName:   t?.clubName   || '',
          teamName:   t?.teamName   || '',
          ageGroup:   t?.ageGroup   || '',
          plz:        t?.plz        || '',
          trainerName:t?.trainerName|| (u?.name || ''),
          email:      t?.email      || (u?.email || ''),
        })
      } catch (_) {} finally { setLoading(false) }
    }
    init()
  }, [])

  const onChange = (k,v) => setForm(s => ({...s, [k]: v}))

  async function onSave(e) {
    e.preventDefault()
    setSaving(true); setMessage('')
    try {
      const saved = await saveMyTeam({
        ...form,
        email: form.email.trim(),
        verificationLevel: team?.verificationLevel || 'bronze',
      })
      setTeam(saved)
      setMessage('✅ Profil gespeichert')
    } catch (e) {
      console.error(e)
      setMessage('❌ Konnte nicht speichern')
    } finally { setSaving(false) }
  }

  async function onDelete() {
    if (!team?.id) return
    if (!confirm('Team wirklich löschen?')) return
    try {
      await deleteTeam(team.id)
      setTeam(null)
      setMessage('🗑️ Team gelöscht – Formular ausfüllen und speichern, um neu anzulegen.')
    } catch (e) {
      console.error(e)
      setMessage('❌ Löschen fehlgeschlagen')
    }
  }

  if (loading) return <div className="p-4 text-center text-gray-500">Laden…</div>

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profil</h1>

      {team ? (
        <div className="card mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              Verifizierung:{' '}
              <span className={
                team.verificationLevel === 'gold' ? 'text-yellow-600' :
                team.verificationLevel === 'silver' ? 'text-gray-600' : 'text-orange-600'
              }>
                {team.verificationLevel || 'bronze'}
              </span>
            </div>
            <div>Bewertung: {team.rating ? `${team.rating.toFixed(1)} ⭐ (${team.ratingCount||0})` : '—'}</div>
          </div>
        </div>
      ) : (
        <div className="card mb-4 text-sm text-gray-600">
          Noch kein Team gespeichert – fülle die Felder und klicke <b>Speichern</b>.
        </div>
      )}

      <form onSubmit={onSave} className="card space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">DFB-Vereinsnummer</label>
          <input className="w-full p-2 border rounded-lg" value={form.dfbNumber}
                 onChange={e=>onChange('dfbNumber', e.target.value)} placeholder="z. B. 1234567" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Vereinsname</label>
          <input className="w-full p-2 border rounded-lg" value={form.clubName}
                 onChange={e=>onChange('clubName', e.target.value)} placeholder="Verein" required />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">Team / Mannschaft</label>
            <input className="w-full p-2 border rounded-lg" value={form.teamName}
                   onChange={e=>onChange('teamName', e.target.value)} placeholder="z. B. U15 1. Mannschaft" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Altersklasse</label>
            <select className="w-full p-2 border rounded-lg" value={form.ageGroup}
                    onChange={e=>onChange('ageGroup', e.target.value)} required>
              <option value="">Bitte wählen</option>
              {AGE_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">PLZ</label>
            <input className="w-full p-2 border rounded-lg" value={form.plz} maxLength={5} pattern="[0-9]{5}"
                   onChange={e=>onChange('plz', e.target.value)} placeholder="12345" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Trainer/in</label>
            <input className="w-full p-2 border rounded-lg" value={form.trainerName}
                   onChange={e=>onChange('trainerName', e.target.value)} placeholder="Name" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">E-Mail</label>
          <input type="email" className="w-full p-2 border rounded-lg" value={form.email}
                 onChange={e=>onChange('email', e.target.value)} placeholder="kontakt@verein.de" required />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-primary flex-1 py-2">
            {saving ? 'Speichern…' : 'Speichern'}
          </button>
          {team?.id && (
            <button type="button" onClick={onDelete}
              className="flex-1 py-2 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50">
              Team löschen
            </button>
          )}
        </div>

        {message && <div className="text-sm text-gray-700 pt-1">{message}</div>}
      </form>
    </div>
  )
}
