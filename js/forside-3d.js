/**
 * 3D-vipping av gruppebildet på Hjem (#forside).
 * Kortet vipper etter musepekeren. Respekterer prefers-reduced-motion
 * og gjør ingenting på berøringsskjermer.
 */
(function () {
    var hero = document.getElementById("forside");
    var figur = hero ? hero.querySelector(".forside-3d") : null;
    if (!figur || !window.matchMedia) {
        return;
    }

    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var harMus = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reducedMotion || !harMus) {
        return;
    }

    var maksVinkel = 12;
    var ventende = false;
    var sisteX = 0;
    var sisteY = 0;

    function oppdater() {
        var r = figur.getBoundingClientRect();
        // -1 til 1 i forhold til midten av kortet, begrenset så kortet ikke vipper for langt
        var dx = Math.max(-1, Math.min(1, (sisteX - (r.left + r.width / 2)) / (r.width / 2)));
        var dy = Math.max(-1, Math.min(1, (sisteY - (r.top + r.height / 2)) / (r.height / 2)));

        figur.style.setProperty("--tilt-y", (dx * maksVinkel).toFixed(2) + "deg");
        figur.style.setProperty("--tilt-x", (-dy * maksVinkel).toFixed(2) + "deg");
        figur.style.setProperty("--glans-x", (50 + dx * 50).toFixed(1) + "%");
        figur.style.setProperty("--glans-y", (50 + dy * 50).toFixed(1) + "%");
        ventende = false;
    }

    hero.addEventListener("pointermove", function (e) {
        sisteX = e.clientX;
        sisteY = e.clientY;
        if (!ventende) {
            ventende = true;
            window.requestAnimationFrame(oppdater);
        }
    });

    hero.addEventListener("pointerleave", function () {
        figur.style.setProperty("--tilt-x", "0deg");
        figur.style.setProperty("--tilt-y", "0deg");
        figur.style.setProperty("--glans-x", "50%");
        figur.style.setProperty("--glans-y", "30%");
    });
})();
