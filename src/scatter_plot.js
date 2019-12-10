
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
    
    // let txtNodes = txt.nodes();
    // d3.select(txtNodes[txtNodes.length - 1])
    //     .text("2009 and Earlier")
    //     .attr("transform", "translate(150,0)");

    let rects = axis.selectAll("g")
        .append("rect")
        .attr("width", 60.5)
        .attr("height", 26)
        .attr("rx", 5)
        .attr("transform", "translate(1,-14.5)");

    // let rectsNodes = rects.nodes();
    // d3.select(rectsNodes[rectsNodes.length-1])
    //     .attr("width", 150)
    //     .attr("height", 26)
    //     .attr("transform", "translate(1,-14.5)");

};
    

const buildBubbleChart = (svg, width, height) => {

    let classes = majorBreaches["2019"];

    const sizeScale = d3.scaleSqrt()
        .range([17, 60]);

    sizeScale.domain(d3.extent(classes, d => d.recordsLost));
    
    let pack = d3.pack()
        .size([width, 325]);
    
    pack.radius(d => sizeScale(d.value)); 

    let root =  d3.hierarchy({children: classes}).sum(d => d.recordsLost);

    let leaf = svg.append("g")
        .attr("class", "bubbecluster")
        .attr("transform", `translate(0,1500)`)
        .selectAll("g")
        .data(pack(root).leaves())
        .enter()
        .append("g")
        .attr("transform", d => `translate(${d.x +1},${d.y + 1})`);

    const color = d3.scaleOrdinal()
        .domain([2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019])
        .range(["#59a6f81f", "#e3eef9", "#cfe1f2", "#b5d4e9", "#93c3df", "#6daed5", "#4b97c9", "#2f7ebc", "#1864aa", "#0a4a90", "#08306b"]);

    const color2 = d3.scaleOrdinal()
        .domain([17, 60])
        .range(pallete);

    // const mouseOver = () => {
    //     console.log("mouseOver on " + this)

    // }
        

    // const mouseOut = (circle) => {
    //     console.log(circle);
    // };

    const circle = leaf.append("circle")
        .attr("r", d => d.r)
        .attr("class", "r-circles")

        .attr("stroke", "white")
        .attr("fill", d => color2(d.value))
        // .on("mouseover", mouseOver)
        .on("mouseover", function (d,i) {
            console.log("mouseOver on " + this)
            let parent = this.closest("g");
            d3.select(parent).raise();
            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", d => d.r * 2);

        })
        .on("mouseout", function (d,i) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", d => d.r);
        } );

    let format = d3.format = d3.format(",d");
    // leaf.append("clipPath")
    //     .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
    //     .append("use")
    //     .attr("xlink:href", d => d.leafUid.href);

    leaf.append("text")
        // .attr("clip-path", d => d.clipUid)
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .selectAll("tspan")
        .data(d => d.data.entity.split(/(?=[A-Z][^A-Z])/g))
        .enter()
        .append("tspan")
        // .style("font-size", function (d) { return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 24) + "px"; })
        .attr("font-size", 11)
        .attr("fill", "white")
        .attr("x", 0)
        .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
        .text(d => d);

    // leaf.append("title")
    //     .text(d => `${d.data.entity}\n${format(d.value)}`);

// on mouse over

   







}

        // onclick functions //
   
    // let current_circle = undefined;

    // function selectOccupation(d) {
    //     if(current_circle !== undefined){
    //         current_circle.attr("fill", d => color(d.data.year));
    //         svg.selectAll("#details-popup").remove();
    //     };


    //     current_circle = d3.select(this);
    //     current_circle.attr("fill", "#b2e1f9");
        
    //     let textblock = svg.selectAll("#detail-popup")
    //         .data([d])
    //         .enter()
    //         .append("g")
    //         .attr("id", "details-popup")
    //         .attr("font-size", 14)
    //         .attr("font-family", "sans-serif")
    //         .attr("text-anchor", "center")
    //         .attr("transform", d => `translate(0, 20)`);

    //     textblock.append("text")
    //         .text(d => "Comapnay: " + d.data.entity)
    //         .attr("y", "16");
    //     textblock.append("text")
    //         .text(d => d.data.recordsLost)
    //         .attr("y", "32");
    //     textblock.append("text")
    //         .text(d => d.data.year)
    //         .attr("y", "48");
    // };

    // circle.on("click", selectOccupation)

// };
    
    
    
    
    
    // console.log(axis._groups[0][0].lastChild.childNodes[1].childNodes[0].data)
    //  axis.selectAll("text").remove();
    //  axis.selectAll("g").remove();
    // axis.selectAll("width", 60.5)

    // axis.select("g:last-of-type text")
    //     .text("2009 and Earlier")