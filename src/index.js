// overview of code structure inspired by catena developed by clericl github
//cors-anywhere used https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141
import * as Data from "./seed_data";

// export const myFunction = () => {
//     var x = document.getElementById("myTopnav");
//     if (x.className === "topnav") {
//         x.className += " responsive";
//     } else {
//         x.className = "topnav";
//     }
// };


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

//Event listener on #email tag for keydown on enter;
searchInput.addEventListener("keydown", event=>{
    let email = searchInput.value;
    //send request to cors-anywhere to satisfy CORS header restrictions with/out buiding back end
    let newUrl = 'https://cors-anywhere.herokuapp.com/https://haveibeenpwned.com/api/v3/breachedaccount/';
   
    if (event.key === "Enter" && ValidateEmail(email)){
        event.preventDefault();
        email = searchInput.value;
        email = email.replace(/\s/g, '');
        newUrl += email + "?truncateResponse=false";

        //hide intro and no-breach
        let intro = document.getElementById("intro");
        intro.style.display = "none";

        let noBreach = document.getElementById("no-breach");
            noBreach.style.display = "none";

        ///////////////////for testing only 
        // let hiroData = Data.childParentData(email, Data.data);
        // resultsTree(hiroData);
        ///////////////////
       
        //create header for fetch request 
        const hibpApiKey = '2b084434e60e47c89f6906fdb1af671c';
        let keyHeaders = new Headers();
        keyHeaders.append('Hibp-Api-Key', hibpApiKey)
        
        fetch(newUrl, { method: "GET", headers: keyHeaders })
        .then(res => res.json())
        .then(function (data) {
            //extract data needed 
            let hiroData = Data.childParentData(email, data); 
            //sent data to tree building function
            resultsTree(hiroData);            
            })
            .catch(error => {
                svg.selectAll("*").remove();
                noBreach.style.display = "block";
                searchInput.value = "Enter email"; 
            });
    };
});
