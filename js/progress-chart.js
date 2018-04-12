var dataset = [155,65];

var dom = document.getElementById('progress-chart');

var width = dom.offsetWidth;
var height = dom.offsetHeight;

var svg = d3.select(dom)
	.append("svg")
	.attr("class","progressSvg")
	.attr("width", width)
	.attr("height", height);

var padding = {left:50, right:50, top:100, bottom:60};

var scaleContainer1 = svg.append("g")
	.attr("class","scale-wrappe")
	.attr("transform","translate("+padding.left+","+padding.top+")")

var scaleContainer2 = svg.append("g")
	.attr("class","scale-wrappe")
	.attr("transform","translate("+padding.left+","+(padding.top+100)+")")

var colorC = d3.interpolate("#ff466d","#5252ff"); 
var colorScale = d3.scaleLinear().domain([0,gaugeBarNum]).range([0, 1]);

function renderScale(data,container) {
	var bgBarNum = 40;
	var barMarginLeft = (width-padding.left-padding.right- 3*bgBarNum)/(bgBarNum-1)+3;

	for (var i = 0; i < bgBarNum; i++) {
		container.append("rect")
			.attr("class","sclaeBgBar")
			.attr("width",3)
			.attr("height",20)
			.attr("rx","2")
			.attr("ry","2")
			.attr("x", i*barMarginLeft)
			.attr("y",26)
			.attr("fill","#eeeeee")
	}

	var scoreInScale = Math.round(data/200*bgBarNum);

	for (var j = 0; j < scoreInScale; j++) {
		container.append("rect")
			.attr("class","sclaeScoreBar")
			.attr("width",3)
			.attr("height",20)
			.attr("rx","2")
			.attr("ry","2")
			.attr("x", j*barMarginLeft)
			.attr("y",26)
			.attr("fill",function(){
				return colorC(colorScale(j));
			})
	}

	var tickFormat = container.append("g")
		.attr("class","tickFormat")

	tickFormat.append("text")
		.text("0")
		.attr("transform","translate(0,60)")
		.style("font-size","0.8em")
		.attr("fill","#999999")

	tickFormat.append("text")
		.text("200")
		.attr("transform","translate("+ (width-padding.left-padding.right) +",60)")
		.style("font-size","0.8em")
		.attr("fill","#999999")
		.style("text-anchor","end")

	var defs = container.append("defs");  
	var linearGradient = defs.append("linearGradient")  
                    .attr("id","tipColor")  
                    .attr("x1","0%")  
                    .attr("y1","0%")  
                    .attr("x2","0%")  
                    .attr("y2","100%");  

	var stop1 = linearGradient.append("stop")  
	                .attr("offset","0%")  
	                .style("stop-color","#ff466d");  

	var stop2 = linearGradient.append("stop")  
	                .attr("offset","80%")  
	                .style("stop-color","#e8329d"); 

	var tipBubble = container.append("g")
		.attr('transform',"translate("+ (width-padding.left-padding.right)*data/200 +","+ 0 +")")

	tipBubble.append('circle')
		.attr('cx', 0)
		.attr('cy', 0)
		.attr('r', 16)
		.attr('fill',"url(#" + linearGradient.attr("id") + ")")

	tipBubble.append('path')
		.attr('d',function(){
			return 'M-6 14 L6 14 L0 22 Z'
		})
		.attr('fill','#e8329d')
	tipBubble.append('text')
		.attr('class','tipScore')
		.text(data)
		.attr('transform','translate(0,5)')
		.style('text-anchor','middle')
		.style("font-size","0.8em")
		.attr("fill","#ffffff")
}

renderScale(dataset[0],scaleContainer1);
renderScale(dataset[1],scaleContainer2);