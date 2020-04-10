//cors-anywhere used https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141

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

let chartDisplayed = null;

const chartResize = (dataSet) => {
    buildChart(dataSet)
};

windowSize();

window.addEventListener("resize", () => {

    windowSize();

    if (chartDisplayed){
        chartResize(allMajorBreaches.concat(apiData));
    };
});
/////

function topNavIconToggle(y) {
    y.classList.toggle("change");
    var x = document.getElementById("idTopNav");

    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    };
};

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};



// search input functions
const searchInput = document.querySelector("#email")

const setEmailPlaceHolder = () =>{
    searchInput.value = ""
    searchInput.placeholder = "Enter your email here...";
};

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

const formSubmit = () => {

    fetchData();
};

const demoSubmit = () => {

    let email = "hello1@gmail.com";
    fetchData(email);
};

const toogleContainer = document.querySelector(".toggle-container");

let apiData = null;

async function requestToApi(newUrl, header){
    let response = await fetch(newUrl, header);
    let data = await response.json();
    return data 
}

const fetchData = (email = null) => {

    loader(true);
     if(!email) email = searchInput.value;

    //send request to cors-anywhere to satisfy CORS header restrictions with/out buiding back end
    let newUrl = 'https://cors-anywhere.herokuapp.com/https://haveibeenpwned.com/api/v3/breachedaccount/';

    if (ValidateEmail(email)) {
        email = email.replace(/\s/g, '');
        newUrl += email + "?truncateResponse=false";
       
        // //create header for fetch request 
        const hibpApiKey = '2b084434e60e47c89f6906fdb1af671c';
        let keyHeaders = new Headers();
        keyHeaders.append('Hibp-Api-Key', hibpApiKey)

        requestToApi(newUrl, { method: "GET", headers: keyHeaders })
            .then(function (data) {
                reConfigure(data)
                apiData = data
                setEmail(email);
                displayZeroOrAreDiv(1);
                removeCards();
                createCards(data);
                displayChartCardsResults();
                buildChart(allMajorBreaches.concat(data));
                loader(false);
                scrollToDiv(toogleContainer);
                setEmailPlaceHolder();
            }).catch(error =>{
                console.log("404 is what HIBP returns when email has no associated breach results, it's a good thing")
                setEmail(email);
                noResult();
                loader(false);
                scrollToDiv(toogleContainer);
                setEmailPlaceHolder();
            });
    };
};



