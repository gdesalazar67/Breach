
const chartToggleOnOff = (flag) => {
    
    let display = flag ? "block" : "none";

    document.getElementById("cc").style.display = display;
    document.getElementById("svg-container").style.display = display;  
};

const viewBoxDims = () => {
    let w = window.innerWidth;
    let h;
    if(w < 500){
        w -= 24;
        h = 3576;
    }else{
        w -= 24;
        h = 4759;
    }

    return [w, h];
};

const resetSvg = () => {

    if(document.getElementsByTagName("svg").length){
        d3.select("svg").remove();
    };
};

const buildChart = (dataSet) => {
   
    chartToggleOnOff(true);
    resetSvg();

    let svgDiv = document.getElementById("svg-container");
    let [viewWidth, viewHeight] = viewBoxDims();
    let svg = d3.select(svgDiv)
        .append("svg")
        .attr("class", "box-size")
        // .attr("width", 351)
        // .attr("height", 3576);
        // .attr("preserveAspectRatio", "none")
        .attr("viewBox", `0 0 ${viewWidth} ${viewHeight}`);

    buildYaxis(svg);
    
};

const buildYaxis = (svg) => {

    let yScale = d3.scaleLinear()
        .domain([2020, 2009])
        .range([0, 3525])
        .clamp(true);
    
    let yAxis = d3.axisLeft().scale(yScale).tickFormat(d3.format("d"));
        yAxis.tickSizeOuter([0]);

    let axis = svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0, 20)")
        .call(yAxis);

    let txt = axis.selectAll("text")
        .attr("transform", "translate(60,0)");
    
    let txtNodes = txt.nodes();
    d3.select(txtNodes[txtNodes.length - 1])
        .text("2009 and Earlier")
        .attr("transform", "translate(150,0)");

    let rects = axis.selectAll("g")
        .append("rect")
        .attr("width", 60.5)
        .attr("height", 26)
        .attr("rx", 5)
        .attr("transform", "translate(1,-14.5)");

    let rectsNodes = rects.nodes();
    d3.select(rectsNodes[rectsNodes.length-1])
        .attr("width", 150)
        .attr("height", 26)
        .attr("transform", "translate(1,-14.5)");

};
    

const buildBubbleChart = () => {

};
    
    
    
    
    
    // console.log(axis._groups[0][0].lastChild.childNodes[1].childNodes[0].data)
    //  axis.selectAll("text").remove();
    //  axis.selectAll("g").remove();
    // axis.selectAll("width", 60.5)

    // axis.select("g:last-of-type text")
    //     .text("2009 and Earlier")