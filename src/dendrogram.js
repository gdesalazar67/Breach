

const svgDiv = document.getElementById("svg")
let svg = d3.select(svgDiv) 
    .append("svg")
    .attr("width", svgDiv.clientWidth)
    .attr("height", 1000)// this controls the scroll needs to be bigger then the tree
    .append("g").attr("transform", `translate(0,50)`);



   
const resultsTree = (hiroData)=>{
   
    svg.selectAll("*").remove();

    let treeStructure = d3.tree().size([svgDiv.clientWidth, 800]);
    //hierarchy breakdown
    let information = treeStructure(hiroData);
    let leaves = information.leaves();
    let parents= noLeaves(information.descendants());

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
        if (data.depth !== 1){
        div
            .text(function(d){return data.data.child})
            .style("left", (d3.event.pageX - 34) + "px")
            .style("top", (d3.event.pageY - 12) + "px")
            .style("height", "auto")
            .style("width", "auto")
            .style("background-image", "none")
            .style("background-color", "#ddd");
        }
        else {

        div
            .text("")
            .style("background-color", "black")
            .style("background-repeat", "no-repeat")
            .style("background-position", "center")
            .style("height", "70px")
            .style("width", "156px")
            .style("", "70px")
            .style("background-image", `url(${data.data.details[1]})`)
            .style("background-size", "contain")
            .style("left", (d3.event.pageX - 34) + "px")
            .style("top", (d3.event.pageY - 12) + "px");
        }
    }

    const mouseout =()=> {
        div.style("display", "none");
    }


    //Build paths connecting child and parent 
    let connections = svg.append("g").selectAll("path")
        .data(information.links());
    console.log(information.links());
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
        .data(leaves);
    
      circles.enter().append("circle")
        .attr('class', 'leaves')
        .attr("cx", function(d){return d.x;})
        .attr("cy", function(d){return d.y;})  
        .attr("r",10)
        .attr('fill', "#dddddd")
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
        
    names.enter().append("text")
        .text(d=>((d.depth !== 0) && (d.depth !== 3) ) ? d.data.details[0]: "")
        // .text("text-anchor", "middle")
        .attr("x", function(d){return d.x - 40;})
        .attr("y", function(d){return d.y + 40;})
        // .attr('fill', 'black');

} 

const noLeaves = (root)=>{
    return root.filter(obj=> {
        return (obj.depth !== 3);
    });
};




