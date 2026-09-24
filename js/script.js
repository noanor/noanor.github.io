var navn = [
    "Efe Kaan Eksi",
    "Hildid Musse",
    "Madalitso Phiri Skjelnes",
    "Marion Rasmussen",
    "Dennis Tea",
    "Noa Vincent Nordén"
];

var images = [
    "efe",
    "hildid",
    "madda",
    "marion",
    "dennis",
    "noa"
];

var roles = [
    "Gruppeleder",
    "Nestleder",
    ""
];

var ansvar = [
    ["Frontend", "UX"],
    ["Frontend", "Dokumentasjon"],
    ["Fullstack", "Sikkerhet"],
    ["Design", "Sikkerhet"],
    ["Frontend", "Design"],
    ["Fullstack", "UX"]
];

var cardText = [
    "Brenner for frontendutvikling og webdesign, med et sterkt fokus på gode brukeropplevelser.",
    "Brenner for å skape gode digitale brukeropplevelser, med interesse for UX-design, problemløsning og frontendutvikling.",
    "Jobber gjerne på tvers av stacken, med spesiell interesse for sikkerhet i systemene vi bygger.",
    "Har sansen for design og tydelig skriving, og bidrar med et kritisk blikk på sikkerhet.",
    "Arbeider med frontend, design og UX/UI, med fokus på å forstå brukernes behov og utvikle gjennomtenkte, brukervennlige løsninger.",
    "Trives både med fullstack-utvikling og å finpusse brukeropplevelsen."
];

var linkedinLinks = [
    "https://www.linkedin.com/in/efekaan-eksi-2b0a5239a/",
    "https://www.linkedin.com/in/hildid-musse-6679a8392/",
    "https://www.linkedin.com/in/madalitso-skjelnes-426741290/",
    "https://www.linkedin.com/in/marion-rasmussen-281298270/",
    "https://www.linkedin.com/in/dennistea/",
    "https://www.linkedin.com/in/noa-nordén-097556333/"
];

var githubLinks = [
    "https://github.com/efekaaneksi",
    "https://github.com/Mussinho777",
    "https://github.com/Phiri-Madalitso",
    "https://github.com/marionrasmussen",
    "https://github.com/dennistae",
    "https://github.com/noanor"
];

var emails = [
    "efeke@uia.no",
    "hsmusse@uia.no",
    "madalitsos@uia.no",
    "marionnr@uia.no",
    "denniste@uia.no",
    "noa.vincent.norden@uia.no"
];

var bios = [
    "Setter pris på en aktiv hverdag med trening, padel og fotball, og følger Real Madrid tett. Er også glad i fotografering og å tilbringe tid med venner og familie.",
    "Brenner for design, webutvikling og gode digitale brukeropplevelser, og verdsetter et sterkt samspill i teamet som nestleder. Utenom skjermen: styrketrening, boksing, fotball og reiser.",
    "Interessert i fullstack-utvikling og sikkerhet, og opptatt av å finne reelle problemer og bygge egne løsninger på dem. Snakker seks språk og elsker å reise, fotografere og lage mat.",
    "Hestejente med bakgrunn fra sprangridning på nasjonalt og internasjonalt nivå. Interessert i UX-design og sikkerhet, og glad i å reise og holde seg aktiv.",
    "Interessert i UX/UI, frontend, webutvikling og design, og opptatt av å bygge gjennomtenkte, brukervennlige løsninger. Utenfor skjermen er han glad i løping, reising og musikk.",
    "Strukturert og kreativ, med interesse for teknologi og digitale verktøy. Bruker fritiden på sport, trening, videospill, fotografering og å reise og oppleve nye kulturer."
];

var profileLinks = [
    "./team/efe-kaan-eksi.html",
    "./team/hildid-musse.html",
    "./team/madalitso-phiri-skjelnes.html",
    "./team/marion-rasmussen.html",
    "./team/dennis-tea.html",
    "./team/noa-vincent-norden.html"
];

var cardSection = document.getElementById("card-section");

if (cardSection) {
    var topRow = document.createElement('div');
    topRow.className = "card-row card-row-top";
    cardSection.append(topRow);

    var bottomRow = document.createElement('div');
    bottomRow.className = "card-row card-row-bottom";
    cardSection.append(bottomRow);

    for (var i = 0; i < navn.length; i += 1) {
        var role = roles[i] || "";
        var card = createCard(navn[i], images[i], role, ansvar[i], cardText[i], linkedinLinks[i], githubLinks[i], emails[i], i, profileLinks[i]);
        var targetRow = i < 3 ? topRow : bottomRow;

        targetRow.append(card);
    }

    createMemberModal();
}

function createCard(name, image, role, memberAnsvar, text, linkedinUrl, githubUrl, email, index, profileUrl) {
    // Card container
    var card = document.createElement("div");
    card.className = "card team-card";

    // Image
    var imageWrap = document.createElement("div");
    imageWrap.className = "team-card-image";
    card.append(imageWrap);

    var img = document.createElement("img");
    img.setAttribute("src", "./Media/Profil-pic/" + image + ".jpg");
    img.setAttribute("alt", name);
    img.id = 'image-' + `${image}`;
    imageWrap.append(img);

    // Card body
    var cardBody = document.createElement("div");
    cardBody.className = "card-body";
    card.append(cardBody);

    var cardTitle = document.createElement("h2");
    cardTitle.className = "card-title";
    cardTitle.textContent = `${name}`;

    var cardRole = document.createElement("div");
    cardRole.className = "card-role";

    if (role) {
        var leadTagEl = document.createElement("span");
        leadTagEl.className = "team-tag team-tag-lead";
        leadTagEl.textContent = role;
        cardRole.append(leadTagEl);
    }

    memberAnsvar.forEach(function (tag) {
        var tagEl = document.createElement("span");
        tagEl.className = "team-tag";
        tagEl.textContent = tag;
        cardRole.append(tagEl);
    });

    var cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = text;

    var socials = document.createElement("div");
    socials.className = "team-card-socials";

    var linkedinLink = document.createElement("a");
    linkedinLink.className = "team-card-social";
    linkedinLink.href = linkedinUrl;
    linkedinLink.target = "_blank";
    linkedinLink.rel = "noopener";
    linkedinLink.setAttribute("aria-label", "LinkedIn til " + name + " (åpnes i ny fane)");
    linkedinLink.innerHTML = '<i class="bi bi-linkedin" aria-hidden="true"></i>';

    var githubLink = document.createElement("a");
    githubLink.className = "team-card-social";
    githubLink.href = githubUrl;
    githubLink.target = "_blank";
    githubLink.rel = "noopener";
    githubLink.setAttribute("aria-label", "GitHub til " + name + " (åpnes i ny fane)");
    githubLink.innerHTML = '<i class="bi bi-github" aria-hidden="true"></i>';

    var mailLink = document.createElement("a");
    mailLink.className = "team-card-social";
    mailLink.href = "mailto:" + email;
    mailLink.setAttribute("aria-label", "Send e-post til " + name);
    mailLink.innerHTML = '<i class="bi bi-envelope" aria-hidden="true"></i>';

    socials.append(linkedinLink);
    socials.append(githubLink);
    socials.append(mailLink);

    var actions = document.createElement("div");
    actions.className = "team-card-actions";

    var detailsBtn = null;

    if (profileUrl) {
        // Kun ett, profesjonelt handlingsvalg når medlemmet har egen profilside:
        // hele kortet er klikkbart via stretched-link, i tillegg til selve knappen.
        var profileLink = document.createElement("a");
        profileLink.className = "btn btn-accent stretched-link";
        profileLink.href = profileUrl;
        profileLink.innerHTML = 'Se profil <i class="bi bi-arrow-right" aria-hidden="true"></i>';
        profileLink.setAttribute("aria-label", "Se profilen til " + name);
        actions.append(profileLink);
    } else {
        // Uten egen profilside ennå viser knappen en forhåndsvisning i en
        // modal, men har samme profesjonelle tekst som de andre kortene
        // siden alle etter hvert får sin egen profilside.
        detailsBtn = document.createElement('button');
        detailsBtn.type = "button";
        detailsBtn.className = "btn btn-accent";
        detailsBtn.innerHTML = 'Se profil <i class="bi bi-arrow-right" aria-hidden="true"></i>';
        detailsBtn.id = 'btn-' + `${image}`;
        detailsBtn.setAttribute("data-bs-toggle", "modal");
        detailsBtn.setAttribute("data-bs-target", "#memberModal");
        detailsBtn.setAttribute("data-index", index);
        actions.append(detailsBtn);
    }

    var cardFooter = document.createElement("div");
    cardFooter.className = "team-card-footer";
    cardFooter.append(socials);
    cardFooter.append(actions);

    cardBody.append(cardTitle);
    cardBody.append(cardRole);
    cardBody.append(cardText);
    cardBody.append(cardFooter);

    // Gjør hele profilboksen klikkbar, akkurat som prosjektkortene på
    // "Våre prosjekter". Når kortet ikke har en egen profilside, åpner et
    // klikk hvor som helst på kortet (utenom sosiale ikoner/knappen selv,
    // som håndterer sine egne klikk) den samme "Les mer"-modalen som knappen.
    if (detailsBtn) {
        card.addEventListener("click", function (event) {
            if (event.target.closest(".team-card-socials") || event.target.closest(".team-card-actions")) {
                return;
            }
            detailsBtn.click();
        });
    }

    return card;
}

function createMemberModal() {
    var modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "memberModal";
    modal.tabIndex = -1;
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-labelledby", "memberModalName");

    modal.innerHTML =
        '<div class="modal-dialog modal-dialog-centered">' +
        '  <div class="modal-content">' +
        '    <div class="modal-header">' +
        '      <h5 class="modal-title" id="memberModalName"></h5>' +
        '      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Lukk"></button>' +
        '    </div>' +
        '    <div class="modal-body">' +
        '      <img id="memberModalImage" src="" alt="" class="rounded mb-3">' +
        '      <p class="card-role" id="memberModalRole"></p>' +
        '      <p id="memberModalBio"></p>' +
        '    </div>' +
        '    <div class="modal-footer">' +
        '      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Lukk</button>' +
        '    </div>' +
        '  </div>' +
        '</div>';

    document.body.append(modal);

    modal.addEventListener('show.bs.modal', function (event) {
        var index = event.relatedTarget.getAttribute("data-index");

        modal.querySelector("#memberModalName").textContent = navn[index];
        modal.querySelector("#memberModalImage").setAttribute("src", "./Media/Profil-pic/" + images[index] + ".jpg");
        modal.querySelector("#memberModalImage").setAttribute("alt", navn[index]);
        modal.querySelector("#memberModalRole").textContent = roles[index] || "";
        modal.querySelector("#memberModalBio").textContent = bios[index];
    });
}
