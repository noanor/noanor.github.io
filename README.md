# CORE-6 · noanor.github.io

Nettsiden til **CORE-6** (Gruppe 7) — bachelorprosjekt innen IT og informasjonssystemer ved Universitetet i Agder.

🔗 **Live side:** [noanor.github.io](https://noanor.github.io)

## Om prosjektet

CORE-6 består av seks studenter som gjennom bachelorprosjektet og individuelle praksisperioder jobber med reelle oppdragsgivere, blant annet Kartverket, Nasjonal kommunikasjonsmyndighet (Nkom) og Smaragd Motorsport. Denne nettsiden presenterer gruppen, teamet og prosjektene, og fungerer som gruppens digitale visittkort.

## Gruppemedlemmer

| Navn | Rolle | Profil | GitHub | LinkedIn |
|---|---|---|---|---|
| Efe Kaan Eksi | Gruppeleder | [Profilside](https://noanor.github.io/team/efe-kaan-eksi.html) | [GitHub](https://github.com/efekaaneksi) | [LinkedIn](https://www.linkedin.com/in/efekaan-eksi-2b0a5239a/) |
| Hildid Musse | Nestleder | [Profilside](https://noanor.github.io/team/hildid-musse.html) | [GitHub](https://github.com/Mussinho777) | [LinkedIn](https://www.linkedin.com/in/hildid-musse-6679a8392/) |
| Madalitso Phiri Skjelnes | | [Profilside](https://noanor.github.io/team/madalitso-phiri-skjelnes.html) | [GitHub](https://github.com/Phiri-Madalitso) | [LinkedIn](https://www.linkedin.com/in/madalitso-skjelnes-426741290/) |
| Marion Rasmussen | | [Profilside](https://noanor.github.io/team/marion-rasmussen.html) | [GitHub](https://github.com/marionrasmussen) | [LinkedIn](https://www.linkedin.com/in/marion-rasmussen-281298270/) |
| Dennis Tea | | [Profilside](https://noanor.github.io/team/dennis-tea.html) | [GitHub](https://github.com/dennistae) | [LinkedIn](https://www.linkedin.com/in/dennistea/) |
| Noa Vincent Nordén | | [Profilside](https://noanor.github.io/team/noa-vincent-norden.html) | [GitHub](https://github.com/noanor) | [LinkedIn](https://www.linkedin.com/in/noa-nordén-097556333/) |

## Sidestruktur

| Side | Beskrivelse |
|---|---|
| `index.html` | Forside med hero-seksjon og tidslinje for bachelorsamarbeidet |
| `om-oss.html` | Om gruppen, hva som driver oss, og teknologier/verktøy vi bruker |
| `team.html` | Presentasjon av hvert teammedlem |
| `team/*.html` | Egen profilside per teammedlem |
| `prosjekter.html` | Oversikt over alle prosjekter |
| `prosjekter/luftfartshinder.html` | Prosjektside: Kartverket – Luftfartshinder softwareapplikasjon |
| `prosjekter/nkom.html` | Prosjektside: Nkom – FK-fjernkontroll |
| `prosjekter/smaragd-motorsport.html` | Prosjektside: Smaragd Motorsport – E-handelsløsning |
| `kontakt.html` | Kontaktinformasjon til alle gruppemedlemmer |

## Teknologier

- **HTML/CSS/JavaScript** (vanilla, ingen byggeprosess)
- [Bootstrap 5](https://getbootstrap.com/) + [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Vanta.js](https://www.vantajs.com/) (Three.js) for den animerte globus-bakgrunnen på forsiden
- Google Fonts (Orbitron)
- Statisk hosting via **GitHub Pages**

## Prosjektstruktur

```
├── *.html                Toppnivå-sidene (forside, oversikter, kontakt)
├── team/                 Én profilside per teammedlem
├── prosjekter/           Én detaljside per prosjekt
├── styles/
│   ├── index.css         Samler alle partials
│   └── partials/         Ett stilark per komponent/seksjon
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

Toppnivå-sidene og layout.js bruker rot-relative stier (`/styles/…`, `/js/…`,
`/Media/…`) slik at de fungerer uendret uansett hvilken mappedybde siden som
laster dem ligger på. Det krever statisk hosting fra domenets rot (som
GitHub Pages for et bruker-repo som dette), og fungerer også med den lokale
dev-serveren i `.claude/no-cache-server.py`.

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
