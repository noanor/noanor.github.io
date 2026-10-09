(function () {
    var knapp = document.getElementById("nei-takk-knapp");
    if (!knapp) {
        return;
    }

    var omrade = knapp.closest("section") || document.body;

    // Minste avstand (px) mellom musepekeren og kanten av knappen.
    var AVSTAND = 90;
    var KANT = 12;

    var x = 0;
    var y = 0;

    function sett(nyX, nyY) {
        x = nyX;
        y = nyY;
        knapp.style.setProperty("--flykt-x", x + "px");
        knapp.style.setProperty("--flykt-y", y + "px");
    }

    // Knappens plassering uten forskyvning. offsetLeft/offsetTop påvirkes ikke av translate,
    // så målingen blir riktig selv midt i en animasjon.
    function grunnRekt() {
        var forelder = knapp.offsetParent || document.body;
        var f = forelder.getBoundingClientRect();
        return {
            left: f.left + knapp.offsetLeft - forelder.scrollLeft,
            top: f.top + knapp.offsetTop - forelder.scrollTop,
            width: knapp.offsetWidth,
            height: knapp.offsetHeight
        };
    }

    // Holder knappen innenfor seksjonen, og flytter den til et tilfeldig sted hvis den blir klemt i et hjørne.
    function begrens(nyX, nyY, musX, musY) {
        var r = grunnRekt();
        var o = omrade.getBoundingClientRect();
        var baseV = r.left;
        var baseT = r.top;

        // Bare den delen av seksjonen som faktisk er synlig i vinduet.
        var venstre = Math.max(o.left, 0);
        var hoyre = Math.min(o.right, document.documentElement.clientWidth);
        var topp = Math.max(o.top, 0);
        var bunn = Math.min(o.bottom, window.innerHeight);

        var minX = venstre + KANT - baseV;
        var maxX = Math.max(minX, hoyre - KANT - r.width - baseV);
        var minY = topp + KANT - baseT;
        var maxY = Math.max(minY, bunn - KANT - r.height - baseT);

        var kx = Math.min(Math.max(nyX, minX), maxX);
        var ky = Math.min(Math.max(nyY, minY), maxY);

        if (musX !== undefined && forNaer(baseV + kx, baseT + ky, r.width, r.height, musX, musY)) {
            // Klemt inn mot kanten: hopp til et tilfeldig sted langt unna musen.
            for (var i = 0; i < 20; i++) {
                var tx = minX + Math.random() * (maxX - minX);
                var ty = minY + Math.random() * (maxY - minY);
                if (!forNaer(baseV + tx, baseT + ty, r.width, r.height, musX, musY, 2)) {
                    return [tx, ty];
                }
            }
        }

        return [kx, ky];
    }

    function forNaer(v, t, b, h, musX, musY, faktor) {
        var grense = AVSTAND * (faktor || 1);
        var dx = Math.max(v - musX, 0, musX - (v + b));
        var dy = Math.max(t - musY, 0, musY - (t + h));
        return Math.sqrt(dx * dx + dy * dy) < grense;
    }

    function flykt(musX, musY) {
        var r = grunnRekt();
        var v = r.left + x;
        var t = r.top + y;
        if (!forNaer(v, t, r.width, r.height, musX, musY)) {
            return;
        }

        var cx = v + r.width / 2;
        var cy = t + r.height / 2;
        var dx = cx - musX;
        var dy = cy - musY;
        var lengde = Math.sqrt(dx * dx + dy * dy) || 1;

        // Hvor langt knappen må flytte seg for å få AVSTAND (pluss litt ekstra) til pekeren.
        var halv = Math.abs(dx / lengde) * r.width / 2 + Math.abs(dy / lengde) * r.height / 2;
        var steg = AVSTAND + halv - lengde + 30;

        var ny = begrens(x + (dx / lengde) * steg, y + (dy / lengde) * steg, musX, musY);
        sett(ny[0], ny[1]);
    }

    var sisteMus = null;

    document.addEventListener("pointermove", function (e) {
        sisteMus = [e.clientX, e.clientY];
        flykt(e.clientX, e.clientY);
    }, { passive: true });

    // Berøringsskjermer har ingen peker som svever – knappen hopper unna ved første berøring.
    knapp.addEventListener("pointerdown", function (e) {
        e.preventDefault();
        var r = grunnRekt();
        flykt(r.left + x + r.width / 2, r.top + y + r.height / 2);
    });

    knapp.addEventListener("click", function (e) {
        e.preventDefault();
    });

    knapp.addEventListener("focus", function () {
        knapp.blur();
    });

    // Etter scroll eller endring av vindusstørrelse kan knappen havne utenfor det synlige området.
    function tilpass() {
        var ny = begrens(x, y);
        sett(ny[0], ny[1]);
        // Siden kan ha scrollet slik at knappen havnet under en musepeker som står stille.
        if (sisteMus) {
            flykt(sisteMus[0], sisteMus[1]);
        }
    }

    window.addEventListener("resize", tilpass);
    window.addEventListener("scroll", tilpass, { passive: true });
})();
