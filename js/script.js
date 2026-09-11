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

var cardText = [
    "Interesse for frontend, webdesign og UX",
    "Interesse for frontend, akademisk skriving og UX",
    "Interesse for fullstack utvikling og sikkerhet",
    "Interesse for design, skriving og sikkerhet",
    "Interesse for frontendutvikling og design",
    "Interesse for fullstack utvikling og UX"
];

var bios = [
    "TODO: Skriv en kort bio for Efe Kaan Eksi",
    "TODO: Skriv en kort bio for Hildid Musse",
    "TODO: Skriv en kort bio for Madalitso Phiri Skjelnes",
    "TODO: Skriv en kort bio for Marion Rasmussen",
    "TODO: Skriv en kort bio for Dennis Tea",
    "TODO: Skriv en kort bio for Noa Vincent Nordén"
];

var cardSection = document.getElementById("card-section");
var cardRow = document.createElement('div');
cardRow.className = "card-row";
cardSection.append(cardRow);



for (var i = 0; i < navn.length; i += 1) {
    var role = roles[i] || "";
    var card = createCard(navn[i], images[i], role, cardText[i], i);

    cardRow.append(card);
}

createMemberModal();

function createCard(name, image, role, text, index) {
    // Card container
    var card = document.createElement("div");
    card.className = "card mb-3 team-card";

    // Row
    var div2 = document.createElement("div");
    div2.className = "row g-0";
    div2.style.cssText = "overflow: hidden;";
    card.append(div2);

    // Col
    var div3 = document.createElement("div");
    div3.className = "col-md-4 card-image rounded start";
    div2.append(div3);

    // Image
    var img = document.createElement("img");
    img.setAttribute("src", "./Media/Profil-pic/" + image + ".jpg");
    img.setAttribute("alt", "...")
    // img.style.cssText = "width: 200px;"
    img.className = "rounded-start";
    img.id = 'image-' + `${image}`;
    div3.append(img)

    // Col
    var div4 = document.createElement("div");
    div4.className = "col-md-8";
    div2.append(div4);

    // Card body
    var cardBody = document.createElement("div");
    cardBody.className = "card-body";
    div4.append(cardBody);

    var cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = `${name}`;

    var cardRole = document.createElement("p");
    cardRole.className = "card-role";
    cardRole.textContent = role;

    var cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = text;

    var detailsBtn = document.createElement('button');
    detailsBtn.type = "button";
    detailsBtn.className = "btn btn-accent";
    detailsBtn.textContent = "Detaljer";
    detailsBtn.id = 'btn-' + `${image}`;
    detailsBtn.setAttribute("data-bs-toggle", "modal");
    detailsBtn.setAttribute("data-bs-target", "#memberModal");
    detailsBtn.setAttribute("data-index", index);

    cardBody.append(cardTitle);
    cardBody.append(cardRole);
    cardBody.append(cardText);
    cardBody.append(detailsBtn);

    return card;
}

function createMemberModal() {
    var modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "memberModal";
    modal.tabIndex = -1;
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML =
        '<div class="modal-dialog modal-dialog-centered">' +
        '  <div class="modal-content">' +
        '    <div class="modal-header">' +
        '      <h5 class="modal-title" id="memberModalName"></h5>' +
        '      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Lukk"></button>' +
        '    </div>' +
        '    <div class="modal-body">' +
        '      <img id="memberModalImage" src="" alt="..." class="rounded mb-3">' +
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
        modal.querySelector("#memberModalRole").textContent = roles[index] || "";
        modal.querySelector("#memberModalBio").textContent = bios[index];
    });
}