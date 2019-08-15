

let w = 600, h = 600, pad = 50; 

let svg = d3.select("#svg") 
    .append("svg") 
    .attr("height", h)
    .attr("width", w);

const resultsTree = (hiroData)=>{
    let treeStructure = d3.tree().size([600, 600]);
    let information = treeStructure(hiroData);
    console.log(information.descendants());
    console.log(information.links());
} 


//const dataset = // our cleaned up dataset will go here;
