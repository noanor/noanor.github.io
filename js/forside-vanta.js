/**
 * Vanta Globe-bakgrunn på Hjem (#forside).
 * Respekterer prefers-reduced-motion.
 */
(function () {
    var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var effect = VANTA.GLOBE({
        el: "#forside",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0xf6f4f1,
        color: 0x000000,
        color2: 0xffffff,
        size: 0.85
    });

    if (prefersReducedMotion && effect && typeof effect.pause === "function") {
        effect.pause();
    }
})();
