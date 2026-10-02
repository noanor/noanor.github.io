/**
 * Lasteside på forsiden.
 * Viser logoen som spinner til siden er lastet (minst MIN_TID, maks MAKS_TID),
 * så glir gardinene til side og lastesiden fjernes.
 * Klassen .vis-laster settes av et lite skript i <head> første gang i økten.
 */
(function () {
    var html = document.documentElement;
    var laster = document.querySelector(".laster");

    if (!laster || !html.classList.contains("vis-laster")) {
        if (laster) {
            laster.remove();
        }
        return;
    }

    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var MIN_TID = reducedMotion ? 400 : 1700;
    var MAKS_TID = 3500;
    var start = Date.now();
    var ferdig = false;

    function apne() {
        if (ferdig) {
            return;
        }
        ferdig = true;

        var vent = Math.max(0, MIN_TID - (Date.now() - start));

        window.setTimeout(function () {
            // 1) Logoen tones ut
            laster.classList.add("laster-ferdig");

            window.setTimeout(function () {
                // 2) Gardinene glir til side, og forsiden slippes fri
                laster.classList.add("laster-apner");
                html.classList.remove("vis-laster");

                window.setTimeout(function () {
                    laster.remove();
                }, reducedMotion ? 450 : 1350);
            }, reducedMotion ? 0 : 380);
        }, vent);
    }

    if (document.readyState === "complete") {
        apne();
    } else {
        window.addEventListener("load", apne);
    }

    // Ikke la tunge filer (som videoen) holde lastesiden oppe for lenge
    window.setTimeout(apne, MAKS_TID);
})();
