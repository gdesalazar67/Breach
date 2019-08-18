

const svgDiv = document.getElementById("svg")
let svg = d3.select(svgDiv) 
    .append("svg")
    .attr("width", svgDiv.clientWidth)
    .attr("height", 3000)// this controls the scroll needs to be bigger then the tree
    .append("g").attr("transform", `translate(50,50)`);



   
const resultsTree = (hiroData)=>{
   
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
        div
            .text(data.data.child)
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
        .on("mousemove", d=>mousemove(d))
        .on("mouseout", mouseout);

// create reactangles for parents
    let rects = svg.append("g").selectAll("rect")
        .data(parents);
        debugger
        
    rects.enter().append("rect")
            .attr('class', "Reacts")
            .attr("x", d =>(d.x))
            .attr("y", d =>(d.y))
            .attr("width", 50)
            .attr("height", 30)
            .on("mouseover", mouseover)
            .on("mousemove", d => mousemove(d))
            .on("mouseout", mouseout);




//Build paths connecting child and parent 
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

///append text to tree nodes
    let names = svg.append("g").selectAll("text")
        .data(information.descendants());
        
    names.enter().append("text")
        .text(d=>(d.depth !== 3) ? d.data.details[0]: "")
        .attr("x", function(d){return d.x-100;})
        .attr("y", function(d){return d.y+30;})
        .attr('fill', 'black');

} 

const noLeaves = (root)=>{
    return root.filter(obj=> {
        return (obj.depth !== 3);
    });
};




