// src/views/Datenschutz.jsx
export default function Datenschutz() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <header className="bg-primary-600 text-white rounded-xl p-5 shadow mb-6">
        <h1 className="text-2xl font-bold">Datenschutzerklärung</h1>
        <p className="opacity-90">Hinweise nach Art. 13 DSGVO</p>
      </header>

      <div className="card space-y-5">
        <section>
          <h2 className="text-lg font-semibold mb-1">Verantwortlicher</h2>
          <p>
            FC Match – Seda Icpinar, Münsterstraße 90, 40476 Düsseldorf<br/>
            E-Mail: <a className="text-primary-600 underline" href="mailto:info@fc-match.de">info@fc-match.de</a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-1">Zwecke der Verarbeitung</h2>
          <ul className="list-disc ml-5">
            <li>Registrierung von Vereinen/Teams und Finden von Freundschaftsspielen</li>
            <li>Nachrichten zwischen gematchten Teams</li>
            <li>Bewertungen nach Spielen</li>
            <li>Betrieb der PWA (Technik-Logs, Sicherheit)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-1">Rechtsgrundlagen</h2>
          <ul className="list-disc ml-5">
            <li>Art. 6 Abs. 1 lit. b DSGVO (Vertrag / vorvertragliche Maßnahmen)</li>
            <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen – Sicherheit, Missbrauchsvermeidung)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-1">Speicherdauer</h2>
          <p>Wir speichern Daten nur so lange, wie es für den genannten Zweck erforderlich ist oder rechtliche Pflichten bestehen.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-1">Empfänger</h2>
          <p>Hosting/Serverless bei Netlify (USA) mit EU-Standardvertragsklauseln. E-Mail-Versand ggf. via SendGrid o. ä.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-1">Betroffenenrechte</h2>
          <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch sowie Datenübertragbarkeit. Kontakt siehe Verantwortlicher
