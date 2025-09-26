import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Shield, Users } from 'lucide-react'
import { sendMagicLink } from '../lib/api'

export default function Home() {
  const navigate = useNavigate()
  const [step, setStep] = useState('welcome')
  const [formData, setFormData] = useState({
    dfbNumber: '', clubName: '', teamName: '',
    ageGroup: '', plz: '', email: '', trainerName: ''
  })
  const [loading, setLoading] = useState(false)

  const ageGroups = ['U8','U9','U10','U11','U12','U13','U14','U15','U16','U17','U18','U19','Herren','Damen','Alte Herren']

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    await sendMagicLink(formData.email, formData);
    setStep('verify');
  } catch (err) {
    console.error('sendMagicLink failed:', err);
    alert('Fehler beim Senden: ' + (err?.message || 'Unbekannt'));
  } finally {
    setLoading(false);
  }
};


  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 to-sport-green p-4">
        <div className="max-w-md mx-auto mt-20">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl font-bold mb-4">⚽ FC Match</h1>
            <p className="text-lg">Finde Freundschaftsspiele für deinen Verein</p>
          </div>
          <div className="card p-6">
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Users className="text-primary-600 mt-1" />
                <div><h3 className="font-semibold">Für Amateurvereine</h3><p className="text-sm text-gray-600">Von U8 bis Alte Herren</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-primary-600 mt-1" />
                <div><h3 className="font-semibold">Einfache Anmeldung</h3><p className="text-sm text-gray-600">Nur E-Mail - kein Passwort</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="text-primary-600 mt-1" />
                <div><h3 className="font-semibold">Verifizierte Vereine</h3><p className="text-sm text-gray-600">Bronze, Silber & Gold Badges</p></div>
              </div>
            </div>
            <button onClick={() => setStep('register')} className="w-full btn-primary py-3 text-lg">Jetzt starten</button>
          </div>
          <div className="text-center mt-4">
            <a href="/impressum" className="text-white/80 text-sm hover:text-white">Impressum</a>
            <span className="text-white/60 mx-2">|</span>
            <a href="/datenschutz" className="text-white/80 text-sm hover:text-white">Datenschutz</a>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'register') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-6">Team registrieren</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-sm font-medium mb-1">DFB-Vereinsnummer</label>
              <input type="text" required className="w-full p-2 border rounded-lg" value={formData.dfbNumber} onChange={e=>setFormData({...formData, dfbNumber:e.target.value})} placeholder="z.B. 1234567" />
            </div>
            <div><label className="block text-sm font-medium mb-1">Vereinsname</label>
              <input type="text" required className="w-full p-2 border rounded-lg" value={formData.clubName} onChange={e=>setFormData({...formData, clubName:e.target.value})} />
            </div>
            <div><label className="block text-sm font-medium mb-1">Teamname / Mannschaft</label>
              <input type="text" required className="w-full p-2 border rounded-lg" value={formData.teamName} onChange={e=>setFormData({...formData, teamName:e.target.value})} placeholder="z.B. 1. Mannschaft" />
            </div>
            <div><label className="block text-sm font-medium mb-1">Altersklasse</label>
              <select required className="w-full p-2 border rounded-lg" value={formData.ageGroup} onChange={e=>setFormData({...formData, ageGroup:e.target.value})}>
                <option value="">Bitte wählen</option>
                {ageGroups.map(g=> <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div><label className="block text-sm font-medium mb-1">PLZ des Vereins</label>
              <input type="text" required pattern="[0-9]{5}" className="w-full p-2 border rounded-lg" value={formData.plz} onChange={e=>setFormData({...formData, plz:e.target.value})} placeholder="12345" />
            </div>
            <div><label className="block text-sm font-medium mb-1">Trainer Name</label>
              <input type="text" required className="w-full p-2 border rounded-lg" value={formData.trainerName} onChange={e=>setFormData({...formData, trainerName:e.target.value})} />
            </div>
            <div><label className="block text-sm font-medium mb-1">E-Mail Adresse</label>
              <input type="email" required className="w-full p-2 border rounded-lg" value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary py-3">{loading?'Wird gesendet...':'Magic Link senden'}</button>
          </form>
        </div>
      </div>
    )
  }

  if (step === 'verify') {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="card max-w-md w-full p-8 text-center">
          <div className="text-6xl mb-4">📧</div>
          <h2 className="text-2xl font-bold mb-4">E-Mail gesendet!</h2>
          <p className="text-gray-600 mb-6">Wir haben einen Magic Link an {formData.email} gesendet. Klicke auf den Link in der E-Mail, um dich anzumelden.</p>
          <p className="text-sm text-gray-500">Der Link ist 15 Minuten gültig.</p>
        </div>
      </div>
    )
  }
}
