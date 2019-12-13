
const resetSvg = () => {

    if(document.getElementsByTagName("svg").length){
        d3.select("svg").remove();
        chartDisplayed = null;
    };
};

const buildChart = (dataSet) => {

    resetSvg()

    let svgDiv = document.getElementById("svg-container");
    let [viewWidth, viewHeight] = [window.innerWidth - 24, 1050];
    let svg = d3.select(svgDiv)
        .append("svg")
        .attr("class", "box-size")
        .attr("viewBox", `0 0 ${viewWidth} ${viewHeight}`);

    buildBubbleChart(svg, viewWidth, dataSet);
    
    svg.selectAll(".story")
        .style("display", "none");

    chartDisplayed = true;
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
                let div = document.getElementById(`${d.data.Title}-${d.data.recordsLost}`)  
                if(div.classList[1] === "card-is-expanded"){
                    scrollToDiv(div);
                }else{
                    div.click();
                };
            }else{
                window.open(d.data.ndSourceLink);
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
            .style("display", "none")
        

        d3.select(parent)
            .raise()
            .select(".story")
            .style("display", "block")
            .attr("transform", d => {
                if(d.data.personal){
                    return "translate(0,-25)"
                }
                return "translate(0,-75)"
            });
                   
    }
        

    const mouseOut = (node) => {

        let parent = node.closest("g");
        d3.select(parent)
            .select(".bubble-title")
            .style("display", "block")
            

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
                tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + .4 + "em");
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

    const toCommas = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
     
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

    leaf.select(".story")
        .append("tspan")
        .attr("x", 0)
        .attr("dy", "1.4em")
        .style("font-weight", 700)
        .style("font-size", 13)
        .text(d => {
            return `${toCommas(d.data.recordsLost)} records lost`
        })
        .lower()
    
    leaf.select(".story")
        .append("tspan")
        .attr("x", 0)
        .style("font-weight", 700)
        .style("font-size", 19)
        .text(d => d.data.entity)
        .lower()
     
};

