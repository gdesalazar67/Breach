// overview of code structure inspired by catena developed by clericl github
// import data from "./seed_data";
// data returns an array of objects

const searchInput = document.querySelector("#email")


searchInput.addEventListener("keydown", event=>{
    let email;
    let newUrl = 'https://haveibeenpwned.com/api/v3/breachedaccount/';

    if(event.key === "Enter" && searchInput.value.length > 0){
        event.preventDefault();
        email = searchInput.value;
        email = email.replace(/\s/g, '');
        newUrl += email;
        console.log(email);
        console.log(newUrl);
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
//         debugger
//        console.log(data)
//     })
//     .catch(error => {
//         debugger
//         console.log(error)
//     }
        


// api key 03a794521329432bad12af5f5bc6db3e
// hibp-api-key: [03a794521329432bad12af5f5bc6db3e]