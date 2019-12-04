
const displayResults = () => {

    let toggle = document.querySelector(".toggle-container");
    toggle.style.display = "block";
};

const totalBreaches = (number) => {

    let div = document.querySelector(".results-text");
    div.innerHTML = `HIBP has found ${number} Breaches!`;
};

const newElement = (selector, element = "div") => {

    let node = document.createElement(element);
    node.className = selector;
    return node;
};

const resultSize = (number) => {

    switch(number){
        case 1:
            return "one";
        case 2:
            return "two";
        case 3: 
            return "three";
        default:
            return  "four"
    };
  
};

const createCards = (data) => {

    let num = data.length;
    totalBreaches(num);
    let resultNum = resultSize(num);

    let index = newElement("breach-index");
    index.id = resultNum;

    for(let i = 0; i < data.length; i++){
        let currentCard = createCard(data[i], resultNum);
        addEventListnerToCard(currentCard);
        index.appendChild(currentCard);
    };

    document.getElementById("brc").appendChild(index);
};

const createCard = (breach, resultNum) => {
    
    let card = newElement("card card-is-collapsed");

    const {Title, DataClasses, Description, LogoPath} = breach;

    card.appendChild(createBreachBtn(Title));

    card.appendChild(createInfoExpander(resultNum, Description, LogoPath, DataClasses));

    return card;
};

const createBreachBtn = (title) => {

    let btn = newElement("breach-card");
    let cardTitle = newElement("card-title");

    cardTitle.innerHTML = title;
    btn.appendChild(cardTitle);

    return btn;
};

const createInfoExpander = (resultNum, description, logo, items) => { 

    let infoExpander = newElement(`info-expander ${resultNum}`);
    
    infoExpander.appendChild(createLogo(logo));
    
    let compromisedTitle = newElement("compromised-title");
    infoExpander.appendChild(compromisedTitle);

    infoExpander.appendChild(createCompromisedItems(items));

    let descript = newElement("description");
    descript.innerHTML = description;
    infoExpander.appendChild(descript);

    return infoExpander;
}

const createLogo = (logo) => {

    let logoDataContainer = newElement("logo-date-container");
    let logoContainer = newElement("logo-container");
    let img = document.createElement("img");
    img.src = logo;

    logoContainer.appendChild(img);
    logoDataContainer.appendChild(logoContainer);
    return logoDataContainer;
};

const createCompromisedItems = (items) => {

    let container = newElement("compromised-items-container", "ul");
    
    for(let i = 0; i < items.length; i++){
        let item = newElement("items", "li");
        item.innerHTML = items[i];
        container.appendChild(item);
    };
    
    let border = newElement("compromised-items-border");
    border.appendChild(container);
    return border;
};

const removeCards = () => {

    let node = document.querySelector(".breach-index");
    if(node) node.remove();
};


///results breach cards///
// const cards = document.getElementsByClassName("breach-card");

// add EventLister to each card
const addEventListnerToCard = (card) => {

    card.addEventListener("click", event => {

        console.log("hi from click land")
        let tag = event.target.closest(".card");
        cardInfoExpander(tag);
    });
};

let expandedCard = null

const cardInfoExpander = (tag) => {

    if (tag.className === "card card-is-collapsed") {
        if (expandedCard) expandedCard.className = "card card-is-collapsed";
        tag.className = "card card-is-expanded";
        expandedCard = tag;
    } else {
        tag.className = "card card-is-collapsed";
        expandedCard = null;
    };
};