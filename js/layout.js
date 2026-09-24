(function () {
    const page = document.documentElement.dataset.page || "";
    const projectDetailPages = ["luftfartshinder", "nkom", "smaragd-motorsport"];
    const memberDetailPages = ["dennis-tea", "hildid-musse", "efe-kaan-eksi", "noa-vincent-norden"];
    const activePage = projectDetailPages.includes(page)
        ? "prosjekter"
        : memberDetailPages.includes(page)
            ? "team"
            : page;

    const navItems = [
        { key: "index", label: "Hjem", href: "./index.html" },
        { key: "om-oss", label: "Om oss", href: "./om-oss.html" },
        { key: "team", label: "Team", href: "./team.html" },
        { key: "prosjekter", label: "Våre prosjekter", href: "./prosjekter.html" },
        { key: "kontakt", label: "Kontakt", href: "./kontakt.html" }
    ];

    const navLinksHTML = navItems.map(function (item) {
        const activeClass = item.key === activePage ? " active" : "";
        const ariaCurrent = item.key === activePage ? ' aria-current="page"' : "";
        return (
            '<li class="nav-item">' +
            '<a class="nav-link' + activeClass + '" href="' + item.href + '"' + ariaCurrent + '>' + item.label + '</a>' +
            '</li>'
        );
    }).join("");

    const footerNavHTML = navItems.map(function (item) {
        return '<li><a href="' + item.href + '">' + item.label + '</a></li>';
    }).join("");

    const navbarHTML = `
    <nav class="navbar navbar-expand-lg" id="navbar">
        <div class="container">
            <a class="navbar-brand me-lg-4 d-flex align-items-center gap-2" href="./index.html" aria-label="CORE-6 – til forsiden">
                <img src="./Media/logo-c6-white.png" alt="" class="navbar-logo">
                <span class="navbar-brand-text brand-font">CORE-6</span>
            </a>
            <button class="navbar-toggler" type="button" id="navbarToggler" aria-controls="navbarNav" aria-expanded="false" aria-label="Vis eller skjul meny">
                <span class="navbar-toggler-bar"></span>
                <span class="navbar-toggler-bar"></span>
                <span class="navbar-toggler-bar"></span>
            </button>

            <div class="navbar-collapse" id="navbarNav">
                <ul class="navbar-nav gap-lg-4 ms-auto">
                    ${navLinksHTML}
                </ul>
            </div>
        </div>
    </nav>`;

    const footerHTML = `
    <footer class="core-footer" aria-labelledby="footer-heading">
        <h2 id="footer-heading" class="visually-hidden">
            Kontakt og navigasjonsinformasjon
        </h2>

        <div class="container">
            <div class="row gy-5">

                <div class="col-12 col-md-5">
                    <div class="footer-brand">
                        <img src="./Media/logo-c6-white.png" alt="" class="footer-logo-image">
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
                    <h3 class="footer-heading">Sider</h3>

                    <nav aria-label="Hurtiglenker i bunntekst">
                        <ul class="footer-nav">
                            ${footerNavHTML}
                        </ul>
                    </nav>
                </div>

                <div class="col-6 col-md-4">
                    <h3 class="footer-heading">Kontakt</h3>

                    <address class="footer-contact">
                        <div class="footer-contact-person">
                            <span class="footer-contact-name">Efe Kaan Eksi</span>
                            <span class="footer-contact-role">Gruppeleder / Kontaktperson</span>
                        </div>

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
                            <span class="visually-hidden">(åpnes i ny fane)</span>
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

        setupHeaderScrollBehavior();
        setupMobileNav();
    }

    function setupMobileNav() {
        const toggler = document.getElementById("navbarToggler");
        const collapseEl = document.getElementById("navbarNav");

        if (!toggler || !collapseEl) {
            return;
        }

        const MOBILE_BREAKPOINT = 992;

        function closeMenu() {
            collapseEl.classList.remove("is-open");
            toggler.setAttribute("aria-expanded", "false");
            document.body.classList.remove("mobile-nav-open");
        }

        function openMenu() {
            collapseEl.classList.add("is-open");
            toggler.setAttribute("aria-expanded", "true");
            document.body.classList.add("mobile-nav-open");
        }

        toggler.addEventListener("click", function () {
            if (collapseEl.classList.contains("is-open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        collapseEl.querySelectorAll(".nav-link").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && collapseEl.classList.contains("is-open")) {
                closeMenu();
                toggler.focus();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth >= MOBILE_BREAKPOINT && collapseEl.classList.contains("is-open")) {
                closeMenu();
            }
        });
    }

    function setupHeaderScrollBehavior() {
        const navbar = document.getElementById("navbar");
        if (!navbar) {
            return;
        }

        const hero = page === "index" ? document.getElementById("forside") : null;

        if (!hero) {
            navbar.classList.add("scrolled");
            return;
        }

        let ticking = false;

        function updateNavbarState() {
            const threshold = Math.min(
                hero.offsetHeight - navbar.offsetHeight,
                hero.offsetHeight * 0.6
            );
            const shouldBeSolid = window.scrollY >= threshold;
            navbar.classList.toggle("scrolled", shouldBeSolid);
            ticking = false;
        }

        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbarState);
                ticking = true;
            }
        }

        updateNavbarState();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", mountLayout);
    } else {
        mountLayout();
    }
})();
