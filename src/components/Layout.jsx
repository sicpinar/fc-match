import { Outlet, Link, useLocation } from 'react-router-dom'
import { Search, PlusCircle, MessageCircle, User, Home as HomeIcon } from 'lucide-react'

export default function Layout({ user }) {
  const location = useLocation()
  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Start' },
    { path: '/search', icon: Search, label: 'Suche' },
    { path: '/create-game', icon: PlusCircle, label: 'Erstellen' },
    { path: '/chats', icon: MessageCircle, label: 'Chats' },
    { path: '/profile', icon: User, label: 'Profil' },
  ]
  const isLegalPage = ['/impressum', '/datenschutz'].includes(location.pathname)
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center gap-2">⚽ FC Match</h1>
        </div>
      </header>
      <main className="flex-1 pb-20 overflow-y-auto">
        <Outlet />
      </main>
      {user && !isLegalPage && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom">
          <div className="flex justify-around items-center py-2">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link key={path} to={path} className={`flex flex-col items-center p-2 ${location.pathname===path?'text-primary-600':'text-gray-500 hover:text-primary-500'}`}>
                <Icon size={24} />
                <span className="text-xs mt-1">{label}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  )
}
