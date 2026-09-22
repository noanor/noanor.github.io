(function () {
    var knapper = document.querySelectorAll(".kontakt-medlem-kopier");
    if (!knapper.length) {
        return;
    }

    var statusRegion = document.getElementById("kopier-status");

    knapper.forEach(function (knapp) {
        var ikon = knapp.querySelector("i");
        var tidsavbrudd = null;

        knapp.addEventListener("click", function () {
            var epost = knapp.getAttribute("data-email");

            function visKopiert() {
                clearTimeout(tidsavbrudd);

                ikon.className = "bi bi-check-lg";
                knapp.classList.add("kontakt-medlem-kopier-ok");
                knapp.setAttribute("aria-label", "Kopiert!");

                if (statusRegion) {
                    statusRegion.textContent = "E-postadressen " + epost + " er kopiert.";
                }

                tidsavbrudd = setTimeout(function () {
                    ikon.className = "bi bi-copy";
                    knapp.classList.remove("kontakt-medlem-kopier-ok");
                    knapp.setAttribute("aria-label", "Kopier e-postadresse");
                }, 1800);
            }

            function kopierMedTextarea() {
                var midlertidig = document.createElement("textarea");
                midlertidig.value = epost;
                midlertidig.style.position = "fixed";
                midlertidig.style.opacity = "0";
                document.body.appendChild(midlertidig);
                midlertidig.select();
                document.execCommand("copy");
                document.body.removeChild(midlertidig);
                visKopiert();
            }

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(epost).then(visKopiert, kopierMedTextarea);
                return;
            }

            kopierMedTextarea();
        });
    });
})();
