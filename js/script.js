var navn = [
    "Efe Kaan Eksi",
    "Hildiddy Musse",
    "Madalitso Phiri Skjelnes",
    "Marion Rasmussen",
    "Dennis Tea",
    "Noa Vincent Nordén"
];

var images = [
    "efe",
    "hildiddy",
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

var cardSection = document.getElementById("card-section");
var cardRow = document.createElement('div');
cardRow.className = "card-row";
cardSection.append(cardRow);



for (var i = 0; i < navn.length; i += 1) {
    var role = roles[i] || "";
    var card = createCard(navn[i], images[i], role, cardText[i]);

    cardRow.append(card);
}

function createCard(name, image, role, text) {
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
    img.setAttribute("src", "./Media/Profil-pic/" + images[i] + ".jpg");
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

    // var detailsBtn = document.createElement('a');
    // detailsBtn.className = "btn btn-accent";
    // detailsBtn.textContent = "Se mer";
    // detailsBtn.id = 'btn-' + `${image}`;

    cardBody.append(cardTitle);
    cardBody.append(cardRole);
    cardBody.append(cardText);
    // cardBody.append(detailsBtn);

    return card;
}