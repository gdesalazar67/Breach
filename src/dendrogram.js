

const svgDiv = document.getElementById("svg")
let svg = d3.select(svgDiv) 
    .append("svg")
    .attr("width", svgDiv.clientWidth)
    .attr("height", 1000)// preset for div needs to be bigger then the tree
    .append("g").attr("transform", `translate(0,50)`);



   
const resultsTree = (hiroData)=>{
    // remove old tree upon new email search 
    svg.selectAll("*").remove();

    let treeStructure = d3.tree().size([(svgDiv.clientWidth - 150), 800]);
    //hierarchy breakdown
    let information = treeStructure(hiroData);
    let circleData = rootLeaves(information.descendants());

    // append div to svg for popup window 
    let div = d3.select(svgDiv).append("div")
    .attr("class", "tooltip")
    .style("display", "none");
       
    ///pop up window functions 
    const mouseover = ()=> {
        div.style("display", "inline");
    };

    const mousemove =(data)=> {
        let x = (d3.event.pageX);
        let y = (d3.event.pageY);
        const windowWidth = svgDiv.clientWidth;
        
        if (data.depth === 2){
        div
            .text(function(d){return data.data.child})
            .style("left", ()=> (x > windowWidth/2) ? (x - 375) + "px":(x + 50) + "px")
            .style("top", (y - 150) + "px")
            .style("height", "auto")
            .style("width", "auto")
            .style("background-image", "none")
            .style("background-color", "#ddd")
            .style("background-color", "")
            .style("font-size", "16px");

        }else if (data.depth === 0 || data.depth === 3){
            div
                .text(function (d) { return `Leaked info: ${data.data.child}` })
                .style("left", () => (x > windowWidth / 2) ? (x - 150) + "px" : (x) + "px")
                // .style("left", () => (x > windowWidth / 2) ? (windowWidth / 2) + "px" : (windowWidth / 2) + "px")
                .style("top", (y - 100) + "px")
                .style("height", "auto")
                .style("width", "auto")
                .style("background-image", "none")
                .style("background-color", "#ddd")
                .style("background-color", "");      
        }  else {

            div
                .text("")
                .style("background-color", "")
                .style("background-repeat", "no-repeat")
                .style("background-position", "center")
                .style("height", "70px")
                .style("width", "156px")
                .style("", "70px")
                .style("background-image", `url(${data.data.details[1]})`)
                .style("background-size", "contain")
                .style("left", () => (x > windowWidth / 2) ? (x - 200) + "px" : (x + 50) + "px")
                .style("top", (y - 150) + "px");
        };
    };

    const mouseout =()=> {
        div.style("display", "none");
    };


    //Build paths connecting child and parent 
    let connections = svg.append("g").selectAll("path")
        .data(information.links());

    connections.enter().append("path")
       .attr("d", function (d) {
           return "M" + d.source.x + "," + d.source.y + " V " +
               (d.source.y + d.target.y) / 2 + " H " +
               d.target.x + " V " + d.target.y;
       })
       .attr('stroke', 'red')
       .attr('fill', 'none');

    // create leaf circles 
    let circles = svg.append("g").selectAll("circle")
        .data(circleData);

    const leafRad = (circleData.length > 50) ? 5: 8;
        
    circles.enter().append("circle")
      .attr('class', 'leaves')
      .attr("cx", function(d){return d.x;})
      .attr("cy", function(d){return d.y;})  
      .attr("r", d =>(d.depth === 0)? 4: leafRad)
      .attr('fill', d => (d.depth === 0) ? "#851e3e": "#dddddd")
      .on("mouseover", mouseover)
      .on("mousemove", d=>mousemove(d))
      .on("mouseout", mouseout);


///append text to tree nodes: needs to be done after lines, or paths will run through text
    let names = svg.append("g").selectAll("text")
        .data(information.descendants());

    let depth1 = count(information.descendants());
    if(depth1 > 15){
        let k = 0;
        let step = 0;
        
        names.enter().append("text")
            .text(d => ((d.depth !== 0) && (d.depth !== 3)) ? d.data.details[0] : "")
            .attr("x", function (d) { return d.x + 5; })
            .attr("y", function (d) {
                if (k === 2) {
                    k += 1;
                   return (step % 2 === 0) ? (d.y -35):(d.y - 12.5);
                } else if (k === 1) {
                    k += 1;
                   return (step % 2 === 0) ? (d.y + 10) : (d.y + 32.5);
                } else if(k === 0){
                    k += 1;
                   return (step % 2 === 0) ? (d.y + 55) : (d.y + 77.5);
                } else {
                    k = 0;  
                    step +=1;
                    if (step % 2 !== 0){
                        return (d.y -57.5);
                    }
                    return(d.y - 80) 
                };
            })
            .style("font-size", "18px")
            .on("mouseover", mouseover)
            .on("mousemove", d => mousemove(d))
            .on("mouseout", mouseout);

    } else if(depth1 > 9) {
            let j = 0;
            names.enter().append("text")
                .text(d => ((d.depth !== 0) && (d.depth !== 3)) ? d.data.details[0] : "")
                .attr("x", function (d) { return d.x + 5; })
                .attr("y", function (d) {
                    if (j === 0) {
                        j += 1;
                        return (d.y + 20);
                    } else if (j === 1) {
                        j += 1;
                        return (d.y + 65);
                    }
                    else {
                        j = 0;
                        return (d.y - 30);
                    }
                })
                .style("font-size", "20px")
                .on("mouseover", mouseover)
                .on("mousemove", d => mousemove(d))
                .on("mouseout", mouseout);

    } else if(depth1 > 4){
            let i = 0;
            names.enter().append("text")
                .text(d => ((d.depth !== 0) && (d.depth !== 3)) ? d.data.details[0] : "")
                .attr("x", function (d) { return d.x + 5; })
                .attr("y", function (d) {
                    if (i % 2 === 0) {
                        i += 1;
                        return (d.y + 20);
                    } else {
                        i += 1;
                        return (d.y -30);
                    }
                })
                .style("font-size", "20px")
                .on("mouseover", mouseover)
                .on("mousemove", d => mousemove(d))
                .on("mouseout", mouseout);
    } else {
        names.enter().append("text")
            .text(d => ((d.depth !== 0) && (d.depth !== 3)) ? d.data.details[0] : "")
            .attr("x", function (d) { return d.x + 5; })
            .attr("y", function (d) { return d.y; })
            .on("mouseover", mouseover)
            .on("mousemove", d => mousemove(d))
            .on("mouseout", mouseout);
    };
};


// helper functions to sort data

//will not have to iterate through the largest 3rd depth as in old function below;
//0(logn);
const rootLeaves = (root)=>{
    let arr = [root[0]];

    for(let i = 0; i< root.length; i++){
        let node = root[i];
        if(node.depth === 3){
            break;
        }else if(node.depth === 2){
            arr.push(...node.children);
        };
    };
    return arr;
};

// old root function iterate through whole array O(n)
 // const rootLeaves = (root)=>{
 //     console.log(root);
 //     return root.filter(obj=>{
 //         return (obj.depth === 0 || obj.depth === 3)
 //     });
 // };

const count = (root)=>{
    let sorted = [];
    for(let i = 0; i< root.length; i++){
        if(root[i].depth === 2){
            break;
        }else if(root[i].depth === 1){
            sorted.push(root[i]);
        };
    };

    return sorted.length;
};







