var dataset = [
	{ "date":"20" , "value":195 },
	{ "date":"21" , "value":276 },
	{ "date":"22" , "value":278 },
	{ "date":"23" , "value":272 },
	{ "date":"24" , "value":326 },
	{ "date":"25" , "value":360 },
	{ "date":"26" , "value":329 }
]

var dom = document.getElementById('area-chart');

var width = dom.offsetWidth;
var height = dom.offsetHeight;

var svg = d3.select(dom)
	.append("svg")
	.attr("class","areaSvg")
	.attr("width", width)
	.attr("height", height);

var padding = {left:0, right:0, top:0, bottom:60};

var xScale = d3.scalePoint()
	.domain(dataset.map(function(d){ return d.date}))
	.range([0, width - padding.left - padding.right]);

var yScale = d3.scaleLinear()
	.domain([0,d3.max(dataset.map(function(d){ return d.value}))+150])
	.range([height - padding.top - padding.bottom, 0]);

var xAxis = d3.axisBottom()
	.scale(xScale)
	.tickFormat(function(d,i){
		if (i==0 || i==6) {return ;}
		else {return d;}
	})
	.tickSizeInner(0)
	.tickSizeOuter(0)
	.tickPadding(24)
	.ticks(7)
	
var yAxis = d3.axisLeft()
	.scale(yScale)
	.tickFormat(function(d,i){return ;})
	.tickSizeInner(0)
	.tickSizeOuter(0)
	.ticks(4)

var area = d3.area()
	.curve(d3.curveCardinal)
	.x(function(d) { return xScale(d.date); })
	.y1(function(d) { return yScale(d.value); })
	.y0(function(d) { return yScale(0)+padding.bottom; });

var areaDefs = svg.append("defs");  
var areaLinearGradient = areaDefs.append("linearGradient")  
                .attr("id","areaLinearColor")  
                .attr("x1","0%")  
                .attr("y1","0%")  
                .attr("x2","0%")  
                .attr("y2","100%");  

var areaStop1 = areaLinearGradient.append("stop")  
                .attr("offset","0%")  
                .style("stop-color","#fa7e57");  

var areaStop2 = areaLinearGradient.append("stop")  
                .attr("offset","100%") 
                .style("stop-color","#ff467a"); 

var areaPath = svg.append("path")
	.datum(dataset)
	.attr("class", "area")
	.attr("transform","translate(" + padding.left + "," + padding.top + ")")
	.attr("d", area)
	.attr("fill","url(#" + areaLinearGradient.attr("id") + ")")

svg.append("g")
	.attr("class","line-xAxis")
	.attr("transform","translate(" + padding.left + "," + (height - padding.bottom ) + ")")
	.call(xAxis); 
	
svg.append("g")
	.attr("class","line-yAxis")
	.attr("transform","translate(" + padding.left + "," + padding.top + ")")
	.call(yAxis);