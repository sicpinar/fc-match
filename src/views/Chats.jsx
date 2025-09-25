// src/views/Chats.jsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { getMyTeam, getMatches, getMessages, sendMessage } from '../lib/api'

export default function Chats() {
  const [team, setTeam] = useState(null)
  const [matches, setMatches] = useState([])
  const [active, setActive] = useState(null) // aktives Match
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  const bottomRef = useRef(null)

  useEffect(() => {
    async function init() {
      const t = await getMyTeam()
      setTeam(t || null)
      if (t?.id) {
        const m = await getMatches(t.id)
        setMatches(m)
        setActive(m[0] || null)
      }
      setLoading(false)
    }
    init()
  }, [])

  // Nachrichten laden + einfacher Poll
  useEffect(() => {
    let timer
    async function load() {
      if (!active?.id) return
      try {
        const msgs = await getMessages(active.id)
        setMessages(msgs || [])
        bottomRef.current?.scrollIntoView({ behavior:'smooth' })
      } catch (_) {}
    }
    load()
    timer = setInterval(load, 5000)
    return () => clearInterval(timer)
  }, [active?.id])

  async function onSend(e) {
    e.preventDefault()
    if (!text.trim() || !active?.id || !team) return
    const payload = { name: team.teamName, email: team.email }
    try {
      await sendMessage(active.id, text.trim(), payload)
      setText('')
      const msgs = await getMessages(active.id)
      setMessages(msgs || [])
      bottomRef.current?.scrollIntoView({ behavior:'smooth' })
    } catch (e) {
      console.error(e)
      alert('Senden fehlgeschlagen')
    }
  }

  const otherSideName = useMemo(() => {
    if (!active || !team) return ''
    return active.teamA?.id === team.id ? active.teamB?.name : active.teamA?.name
  }, [active, team])

  if (loading) return <div className="p-4 text-center text-gray-500">Laden…</div>
  if (!team) {
    return (
      <div className="p-4">
        <div className="card">Bitte lege erst dein Team unter <b>Profil</b> an.</div>
      </div>
    )
  }

  return (
    <div className="p-0 sm:p-4 sm:max-w-3xl sm:mx-auto h-[calc(100vh-6rem)] flex">
      {/* Matchliste */}
      <aside className="hidden sm:block w-64 border-r bg-white">
        <div className="p-3 font-semibold border-b">Matches</div>
        <ul className="overflow-y-auto max-h-full">
          {matches.length === 0 && <li className="p-3 text-sm text-gray-500">Noch keine Matches</li>}
          {matches.map(m => {
            const other = m.teamA?.id === team.id ? m.teamB : m.teamA
            return (
              <li key={m.id}
                  className={`p-3 cursor-pointer ${active?.id===m.id?'bg-primary-50':''}`}
                  onClick={()=>setActive(m)}>
                <div className="font-medium">{other?.name || 'Gegner'}</div>
                <div className="text-xs text-gray-500">{new Date(m.createdAt).toLocaleString('de-DE')}</div>
              </li>
            )
          })}
        </ul>
      </aside>

      {/* Chatbereich */}
      <section className="flex-1 flex flex-col">
        <div className="p-3 border-b bg-white">
          <div className="font-semibold">
            {active ? (otherSideName || 'Gegner') : 'Kein Match ausgewählt'}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
          {!active && (
            <div className="text-center text-gray-500 mt-10">Wähle links ein Match aus.</div>
          )}
          {active && (
            <div className="max-w-xl mx-auto">
              {messages.map((m, i) => {
                const mine = m.from?.email && m.from.email === team.email
                return (
                  <div key={i} className={`chat-bubble ${mine?'chat-bubble-sent ml-auto':'chat-bubble-received mr-auto'}`}>
                    <div className="text-xs opacity-80 mb-0.5">
                      {mine ? 'Du' : (m.from?.name || 'Trainer')}
                      {' · '}
                      {new Date(m.createdAt).toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'})}
                    </div>
                    <div>{m.text}</div>
                  </div>
                )
              })}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <form onSubmit={onSend} className="p-3 border-t bg-white flex gap-2">
          <input className="flex-1 p-2 border rounded-lg" placeholder="Nachricht…"
                 value={text} onChange={e=>setText(e.target.value)} disabled={!active}/>
          <button className="btn-primary px-4" disabled={!active || !text.trim()}>Senden</button>
        </form>
      </section>
    </div>
  )
}
