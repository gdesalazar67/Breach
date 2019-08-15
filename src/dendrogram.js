

let w = 600, h = 600, pad = 50; 

let svg = d3.select("#svg") 
    .append("svg") 
    .attr("height", h)
    .attr("width", w)
    .append("g").attr("transform", "translate(50,50)");

const resultsTree = (hiroData)=>{
    let treeStructure = d3.tree().size([300, 300]);
    let information = treeStructure(hiroData);
    
    let circles = svg.append("g").selectAll("circle")
        .data(information.descendants());
      circles.enter().append("circle")
        .attr("cx", function(d){return d.x;})
        .attr("cy", function(d){return d.y;})  
        .attr("r",30)
        .attr('fill', 'blue');

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
        .text(function(d){return d.data.child;})
        .attr("x", function(d){return d.x-100;})
        .attr("y", function(d){return d.y+30;})
        .attr('fill', 'black');

} 


//const dataset = // our cleaned up dataset will go here;
