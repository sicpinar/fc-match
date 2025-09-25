
import { useState } from 'react'
import { createGame } from '../lib/api'

export default function CreateGame(){
  const [form, setForm] = useState({ teamName:'', date:'', time:'', location:'', plz:'', ageGroup:'U12', homeAway:'Heimspiel', surface:'Kunstrasen', hasReferee:false, comment:'', allowedAgeGroups:['U12'] })
  const [done, setDone] = useState(null)

  const submit = async (e)=>{
    e.preventDefault()
    const game = await createGame(form)
    setDone(game)
  }

  if (done){
    return (<div className="p-4"><h2 className="text-xl font-bold mb-3">Spiel erstellt</h2><pre className="bg-gray-100 p-3 rounded">{JSON.stringify(done,null,2)}</pre></div>)
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Spiel erstellen</h2>
      <form onSubmit={submit} className="card space-y-3">
        <input className="w-full p-2 border rounded" placeholder="Teamname" value={form.teamName} onChange={e=>setForm({...form, teamName:e.target.value})}/>
        <div className="flex gap-2">
          <input type="date" className="flex-1 p-2 border rounded" value={form.date} onChange={e=>setForm({...form, date:e.target.value})}/>
          <input type="time" className="flex-1 p-2 border rounded" value={form.time} onChange={e=>setForm({...form, time:e.target.value})}/>
        </div>
        <input className="w-full p-2 border rounded" placeholder="Ort" value={form.location} onChange={e=>setForm({...form, location:e.target.value})}/>
        <input className="w-full p-2 border rounded" placeholder="PLZ" value={form.plz} onChange={e=>setForm({...form, plz:e.target.value})}/>
        <select className="w-full p-2 border rounded" value={form.ageGroup} onChange={e=>setForm({...form, ageGroup:e.target.value})}>
          {['U8','U9','U10','U11','U12','U13','U14','U15','U16','U17','U18','U19','Herren','Damen','Alte Herren'].map(a=><option key={a} value={a}>{a}</option>)}
        </select>
        <select className="w-full p-2 border rounded" value={form.homeAway} onChange={e=>setForm({...form, homeAway:e.target.value})}>
          <option>Heimspiel</option><option>Auswärtsspiel</option>
        </select>
        <select className="w-full p-2 border rounded" value={form.surface} onChange={e=>setForm({...form, surface:e.target.value})}>
          <option>Kunstrasen</option><option>Rasen</option><option>Acker</option>
        </select>
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.hasReferee} onChange={e=>setForm({...form, hasReferee:e.target.checked})}/> Schiedsrichter vorhanden</label>
        <textarea className="w-full p-2 border rounded" placeholder="Kommentar" value={form.comment} onChange={e=>setForm({...form, comment:e.target.value})}/>
        <button className="btn-primary">Speichern</button>
      </form>
    </div>
  )
}
