/**
 * 3D-vipping av bilder med klassen .kort-3d (brukes på Om oss).
 * Kortet vipper etter musepekeren når den er i seksjonen rundt bildet.
 * Respekterer prefers-reduced-motion og gjør ingenting på berøringsskjermer.
 */
(function () {
    if (!window.matchMedia) {
        return;
    }

    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var harMus = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reducedMotion || !harMus) {
        return;
    }

    var maksVinkel = 12;

    document.querySelectorAll(".kort-3d").forEach(function (kort) {
        var omrade = kort.closest("section") || kort;
        var ventende = false;
        var sisteX = 0;
        var sisteY = 0;

        function vipp() {
            var r = kort.getBoundingClientRect();
            // -1 til 1 i forhold til midten av kortet, begrenset så kortet ikke vipper for langt
            var dx = Math.max(-1, Math.min(1, (sisteX - (r.left + r.width / 2)) / (r.width / 2)));
            var dy = Math.max(-1, Math.min(1, (sisteY - (r.top + r.height / 2)) / (r.height / 2)));

            kort.style.setProperty("--tilt-y", (dx * maksVinkel).toFixed(2) + "deg");
            kort.style.setProperty("--tilt-x", (-dy * maksVinkel).toFixed(2) + "deg");
            kort.style.setProperty("--glans-x", (50 + dx * 50).toFixed(1) + "%");
            kort.style.setProperty("--glans-y", (50 + dy * 50).toFixed(1) + "%");
            ventende = false;
        }

        omrade.addEventListener("pointermove", function (e) {
            sisteX = e.clientX;
            sisteY = e.clientY;
            if (!ventende) {
                ventende = true;
                window.requestAnimationFrame(vipp);
            }
        });

        omrade.addEventListener("pointerleave", function () {
            kort.style.setProperty("--tilt-x", "0deg");
            kort.style.setProperty("--tilt-y", "0deg");
            kort.style.setProperty("--glans-x", "50%");
            kort.style.setProperty("--glans-y", "30%");
        });
    });
})();
