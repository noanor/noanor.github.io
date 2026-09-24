(function () {
    var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        return;
    }

    var selectors = [
        "[data-reveal]",
        ".om-oss-card",
        ".prosjekt-kort",
        ".team-card",
        ".gruppen-medlem",
        ".samarbeid-circle",
        ".tech-group",
        ".kontakt-medlem-card",
        ".stat-item",
        ".expo-block",
        ".section-heading"
    ].join(", ");

    function run() {
        var elements = Array.prototype.slice.call(document.querySelectorAll(selectors));

        if (!elements.length) {
            return;
        }

        var siblingCounts = new Map();

        elements.forEach(function (el) {
            var parent = el.parentElement;
            var index = siblingCounts.get(parent) || 0;
            siblingCounts.set(parent, index + 1);

            el.classList.add("reveal");
            el.style.animationDelay = Math.min(index * 70, 280) + "ms";
        });

        function clearRevealState(el) {
            // "forwards" fill-mode lar reveal-in-animasjonen fortsette å style
            // "transform" for alltid, noe som overstyrer :hover-løft på kort
            // (f.eks. team- og prosjektkortene) selv lenge etter at
            // inn-animasjonen er ferdig. Når animasjonen er ferdig fjerner vi
            // reveal-klassene slik at elementet går tilbake til normal
            // styling og :hover fungerer som forventet.
            el.classList.remove("reveal", "reveal-visible");
            el.style.animationDelay = "";
        }

        var observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    el.classList.add("reveal-visible");
                    el.addEventListener("animationend", function handler() {
                        el.removeEventListener("animationend", handler);
                        clearRevealState(el);
                    });
                    obs.unobserve(el);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        });

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", run);
    } else {
        run();
    }
})();
