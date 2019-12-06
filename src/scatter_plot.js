

const chartToggleOnOff = (flag) => {
    
    let display = flag ? "block" : "none";

    document.getElementById("cc").style.display = display;
    document.getElementById("svg-container").style.display = display;  
};

const resetSvg = () => {

    if(document.getElementsByTagName("svg").length){
        console.log("hello from resetvg")
        d3.select("svg").remove();
    };
};

const buildChart = (dataSet) => {

    chartToggleOnOff(true);
    resetSvg();

    let svgDiv = document.getElementById("svg-container");
    let svg = d3.select(svgDiv)
        .append("svg")
        .attr("class", "box-size");

    
    
};





