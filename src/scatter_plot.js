
// const chartToggleOnOff = (flag) => {
    
//     let display = flag ? "block" : "none";

//     document.getElementById("cc").style.display = display;
//     document.getElementById("svg-container").style.display = display;  
// };

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

    return [w, 1050];
};

const resetSvg = () => {

    if(document.getElementsByTagName("svg").length){
        d3.select("svg").remove();
    };
};

const buildChart = (dataSet) => {
    // chartToggleOnOff(true);
    resetSvg();

    let svgDiv = document.getElementById("svg-container");
    let [viewWidth, viewHeight] = viewBoxDims();
    let svg = d3.select(svgDiv)
        .append("svg")
        .attr("class", "box-size")
        .attr("viewBox", `0 0 ${viewWidth} ${viewHeight}`);

    buildBubbleChart(svg, viewWidth, dataSet);
    
    svg.selectAll(".story")
        .style("display", "none");

};

const buildBubbleChart = (svg, width, dataset) => {

    let classes = dataset;

    const sizeScale = d3.scaleSqrt()
        .range([17, 60]);

    sizeScale.domain(d3.extent(classes, d => d.recordsLost));
    
    let pack = d3.pack()
        .size([width, 847]);
    
    pack.radius(d => sizeScale(d.value)); 

    let root =  d3.hierarchy({children: classes}).sum(d => d.recordsLost);
    let rootPack = pack(root).leaves();
    let leaf = svg.append("g")
        .attr("class", "bubbecluster")
        .attr("transform", `translate(0,110)`)
        .selectAll("g")
        .data(rootPack)
        .enter()
        .append("g")
        .attr("transform", d => `translate(${d.x +1},${d.y + 1})`)
        .on("mouseover", function (d, i) {
            mouseOver(this);
        })
        .on("mouseout", function (d, i) {
            mouseOut(this)
        })
        .on("click", d => {
            if(d.data.personal){
                document.getElementById(`${d.data.Title}-${d.data.recordsLost}`).click();
            }else{
                loader(true);
                window.location = d.data.ndSourceLink
            };
        });

    const color = d3.scaleOrdinal()
        .domain([2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019])
        .range(["#e3ebf6f2", "#e3eef9", "#cfe1f2", "#b5d4e9", "#93c3df", "#6daed5", "#4b97c9", "#2f7ebc", "#1864aa", "#0a4a90", "#08306b"]);

    const mouseOver = (node) => {

        let parent = node.closest("g");

        d3.select(parent)
            .select("circle")
            .transition()
            .duration(200)
            .attr("r", 120);

        d3.select(parent)
            .select(".bubble-title")
            .attr("transform", "translate(0,-80)")
            .attr("fill", d => {
                if (d.data.year < 2015) {
                    return "black"
                };
                return "white"
            })
            .style("font-weight", 700)
            .style("font-size", 15);

        d3.select(parent)
            .raise()
            .select(".story")
            .style("display", "block")
            .attr("transform", d => {
                if(d.data.personal){
                    return "translate(0,-25)"
                }
                return "translate(0,-50)"
            });
                   
    }
        

    const mouseOut = (node) => {

        let parent = node.closest("g");
        d3.select(parent)
            .select(".bubble-title")
            .attr("transform", "translate(0,0)")
            .attr("fill", "white")
            .style("font-weight", 400)
            .style("font-size", 11);

       d3.select(parent)
            .select(".r-circles")
            .transition()
            .duration(200)
            .attr("r", d => d.r);

        d3.select(parent)
            .select(".story")
            .style("display", "none")
            .attr("transform", "translate(0,0)");

    };

    // leaf.append("a")
    //     .attr("xlink:href", d => {
    //         if(d.data.personal){
    //             return "https://www.google.com/"
    //         }
    //         return d.data.ndSourceLink
    //     })
    leaf.append("circle")
        .attr("r", d => d.r)
        .attr("class", "r-circles")
        .attr("stroke", "white")       
        .attr("fill", d => {
            if (d.data.personal) {
                return "#f17e3b"
            };
            return color(d.data.year);
        });
        // .attr("fill", d => color(d.data.year))
    
    leaf.append("text")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", 11)
        .attr("fill", "white")
        .attr("class", "bubble-title")
        .selectAll("tspan")
        .data(d => d.data.entity.split(/(?=[A-Z][^A-Z])/g))
        .enter()
        .append("tspan")
        .attr("x", 0)
        .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
        .text(d => d);
       
    
// implemented Mike Bostock’s  text wrap function https://bl.ocks.org/mbostock/7555321
    function wrap(text, width) {
        text.each(function () {
            let text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                x = text.attr("x"),
                y = text.attr("y"),
                dy = 1.1,
                tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em").text(word);
                }
            }
        });
    };


    
    leaf.append("text")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", d => {
            if(d.data.personal){
                return 16
            }
            return 12
        })
        .attr("fill", d => {
            if(d.data.year < 2015){
                return "black"
            };
            return "white"
        })
        .attr("class", "story")
        .attr("x", 0)
        .text(d => d.data.story)
        .call(wrap, 150)
     
};


// ** feature implementaions for smaller screens and mobile
// const buildYaxis = (svg, width, height, dataSet) => {

//     height = height === 3576 ? 3525 : 4709;

//     let yScale = d3.scaleLinear()
//         .domain([2020, 2009])
//         .range([0, height])
//         .clamp(true);

//     let yAxis = d3.axisLeft().scale(yScale).tickFormat(d3.format("d"));
//     yAxis.tickSizeOuter([0]);

//     let axis = svg.append("g")
//         .attr("class", "axis")
//         .attr("transform", "translate(0, 20)")
//         .call(yAxis);

//     let txt = axis.selectAll("text")
//         .attr("transform", "translate(60,0)");

//     // let txtNodes = txt.nodes();
//     // d3.select(txtNodes[txtNodes.length - 1])
//     //     .text("2009 and Earlier")
//     //     .attr("transform", "translate(150,0)");

//     // axis.selectAll("g")
//     //     .selectAll("g")
//     //     .data(dataSet)
//     //     .enter()
//     //     .append("g")

//     // container.each((d,i,node) => {
//     //         console.log(node[i])
//     //         console.log(d)
//     //         console.log('break');
//     //         // return 
//     //         // buildBubbleChart(null, width, d)
//     //     });


//     let rects = axis.selectAll("g")
//         .append("rect")
//         .attr("width", 60.5)
//         .attr("height", 26)
//         .attr("rx", 5)
//         .attr("transform", "translate(1,-14.5)");

//     // let rectsNodes = rects.nodes();
//     // d3.select(rectsNodes[rectsNodes.length-1])
//     //     .attr("width", 150)
//     //     .attr("height", 26)
//     //     .attr("transform", "translate(1,-14.5)");

// };






  
    
    
    
    
    
    // console.log(axis._groups[0][0].lastChild.childNodes[1].childNodes[0].data)
    //  axis.selectAll("text").remove();
    //  axis.selectAll("g").remove();
    // axis.selectAll("width", 60.5)

    // axis.select("g:last-of-type text")
    //     .text("2009 and Earlier")