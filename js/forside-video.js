/*
Bakgrunnsvideo på forsiden: robust avspilling og pause/spill av-knapp.

- Velger lett eller full videofil ut fra skjermbredde, datasparing og hastighet.
- Prøver igjen når nettleseren nekter autoplay (strømsparing) ved første berøring/tast/scroll.
- Hvis videoen likevel ikke kommer i gang (strømsparing, treg dekning), spilles en lett bildesekvens
  på canvas i stedet. Den styres av JavaScript og kan ikke blokkeres av nettleserens autoplay-regler.
- Starter ikke av seg selv ved «reduser bevegelse», og pauses når den er utenfor skjermen.
- Knappen pauser og starter både video og reserveanimasjon (WCAG 2.2.2).
*/
(function () {
    "use strict";

    var video = document.getElementById("forside-video");
    var knapp = document.getElementById("forside-video-knapp");
    var seksjon = document.getElementById("forside");
    var lerret = document.getElementById("forside-reserve");
    if (!video || !knapp || !seksjon || !lerret) return;

    var ikon = knapp.querySelector("i");
    var brukerPauset = false;
    var synlig = true;
    var RESERVE_ETTER_MS = 3500;
    var reserveTimer = null;

    var redusertBevegelse = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Reserveanimasjon (bildesekvens) ---------- */

    var ctx = lerret.getContext("2d");
    var antall = parseInt(lerret.getAttribute("data-frames"), 10) || 0;
    var msPerBilde = 1000 / (parseInt(lerret.getAttribute("data-fps"), 10) || 8);
    var mappe = lerret.getAttribute("data-mappe");
    var bilder = [];
    var lastet = 0;
    var animKjorer = false;
    var animId = 0;
    var nr = 0;

    function lastBilder() {
        if (bilder.length) return;
        for (var i = 1; i <= antall; i++) {
            (function (bilde) {
                bilde.onload = function () { lastet++; };
                bilde.src = mappe + "f" + ("00" + i).slice(-3) + ".jpg";
                bilder.push(bilde);
            })(new Image());
        }
    }

    function tegn(bilde) {
        if (!bilde.complete || !bilde.naturalWidth) return false;
        // object-fit gjelder visningen; selve tegningen fyller hele lerretet
        ctx.drawImage(bilde, 0, 0, lerret.width, lerret.height);
        return true;
    }

    // setTimeout i stedet for requestAnimationFrame: fungerer også når nettleseren strupes ved strømsparing
    function tikk() {
        if (!animKjorer) return;
        animId = window.setTimeout(tikk, msPerBilde);
        if (!synlig || document.hidden) return;
        // Gå gjennom bildene som er lastet så langt, i rekkefølge
        for (var forsok = 0; forsok < antall; forsok++) {
            var bilde = bilder[nr % antall];
            nr = (nr + 1) % antall;
            if (tegn(bilde)) return;
        }
    }

    function startAnim() {
        if (animKjorer || !antall) return;
        lastBilder();
        animKjorer = true;
        tikk();
    }

    function stoppAnim() {
        animKjorer = false;
        window.clearTimeout(animId);
    }

    /* ---------- Tilstand og knapp ---------- */

    function setTilstand(tilstand) {
        seksjon.setAttribute("data-video", tilstand);
    }

    function spillerNa() {
        return (!video.paused && !video.ended) || animKjorer;
    }

    function oppdaterKnapp() {
        var spiller = spillerNa();
        knapp.setAttribute("aria-label", spiller ? "Pause bakgrunnsvideo" : "Spill av bakgrunnsvideo");
        ikon.className = "bi " + (spiller ? "bi-pause-fill" : "bi-play-fill");
    }

    function visReserve() {
        if (brukerPauset || redusertBevegelse) return;
        setTilstand("reserve");
        startAnim();
        oppdaterKnapp();
    }

    // Velg riktig fil før noe av videoen er lastet ned
    function velgKilde() {
        var kon = navigator.connection || {};
        var treg = kon.saveData || /(^|-)2g$|3g/.test(kon.effectiveType || "");
        var bred = window.matchMedia("(min-width: 1025px)").matches;
        var ny = null;

        if (treg) {
            ny = video.getAttribute("data-src-lite");
        } else if (bred) {
            ny = video.getAttribute("data-src-full");
            video.setAttribute("poster", video.getAttribute("data-poster-full"));
        }

        if (ny) {
            video.removeAttribute("autoplay");
            video.src = ny;
            video.load();
        }
    }

    function prov() {
        video.muted = true; // iOS krever muted som egenskap, ikke bare attributt
        var forsok = video.play();
        if (forsok && typeof forsok.catch === "function") {
            forsok.catch(function () {
                visReserve();
                oppdaterKnapp();
            });
        }
    }

    function start() {
        if (brukerPauset || redusertBevegelse) return;
        prov();
    }

    video.addEventListener("playing", function () {
        window.clearTimeout(reserveTimer);
        stoppAnim();
        setTilstand("spiller");
        oppdaterKnapp();
    });

    video.addEventListener("pause", function () {
        if (brukerPauset || redusertBevegelse) setTilstand("pauset");
        oppdaterKnapp();
    });

    video.addEventListener("error", visReserve);

    // Treg dekning: start reserveanimasjonen hvis videoen ikke har startet etter en liten stund
    if (!redusertBevegelse) {
        reserveTimer = window.setTimeout(function () {
            if (video.paused || video.readyState < 3) visReserve();
        }, RESERVE_ETTER_MS);
    }

    // Autoplay kan bli nektet (strømsparing). En brukerhandling gir lov til å spille av videoen.
    function gjenprov() { if (video.paused) start(); }
    ["touchstart", "pointerdown", "keydown", "scroll", "click"].forEach(function (navn) {
        window.addEventListener(navn, function (e) {
            if (e.target === knapp || knapp.contains(e.target)) return;
            gjenprov();
        }, { passive: true });
    });
    video.addEventListener("canplay", gjenprov);
    document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "visible") gjenprov();
    });

    // Spar batteri og data når forsiden er utenfor skjermen
    if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (poster) {
            synlig = poster[0].isIntersecting;
            if (synlig) { gjenprov(); } else if (!video.paused) { video.pause(); }
        }, { threshold: 0.05 }).observe(seksjon);
    }

    knapp.addEventListener("click", function () {
        if (spillerNa()) {
            brukerPauset = true;
            video.pause();
            stoppAnim();
            // Under reserveanimasjon blir siste bilde stående; ellers vises videoens stillbilde
            setTilstand(seksjon.getAttribute("data-video") === "reserve" ? "reserve" : "pauset");
        } else {
            brukerPauset = false;
            redusertBevegelse = false;
            setTilstand("spiller");
            prov(); // berøring er en brukerhandling, så videoen får normalt lov selv med strømsparing
        }
        oppdaterKnapp();
    });

    knapp.hidden = false;
    velgKilde();
    if (redusertBevegelse) {
        video.removeAttribute("autoplay");
        video.pause();
        setTilstand("pauset");
    } else {
        start();
    }
    oppdaterKnapp();
})();
