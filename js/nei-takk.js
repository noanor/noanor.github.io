(function () {
    var knapp = document.getElementById("nei-takk-knapp");
    if (!knapp) {
        return;
    }

    var omrade = knapp.closest("section") || document.body;

    // Minste avstand (px) mellom musepekeren og kanten av knappen.
    var AVSTAND = 90;
    // Når pekeren er så langt unna startplassen, går knappen tilbake dit.
    var HJEM_AVSTAND = AVSTAND + 40;
    var KANT = 12;

    var x = 0;
    var y = 0;
    var sisteMus = null;

    function sett(nyX, nyY) {
        x = nyX;
        y = nyY;
        knapp.style.setProperty("--flykt-x", x + "px");
        knapp.style.setProperty("--flykt-y", y + "px");
    }

    // Knappens startplass (ved siden av "Ta kontakt"). offsetLeft/offsetTop påvirkes ikke av
    // translate, så målingen blir riktig selv midt i en animasjon.
    function hjemRekt() {
        var forelder = knapp.offsetParent || document.body;
        var f = forelder.getBoundingClientRect();
        return {
            left: f.left + knapp.offsetLeft - forelder.scrollLeft,
            top: f.top + knapp.offsetTop - forelder.scrollTop,
            width: knapp.offsetWidth,
            height: knapp.offsetHeight
        };
    }

    function avstandTil(v, t, b, h, musX, musY) {
        var dx = Math.max(v - musX, 0, musX - (v + b));
        var dy = Math.max(t - musY, 0, musY - (t + h));
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Holder knappen innenfor den synlige delen av seksjonen. Blir den klemt inn i et hjørne,
    // hopper den til et tilfeldig sted langt unna pekeren.
    function begrens(r, nyX, nyY, musX, musY) {
        var o = omrade.getBoundingClientRect();
        var venstre = Math.max(o.left, 0);
        var hoyre = Math.min(o.right, document.documentElement.clientWidth);
        var topp = Math.max(o.top, 0);
        var bunn = Math.min(o.bottom, window.innerHeight);

        var minX = venstre + KANT - r.left;
        var maxX = Math.max(minX, hoyre - KANT - r.width - r.left);
        var minY = topp + KANT - r.top;
        var maxY = Math.max(minY, bunn - KANT - r.height - r.top);

        var kx = Math.min(Math.max(nyX, minX), maxX);
        var ky = Math.min(Math.max(nyY, minY), maxY);

        if (avstandTil(r.left + kx, r.top + ky, r.width, r.height, musX, musY) < AVSTAND) {
            for (var i = 0; i < 20; i++) {
                var tx = minX + Math.random() * (maxX - minX);
                var ty = minY + Math.random() * (maxY - minY);
                if (avstandTil(r.left + tx, r.top + ty, r.width, r.height, musX, musY) >= AVSTAND * 2) {
                    return [tx, ty];
                }
            }
        }

        return [kx, ky];
    }

    function oppdater(musX, musY) {
        var r = hjemRekt();

        // Pekeren er langt unna startplassen: knappen glir tilbake ved siden av "Ta kontakt".
        if (avstandTil(r.left, r.top, r.width, r.height, musX, musY) >= HJEM_AVSTAND) {
            if (x !== 0 || y !== 0) {
                sett(0, 0);
            }
            return;
        }

        var v = r.left + x;
        var t = r.top + y;
        var lengdeTilKant = avstandTil(v, t, r.width, r.height, musX, musY);
        if (lengdeTilKant >= AVSTAND) {
            return;
        }

        // Flytt knappen rett bort fra pekeren til den har AVSTAND (pluss litt ekstra) igjen.
        var dx = v + r.width / 2 - musX;
        var dy = t + r.height / 2 - musY;
        var lengde = Math.sqrt(dx * dx + dy * dy) || 1;
        var steg = AVSTAND - lengdeTilKant + 30;

        var ny = begrens(r, x + (dx / lengde) * steg, y + (dy / lengde) * steg, musX, musY);
        sett(ny[0], ny[1]);
    }

    document.addEventListener("pointermove", function (e) {
        sisteMus = [e.clientX, e.clientY];
        oppdater(e.clientX, e.clientY);
    }, { passive: true });

    // Pekeren forlater vinduet: knappen går tilbake på plass.
    document.documentElement.addEventListener("mouseleave", function () {
        sisteMus = null;
        sett(0, 0);
    });

    // Siden kan scrolle slik at knappen havner under en musepeker som står stille.
    window.addEventListener("scroll", function () {
        if (sisteMus) {
            oppdater(sisteMus[0], sisteMus[1]);
        }
    }, { passive: true });

    // Berøringsskjermer har ingen peker som svever – knappen hopper unna ved berøring.
    knapp.addEventListener("pointerdown", function (e) {
        e.preventDefault();
        var r = hjemRekt();
        oppdater(r.left + x + r.width / 2, r.top + y + r.height / 2);
    });

    knapp.addEventListener("click", function (e) {
        e.preventDefault();
    });

    knapp.addEventListener("focus", function () {
        knapp.blur();
    });
})();
