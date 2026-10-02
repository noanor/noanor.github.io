/**
 * Forsiden (#forside):
 *  - et punktnett i bakgrunnen som bølger rolig, trekkes mot musepekeren og
 *    sender ut en ringbølge når man klikker eller trykker
 *  - 3D-vipping av gruppebildet etter musepekeren
 * Respekterer prefers-reduced-motion og pauser når forsiden ikke er synlig.
 */
(function () {
    var hero = document.getElementById("forside");
    if (!hero || !window.matchMedia) {
        return;
    }

    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var harMus = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    var peker = { x: -9999, y: -9999, aktiv: false };

    /* ---------- Punktnett i bakgrunnen ---------- */

    var canvas = hero.querySelector(".forside-bakgrunn");
    var ctx = canvas ? canvas.getContext("2d") : null;
    var punkter = [];
    var bolger = [];
    var bredde = 0;
    var hoyde = 0;
    var synlig = true;
    var animasjon = null;

    var AVSTAND = 38;
    var RADIUS = 170;
    var AKSENT = "184, 101, 30";
    var NAVY = "33, 29, 26";

    function lagPunkter() {
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        bredde = hero.clientWidth;
        hoyde = hero.clientHeight;
        canvas.width = Math.round(bredde * dpr);
        canvas.height = Math.round(hoyde * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        var avstand = bredde < 768 ? AVSTAND + 8 : AVSTAND;
        punkter = [];
        for (var y = avstand / 2; y < hoyde; y += avstand) {
            for (var x = avstand / 2; x < bredde; x += avstand) {
                punkter.push({ x: x, y: y });
            }
        }
    }

    function tegn(tid) {
        var t = (tid || 0) / 1000;
        ctx.clearRect(0, 0, bredde, hoyde);

        var naere = [];

        for (var i = 0; i < punkter.length; i++) {
            var p = punkter[i];
            // Rolig bølge gjennom hele nettet
            var bolge = reducedMotion ? 0 : Math.sin(p.x * 0.012 + t * 0.9) * Math.cos(p.y * 0.014 + t * 0.7);
            var x = p.x;
            var y = p.y + bolge * 4;
            var styrke = 0;
            var pekerStyrke = 0;

            // Trekk mot musepekeren
            if (peker.aktiv) {
                var dx = peker.x - x;
                var dy = peker.y - y;
                var d = Math.sqrt(dx * dx + dy * dy);
                if (d < RADIUS) {
                    pekerStyrke = 1 - d / RADIUS;
                    styrke = pekerStyrke;
                    x += dx * pekerStyrke * 0.22;
                    y += dy * pekerStyrke * 0.22;
                }
            }

            // Ringbølger fra klikk
            for (var b = 0; b < bolger.length; b++) {
                var r = bolger[b];
                var bx = x - r.x;
                var by = y - r.y;
                var bd = Math.sqrt(bx * bx + by * by) || 1;
                var naerRing = 1 - Math.min(1, Math.abs(bd - r.radius) / 40);
                if (naerRing > 0) {
                    var kraft = naerRing * r.liv * 10;
                    x += (bx / bd) * kraft;
                    y += (by / bd) * kraft;
                    styrke = Math.max(styrke, naerRing * r.liv);
                }
            }

            var storrelse = 1.3 + styrke * 2.4 + (bolge + 1) * 0.25;
            ctx.beginPath();
            ctx.arc(x, y, storrelse, 0, Math.PI * 2);
            ctx.fillStyle = styrke > 0.05
                ? "rgba(" + AKSENT + ", " + (0.35 + styrke * 0.6).toFixed(3) + ")"
                : "rgba(" + NAVY + ", 0.16)";
            ctx.fill();

            if (pekerStyrke > 0.35) {
                naere.push({ x: x, y: y, s: pekerStyrke });
            }
        }

        // Linjer fra musepekeren til de nærmeste punktene
        for (var n = 0; n < naere.length; n++) {
            ctx.beginPath();
            ctx.moveTo(peker.x, peker.y);
            ctx.lineTo(naere[n].x, naere[n].y);
            ctx.strokeStyle = "rgba(" + AKSENT + ", " + (naere[n].s * 0.35).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Selve ringene
        for (var k = bolger.length - 1; k >= 0; k--) {
            var ring = bolger[k];
            ctx.beginPath();
            ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(" + AKSENT + ", " + (ring.liv * 0.4).toFixed(3) + ")";
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ring.radius += 6;
            ring.liv -= 0.012;
            if (ring.liv <= 0) {
                bolger.splice(k, 1);
            }
        }
    }

    function loop(tid) {
        tegn(tid);
        animasjon = window.requestAnimationFrame(loop);
    }

    function start() {
        if (!animasjon && synlig && !document.hidden) {
            animasjon = window.requestAnimationFrame(loop);
        }
    }

    function stopp() {
        if (animasjon) {
            window.cancelAnimationFrame(animasjon);
            animasjon = null;
        }
    }

    if (ctx) {
        lagPunkter();

        if (reducedMotion) {
            tegn(0);
            window.addEventListener("resize", function () {
                lagPunkter();
                tegn(0);
            });
        } else {
            start();

            var resizeVenter = null;
            window.addEventListener("resize", function () {
                window.clearTimeout(resizeVenter);
                resizeVenter = window.setTimeout(lagPunkter, 150);
            });

            if ("IntersectionObserver" in window) {
                new IntersectionObserver(function (oppforinger) {
                    synlig = oppforinger[0].isIntersecting;
                    if (synlig) { start(); } else { stopp(); }
                }).observe(hero);
            }

            document.addEventListener("visibilitychange", function () {
                if (document.hidden) { stopp(); } else { start(); }
            });

            hero.addEventListener("pointerdown", function (e) {
                // Ikke lag bølger når man trykker på knapper eller lenker
                if (e.target.closest("a, button")) {
                    return;
                }
                var r = hero.getBoundingClientRect();
                bolger.push({ x: e.clientX - r.left, y: e.clientY - r.top, radius: 0, liv: 1 });
                if (bolger.length > 5) {
                    bolger.shift();
                }
            });
        }
    }

    /* ---------- 3D-vipping av gruppebildet ---------- */

    var figur = hero.querySelector(".forside-3d");
    var maksVinkel = 12;
    var ventende = false;

    function vipp() {
        var r = figur.getBoundingClientRect();
        var h = hero.getBoundingClientRect();
        var px = peker.x + h.left;
        var py = peker.y + h.top;
        // -1 til 1 i forhold til midten av kortet, begrenset så kortet ikke vipper for langt
        var dx = Math.max(-1, Math.min(1, (px - (r.left + r.width / 2)) / (r.width / 2)));
        var dy = Math.max(-1, Math.min(1, (py - (r.top + r.height / 2)) / (r.height / 2)));

        figur.style.setProperty("--tilt-y", (dx * maksVinkel).toFixed(2) + "deg");
        figur.style.setProperty("--tilt-x", (-dy * maksVinkel).toFixed(2) + "deg");
        figur.style.setProperty("--glans-x", (50 + dx * 50).toFixed(1) + "%");
        figur.style.setProperty("--glans-y", (50 + dy * 50).toFixed(1) + "%");
        ventende = false;
    }

    hero.addEventListener("pointermove", function (e) {
        var r = hero.getBoundingClientRect();
        peker.x = e.clientX - r.left;
        peker.y = e.clientY - r.top;
        peker.aktiv = e.pointerType === "mouse" || e.pointerType === "pen";

        if (figur && harMus && !reducedMotion && !ventende) {
            ventende = true;
            window.requestAnimationFrame(vipp);
        }
    });

    hero.addEventListener("pointerleave", function () {
        peker.aktiv = false;
        if (figur) {
            figur.style.setProperty("--tilt-x", "0deg");
            figur.style.setProperty("--tilt-y", "0deg");
            figur.style.setProperty("--glans-x", "50%");
            figur.style.setProperty("--glans-y", "30%");
        }
    });
})();
