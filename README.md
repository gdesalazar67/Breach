
<p align="center">
<img src="https://user-images.githubusercontent.com/48927999/70831106-84528a80-1da6-11ea-92e0-f6301d71e206.png">
<br><a href="https://gdesalazar67.github.io/Breach/">Live link</a> 
</p>

## Background and Overview:<br>
  Having recently been a victem of Identity theft and now having a concern for how and how much of my information is out in the cyber world I created Breach. Breach is a simple interactive way to check if an email has ever been compramised in a data breach and the details pertaining to those breaches <br> Breach is powered by the [haveibeenpwnd](https://haveibeenpwned.com/API/v2#APIVersion) api and was created using Javascript, HTML, CSS, and D3. 

  
## Functionality and MVP Features: <br>
  ### Landing page: <br>
  User is greated with a simple question. "Has your online identity been compromised?" and then proceeded by a call to action. If user does not feel comfortable entering in their personal email (which is understandable) a demo button is provided so the user can partake in the applications other features. A "this is how it works" section depicts an overview how the website works, provides reassurance and excites the user to check if online identity has been compromised. 
  <br>![breachScreenshot](https://user-images.githubusercontent.com/48927999/70829698-325c3580-1da3-11ea-92d1-4c7fd855dd94.png)
  <br><a href="https://gdesalazar67.github.io/Breach/">Live link</a> 
  ### Fetch(): <br>
    Upon entering email and pressing enter. A get request is sent to th HIBP. An array of Json is received, reconfigured, sent to bubble chart builder and index card creaters<br>
  ```javascript
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
  ```
  <br><a href="https://gdesalazar67.github.io/Breach/">Live link</a> 
  ### Bubble chart: <br>
    Results are displayed in a bubble chart that can be hovered over and clicked for more detailed information.  Diameter of circles pertain to the size of the breach and shades of blue pertain to the year. See key for more info.

    Orange bubbles: 
    Pertain to breaches attached to the entered email. By clicking on them the user will be nevigated to the results card section below and the card will be expaned to show breach details. 

    Blue shaded bubbles:
    Contains info on general breaches with over 30,000 accounts compromised and of special interest. sent to external link containing more details<br>
   ![breach_bubble_chart](https://user-images.githubusercontent.com/48927999/70831952-bcf36380-1da8-11ea-846e-11cf8c4a791d.png)
   <br><a href="https://gdesalazar67.github.io/Breach/">Live link</a> 
```javascript
const buildBubbleChart = (svg, width, dataset) => {

    let classes = dataset;

    const sizeScale = d3.scaleSqrt()
        .range([17, 60]);

    sizeScale.domain(d3.extent(classes, d => d.recordsLost));
    
    let pack = d3.pack()
        .size([width, 847]);
    
    pack.radius(d => sizeScale(d.value)); 

    let root =  d3.hierarchy({children: classes}).sum(d => d.recordsLost);
    let rootPack = pack(root).leaves();
    let leaf = svg.append("g")
        .attr("class", "bubbecluster")
        .attr("transform", `translate(0,110)`)
        .selectAll("g")
        .data(rootPack)
        .enter()
        .append("g")
        .attr("transform", d => `translate(${d.x +1},${d.y + 1})`)
        .on("mouseover", function (d, i) {
            mouseOver(this);
        })
        .on("mouseout", function (d, i) {
            mouseOut(this)
        })
        .on("click", d => {
            if(d.data.personal){
                let div = document.getElementById(`${d.data.Title}-${d.data.recordsLost}`)  
                if(div.classList[1] === "card-is-expanded"){
                    scrollToDiv(div);
                }else{
                    div.click();
                };
            }else{
                window.open(d.data.ndSourceLink);
            };
        });

```
  <br><a href="https://gdesalazar67.github.io/Breach/">Live link</a> 
  ### Result detail cards:<br>
    Data is feed into the createCards function, which loops through the dataSet creating a card, adding a event listener, class, and id to each breach. Deck of cards is then displayed and given smooth interactivity by a toggling class function and css transition<br>

    Cards a responsive and grid columns will expand from one to 4 depending on screen width. 

![breach_cards](https://user-images.githubusercontent.com/48927999/70836212-62f89b00-1db4-11ea-9efc-e2dbed386f9e.png)


```javascript
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
```
<br><a href="https://gdesalazar67.github.io/Breach/">Live link</a> 
### Responsiveness :<br>
Breach responds to all screen sizes. Card index, banners, titles all collapse and expand dependent on screen size. The D3 bubble plot is responsive as well but due to the fact that it has to recomputate data and redraw it holds up the whole page. Adding a debounce did not do anything to help performance. 

## Architecture and Technologies:<br>
 ### Technologies employed:<br>
  Vanilla JavaScript<br>
  D3 bubble chart<br>
  CSS3<br>
  HTML5<br>
  Webpack to bundle various scripts into a single source.<br>
  
### Architecture:<br>
index.js main page.<br>
result_cards.js responsible for rendering result cards.<br>
bubble_chart.js render bubblechart.<br>

 
<br><a href="https://gdesalazar67.github.io/Breach/">Live link</a> 