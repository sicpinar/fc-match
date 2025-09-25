
import { logout } from '../lib/auth'

export default function Profile(){
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('fc_user') || '{"email":"demo@example.com"}') : { email: 'demo@example.com' }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profil</h1>
      <div className="card">
        <p className="mb-2"><strong>E-Mail:</strong> {user.email}</p>
        <p className="text-sm text-gray-600 mb-4">Verifizierungsstatus: Bronze</p>
        <button onClick={()=>{logout(); window.location.href='/'}} className="btn-primary">Abmelden</button>
      </div>
    </div>
  )
}
