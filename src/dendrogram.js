

const svgDiv = document.getElementById("svg")
let svg = d3.select(svgDiv) 
    .append("svg")
    .attr("width", svgDiv.clientWidth)
    .attr("height", 1000)// this controls the scroll needs to be bigger then the tree
    .append("g").attr("transform", `translate(0,50)`);



   
const resultsTree = (hiroData)=>{
   
    svg.selectAll("*").remove();

    let treeStructure = d3.tree().size([(svgDiv.clientWidth - 150), 800]);
    //hierarchy breakdown
    let information = treeStructure(hiroData);
    let circleData = rootLeaves(information.descendants());
    // let leaves = information.leaves();
    // let parents= noLeaves(information.descendants());


    
    //test
    console.log(information.descendants());
    console.log(noLeaves(information.descendants()));
    
    // append div to svg for popup window 
    let div = d3.select(svgDiv).append("div")
    .attr("class", "tooltip")
    .style("display", "none");
    
    
    ///pop up window functions 
    const mouseover = ()=> {
        div.style("display", "inline");
    }


    const mousemove =(data)=> {
        let x = (d3.event.pageX)
        let y = (d3.event.pageY)
        const windowWidth = svgDiv.clientWidth;
        const windowHeight = svgDiv.clientHeight;
        
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
            .style("font-size", "12px");

        }else if (data.depth === 0){
            div
                .text(function (d) { return data.data.child })
                .style("left", () => (x > windowWidth / 2) ? (windowWidth / 2) + "px" : (windowWidth / 2) + "px")
                .style("top", (windowHeight / 2) + "px")
                .style("height", "auto")
                .style("width", "auto")
                .style("background-image", "none")
                .style("background-color", "#ddd")
                .style("background-color", "");      
        }

        else {

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
        }
    }

    const mouseout =()=> {
        div.style("display", "none");
    }


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
        console.log(circleData)
        const leafRad = (circleData.length > 50) ? 5: 8;
        debugger
      circles.enter().append("circle")
        .attr('class', 'leaves')
        .attr("cx", function(d){return d.x;})
        .attr("cy", function(d){return d.y;})  
        .attr("r", d =>(d.depth === 0)? 4: leafRad)
        .attr('fill', d => (d.depth === 0) ? "#851e3e": "#dddddd")
        .on("mouseover", mouseover)
        .on("mousemove", d=>mousemove(d))
        .on("mouseout", mouseout);

// create reactangles for parents
    // let rects = svg.append("g").selectAll("rect")
    //     .data(parents);
        
    // rects.enter().append("rect")
    //         .attr('class', "rect")
    //         .attr("x", d =>(d.x - 78))
    //         .attr("y", d =>(d.y))
    //         .attr("width", 156)
    //         .attr("height", 70)
    //         .attr("rx", 5)         
    //         .attr("ry", 5)
    //         .on("mouseover", mouseover)
    //         .on("mousemove", d => mousemove(d))
    //         .on("mouseout", mouseout);

//step down paths
//     let lineFunction = d3.line()
//         .x(function (d) { return d.source.x; })
//         .y(function (d) { return d.source.y; })
//         .curve(d3.curveStep);

//     let pathData = lineFunction(information.links())
//     debugger
//    let connections =svg.append("g").selectAll("path")   
//     connections.enter().append("path")
//         .attr("d", pathData)
//         .attr("stroke", "blue")
//         .attr("stroke-width", 2)
//         .attr("fill", "none");
//   
///append text to tree nodes
    let names = svg.append("g").selectAll("text")
        .data(information.descendants());
        console.log(sortD2(information.descendants()))
    if(sortD4(information.descendants())){
        let k = 0;
        let step = 0;
        console.log(step)
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
                }
                else {
                    k = 0;  
                    step +=1;
                    if (step % 2 !== 0){
                        return (d.y -57.5);
                    }
                    return(d.y - 80) 
                }
            })
            .style("font-size", "18px")
            .on("mouseover", mouseover)
            .on("mousemove", d => mousemove(d))
            .on("mouseout", mouseout);

    }else if(sortD3(information.descendants())) {
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

    }else if(sortD2(information.descendants())){
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
    }
    else{
        names.enter().append("text")
            .text(d => ((d.depth !== 0) && (d.depth !== 3)) ? d.data.details[0] : "")
            .attr("x", function (d) { return d.x + 5; })
            .attr("y", function (d) { return d.y; })
            .on("mouseover", mouseover)
            .on("mousemove", d => mousemove(d))
            .on("mouseout", mouseout);
    }
} 

const noLeaves = (root)=>{
    return root.filter(obj=> {
        return (obj.depth !== 3);
    });
};

const rootLeaves = (root)=>{
    return root.filter(obj=>{
        return (obj.depth === 0 || obj.depth === 3)
    });
};


const sortD2 = (root)=>{
    let sorted = root.filter(obj=>{
        return (obj.depth === 1)
    })

    return (sorted.length > 4)? true: false;
}
const sortD3 = (root)=>{
    let sorted = root.filter(obj=>{
        return (obj.depth === 1)
    })

    return (sorted.length > 9)? true: false;
}

const sortD4 = (root)=>{
    let sorted = root.filter(obj=>{
        return (obj.depth === 1)
    })

    return (sorted.length > 15)? true: false;
}




