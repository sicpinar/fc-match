import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Home from './views/Home'
import Search from './views/Search'
import CreateGame from './views/CreateGame'
import Chats from './views/Chats'
import Profile from './views/Profile'
import Impressum from './views/Impressum'
import Datenschutz from './views/Datenschutz'
import { checkAuth } from './lib/auth'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth().then(userData => { setUser(userData); setLoading(false) }).catch(()=>setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 to-sport-green flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">⚽ Laden...</div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Layout user={user} />}>
        <Route index element={user ? <Search /> : <Home />} />
        <Route path="search" element={user ? <Search /> : <Navigate to="/" />} />
        <Route path="create-game" element={user ? <CreateGame /> : <Navigate to="/" />} />
        <Route path="chats" element={user ? <Chats /> : <Navigate to="/" />} />
        <Route path="profile" element={user ? <Profile user={user} /> : <Navigate to="/" />} />
        <Route path="impressum" element={<Impressum />} />
        <Route path="datenschutz" element={<Datenschutz />} />
      </Route>
    </Routes>
  )
}
export default App
