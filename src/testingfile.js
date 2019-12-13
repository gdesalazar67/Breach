// const testing = (email) => {
//     console.log("hello from fetch")
//     reConfigure(data)
//     console.log(data)
//     apiData = data
//     console.log(apiData)
//     setEmail(email);
//     displayZeroOrAreDiv(1);
//     removeCards();
//     createCards(data);
//     displayChartCardsResults();
//     buildChart(allMajorBreaches.concat(data.slice(0)));
//     loader(false);
//     scrollToDiv(document.querySelector(".toggle-container"));
// };


///dummy data for testing purposes 
// const data = [
//     {
//         "Name": "HauteLook",
//         "Title": "HauteLook",
//         "Domain": "hautelook.com",
//         "BreachDate": "2018-08-07",
//         "AddedDate": "2019-03-21T21:57:32Z",
//         "ModifiedDate": "2019-03-21T21:57:32Z",
//         "PwnCount": 28510459,
//         "Description": "In mid-2018, the fashion shopping site <a href=\"https://www.theregister.co.uk/2019/02/11/620_million_hacked_accounts_dark_web/\" target=\"_blank\" rel=\"noopener\">HauteLook was among a raft of sites that were breached and their data then sold in early-2019</a>. The data included over 28 million unique email addresses alongside names, genders, dates of birth and passwords stored as bcrypt hashes. The data was provided to HIBP by <a href=\"https://dehashed.com/\" target=\"_blank\" rel=\"noopener\">dehashed.com</a>.",
//         "LogoPath": "https://haveibeenpwned.com/Content/Images/PwnedLogos/HauteLook.png",
//         "DataClasses": [
//             "Dates of birth",
//             "Email addresses",
//             "Genders",
//             "Geographic locations",
//             "Names",
//             "Passwords"
//         ],
//         "IsVerified": true,
//         "IsFabricated": false,
//         "IsSensitive": false,
//         "IsRetired": false,
//         "IsSpamList": false
//     },
//     {
//         "Name": "MyFitnessPal",
//         "Title": "MyFitnessPal",
//         "Domain": "myfitnesspal.com",
//         "BreachDate": "2018-02-01",
//         "AddedDate": "2019-02-21T19:28:46Z",
//         "ModifiedDate": "2019-02-21T20:00:56Z",
//         "PwnCount": 143606147,
//         "Description": "In February 2018, the diet and exercise service <a href=\"https://content.myfitnesspal.com/security-information/FAQ.html\" target=\"_blank\" rel=\"noopener\">MyFitnessPal suffered a data breach</a>. The incident exposed 144 million unique email addresses alongside usernames, IP addresses and passwords stored as SHA-1 and bcrypt hashes (the former for earlier accounts, the latter for newer accounts). In 2019, <a href=\"https://www.theregister.co.uk/2019/02/11/620_million_hacked_accounts_dark_web/\" target=\"_blank\" rel=\"noopener\">the data appeared listed for sale on a dark web marketplace</a> (along with several other large breaches) and subsequently began circulating more broadly. The data was provided to HIBP by a source who requested it to be attributed to &quot;BenjaminBlue@exploit.im&quot;.",
//         "LogoPath": "https://haveibeenpwned.com/Content/Images/PwnedLogos/MyFitnessPal.png",
//         "DataClasses": [
//             "Email addresses",
//             "IP addresses",
//             "Passwords",
//             "Usernames"
//         ],
//         "IsVerified": true,
//         "IsFabricated": false,
//         "IsSensitive": false,
//         "IsRetired": false,
//         "IsSpamList": false
//     }
// ]

// const bByYear = {};

// const fillInMemo = (dataSet) => {

//     for(let i = 1; i < dataSet.length; i++){
//         let current = dataSet[i];
//         let {year} = current;

//         if(!bByYear[year]) bByYear[year]= [];
//         bByYear[year] = bByYear[year].concat([current]);
//     };
//     return bByYear;
// };

// ** feature implementaions for smaller screens and mobile
// const buildYaxis = (svg, width, height, dataSet) => {

//     height = height === 3576 ? 3525 : 4709;

//     let yScale = d3.scaleLinear()
//         .domain([2020, 2009])
//         .range([0, height])
//         .clamp(true);

//     let yAxis = d3.axisLeft().scale(yScale).tickFormat(d3.format("d"));
//     yAxis.tickSizeOuter([0]);

//     let axis = svg.append("g")
//         .attr("class", "axis")
//         .attr("transform", "translate(0, 20)")
//         .call(yAxis);

//     let txt = axis.selectAll("text")
//         .attr("transform", "translate(60,0)");

//     // let txtNodes = txt.nodes();
//     // d3.select(txtNodes[txtNodes.length - 1])
//     //     .text("2009 and Earlier")
//     //     .attr("transform", "translate(150,0)");

//     // axis.selectAll("g")
//     //     .selectAll("g")
//     //     .data(dataSet)
//     //     .enter()
//     //     .append("g")

//     // container.each((d,i,node) => {
//     //         console.log(node[i])
//     //         console.log(d)
//     //         console.log('break');
//     //         // return 
//     //         // buildBubbleChart(null, width, d)
//     //     });


//     let rects = axis.selectAll("g")
//         .append("rect")
//         .attr("width", 60.5)
//         .attr("height", 26)
//         .attr("rx", 5)
//         .attr("transform", "translate(1,-14.5)");

//     // let rectsNodes = rects.nodes();
//     // d3.select(rectsNodes[rectsNodes.length-1])
//     //     .attr("width", 150)
//     //     .attr("height", 26)
//     //     .attr("transform", "translate(1,-14.5)");

// };












    // console.log(axis._groups[0][0].lastChild.childNodes[1].childNodes[0].data)
    //  axis.selectAll("text").remove();
    //  axis.selectAll("g").remove();
    // axis.selectAll("width", 60.5)

    // axis.select("g:last-of-type text")
    //     .text("2009 and Earlier")