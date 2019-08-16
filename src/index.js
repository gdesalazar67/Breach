// overview of code structure inspired by catena developed by clericl github
//cors-anywhere used https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141
import * as Data from "./seed_data";
// import {resultsTree} from "./dendrogram";

const searchInput = document.querySelector("#email")


searchInput.addEventListener("keydown", event=>{
    let email;
    let newUrl = 'https://cors-anywhere.herokuapp.com/https://haveibeenpwned.com/api/v3/breachedaccount/';
   
    if(event.key === "Enter" && searchInput.value.length > 0){
        event.preventDefault();
        email = searchInput.value;
        email = email.replace(/\s/g, '');
        newUrl += email + "?truncateResponse=false";
        
        let hiroData = Data.childParentData(email, Data.data); 
        //////////////////////////////////
        const hibpApiKey = '03a794521329432bad12af5f5bc6db3e';
        let keyHeaders = new Headers();
        debugger
        keyHeaders.append('Hibp-Api-Key', hibpApiKey)
        
        fetch(newUrl, { method: "GET", headers: keyHeaders })
            .then(res => res.json())
            .then(function (data) {

                console.log(data)
            })
            .catch(error => {

                console.log(error)
            })

            ///////////////////////////////
        resultsTree(hiroData);
    }else{
        console.log("Please enter email");
    }
})


// const hibpApiKey = '[03a794521329432bad12af5f5bc6db3e]';
// let keyHeader = new Headers();
// keyHeader.append('Hibp-Api-Key', hibpApiKey)



// fetch(newUrl,{method: "GET", headers: keyHeader})
//     .then(res => res.json())
//     .then(function(data){
        
//        console.log(data)
//     })
//     .catch(error => {
        
//         console.log(error)
//     })
        


// api key 03a794521329432bad12af5f5bc6db3e
// hibp-api-key: [03a794521329432bad12af5f5bc6db3e]