// src/views/Search.jsx
import { useState } from 'react'
import GameCard from '../components/GameCard'
import { searchGames, createLike } from '../lib/api'
import { MapPin } from 'lucide-react'

export default function Search() {
  const [games, setGames] = useState([])
  const [filters, setFilters] = useState({
    plz: '',
    radius: 25,
    ageGroup: ''
  })
  const [loading, setLoading] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const radiusOptions = [10, 25, 50, 100, 150]
  const ageGroups = [
    'U8','U9','U10','U11','U12','U13',
    'U14','U15','U16','U17','U18','U19',
    'Herren','Damen','Alte Herren'
  ]

  async function handleSearch() {
    setLoading(true)
    try {
      const results = await searchGames(filters)
      setGames(results || [])
      setCurrentIndex(0)
    } catch (e) {
      console.error('Suchfehler:', e)
    } finally {
      setLoading(false)
    }
  }

  async function handleLike(gameId) {
    try {
      await createLike(gameId)
      if (currentIndex < games.length - 1) {
        setCurrentIndex((i) => i + 1)
      } else {
        setGames([])
      }
    } catch (e) {
      console.error('Like-Fehler:', e)
    }
  }

  function handleSkip() {
    if (currentIndex < games.length - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      setGames([])
    }
  }

  const currentGame = games[currentIndex]

  return (
    <div className="p-4">
      {/* Suchfilter */}
      <div className="card mb-4">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <MapPin className="text-primary-600" />
          Spiele in deiner Nähe
        </h2>

        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="PLZ"
              className="flex-1 p-2 border rounded-lg"
              value={filters.plz}
              onChange={(e) =>
                setFilters({ ...filters, plz: e.target.value })
              }
              pattern="[0-9]{5}"
              maxLength={5}
            />
            <select
              className="flex-1 p-2 border rounded-lg"
              value={filters.radius}
              onChange={(e) =>
                setFilters({ ...filters, radius: parseInt(e.target.value, 10) })
              }
            >
              {radiusOptions.map((r) => (
                <option key={r} value={r}>{r} km</option>
              ))}
            </select>
          </div>

          <select
            className="w-full p-2 border rounded-lg"
            value={filters.ageGroup}
            onChange={(e) =>
              setFilters({ ...filters, ageGroup: e.target.value })
            }
          >
            <option value="">Alle Altersklassen</option>
            {ageGroups.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            disabled={loading || !filters.plz}
            className="w-full btn-primary py-2"
          >
            {loading ? 'Suche…' : 'Spiele suchen'}
          </button>
        </div>
      </div>

      {/* Ergebnis-Stack */}
      {currentGame ? (
        <div>
          <div className="text-sm text-gray-600 mb-2 text-center">
            {currentIndex + 1} von {games.length} Spielen
          </div>
          <GameCard
            game={currentGame}
            onLike={handleLike}
            onSkip={handleSkip}
          />
        </div>
      ) : (
        <div className="card text-center py-8 text-gray-500">
          {games.length === 0 && currentIndex === 0 ? (
            <>
              <div className="text-4xl mb-3">🔍</div>
              <p>Gib deine PLZ ein und finde Spiele in deiner Nähe</p>
            </>
          ) : (
            <>
              <div className="text-4xl mb-3">✅</div>
              <p>Alle Spiele durchgesehen!</p>
              <button onClick={handleSearch} className="btn-primary mt-4">
                Neue Suche
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
