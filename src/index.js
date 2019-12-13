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
function topNavIconToggle(y) {
    y.classList.toggle("change");
    var x = document.getElementById("idTopNav");

    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    };
};
/////



//on refresh scroll to top of page 
window.onbeforeunload = function () {

    window.scrollTo(0, 0);
};



// search input functions
const searchInput = document.querySelector("#email")

const ValidateEmail = (email) => {

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
        searchInput.classList.remove("invalid")
        return true
    };

    loader(false)
    searchInput.value = ""
    searchInput.placeholder = "Invalid email address!"
    searchInput.classList.add("invalid");
    return false
};

searchInput.addEventListener("keydown", event => {

    if(event.key === "Enter"){
        fetchData();
    };
});

const formSubmit = () => {

    fetchData();
};

const demoSubmit = () => {

    let email = "hello1@gmail.com";
    fetchData(email);
};

const fetchData = (email = null) => {

    loader(true);
     if(!email) email = searchInput.value;

    //send request to cors-anywhere to satisfy CORS header restrictions with/out buiding back end
    let newUrl = 'https://cors-anywhere.herokuapp.com/https://haveibeenpwned.com/api/v3/breachedaccount/';

    if (ValidateEmail(email)) {
        email = email.replace(/\s/g, '');
        newUrl += email + "?truncateResponse=false";

        /////////////////for testing only 
        // testing(email);

        // //create header for fetch request 
        const hibpApiKey = '2b084434e60e47c89f6906fdb1af671c';
        let keyHeaders = new Headers();
        keyHeaders.append('Hibp-Api-Key', hibpApiKey)

        fetch(newUrl, { method: "GET", headers: keyHeaders })
            .then(res => res.json())
            .then(function (data) {
                reConfigure(data)
                setEmail(email);
                displayZeroOrAreDiv(1);
                removeCards();
                createCards(data);
                displayChartCardsResults();
                buildChart(allMajorBreaches.concat(data.slice(0)));
                loader(false);  
                scrollToDiv(document.querySelector(".toggle-container"));
            })
            .catch(error => {
                setEmail(email);
                noResult();
                loader(false);
                scrollToDiv(document.querySelector(".toggle-container"));
                searchInput.value = ""
                searchInput.placeholder = "Enter your email here...";
            });
    };
};



const testing = (email) => {
    reConfigure(data)
    console.log(data)
    setEmail(email);
    removeCards();
    displayZeroOrAreDiv(1);
    createCards(data);
    displayChartCardsResults()
    // buildChart(data.concat(allMajorBreaches.reverse()))
    buildChart(allMajorBreaches.concat(data.slice(0)))
    // buildChart(allMajorBreaches)
    loader(false);
};