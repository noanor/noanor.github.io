(function () {
    var wrapper = document.querySelector(".tidslinje-wrapper");
    if (!wrapper) {
        return;
    }

    var punkter = Array.prototype.slice.call(wrapper.querySelectorAll(".tidslinje-punkt"));
    var pil = wrapper.querySelector(".tidslinje-pil");
    var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Datoene bak hvert punkt på tidslinjen, brukt til å regne ut hvor langt vi faktisk har kommet.
    var datoer = [
        new Date(2026, 7, 1),   // August 2026
        new Date(2026, 9, 21),  // 21. oktober 2026
        new Date(2026, 11, 31), // Desember 2026
        new Date(2027, 0, 1),   // Januar 2027
        new Date(2027, 5, 30)   // Juni 2027
    ];

    function beregnFremdrift() {
        var idag = new Date();
        var siste = datoer.length - 1;

        if (idag <= datoer[0]) {
            return 0;
        }

        if (idag >= datoer[siste]) {
            return 1;
        }

        for (var i = 0; i < siste; i++) {
            if (idag >= datoer[i] && idag < datoer[i + 1]) {
                var segmentLengde = datoer[i + 1] - datoer[i];
                var segmentForlop = idag - datoer[i];
                return (i + segmentForlop / segmentLengde) / siste;
            }
        }

        return 1;
    }

    function aktiver() {
        var fremdrift = beregnFremdrift();

        wrapper.style.setProperty("--fremdrift", fremdrift);
        wrapper.classList.add("tidslinje-fylt");

        punkter.forEach(function (punkt, index) {
            var terskel = index / (datoer.length - 1);
            if (fremdrift >= terskel - 0.001) {
                punkt.querySelector(".tidslinje-dot").classList.add("tidslinje-dot-naadd");
            }
        });

        if (pil && fremdrift >= 0.999) {
            pil.classList.add("tidslinje-pil-naadd");
        }
    }

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        aktiver();
        return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                aktiver();
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.35
    });

    observer.observe(wrapper);
})();
