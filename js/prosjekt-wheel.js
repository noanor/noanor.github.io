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
}

// Closes radial menu
function closeWheel() {
    wheel.classList.remove('on');
    setTimeout(() => wheel.classList.add('hidden'), 300);

    wheel.setAttribute('data-chosen', 0);
    isOpen = false;
}

// Hover effect on segments in radial menu
arcs.forEach((arc, i) => {
    arc.addEventListener('mouseenter', () => { if (isOpen) wheel.setAttribute('data-chosen', i + 1); });
    arc.addEventListener('mouseleave', () => { if (isOpen) wheel.setAttribute('data-chosen', 0); });
});

// ===== RADIAL MENU CLICK HANDLING =====

wheelContainer.addEventListener('click', (e) => {
    if (e.target.closest('.wheel')) return;
    openWheel(wheelContainer.clientWidth / 2, wheelContainer.clientHeight / 2);
})

wheel.addEventListener('click', (e) => {
    const arc = e.target.closest('.arc');
    if (!arc) return;

    const index = arcs.indexOf(arc) + 1;
    wheel.setAttribute('data-chosen', index);

    closeWheel();
});

// Lukker radial meny ved klikk utenfor eller Escape-tast
document.addEventListener('click', (e) => {
    if (!isOpen || justOpened) return;
    if (!e.target.closest('.wheel')) closeWheel();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
        closeWheel();
    }
});