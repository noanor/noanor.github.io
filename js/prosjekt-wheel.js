/**
 * «Prøv hjulet selv» – interaktivt kart i Prosjekt-seksjonen.
 * Etterligner Luftfartshinder-løsningen: klikk i kartet, velg type i hjulet,
 * og hinderet legges i draft som en markør i kartet.
 */

// ===== KART SETUP =====
const mapWrap = document.querySelector('.wheel-map-wrap');
const mapEl = document.getElementById('wheel-map');
const wheel = mapWrap.querySelector('.wheel');
const arcs = Array.from(wheel.querySelectorAll('.arc'));
const toast = mapWrap.querySelector('.wheel-map-toast');
const countEl = document.querySelector('.wheel-map-count strong');
const resetBtn = document.querySelector('.wheel-map-reset');

// Samme farger som segmentene i hjulet (se wheel.css)
const OBSTACLE_TYPES = {
    point: { label: 'Punkt', hue: 0 },
    mast: { label: 'Mast', hue: 72 },
    line: { label: 'Linje', hue: 144 },
    powerline: { label: 'Luftspenn', hue: 216 },
    area: { label: 'Areal', hue: 288 },
};

// Kristiansand – samme område som i videoen
const START_VIEW = { center: [58.115, 7.97], zoom: 12 };

const map = L.map(mapEl, {
    center: START_VIEW.center,
    zoom: START_VIEW.zoom,
    scrollWheelZoom: false,
    doubleClickZoom: false,
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const draftLayer = L.layerGroup().addTo(map);
let draftCount = 0;
let pendingLatLng = null;

let isOpen = false;
let justOpened = false;

// ===== RADIAL MENY (WHEEL) =====

// Åpner hjulet over et punkt i kartet (x/y i piksler relativt til kartet)
function openWheel(point, latlng) {
    // Hold hjulet innenfor kartet slik at alle segmentene er synlige
    const r = wheel.offsetWidth / 2;
    const x = Math.min(Math.max(point.x, r), mapWrap.clientWidth - r);
    const y = Math.min(Math.max(point.y, r), mapWrap.clientHeight - r);

    pendingLatLng = latlng;
    wheel.style.setProperty('--x', `${x}px`);
    wheel.style.setProperty('--y', `${y}px`);
    wheel.setAttribute('data-chosen', 0);
    wheel.classList.remove('hidden');
    mapWrap.classList.add('wheel-tried');
    setTimeout(() => wheel.classList.add('on'), 0);
    isOpen = true;
    justOpened = true;
    setTimeout(() => { justOpened = false; }, 0);

    arcs.forEach((arc) => arc.setAttribute('tabindex', '0'));
}

// Lukker hjulet
function closeWheel(opts) {
    wheel.classList.remove('on');
    setTimeout(() => { if (!isOpen) wheel.classList.add('hidden'); }, 300);

    wheel.setAttribute('data-chosen', 0);
    isOpen = false;
    pendingLatLng = null;

    arcs.forEach((arc) => arc.setAttribute('tabindex', '-1'));

    if (opts && opts.returnFocus) {
        mapEl.focus();
    }
}

// ===== DRAFT-MARKØRER =====

function obstacleIcon(arc) {
    const { hue } = OBSTACLE_TYPES[arc.dataset.type];
    return L.divIcon({
        className: 'wheel-map-marker',
        html: `<span style="--hue:${hue}">${arc.querySelector('i').outerHTML}</span>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -14],
    });
}

function addObstacle(arc) {
    const latlng = pendingLatLng;
    if (!latlng) return;

    const { label } = OBSTACLE_TYPES[arc.dataset.type];
    draftCount += 1;

    L.marker(latlng, { icon: obstacleIcon(arc), keyboard: true, title: label })
        .bindPopup(
            `<strong>Hinder #${draftCount}</strong><br>` +
            `Type: ${label}<br>` +
            `Status: Draft<br>` +
            `Lat: ${latlng.lat.toFixed(6)}<br>` +
            `Lng: ${latlng.lng.toFixed(6)}`
        )
        .addTo(draftLayer);

    countEl.textContent = draftCount;
    resetBtn.hidden = false;
    showToast(`${label} lagt til i draft!`);
}

let toastTimer = null;
function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2200);
}

resetBtn.addEventListener('click', () => {
    draftLayer.clearLayers();
    draftCount = 0;
    countEl.textContent = 0;
    resetBtn.hidden = true;
    map.setView(START_VIEW.center, START_VIEW.zoom);
    showToast('Draft tømt');
});

// ===== KLIKK- OG TASTATURHÅNDTERING =====

// Klikk i kartet åpner hjulet der man klikket (et nytt klikk mens det er åpent lukker det)
map.on('click', (e) => {
    if (isOpen) {
        closeWheel();
        return;
    }
    openWheel(e.containerPoint, e.latlng);
});

// Enter/mellomrom på kartet åpner hjulet midt i kartet
mapEl.addEventListener('keydown', (e) => {
    if (isOpen || e.target !== mapEl) return;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        const size = map.getSize();
        openWheel(L.point(size.x / 2, size.y / 2), map.getCenter());
        if (arcs[0]) arcs[0].focus();
    }
});

// Hover- og fokuseffekt på segmentene
arcs.forEach((arc, i) => {
    arc.addEventListener('mouseenter', () => { if (isOpen) wheel.setAttribute('data-chosen', i + 1); });
    arc.addEventListener('mouseleave', () => { if (isOpen) wheel.setAttribute('data-chosen', 0); });
    arc.addEventListener('focus', () => { if (isOpen) wheel.setAttribute('data-chosen', i + 1); });
    arc.addEventListener('blur', () => { if (isOpen) wheel.setAttribute('data-chosen', 0); });
});

wheel.addEventListener('click', (e) => {
    const arc = e.target.closest('.arc');
    if (!arc || !isOpen) return;
    addObstacle(arc);
    closeWheel();
});

wheel.addEventListener('keydown', (e) => {
    const arc = e.target.closest('.arc');
    if (!arc || !isOpen) return;

    const index = arcs.indexOf(arc);

    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        addObstacle(arc);
        closeWheel({ returnFocus: true });
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        arcs[(index + 1) % arcs.length].focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        arcs[(index - 1 + arcs.length) % arcs.length].focus();
    }
});

// Lukker hjulet ved klikk utenfor eller Escape-tast
document.addEventListener('click', (e) => {
    if (!isOpen || justOpened) return;
    if (!e.target.closest('.wheel') && !e.target.closest('.wheel-map')) closeWheel();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
        closeWheel({ returnFocus: true });
    }
});

// Lukk hjulet hvis kartet flyttes eller zoomes, ellers peker det på feil sted
map.on('movestart zoomstart', () => { if (isOpen) closeWheel(); });
