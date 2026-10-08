/*
Tastaturstyring for presentasjonsvideoen på Om oss.
Mellomrom eller K: pause/play. Pil venstre/høyre: spol 5 sekunder. J/L: spol 10 sekunder.
Gjelder bare når videoen har fokus eller musepekeren er over den, slik at vanlig scrolling med mellomrom ikke blir overstyrt.
*/
(function () {
    "use strict";

    var video = document.querySelector(".om-oss-video");
    if (!video) return;

    var SMALL_STEP = 5;
    var BIG_STEP = 10;
    var hovering = false;

    video.addEventListener("mouseenter", function () { hovering = true; });
    video.addEventListener("mouseleave", function () { hovering = false; });

    function seek(seconds) {
        var duration = isFinite(video.duration) ? video.duration : Infinity;
        video.currentTime = Math.min(Math.max(video.currentTime + seconds, 0), duration);
    }

    function togglePlay() {
        if (video.paused) {
            var attempt = video.play();
            if (attempt && attempt.catch) attempt.catch(function () {});
        } else {
            video.pause();
        }
    }

    document.addEventListener("keydown", function (event) {
        if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;

        var active = document.activeElement;
        var videoHasFocus = active === video;
        if (!videoHasFocus && !hovering) return;

        // Ikke ta over tastene fra andre kontroller som har fokus (lenker, knapper, felt)
        if (!videoHasFocus && active && active !== document.body) return;

        switch (event.key) {
            case " ":
            case "k":
            case "K":
                togglePlay();
                break;
            case "ArrowLeft":
                seek(-SMALL_STEP);
                break;
            case "ArrowRight":
                seek(SMALL_STEP);
                break;
            case "j":
            case "J":
                seek(-BIG_STEP);
                break;
            case "l":
            case "L":
                seek(BIG_STEP);
                break;
            default:
                return;
        }
        event.preventDefault();
    });

    // Når man kommer via «Se presentasjonsvideo» får videoen fokus, men uten å starte avspilling
    function focusFromHash() {
        if (location.hash === "#presentasjonsvideo") {
            video.focus({ preventScroll: true });
        }
    }
    focusFromHash();
    window.addEventListener("hashchange", focusFromHash);
})();
