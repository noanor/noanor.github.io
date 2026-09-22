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

        var observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                    obs.unobserve(entry.target);
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
