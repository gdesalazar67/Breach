
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

    buildYaxis(svg, viewHeight);
    buildBubbleChart(svg, viewWidth, viewHeight);
    
};

const buildYaxis = (svg, height) => {

    height = height === 3576 ? 3525: 4709;

    let yScale = d3.scaleLinear()
        .domain([2020, 2009])
        .range([0, height])
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
    

const buildBubbleChart = (svg, width, height) => {

    let root = {children: majorBreaches["2009"]}; 
    let flatNodeHeirarchy =  d3.hierarchy(root).sum(d => d.recordsLost);
   
    let packedDataBuilder = () => {
       
        let pack = d3.pack()
            .size([width, 325])
            .padding(1)
            return pack(flatNodeHeirarchy);
    };

    let packedData = packedDataBuilder();
    console.log(packedData)

    let leaf = svg.append("g")
        .attr("class", "bubbecluster")
        .attr("transform", `translate(0,1500)`)
        .selectAll("g")
        .data(packedData.leaves())
        .enter()
        .append("g")
        .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

    
    const color = d3.scaleOrdinal()
        .domain([2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019])
        .range(["#59a6f81f", "#e3eef9", "#cfe1f2", "#b5d4e9", "#93c3df", "#6daed5", "#4b97c9", "#2f7ebc", "#1864aa", "#0a4a90", "#08306b"].reverse());

    const circle = leaf.append("circle")
        .attr("r", d => d.r)
        .attr("class", "r-circles")
        .attr("fill", d => {
            return color(d.data.year);
        });
    
    // creat some circles//
    // svg.selectAll("div")
    //     .data(majorBreaches["2009"])
    //     .enter()
    //     .append()
    
    // var simulation = d3.forceSimulation(data).force("charge", d3.forceManyBody().strength([-50])).force("x", d3.forceX()).force("y", d3.forceY()).on("tick", ticked);
};
    
    
    
    
    
    // console.log(axis._groups[0][0].lastChild.childNodes[1].childNodes[0].data)
    //  axis.selectAll("text").remove();
    //  axis.selectAll("g").remove();
    // axis.selectAll("width", 60.5)

    // axis.select("g:last-of-type text")
    //     .text("2009 and Earlier")