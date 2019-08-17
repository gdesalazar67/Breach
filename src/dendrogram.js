

const svgDiv = document.getElementById("svg")
let svg = d3.select(svgDiv) 
    .append("svg")
    .attr("width", svgDiv.clientWidth)
    .attr("height", svgDiv.clientHeight)
    .append("g").attr("transform", `translate(50,50)`);


const resultsTree = (hiroData)=>{
   
    let treeStructure = d3.tree().size([svgDiv.clientWidth, svgDiv.clientHeight]);
    let information = treeStructure(hiroData);
    console.log(information)

    let circles = svg.append("g").selectAll("circle")
        .data(information.descendants());
    console.log(information.descendants())

      circles.enter().append("circle")
        .attr("cx", function(d){return d.x;})
        .attr("cy", function(d){return d.y;})  
        .attr("r",30)
        .attr('fill', d => (d.depth === 1)? "red": "blue");

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
        .text(function(d){return `${d.data.depth}`;})
        .attr("x", function(d){return d.x-100;})
        .attr("y", function(d){return d.y+30;})
        .attr('fill', 'black');

} 

