# CORE-6

Offisiell nettside for **CORE-6** (Gruppe 7), seks studenter innen IT og informasjonssystemer ved Universitetet i Agder (UiA).

**Live:** [noanor.github.io](https://noanor.github.io)

---

## Om prosjektet

CORE-6 jobber med reelle oppdragsgivere gjennom bachelorprosjektet og individuelle praksisperioder, blant annet Kartverket, Nasjonal kommunikasjonsmyndighet (Nkom) og Smaragd Motorsport. Nettsiden presenterer gruppen, teamet og prosjektene våre, og er gruppens digitale visittkort.

Vi søker en samarbeidspartner for bacheloroppgaven som gjennomføres fra januar til juni 2027. Ta gjerne kontakt via [kontaktsiden](https://noanor.github.io/kontakt.html).

## Teamet

| Navn | Rolle | Profil | GitHub | LinkedIn |
|---|---|---|---|---|
| Efe Kaan Eksi | Gruppeleder / kontaktperson | [Profilside](https://noanor.github.io/team/efe-kaan-eksi.html) | [GitHub](https://github.com/efekaaneksi) | [LinkedIn](https://www.linkedin.com/in/efekaan-eksi-2b0a5239a/) |
| Hildid Musse | Nestleder | [Profilside](https://noanor.github.io/team/hildid-musse.html) | [GitHub](https://github.com/Mussinho777) | [LinkedIn](https://www.linkedin.com/in/hildid-musse-6679a8392/) |
| Madalitso Phiri Skjelnes | Teammedlem | [Profilside](https://noanor.github.io/team/madalitso-phiri-skjelnes.html) | [GitHub](https://github.com/Phiri-Madalitso) | [LinkedIn](https://www.linkedin.com/in/madalitso-skjelnes-426741290/) |
| Marion Rasmussen | Teammedlem | [Profilside](https://noanor.github.io/team/marion-rasmussen.html) | [GitHub](https://github.com/marionrasmussen) | [LinkedIn](https://www.linkedin.com/in/marion-rasmussen-281298270/) |
| Dennis Tea | Teammedlem | [Profilside](https://noanor.github.io/team/dennis-tea.html) | [GitHub](https://github.com/dennistae) | [LinkedIn](https://www.linkedin.com/in/dennistea/) |
| Noa Vincent Nordén | Teammedlem | [Profilside](https://noanor.github.io/team/noa-vincent-norden.html) | [GitHub](https://github.com/noanor) | [LinkedIn](https://www.linkedin.com/in/noa-nordén-097556333/) |

## Sider

| Side | Innhold |
|---|---|
| `index.html` | Forside med hero, snarveier og tidslinje for bachelorsamarbeidet |
| `om-oss.html` | Om gruppen, presentasjonsvideo, hva som driver oss, og teknologier og verktøy |
| `team.html` | Oversikt over teammedlemmene |
| `team/*.html` | Egen profilside per teammedlem |
| `prosjekter.html` | Oversikt over prosjektene |
| `prosjekter/luftfartshinder.html` | Kartverket: webapplikasjon for innmelding og kontroll av luftfartshindre |
| `prosjekter/nkom.html` | Nkom: system for målestasjoner og fjernkontroll |
| `prosjekter/smaragd-motorsport.html` | Smaragd Motorsport: e-handelsløsning |
| `kontakt.html` | Kontaktinformasjon til alle gruppemedlemmer |

## Teknologi

- HTML, CSS og JavaScript (vanilla, uten byggeprosess)
- [Bootstrap 5](https://getbootstrap.com/) og [Bootstrap Icons](https://icons.getbootstrap.com/)
- Google Fonts (Orbitron)
- Hosting via GitHub Pages

## Prosjektstruktur

```
├── *.html                 Toppnivåsider (forside, om oss, team, prosjekter, kontakt)
├── team/                  Én profilside per teammedlem
├── prosjekter/            Én detaljside per prosjekt
├── styles/
│   ├── index.css          Samler alle partials
│   └── partials/          Ett stilark per komponent eller seksjon
├── js/
│   ├── layout.js          Bygger navigasjon og bunntekst på alle sider
│   ├── script.js          Genererer teamkortene
│   ├── reveal.js          Scroll-animasjoner
│   ├── tidslinje.js       Fremdrift i tidslinjen på forsiden
│   ├── prosjekt-wheel.js  Radial meny («Hjulet») på Luftfartshinder-siden
│   ├── gallery-lightbox.js  Bildegalleri med forstørrelse på profilsidene
│   ├── kontakt-kopier.js  Kopier e-post-knapp
│   └── forside-3d.js      3D-vipping av gruppebildet på forsiden
└── Media/
    ├── gruppebilde.jpg    Gruppebilde av teamet
    ├── Profil-pic/        Portretter og private bildegallerier
    └── Videos/            Prosjektvideoer og plakatbilder
```

### Bilder av teammedlemmer

Hvert medlem har to portrettfiler i `Media/Profil-pic/`:

| Fil | Format | Brukes til |
|---|---|---|
| `<navn>.jpg` | 3:4 | Hovedbilde på profilsiden |
| `<navn>-ikon.jpg` | 1:1, beskåret rundt ansiktet | Teamkort, modal, kontaktside og deltakerikoner på prosjektsidene |

## Kjøre lokalt

Siden er statisk og krever ingen installasjon. Siden stiene er rot-relative (`/styles/…`, `/Media/…`), må den serveres fra prosjektmappens rot. Start en lokal server derfra:

```bash
python3 -m http.server 8000
```

Åpne deretter `http://localhost:8000`. Siden kan også åpnes via `.claude/no-cache-server.py`, som skrur av nettleser-cache under utvikling.

## Søkemotorer og deling

Alle sider har `<meta name="description">`, kanonisk URL og Open Graph-/Twitter-tagger, slik at lenker ser ryddige ut når de deles. Gruppebildet brukes som delingsbilde, og profilsidene bruker portrettet til det aktuelle medlemmet.

## Tilgjengelighet

Nettsiden følger prinsippene i **WCAG 2.1 (nivå AA)** og universell utforming:

- Semantisk HTML og «hopp til hovedinnhold»-lenke
- Tastaturstøtte for alle interaktive elementer, inkludert «Hjulet»
- Synlige fokusindikatorer
- `aria-live`-varsler og tekstalternativer for bilder og ikoner
- Støtte for `prefers-reduced-motion`

## Lisens

Se [LICENSE](./LICENSE) (MIT).
