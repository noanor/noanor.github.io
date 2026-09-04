/**
 * Spinn-hjul i Prosjekt-seksjonen.
 * Utseende: smultring med LSP-ikoner (Powerline, Mast, Line, Point, Luftspenn).
 */
// (function () {
//     var container = document.querySelector(".wheel-container");
//     var spinBtn = document.getElementById("spin-btn");
//     var result = document.getElementById("spin-result");
//     var WheelCtor = window.spinWheel && window.spinWheel.Wheel;

//     if (!container || !spinBtn || !WheelCtor) {
//         return;
//     }

//     function iconImage(svgBody) {
//         var svg =
//             '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round">' +
//             svgBody +
//             "</svg>";
//         var img = new Image();
//         img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
//         return img;
//     }

//     var icons = {
//         powerline: iconImage('<rect x="16" y="16" width="32" height="32" rx="3"/>'),
//         line: iconImage(
//             '<line x1="12" y1="32" x2="52" y2="32"/><circle cx="12" cy="32" r="5" fill="#fff" stroke="none"/><circle cx="52" cy="32" r="5" fill="#fff" stroke="none"/>'
//         ),
//         luftspenn: iconImage('<polyline points="10,42 22,22 34,42 46,22 54,34"/>'),
//         point: iconImage('<circle cx="32" cy="32" r="16"/><circle cx="32" cy="32" r="6"/>'),
//         mast: iconImage('<circle cx="32" cy="32" r="16"/>')
//     };

//     var spinning = false;
//     var wheel;

//     function startWheel() {
//         wheel = new WheelCtor(container, {
//             items: [
//                 {
//                     label: "Powerline",
//                     backgroundColor: "rgba(142, 110, 168, 0.95)",
//                     image: icons.powerline
//                 },
//                 {
//                     label: "Line",
//                     backgroundColor: "rgba(72, 90, 108, 0.95)",
//                     image: icons.line
//                 },
//                 {
//                     label: "Luftspenn",
//                     backgroundColor: "rgba(72, 168, 155, 0.95)",
//                     image: icons.luftspenn
//                 },
//                 {
//                     label: "Point",
//                     backgroundColor: "rgba(186, 196, 90, 0.95)",
//                     image: icons.point
//                 },
//                 {
//                     label: "Mast",
//                     backgroundColor: "rgba(196, 110, 105, 0.95)",
//                     image: icons.mast
//                 }
//             ],
//             itemLabelColors: ["transparent"],
//             itemLabelFontSizeMax: 1,
//             borderColor: "#1a1a1a",
//             borderWidth: 3,
//             lineColor: "#1a1a1a",
//             lineWidth: 4,
//             radius: 0.95,
//             pointerAngle: 90,
//             isInteractive: false,
//             onRest: function (event) {
//                 spinning = false;
//                 var item = wheel.items[event.currentIndex];
//                 if (item && result) {
//                     result.textContent = "Valgt: " + item.label;
//                 }
//             }
//         });

//         wheel.items.forEach(function (item) {
//             item.imageRadius = 0.72;
//             item.imageScale = 0.42;
//         });
//     }

//     function spinTheWheel() {
//         if (spinning || !wheel) {
//             return;
//         }
//         spinning = true;
//         if (result) {
//             result.textContent = "";
//         }
//         var index = Math.floor(Math.random() * wheel.items.length);
//         wheel.spinToItem(index, 4000, true, 3, 1);
//     }

//     Promise.all(
//         Object.keys(icons).map(function (key) {
//             return icons[key].decode ? icons[key].decode() : Promise.resolve();
//         })
//     ).then(startWheel).catch(startWheel);

//     spinBtn.addEventListener("click", spinTheWheel);
//     container.addEventListener("click", spinTheWheel);
// })();

// ===== RADIAL MENY (WHEEL) SETUP =====
const wheelContainer = document.querySelector('.wheel-wrap');
const wheel = document.querySelector('.wheel');
const arcs = Array.from(wheel.querySelectorAll('.arc'));

let isOpen = false;
let justOpened = false;
let selectionMade = false;


// Opens radial menu at given position
function openWheel(x, y) {
    wheel.style.setProperty('--x', `${x}px`);
    wheel.style.setProperty('--y', `${y}px`);
    wheel.setAttribute('data-chosen', 0);
    wheel.classList.remove('hidden');
    setTimeout(() => wheel.classList.add('on'), 0);
    isOpen = true;
    justOpened = true;
    setTimeout(() => { justOpened = false; }, 0);
}

// Closes radial menu and removes temporary marker if no selection was made
function closeWheel() {
    wheel.classList.remove('on');
    setTimeout(() => wheel.classList.add('hidden'), 300);

    // if (!selectionMade && tempMarker) {
    //     setTimeout(() => {
    //         if (tempMarker && map.hasLayer(tempMarker)) {
    //             map.removeLayer(tempMarker);
    //         }
    //         tempMarker = null;
    //     }, 50);
    // }

    selectionMade = false;
    wheel.setAttribute('data-chosen', 0);
    isOpen = false;
}

// Hover effect on segments in radial menu
arcs.forEach((arc, i) => {
    arc.addEventListener('mouseenter', () => { if (isOpen) wheel.setAttribute('data-chosen', i + 1); });
    arc.addEventListener('mouseleave', () => { if (isOpen) wheel.setAttribute('data-chosen', 0); });
});

// ===== RADIAL MENU CLICK HANDLING =====
// On click in radial menu: select type and add obstacle

wheelContainer.addEventListener('click', async (e) => {
    if (e.target.closest('.wheel')) return;
    openWheel(wheelContainer.clientWidth / 2, wheelContainer.clientHeight / 2);
})

wheel.addEventListener('click', async (e) => {
    const arc = e.target.closest('.arc');
    if (!arc) return;

    const index = arcs.indexOf(arc) + 1;
    wheel.setAttribute('data-chosen', index);

    // const type = obstacleTypeFromChoice(index);
    // const hiddenTypeInput = document.getElementById('obstacletype');
    // if (hiddenTypeInput) hiddenTypeInput.value = type || '';

    closeWheel();

    // if (type) {
    //     try {
    //         const result = await addObstacle(type, lastClick.lat, lastClick.lng);
    //         const draftIndex = result.index;

    //         const marker = L.marker([lastClick.lat, lastClick.lng]).addTo(map);
    //         marker.draftIndex = draftIndex;
    //         obstacleMarkers.set(draftIndex, marker);

    //         if (toast) {
    //             toastEl.querySelector('.toast-body').textContent = 'Obstacle added to draft!';
    //             toast.show();
    //         }

    //         console.log(`Added, lat: ${lastClick.lat} lng: ${lastClick.lng}`);
    //     } catch (err) {
    //         console.error(err);
    //         alert(err.message);
    //     }
    // }
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