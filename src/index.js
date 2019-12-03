// overview of code structure inspired by catena developed by clericl github
//cors-anywhere used https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141
// import * as Data from "./seed_data";


///watch window size////
function windowSize() {
    let w = window.innerWidth;
    let MainBannerText = document.getElementById("compromised");
    if (w >= 575) {
        MainBannerText.innerHTML = "HAS YOUR ONLINE IDENTITY BEEN COMPROMISED?";
    } else {
        MainBannerText.innerHTML = "HAVE YOU BEEN COMPROMISED?";
    };
};

windowSize();

window.addEventListener("resize", () => {
    windowSize()
});

/////

///dropdown toggle///
function topNavIconToggle() {
    var x = document.getElementById("idTopNav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
};
/////

///results breach cards///
const cards = document.getElementsByClassName("breach-card");

// add EventLister to each card
for(let i = 0; i < cards.length; i++){
    cards[i].addEventListener("click", event=>{
        console.log("hi from click land")
        let tag = event.target.closest(".card");
        cardInfoExpander(tag);
    });
};

let expandedCard = null

const cardInfoExpander = (tag)=>{
    if(tag.className === "card card-is-collapsed"){
        if (expandedCard) expandedCard.className = "card card-is-collapsed";
        tag.className = "card card-is-expanded";
        expandedCard = tag;
    }else{
        tag.className = "card card-is-collapsed";
        expandedCard =null;
    };
};


// console.log(cards)
/////

//on refresh scroll to top of page 
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

//select tag with id email
const searchInput = document.querySelector("#email")

// validate email
const ValidateEmail = (email) =>{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
        return true
    }
    alert("You have entered an invalid email address!")
    return false
};

searchInput.addEventListener("keydown", event=>{
    if(event.key === "Enter"){
        fetchData();
    };
});

const formSubmit = ()=>{
    fetchData();
};

const demoSubmit = ()=>{
  let email = "hello1@gmail.com";
  fetchData(email);
};

const fetchData = (email = null)=>{

     if(!email) email = searchInput.value;

    //send request to cors-anywhere to satisfy CORS header restrictions with/out buiding back end
    let newUrl = 'https://cors-anywhere.herokuapp.com/https://haveibeenpwned.com/api/v3/breachedaccount/';

    if (ValidateEmail(email)) {
        email = email.replace(/\s/g, '');
        newUrl += email + "?truncateResponse=false";

        /////////////////for testing only 
        displayResults()
        console.log(data)

        // let hiroData = Data.childParentData(email, Data.data);
        // resultsTree(hiroData);
        /////////////////

        // //create header for fetch request 
        // const hibpApiKey = '2b084434e60e47c89f6906fdb1af671c';
        // let keyHeaders = new Headers();
        // keyHeaders.append('Hibp-Api-Key', hibpApiKey)

        // fetch(newUrl, { method: "GET", headers: keyHeaders })
        //     .then(res => res.json())
        //     .then(function (data) {
        //         console.log(data)
        //         let hiroData = Data.childParentData(email, data);
        //         //sent data to tree building function
        //         resultsTree(hiroData);
        //     })
        //     .catch(error => {
        //         svg.selectAll("*").remove();
        //         noBreach.style.display = "block";
        //         searchInput.value = "Enter email";
        //     });
    };
};
