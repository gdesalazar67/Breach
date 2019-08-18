

const svgDiv = document.getElementById("svg")
let svg = d3.select(svgDiv) 
    .append("svg")
    .attr("width", svgDiv.clientWidth)
    .attr("height", 3000)// this controls the scroll needs to be bigger then the tree
    .append("g").attr("transform", `translate(50,50)`);



   
const resultsTree = (hiroData)=>{
   
    let treeStructure = d3.tree().size([svgDiv.clientWidth, 800]);
    let information = treeStructure(hiroData);
    let leaves = information.leaves();

    // append div to svg for popup window 
    let div = d3.select(svgDiv).append("div")
        .attr("class", "tooltip")
        .style("display", "none");

    ///pop up window functions 
    const mouseover = ()=> {
        div.style("display", "inline");
    }

    const mousemove =()=> {
       
        div
            .text(d3.event.pageX + "," + d3.event.pageY)
            .style("left", (d3.event.pageX - 34) + "px")
            .style("top", (d3.event.pageY - 12) + "px");
    }

    const mouseout =()=> {
        div.style("display", "none");
    }
    // create leaf circles 
    let circles = svg.append("g").selectAll("circle")
        .data(leaves);
    
      circles.enter().append("circle")
        .attr('class', 'leaves')
        .attr("cx", function(d){return d.x;})
        .attr("cy", function(d){return d.y;})  
        .attr("r",10)
        .attr('fill', "blue")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout);


    // d3.select("leaves")
    //     .selectAll("div")
    //     .data(leaves)
    //     .enter().append("div")
    //     .style("width", 20)
    //     // .text(function (d) { return d.data.details; })
    //     .on("mouseover", function (d) { tooltip.text(d); return tooltip.style("visibility", "visible"); })
    //     .on("mousemove", function () { return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px"); })
    //     .on("mouseout", function () { return tooltip.style("visibility", "hidden"); });
    

    // console.log(svg.node().getBBox())




    let connections =svg.append("g").selectAll("path")
        .data(information.links());

    connections.enter().append("path")
        .attr("d", function(d){
            return "M" + d.source.x + "," + d.source.y + " C " +
            d.source.x + "," + (d.source.y + d.target.y)/2 + " " +
            d.target.x + "," + (d.source.y + d.target.y)/2 + " " +
            d.target.x + "," + d.target.y;
        })
        .attr('stroke', 'red')
        .attr('fill', 'none');

    let names = svg.append("g").selectAll("text")
        .data(information.descendants());
        
    names.enter().append("text")
        .text(d=>(d.depth !== 3) ? d.data.details[0]: "")
        .attr("x", function(d){return d.x-100;})
        .attr("y", function(d){return d.y+30;})
        .attr('fill', 'black');

} 

