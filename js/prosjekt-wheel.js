/**
 * Spinn-hjul i Prosjekt-seksjonen.
 * Utseende: smultring med LSP-ikoner (Powerline, Mast, Line, Point, Luftspenn).
 */
(function () {
    var container = document.querySelector(".wheel-container");
    var spinBtn = document.getElementById("spin-btn");
    var result = document.getElementById("spin-result");
    var WheelCtor = window.spinWheel && window.spinWheel.Wheel;

    if (!container || !spinBtn || !WheelCtor) {
        return;
    }

    function iconImage(svgBody) {
        var svg =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round">' +
            svgBody +
            "</svg>";
        var img = new Image();
        img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
        return img;
    }

    var icons = {
        powerline: iconImage('<rect x="16" y="16" width="32" height="32" rx="3"/>'),
        line: iconImage(
            '<line x1="12" y1="32" x2="52" y2="32"/><circle cx="12" cy="32" r="5" fill="#fff" stroke="none"/><circle cx="52" cy="32" r="5" fill="#fff" stroke="none"/>'
        ),
        luftspenn: iconImage('<polyline points="10,42 22,22 34,42 46,22 54,34"/>'),
        point: iconImage('<circle cx="32" cy="32" r="16"/><circle cx="32" cy="32" r="6"/>'),
        mast: iconImage('<circle cx="32" cy="32" r="16"/>')
    };

    var spinning = false;
    var wheel;

    function startWheel() {
        wheel = new WheelCtor(container, {
            items: [
                {
                    label: "Powerline",
                    backgroundColor: "rgba(142, 110, 168, 0.95)",
                    image: icons.powerline
                },
                {
                    label: "Line",
                    backgroundColor: "rgba(72, 90, 108, 0.95)",
                    image: icons.line
                },
                {
                    label: "Luftspenn",
                    backgroundColor: "rgba(72, 168, 155, 0.95)",
                    image: icons.luftspenn
                },
                {
                    label: "Point",
                    backgroundColor: "rgba(186, 196, 90, 0.95)",
                    image: icons.point
                },
                {
                    label: "Mast",
                    backgroundColor: "rgba(196, 110, 105, 0.95)",
                    image: icons.mast
                }
            ],
            itemLabelColors: ["transparent"],
            itemLabelFontSizeMax: 1,
            borderColor: "#1a1a1a",
            borderWidth: 3,
            lineColor: "#1a1a1a",
            lineWidth: 4,
            radius: 0.95,
            pointerAngle: 90,
            isInteractive: false,
            onRest: function (event) {
                spinning = false;
                var item = wheel.items[event.currentIndex];
                if (item && result) {
                    result.textContent = "Valgt: " + item.label;
                }
            }
        });

        wheel.items.forEach(function (item) {
            item.imageRadius = 0.72;
            item.imageScale = 0.42;
        });
    }

    function spinTheWheel() {
        if (spinning || !wheel) {
            return;
        }
        spinning = true;
        if (result) {
            result.textContent = "";
        }
        var index = Math.floor(Math.random() * wheel.items.length);
        wheel.spinToItem(index, 4000, true, 3, 1);
    }

    Promise.all(
        Object.keys(icons).map(function (key) {
            return icons[key].decode ? icons[key].decode() : Promise.resolve();
        })
    ).then(startWheel).catch(startWheel);

    spinBtn.addEventListener("click", spinTheWheel);
    container.addEventListener("click", spinTheWheel);
})();
