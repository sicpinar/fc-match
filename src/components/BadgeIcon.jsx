import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react'
export default function BadgeIcon({ level, size = 20 }) {
  const badges = {
    bronze: { icon: Shield, color: 'text-orange-600', title: 'Bronze - E-Mail verifiziert' },
    silver: { icon: ShieldAlert, color: 'text-gray-500', title: 'Silber - Dokument hochgeladen' },
    gold: { icon: ShieldCheck, color: 'text-yellow-500', title: 'Gold - Offiziell verifiziert' }
  }
  const badge = badges[level] || badges.bronze
  const Icon = badge.icon
  return (<div className={`${badge.color} inline-flex`} title={badge.title}><Icon size={size} /></div>)
}
