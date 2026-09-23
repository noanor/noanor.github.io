/**
 * Lightbox for bildegalleriene på medlemsprofilsidene.
 * Klikk (eller Enter/mellomrom) på et bilde åpner det i full størrelse,
 * med blurret bakgrunn, bildeteller og piler for å bla i samme galleri.
 */
(function () {
    var carousels = document.querySelectorAll(".member-gallery-carousel");

    if (!carousels.length) {
        return;
    }

    var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Bildevisning");
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.innerHTML =
        '<div class="lightbox-backdrop"></div>' +
        '<button type="button" class="lightbox-close" aria-label="Lukk bildevisning">' +
        '<i class="bi bi-x-lg" aria-hidden="true"></i></button>' +
        '<div class="lightbox-stage">' +
        '<button type="button" class="lightbox-nav lightbox-prev" aria-label="Forrige bilde">' +
        '<i class="bi bi-chevron-left" aria-hidden="true"></i></button>' +
        '<figure class="lightbox-content">' +
        '<img class="lightbox-image" src="" alt="">' +
        '<figcaption class="lightbox-caption"></figcaption>' +
        "</figure>" +
        '<button type="button" class="lightbox-nav lightbox-next" aria-label="Neste bilde">' +
        '<i class="bi bi-chevron-right" aria-hidden="true"></i></button>' +
        "</div>" +
        '<p class="lightbox-counter"><span class="lightbox-current">1</span> / <span class="lightbox-total">1</span></p>';

    document.body.appendChild(lightbox);

    var imageEl = lightbox.querySelector(".lightbox-image");
    var captionEl = lightbox.querySelector(".lightbox-caption");
    var currentEl = lightbox.querySelector(".lightbox-current");
    var totalEl = lightbox.querySelector(".lightbox-total");
    var closeBtn = lightbox.querySelector(".lightbox-close");
    var prevBtn = lightbox.querySelector(".lightbox-prev");
    var nextBtn = lightbox.querySelector(".lightbox-next");
    var backdrop = lightbox.querySelector(".lightbox-backdrop");
    var stage = lightbox.querySelector(".lightbox-stage");
    var focusableEls = [closeBtn, prevBtn, nextBtn];

    var images = [];
    var index = 0;
    var lastFocused = null;

    function show(newIndex) {
        index = (newIndex + images.length) % images.length;
        var item = images[index];
        imageEl.src = item.src;
        imageEl.alt = item.alt;
        captionEl.textContent = item.alt;
        currentEl.textContent = index + 1;
    }

    function open(imageList, startIndex, triggerEl) {
        images = imageList;
        lastFocused = triggerEl || document.activeElement;
        totalEl.textContent = images.length;
        show(startIndex);
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");
        document.addEventListener("keydown", onKeydown);
        closeBtn.focus();
    }

    function close() {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");
        document.removeEventListener("keydown", onKeydown);
        imageEl.src = "";
        if (lastFocused && typeof lastFocused.focus === "function") {
            lastFocused.focus();
        }
    }

    function onKeydown(event) {
        if (event.key === "Escape") {
            close();
        } else if (event.key === "ArrowLeft") {
            show(index - 1);
        } else if (event.key === "ArrowRight") {
            show(index + 1);
        } else if (event.key === "Tab") {
            trapFocus(event);
        }
    }

    function trapFocus(event) {
        var first = focusableEls[0];
        var last = focusableEls[focusableEls.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    closeBtn.addEventListener("click", close);
    backdrop.addEventListener("click", close);
    prevBtn.addEventListener("click", function () {
        show(index - 1);
    });
    nextBtn.addEventListener("click", function () {
        show(index + 1);
    });

    // Trykk hvor som helst i galleriet (bildet, luften rundt det, teksten)
    // for å gå ut av zoom – bare pil-knappene har sin egen handling.
    stage.addEventListener("click", function (event) {
        if (event.target.closest(".lightbox-nav")) {
            return;
        }
        close();
    });

    carousels.forEach(function (carousel) {
        var items = Array.prototype.slice.call(carousel.querySelectorAll(".carousel-item"));

        var imageList = items.map(function (item) {
            var img = item.querySelector("img");
            var caption = item.querySelector(".member-gallery-caption");
            return {
                src: img.src,
                alt: caption ? caption.textContent.trim() : img.alt
            };
        });

        items.forEach(function (item, i) {
            var img = item.querySelector("img");
            img.classList.add("member-gallery-image-trigger");
            img.setAttribute("role", "button");
            img.setAttribute("tabindex", "0");
            img.setAttribute("aria-label", "Åpne bildet «" + imageList[i].alt + "» i stort format");

            function trigger() {
                open(imageList, i, img);
            }

            img.addEventListener("click", trigger);
            img.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    trigger();
                }
            });
        });
    });
})();
