var dataset = [
	{ "date":"11" , "value":292 },
	{ "date":"12" , "value":285 },
	{ "date":"13" , "value":137 },
	{ "date":"14" , "value":195 },
	{ "date":"15" , "value":175 },
	{ "date":"16" , "value":154 },
	{ "date":"17" , "value":341 },
	{ "date":"18" , "value":379 },
	{ "date":"19" , "value":312 },
	{ "date":"20" , "value":184 },
	{ "date":"21" , "value":196 },
	{ "date":"22" , "value":278 },
	{ "date":"23" , "value":165 },
	{ "date":"24" , "value":287 },
	{ "date":"25" , "value":283 }
]

var dom = document.getElementById('bar-chart');

var width = dom.offsetWidth;
var height = dom.offsetHeight;

var svg = d3.select(dom)
	.append("svg")
	.attr("class","barSvg")
	.attr("width", width)
	.attr("height", height);

var padding = {left:40, right:30, top:0, bottom:50};

var xScale = d3.scalePoint()
	.domain(dataset.map(function(d){ return d.date}))
	.range([0, width - padding.left - padding.right]);

var yScale = d3.scaleLinear()
	.domain([0,d3.max(dataset.map(function(d){ return d.value}))+150])
	.range([height - padding.top - padding.bottom, 0]);

var xAxis = d3.axisBottom()
	.scale(xScale)
	.tickSizeInner(0)
	.tickSizeOuter(0)
	.tickPadding(20)
	
var yAxis = d3.axisLeft()
	.scale(yScale)
	.tickSizeInner(0)
	.tickSizeOuter(0)
	.tickPadding(12)
	.ticks(4)

svg.append("g")
	.attr("class","line-xAxis")
	.attr("transform","translate(" + padding.left + "," + (height - padding.bottom ) + ")")
	.call(xAxis); 
	
svg.append("g")
	.attr("class","line-yAxis")
	.attr("transform","translate(" + padding.left + "," + padding.top + ")")
	.call(yAxis);

barG = svg.append("g")
	.attr("class","barGroup")
	.attr("transform","translate(" + padding.left + "," + padding.top + ")"); 


var colorC = d3.interpolate("#6238eb","#ff467a"); 
var colorScale = d3.scaleLinear().domain([0,d3.max(dataset.map(function(d){ return d.value}))-150]).range([0, 1]);

barG.selectAll(".bar")
	.data(dataset)
	.enter()
	.append("rect")
	.attr("class","bar")
	.attr("x",function(d,i){
		return xScale(d.date);
	})
	.attr("y",function(d,i){
		return yScale(d.value);
	})
	.attr("width",4)
	.attr("height",function(d){
		return height - padding.top - padding.bottom - yScale(d.value);
	})
	.attr("rx","2")
	.attr("ry","2")
    .attr("fill",function(d,i){
    	var defs = svg.append("defs");  
		var linearGradient = defs.append("linearGradient")  
		                .attr("id","linearColor"+i)  
		                .attr("x1","0%")  
		                .attr("y1","100%")  
		                .attr("x2","0%")  
		                .attr("y2","0%");  

		var stop1 = linearGradient.append("stop")  
		                .attr("offset","0%")  
		                .style("stop-color","#6238eb");  

		var stop2 = linearGradient.append("stop")  
		                .attr("offset","100%") 

    	stop2.style("stop-color",colorC(colorScale(d.value))); 
    	return "url(#" + linearGradient.attr("id") + ")"
    })
