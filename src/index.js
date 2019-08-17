// overview of code structure inspired by catena developed by clericl github
//cors-anywhere used https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141
import * as Data from "./seed_data";
// import {resultsTree} from "./dendrogram";

const searchInput = document.querySelector("#email")


const ValidateEmail = (email) =>{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
        return true
    }
    alert("You have entered an invalid email address!")
    return false
};


searchInput.addEventListener("keydown", event=>{
    let email = searchInput.value;
    let newUrl = 'https://cors-anywhere.herokuapp.com/https://haveibeenpwned.com/api/v3/breachedaccount/';
   
    if (event.key === "Enter" && ValidateEmail(email)){
        event.preventDefault();
        // email = searchInput.value;
        email = email.replace(/\s/g, '');
        newUrl += email + "?truncateResponse=false";
        
        //////////////////////////////////
        const hibpApiKey = '03a794521329432bad12af5f5bc6db3e';
        let keyHeaders = new Headers();
        debugger
        keyHeaders.append('Hibp-Api-Key', hibpApiKey)
        
        fetch(newUrl, { method: "GET", headers: keyHeaders })
        .then(res => res.json())
        .then(function (data) {
            debugger
            console.log(data);
            let hiroData = Data.childParentData(email, data); 
            resultsTree(hiroData); 
            searchInput.value = "Enter email";  
            })
            .catch(error => {
                alert('Lucky you! Your email is safe for now')
                searchInput.value = "Enter email"; 
                console.log(error)
            })

            ///////////////////////////////
    }else{
        console.log("Please enter email");
    }
})
