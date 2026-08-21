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
    "profilbilde"
];

var cardSection = document.getElementById("card-section");
var row1 = document.createElement('div');
row1.className = "card-row-1";
var row2 = document.createElement('div');
row2.className = "card-row-2";
cardSection.append(row1);
cardSection.append(row2);

for(var i = 0; i < navn.length; i+=1){
    // Card container
    var card = document.createElement("div");
    card.className = "card mb-3";
    card.style = "max-width: 540px;";

    // Row
    var div2 = document.createElement("div");
    div2.className = "row g-0";
    card.append(div2);

    // Col
    var div3 = document.createElement("div");
    div3.className = "col-md-4 card-image";
    div2.append(div3);

    // Image
    var img = document.createElement("img");
    img.setAttribute("src", "../images/" + `${images[i]}` + ".jpg");
    img.setAttribute("alt", "...")
    img.style = "width: 200px;"
    img.className = "img.fluid rounded-start";
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
    cardTitle.innerHTML = `${navn[i]}`;
    
    var cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.innerHTML = "Sample text";

    var cardSmallText = document.createElement("p");
    cardSmallText.className = "card-text";
    cardSmallText.innerHTML = "<small class='text-body-secondary'>Last updated 3 mins ago</small>"


    cardBody.append(cardTitle);
    cardBody.append(cardText);
    cardBody.append(cardSmallText);


    

    if (i < 3) {
        row1.append(card);
    } else {
        row2.append(card);
    }

}

{/* 
<div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-4 card-image">
            <img src="../images/efe.jpg" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Efe Kaan Eksi</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
            </div>
        </div>
    </div>
</div> */}