//https://www.youtube.com/watch?v=DvqeaVSe6Ko used as referance for d3 data structuring

//helper function to create child/parent obj
const childParentObject = (child, parent, details = undefined) =>{
    return({
        "child": child,
        "parent": parent,
        details,
    })
}

//convert json date into array of objects with child/parent info.
// Run array through D3.stratify function. D3 can now work with data. 
const childParentData = (email, data)=>{
    let array = [];
    const rootParent = {"child": email, "parent": "", "details": [email]};
    array.push(rootParent);
    
    data.map(breach =>{
        array.push(childParentObject(breach["Title"], email, [breach["Title"], breach["LogoPath"]]));
        array.push(childParentObject(breach["Description"], breach["Title"], ["Breach Info"]));
        breach["DataClasses"].map(type =>{
            array.push(childParentObject(type, breach["Description"], ["Data Leaked"]));
        })
    })
    
    let dataStructure = d3.stratify()
    .id(function(d){return d.child;})
    .parentId(function(d){return d.parent})
    (array);
    
    return dataStructure;
}

const renameKey = (obj, newKey, oldkey) => {
    obj[newKey] = obj[oldkey];
    delete obj[oldkey];
}

const reConfigure = (dataSet) => {

    for(let i = 0; i < dataSet.length; i++){
        let current = dataSet[i];
        renameKey(current, 'entity','Name');
        renameKey(current, 'recordsLost', 'PwnCount');
        current["year"] = parseInt(current.BreachDate.slice(0,4), 10); 
        current['personal'] = true;
        current['story'] = "See Detailed Results below";
    }
};


///dummy data for testing purposes 
const data = [
    {
        "Name": "HauteLook",
        "Title": "HauteLook",
        "Domain": "hautelook.com",
        "BreachDate": "2018-08-07",
        "AddedDate": "2019-03-21T21:57:32Z",
        "ModifiedDate": "2019-03-21T21:57:32Z",
        "PwnCount": 28510459,
        "Description": "In mid-2018, the fashion shopping site <a href=\"https://www.theregister.co.uk/2019/02/11/620_million_hacked_accounts_dark_web/\" target=\"_blank\" rel=\"noopener\">HauteLook was among a raft of sites that were breached and their data then sold in early-2019</a>. The data included over 28 million unique email addresses alongside names, genders, dates of birth and passwords stored as bcrypt hashes. The data was provided to HIBP by <a href=\"https://dehashed.com/\" target=\"_blank\" rel=\"noopener\">dehashed.com</a>.",
        "LogoPath": "https://haveibeenpwned.com/Content/Images/PwnedLogos/HauteLook.png",
        "DataClasses": [
            "Dates of birth",
            "Email addresses",
            "Genders",
            "Geographic locations",
            "Names",
            "Passwords"
        ],
        "IsVerified": true,
        "IsFabricated": false,
        "IsSensitive": false,
        "IsRetired": false,
        "IsSpamList": false
    },
    {
        "Name": "MyFitnessPal",
        "Title": "MyFitnessPal",
        "Domain": "myfitnesspal.com",
        "BreachDate": "2018-02-01",
        "AddedDate": "2019-02-21T19:28:46Z",
        "ModifiedDate": "2019-02-21T20:00:56Z",
        "PwnCount": 143606147,
        "Description": "In February 2018, the diet and exercise service <a href=\"https://content.myfitnesspal.com/security-information/FAQ.html\" target=\"_blank\" rel=\"noopener\">MyFitnessPal suffered a data breach</a>. The incident exposed 144 million unique email addresses alongside usernames, IP addresses and passwords stored as SHA-1 and bcrypt hashes (the former for earlier accounts, the latter for newer accounts). In 2019, <a href=\"https://www.theregister.co.uk/2019/02/11/620_million_hacked_accounts_dark_web/\" target=\"_blank\" rel=\"noopener\">the data appeared listed for sale on a dark web marketplace</a> (along with several other large breaches) and subsequently began circulating more broadly. The data was provided to HIBP by a source who requested it to be attributed to &quot;BenjaminBlue@exploit.im&quot;.",
        "LogoPath": "https://haveibeenpwned.com/Content/Images/PwnedLogos/MyFitnessPal.png",
        "DataClasses": [
            "Email addresses",
            "IP addresses",
            "Passwords",
            "Usernames"
        ],
        "IsVerified": true,
        "IsFabricated": false,
        "IsSensitive": false,
        "IsRetired": false,
        "IsSpamList": false
    }
]