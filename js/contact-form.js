(function () {
    var FORM_ENDPOINT = "https://formspree.io/f/mvkolylg";
    var POPUP_DURATION = 6000;

    var form = document.getElementById("contact-form");
    if (!form) {
        return;
    }

    var status = document.getElementById("contact-form-status");
    var submitBtn = form.querySelector('button[type="submit"]');
    var emailField = document.getElementById("contact-email");
    var messageField = document.getElementById("contact-message");
    var popupHideTimeoutId = null;

    [emailField, messageField].forEach(function (field) {
        field.addEventListener("input", function () {
            if (field.value.trim()) {
                field.classList.remove("is-invalid");
            }
        });
    });

    function validate() {
        var valid = true;

        if (!emailField.value.trim() || !emailField.checkValidity()) {
            emailField.classList.add("is-invalid");
            valid = false;
        } else {
            emailField.classList.remove("is-invalid");
        }

        if (!messageField.value.trim()) {
            messageField.classList.add("is-invalid");
            valid = false;
        } else {
            messageField.classList.remove("is-invalid");
        }

        return valid;
    }

    function getPopup() {
        var popup = document.getElementById("contact-success-popup");
        if (popup) {
            return popup;
        }

        popup = document.createElement("div");
        popup.id = "contact-success-popup";
        popup.className = "contact-popup";
        popup.setAttribute("role", "status");
        popup.setAttribute("aria-live", "polite");

        popup.innerHTML =
            '<div class="contact-popup-content">' +
            '  <i class="bi bi-check-circle-fill contact-popup-icon" aria-hidden="true"></i>' +
            '  <p class="contact-popup-text">Takk for din henvendelse! Vi svarer så fort vi kan.</p>' +
            '  <button type="button" class="contact-popup-close" aria-label="Lukk">' +
            '    <i class="bi bi-x-lg" aria-hidden="true"></i>' +
            "  </button>" +
            "</div>" +
            '<div class="contact-popup-timer"><div class="contact-popup-timer-bar"></div></div>';

        document.body.append(popup);

        popup.querySelector(".contact-popup-close").addEventListener("click", hidePopup);

        return popup;
    }

    function hidePopup() {
        var popup = document.getElementById("contact-success-popup");
        if (!popup) {
            return;
        }

        popup.classList.remove("contact-popup-visible");

        if (popupHideTimeoutId) {
            clearTimeout(popupHideTimeoutId);
            popupHideTimeoutId = null;
        }
    }

    function showSuccessPopup() {
        var popup = getPopup();
        var bar = popup.querySelector(".contact-popup-timer-bar");

        if (popupHideTimeoutId) {
            clearTimeout(popupHideTimeoutId);
        }

        bar.style.transition = "none";
        bar.style.width = "100%";

        // Force reflow so the width reset above applies before the transition starts.
        void bar.offsetWidth;

        popup.classList.add("contact-popup-visible");

        requestAnimationFrame(function () {
            bar.style.transition = "width " + POPUP_DURATION + "ms linear";
            bar.style.width = "0%";
        });

        popupHideTimeoutId = setTimeout(hidePopup, POPUP_DURATION);
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validate()) {
            status.textContent = "Fyll ut e-post og melding før du sender.";
            status.className = "kontakt-form-status kontakt-form-status-error";
            return;
        }

        submitBtn.disabled = true;
        status.textContent = "Sender...";
        status.className = "kontakt-form-status";

        fetch(FORM_ENDPOINT, {
            method: "POST",
            body: new FormData(form),
            headers: { Accept: "application/json" }
        })
            .then(function (response) {
                if (response.ok) {
                    status.textContent = "Takk for din henvendelse! Vi svarer så fort vi kan.";
                    status.className = "kontakt-form-status kontakt-form-status-success";
                    form.reset();
                    showSuccessPopup();
                } else {
                    throw new Error("Formspree responded with an error");
                }
            })
            .catch(function () {
                status.innerHTML = "Noe gikk galt, og meldingen ble ikke sendt. Prøv igjen, eller send oss en e-post direkte på <a href=\"mailto:efeke@uia.no\">efeke@uia.no</a>.";
                status.className = "kontakt-form-status kontakt-form-status-error";
            })
            .finally(function () {
                submitBtn.disabled = false;
            });
    });
})();
