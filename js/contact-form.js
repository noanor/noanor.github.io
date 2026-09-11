(function () {
    // TODO: replace with the real Formspree endpoint, e.g. "https://formspree.io/f/abcdwxyz"
    var FORM_ENDPOINT = "https://formspree.io/f/mvkolylg";

    var form = document.getElementById("contact-form");
    if (!form) {
        return;
    }

    var status = document.getElementById("contact-form-status");
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (event) {
        event.preventDefault();

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
