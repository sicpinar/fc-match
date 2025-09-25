export default function Impressum() {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Impressum</h1>
      <div className="prose prose-gray">
        <h2 className="text-lg font-semibold mt-4 mb-2">Angaben gemäß § 5 TMG</h2>
        <p><strong>FC Match</strong><br/>Seda Icpinar<br/>Münsterstraße 90<br/>40476 Düsseldorf</p>
        <h2 className="text-lg font-semibold mt-4 mb-2">Kontakt</h2>
        <p>E-Mail: info@fc-match.de</p>
        <h2 className="text-lg font-semibold mt-4 mb-2">Verantwortlich nach § 55 Abs. 2 RStV</h2>
        <p>Seda Icpinar<br/>Münsterstraße 90<br/>40476 Düsseldorf</p>
      </div>
      <div className="mt-8 pt-4 border-t">
        <a href="/" className="text-primary-600 hover:underline">← Zurück zur App</a>
      </div>
    </div>
  )
}
