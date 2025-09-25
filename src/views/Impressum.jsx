// src/views/Impressum.jsx
export default function Impressum() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <header className="bg-primary-600 text-white rounded-xl p-5 shadow mb-6">
        <h1 className="text-2xl font-bold">Impressum</h1>
        <p className="opacity-90">Angaben gemäß § 5 TMG</p>
      </header>

      <div className="card space-y-5">
        <section>
          <h2 className="text-lg font-semibold mb-1">Diensteanbieter</h2>
          <p>
            <strong>FC Match</strong><br/>
            Seda Icpinar<br/>
            Münsterstraße 90<br/>
            40476 Düsseldorf
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-1">Kontakt</h2>
          <p>E-Mail: <a className="text-primary-600 underline" href="mailto:info@fc-match.de">info@fc-match.de</a></p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-1">Verantwortlich für Inhalte (§ 55 Abs. 2 RStV)</h2>
          <p>Seda Icpinar, Münsterstraße 90, 40476 Düsseldorf</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-1">Streitschlichtung</h2>
          <p>
            Die EU-Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:&nbsp;
            <a className="text-primary-600 underline" href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">
              https://ec.europa.eu/consumers/odr
            </a>. Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <section className="text-sm text-gray-600">
          <h2 className="text-base font-semibold mb-1">Haftung für Inhalte</h2>
          <p>
            Wir sind gemäß § 7 Abs.1 TMG für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG
            sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
            zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
        </section>
      </div>

      <div className="mt-6">
        <a href="/" className="text-primary-600 underline">← Zurück zur App</a>
      </div>
    </div>
  )
}
