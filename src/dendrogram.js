

const svgDiv = document.getElementById("svg")
let svg = d3.select(svgDiv) 
    .append("svg")
    .attr("width", svgDiv.clientWidth)
    .attr("height", 3000)// this controls the scroll needs to be bigger then the tree
    .append("g").attr("transform", `translate(50,50)`);



   
const resultsTree = (hiroData)=>{
   
    let treeStructure = d3.tree().size([svgDiv.clientWidth, 800]);
    let information = treeStructure(hiroData);
    console.log(information)

    let circles = svg.append("g").selectAll("circle")
        .data(information.descendants());
    console.log(information.descendants())

      circles.enter().append("circle")
        .attr("cx", function(d){return d.x;})
        .attr("cy", function(d){return d.y;})  
        .attr("r",20)
        .attr('fill', d => (d.depth === 1)? "red": "blue");
    console.log(svg.node().getBBox())
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

