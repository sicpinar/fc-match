# ⚽ FC Match - Freundschaftsspiele für Amateurvereine

Mobile-First Web-App zum Finden von Freundschaftsspielen für Fußball-Amateurvereine in Deutschland.

## 🎯 Features (Projekt A - MVP)

- ✅ **Vereinsregistrierung** mit DFB-Nummer
- ✅ **Magic Link Authentication** (kein Passwort)
- ✅ **Spiele erstellen** mit allen wichtigen Details
- ✅ **Tinder-Style Matching** - Like/Skip für Spiele
- ✅ **Messenger** für gematchte Teams
- ✅ **Bewertungssystem** nach Spielen
- ✅ **Verifizierungs-Badges** (Bronze/Silber/Gold)
- ✅ **PWA-Support** für mobile Nutzung

## 🛠 Tech Stack

- **Frontend:** Vite + React + Tailwind CSS
- **Backend:** Netlify Functions (Serverless)
- **Datenbank:** Netlify Blobs (JSON Storage)
- **Hosting:** Netlify

## 📦 Installation

```bash
# Repository klonen
git clone https://github.com/your-username/fc-match.git
cd fc-match

# Dependencies installieren
npm install

# Environment Variables einrichten
cp .env.example .env
# .env Datei mit eigenen Werten befüllen
```

## 🚀 Development

```bash
# Entwicklungsserver starten
npm run dev

# Mit Netlify Dev (inkl. Functions)
npm run netlify
```

## 📱 Build & Deploy

```bash
# Production Build
npm run build

# Deploy zu Netlify
# 1. Repository mit Netlify verbinden
# 2. Environment Variables in Netlify setzen
# 3. Automatisches Deployment bei Git Push
```

## 📁 Projektstruktur

```
fc-match/
├── src/              # React Frontend
│   ├── views/        # Seiten-Komponenten  
│   ├── components/   # Wiederverwendbare Komponenten
│   └── lib/          # Utilities & API
├── netlify/
│   └── functions/    # Serverless Backend
├── public/           # Static Assets & PWA
└── package.json
```

## 🔐 Environment Variables

```env
JWT_SECRET=          # Min. 32 Zeichen
EMAIL_API_KEY=       # E-Mail Service API Key
EMAIL_FROM=          # Absender E-Mail
SITE_URL=            # Production URL
```

## 🎯 Roadmap

### Projekt A (MVP) ✅
- Basis-Funktionalität
- Team-Registrierung
- Spiele-Matching
- Chat-System
- Bewertungen

### Projekt B (Geplant)
- Spielerprofile
- Kader-Verwaltung
- Spieler-Statistiken
- Push-Notifications

### Projekt C (Geplant)  
- Premium-Features
- Turnier-Organisation
- Erweiterte Filter
- Werbefreiheit

### Projekt D (Geplant)
- Vereinsseiten
- Analytics Dashboard
- Sponsoren-Integration
- API für Verbände

## 📄 Lizenz & Rechtliches

- Betreiber: Seda Icpinar, Düsseldorf
- [Impressum](/impressum)
- [Datenschutz](/datenschutz)

## 🤝 Contributing

Contributions sind willkommen! Bitte erstelle einen Pull Request mit einer klaren Beschreibung deiner Änderungen.

## 📞 Support

Bei Fragen oder Problemen: info@fc-match.de

---

**Made with ⚽ for amateur football clubs in Germany**
