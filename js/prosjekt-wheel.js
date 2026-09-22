/**
 * Spinn-hjul i Prosjekt-seksjonen.
 * Utseende: smultring med LSP-ikoner (Powerline, Mast, Line, Point, Luftspenn).
 */

// ===== RADIAL MENY (WHEEL) SETUP =====
const wheelContainer = document.querySelector('.wheel-wrap');
const wheel = document.querySelector('.wheel');
const arcs = Array.from(wheel.querySelectorAll('.arc'));

let isOpen = false;
let justOpened = false;

// Opens radial menu at given position
function openWheel(x, y) {
    wheel.style.setProperty('--x', `${x}px`);
    wheel.style.setProperty('--y', `${y}px`);
    wheel.setAttribute('data-chosen', 0);
    wheel.classList.remove('hidden');
    wheelContainer.classList.add('wheel-tried');
    setTimeout(() => wheel.classList.add('on'), 0);
    isOpen = true;
    justOpened = true;
    setTimeout(() => { justOpened = false; }, 0);

    wheelContainer.setAttribute('aria-expanded', 'true');
    arcs.forEach((arc) => arc.setAttribute('tabindex', '0'));
}

// Closes radial menu
function closeWheel(opts) {
    wheel.classList.remove('on');
    setTimeout(() => wheel.classList.add('hidden'), 300);

    wheel.setAttribute('data-chosen', 0);
    isOpen = false;

    wheelContainer.setAttribute('aria-expanded', 'false');
    arcs.forEach((arc) => arc.setAttribute('tabindex', '-1'));

    if (opts && opts.returnFocus) {
        wheelContainer.focus();
    }
}

// Hover- og fokuseffekt på segmentene i radial meny
arcs.forEach((arc, i) => {
    arc.addEventListener('mouseenter', () => { if (isOpen) wheel.setAttribute('data-chosen', i + 1); });
    arc.addEventListener('mouseleave', () => { if (isOpen) wheel.setAttribute('data-chosen', 0); });
    arc.addEventListener('focus', () => { if (isOpen) wheel.setAttribute('data-chosen', i + 1); });
    arc.addEventListener('blur', () => { if (isOpen) wheel.setAttribute('data-chosen', 0); });
});

// ===== RADIAL MENU KLIKK- OG TASTATURHÅNDTERING =====

wheelContainer.addEventListener('click', (e) => {
    if (e.target.closest('.wheel')) return;
    openWheel(wheelContainer.clientWidth / 2, wheelContainer.clientHeight / 2);
})

wheelContainer.addEventListener('keydown', (e) => {
    if (isOpen || e.target !== wheelContainer) return;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        openWheel(wheelContainer.clientWidth / 2, wheelContainer.clientHeight / 2);
        if (arcs[0]) arcs[0].focus();
    }
});

wheel.addEventListener('click', (e) => {
    const arc = e.target.closest('.arc');
    if (!arc) return;

    const index = arcs.indexOf(arc) + 1;
    wheel.setAttribute('data-chosen', index);

    closeWheel();
});

wheel.addEventListener('keydown', (e) => {
    const arc = e.target.closest('.arc');
    if (!arc || !isOpen) return;

    const index = arcs.indexOf(arc);

    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        wheel.setAttribute('data-chosen', index + 1);
        closeWheel({ returnFocus: true });
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        arcs[(index + 1) % arcs.length].focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        arcs[(index - 1 + arcs.length) % arcs.length].focus();
    }
});

// Lukker radial meny ved klikk utenfor eller Escape-tast
document.addEventListener('click', (e) => {
    if (!isOpen || justOpened) return;
    if (!e.target.closest('.wheel')) closeWheel();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
        closeWheel({ returnFocus: true });
    }
});