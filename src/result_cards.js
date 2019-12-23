
let timer;

const loaderPopUp = (flag) => {
    let display = flag ? "block" : "none";
    let div = document.getElementById("loaderPopUp");
    div.style.display = display;
}

const loader = (flag) => {
    let loader = document.getElementById("loader");
    let display = flag ? "flex": "none";
    if(flag){
        timer = setTimeout(function (){
            loaderPopUp(true)
        }, 1500);
    }else{
        clearTimeout(timer);
        loaderPopUp(false);
    }
    loader.style.display = display;
};

const displayChartCardsResults = () => {

    let toggle = document.querySelector(".toggle-container");
    toggle.style.display = "block";
};

const totalBreaches = (number) => {

    let congrats = number === 0 ? "Congratulations,<br>": "";
    let div = document.querySelector(".results-text");
    div.innerHTML = `${congrats}HIBP Database has found ${number} Breaches!`;

};

const setEmail = (email) => {
    
    let emailDiv = document.getElementById("email1");
    emailDiv.innerHTML = email;
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
    
    const {Title, DataClasses, Description, LogoPath, recordsLost} = breach;
    
    card.id = `${Title}-${recordsLost}`;
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
    compromisedTitle.innerHTML = "COMPROMISED DATA";
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
const addEventListnerToCard = (card) => {

    card.addEventListener("click", event => {

        let tag = event.target.closest(".card");
        cardInfoExpander(tag);
    });
};

let expandedCard = null

const cardInfoExpander = (tag) => {

    if (tag.className === "card card-is-collapsed") {
        if (expandedCard) expandedCard.className = "card card-is-collapsed";
        scrollToDiv(tag);
        tag.className = "card card-is-expanded";
        expandedCard = tag;
    } else {
        tag.className = "card card-is-collapsed";
        scrollToDiv(tag);
        expandedCard = null;
    };
};



const noResult = () => {
   
    displayZeroOrAreDiv(0);
    totalBreaches(0);
    displayChartCardsResults();
};

const displayZeroOrAreDiv = (results) => {

    let zeroDiv = document.querySelector(".zero");
    let areDiv = document.querySelector(".are");
    let areLink = document.querySelector(".norton")
    let cardDiv = document.getElementById("brc");
    let chartDiv = document.getElementById("cc");

    if(results){
        zeroDiv.style.display = "none";
        areDiv.style.display = "flex";
        cardDiv.style.display = "block";
        chartDiv.style.display = "block";
        areLink.style.display = "block";
    }else{
        zeroDiv.style.display = "flex";
        areDiv.style.display = "none";
        cardDiv.style.display = "none";
        chartDiv.style.display = "none";
        areLink.style.display = "none";
    };
}

const takeMeTo = (flag) => {

    switch(flag){
        case "chart":
            scrollToDiv(document.getElementById("cc"));
            break;
        case "cards":
            scrollToDiv(document.getElementById("brc"));
            break;
        case "top":
            scrollToDiv(document.body);
    };
   
};

const scrollToDiv = (element) => {
    window.scrollTo({
        'behavior': 'smooth',
        'left': 0,
        'top': element.offsetTop
    });
};