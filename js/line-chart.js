var dataset = [
	{ "date":"20" , "value":195 },
	{ "date":"21" , "value":276 },
	{ "date":"22" , "value":278 },
	{ "date":"23" , "value":272 },
	{ "date":"24" , "value":326 },
	{ "date":"25" , "value":360 },
	{ "date":"26" , "value":329 }
]

var dom = document.getElementById('line-chart');

var width = dom.offsetWidth;
var height = dom.offsetHeight;

var svg = d3.select(dom)
	.append("svg")
	.attr("class","lineSvg")
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

svg.append("g")
	.attr("class","line-xAxis")
	.attr("transform","translate(" + padding.left + "," + (height - padding.bottom ) + ")")
	.call(xAxis); 
	
svg.append("g")
	.attr("class","line-yAxis")
	.attr("transform","translate(" + padding.left + "," + padding.top + ")")
	.call(yAxis);

var line = d3.line()
	.curve(d3.curveCardinal)
	.x(function(d) { return xScale(d.date); })
	.y(function(d) { return yScale(d.value); })

var linePath = svg.append("path")
	.datum(dataset)
	.attr("class", "line")
	.attr("transform","translate(" + padding.left + "," + padding.top + ")")
	.attr("d", line)
	.attr("fill","none")
	.attr("stroke","#4662ec")
	.attr("stroke-width","3")

var linePathShadow = svg.append("path")
	.datum(dataset)
	.attr("class", "line")
	.attr("transform","translate(" + padding.left + "," + (padding.top+10) + ")")
	.attr("d", line)
	.attr("fill","none")
	.attr("stroke","rgba(70,98,236,.15)")
	.attr("stroke-width","3")