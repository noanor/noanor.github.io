(function () {
    const page = document.documentElement.dataset.page || "";
    const home = page === "index" ? "" : "./index.html";

    const navbarHTML = `
    <nav class="navbar navbar-expand-lg" id="navbar">
        <div class="container-fluid px-4 px-xl-5">
            <a class="navbar-brand ms-2 me-lg-4 d-flex align-items-center gap-2" href="${home}#forside" aria-label="CORE-6 – til forsiden">
                <img src="./Media/logo-transparent.png" class="navbar-logo">
                <span class="navbar-brand-text brand-font">CORE-6</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav gap-lg-4 ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="${home}#om-oss">Om oss</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${home}#card-section">Teammedlemmer</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${home}#prosjekt">Prosjekter</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${home}#kontakt-oss">Kontakt</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`;

    const footerHTML = `
    <footer id="kontakt-oss" class="core-footer" aria-labelledby="footer-heading">
        <h2 id="footer-heading" class="visually-hidden">
            Kontakt og navigasjonsinformasjon
        </h2>

        <div class="container">
            <div class="row gy-5">

                <div class="col-12 col-md-5">
                    <div class="footer-brand">
                        <img src="./Media/logo-transparent.png" alt="CORE-6 logo" class="footer-logo-image">
                        <span class="footer-logo">CORE-6</span>
                        <span class="footer-line"></span>
                    </div>

                    <p class="footer-tagline">
                        Sammen bygger vi bedre.
                    </p>

                    <p class="footer-description">
                        Gruppe 7 – bachelorprosjekt innen IT og informasjonssystemer ved Universitetet i Agder.
                    </p>

                    <p class="footer-meta">
                        Bachelorprosjekt · Vår 2027
                    </p>
                </div>

                <div class="col-6 col-md-3">
                    <h3 class="footer-heading">Navigasjon</h3>

                    <nav aria-label="Hurtiglenker i bunntekst">
                        <ul class="footer-nav">
                            <li>
                                <a href="${home}#om-oss">
                                    Om oss
                                </a>
                            </li>
                            <li>
                                <a href="${home}#card-section">
                                    Teammedlemmer
                                </a>
                            </li>
                            <li>
                                <a href="${home}#prosjekt">
                                    Prosjekter
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div class="col-6 col-md-4">
                    <h3 class="footer-heading">Kontakt</h3>

                    <p class="footer-contact-text">
                        Har du spørsmål om prosjektet eller gruppen? Ta gjerne kontakt.
                    </p>

                    <address class="footer-contact">
                        <a href="tel:+4799686783">
                            <i class="bi bi-telephone" aria-hidden="true"></i>
                            <span>+47 996 86 783</span>
                        </a>

                        <a href="mailto:efeke@uia.no">
                            <i class="bi bi-envelope" aria-hidden="true"></i>
                            <span>efeke@uia.no</span>
                        </a>

                        <a
                            href="https://www.uia.no/studier/program/it-og-informasjonssystemer-bachelor/"
                            target="_blank"
                            rel="noopener"
                        >
                            <i class="bi bi-geo-alt" aria-hidden="true"></i>
                            <span>Universitetet i Agder, Kristiansand</span>
                        </a>
                    </address>
                </div>

            </div>

            <div class="footer-bottom">
                <p>
                    &copy; 2026–2027 CORE-6 · Gruppe 7
                </p>
            </div>
        </div>
    </footer>`;

    function mountLayout() {
        const navSlot = document.getElementById("site-navbar");
        if (navSlot) {
            navSlot.outerHTML = navbarHTML;
        }

        const footerSlot = document.getElementById("site-footer");
        if (footerSlot) {
            footerSlot.outerHTML = footerHTML;
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", mountLayout);
    } else {
        mountLayout();
    }
})();