import { Calendar, MapPin, Users, Star } from 'lucide-react'
import BadgeIcon from './BadgeIcon'

export default function GameCard({ game, onLike, onSkip, showActions = true }) {
  return (
    <div className="card mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-lg">{game.teamName}</h3>
          <BadgeIcon level={game.verificationLevel} />
        </div>
        {game.rating && (
          <div className="flex items-center gap-1">
            <Star className="text-yellow-500" size={16} />
            <span className="text-sm">{Number(game.rating).toFixed(1)}</span>
          </div>
        )}
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2"><Calendar size={16} /><span>{new Date(game.date).toLocaleDateString('de-DE')}, {game.time} Uhr</span></div>
        <div className="flex items-center gap-2"><MapPin size={16} /><span>{game.location} ({game.distance}km entfernt)</span></div>
        <div className="flex items-center gap-2"><Users size={16} /><span>{game.ageGroup}</span></div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="px-2 py-1 bg-sport-green/10 text-sport-green text-xs rounded">{game.surface}</span>
        {game.hasReferee && (<span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">Mit Schiri</span>)}
        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{game.homeAway}</span>
      </div>
      {game.comment && (<p className="mt-3 text-sm text-gray-700 italic">"{game.comment}"</p>)}
      {showActions && (
        <div className="flex gap-3 mt-4">
          <button onClick={()=>onSkip(game.id)} className="flex-1 py-3 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50">Skip</button>
          <button onClick={()=>onLike(game.id)} className="flex-1 py-3 bg-sport-green text-white rounded-lg hover:bg-sport-green/90">⚽ Like</button>
        </div>
      )}
    </div>
  )
}
