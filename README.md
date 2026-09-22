# CORE-6 · noanor.github.io

Nettsiden til **CORE-6** (Gruppe 7) — bachelorprosjekt innen IT og informasjonssystemer ved Universitetet i Agder.

🔗 **Live side:** [noanor.github.io](https://noanor.github.io)

## Om prosjektet

CORE-6 består av seks studenter som gjennom bachelorprosjektet og individuelle praksisperioder jobber med reelle oppdragsgivere, blant annet Kartverket, Nasjonal kommunikasjonsmyndighet (Nkom) og Smaragd Motorsport. Denne nettsiden presenterer gruppen, teamet og prosjektene, og fungerer som gruppens digitale visittkort.

## Sidestruktur

| Side | Beskrivelse |
|---|---|
| `index.html` | Forside med hero-seksjon og tidslinje for bachelorsamarbeidet |
| `om-oss.html` | Om gruppen, hva som driver oss, og teknologier/verktøy vi bruker |
| `team.html` | Presentasjon av hvert teammedlem |
| `prosjekter.html` | Oversikt over alle prosjekter |
| `luftfartshinder.html` | Prosjektside: Kartverket – Luftfartshinder softwareapplikasjon |
| `nkom.html` | Prosjektside: Nkom – FK-fjernkontroll |
| `smaragd-motorsport.html` | Prosjektside: Smaragd Motorsport – E-handelsløsning |
| `kontakt.html` | Kontaktinformasjon til alle gruppemedlemmer |

## Teknologier

- **HTML/CSS/JavaScript** (vanilla, ingen byggeprosess)
- [Bootstrap 5](https://getbootstrap.com/) + [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Vanta.js](https://www.vantajs.com/) (Three.js) for den animerte globus-bakgrunnen på forsiden
- Google Fonts (Orbitron)
- Statisk hosting via **GitHub Pages**

## Prosjektstruktur

```
├── *.html              Sidene
├── styles/
│   ├── index.css        Samler alle partials
│   └── partials/        Ett stilark per komponent/seksjon
├── js/
│   ├── layout.js         Bygger navbar + footer på alle sider
│   ├── script.js         Genererer teamkortene
│   ├── reveal.js          Scroll-reveal-animasjoner
│   ├── tidslinje.js       Fremdrift på tidslinjen (forsiden)
│   ├── prosjekt-wheel.js  Radial meny ("hjulet") på Luftfartshinder-siden
│   ├── kontakt-kopier.js  Kopier e-post-knapp
│   └── forside-vanta.js   Globus-bakgrunn på forsiden
└── Media/                Bilder, logoer og videoer
```

## Kjøre lokalt

Siden er statisk og krever ingen installasjon. Start en enkel lokal server fra prosjektmappen, for eksempel:

```bash
python3 -m http.server 8000
```

Åpne deretter `http://localhost:8000` i nettleseren.

## Tilgjengelighet og universell utforming

Nettsiden er bygget med vekt på **WCAG 2.1 (nivå AA)** og universell utforming: semantisk HTML, tastaturstøtte for alle interaktive elementer (inkludert den radiale "hjul"-menyen), synlige fokusindikatorer, `aria-live`-varsler, tekstalternativer for ikoner/bilder, og støtte for `prefers-reduced-motion`. Se commit-historikken for detaljer om gjennomførte forbedringer.

## Lisens

Se [LICENSE](./LICENSE) (MIT).
