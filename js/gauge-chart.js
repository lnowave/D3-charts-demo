var dataset = 85;

var dom = document.getElementById('gauge-chart');

var width = dom.offsetWidth;
var height = dom.offsetHeight;

var svg = d3.select(dom)
	.append("svg")
	.attr("class","gaugeSvg")
	.attr("width", width)
	.attr("height", height);

var padding = {left:0, right:0, top:0, bottom:60};
var gaugeBarNum = 46;
var gaugeR = 100;

var gaugeBgG = svg.append("g")
	.attr("class","gaugeBg")
	.attr("transform","translate("+ width/2 +","+ height/2 +")")

for (var i = 0; i < gaugeBarNum; i++) {
	var rotateDeg = 240/(gaugeBarNum-1)*(i -gaugeBarNum/2)
	var barX = Math.sin((240/(gaugeBarNum-1)*i -120 - rotateDeg)*Math.PI/180)*gaugeR;
	var barY = Math.cos((240/(gaugeBarNum-1)*i -120 -rotateDeg)*Math.PI/180)*(-gaugeR);

	gaugeBgG.append("rect")
		.attr("class","GaugeBgBar")
		.attr("width",4)
		.attr("height",20)
		.attr("rx","2")
		.attr("ry","2")
		.style("transform-origin","2px 10px")
		.style("transform","rotate("+ rotateDeg +"deg)")
		.attr("x",barX)
		.attr("y",barY)
		.attr("fill","#eeeeee")
}

var scoreBarNum = Math.round(dataset/100*gaugeBarNum);

var colorC = d3.interpolate("#5252ff","#ff466d"); 
var colorScale = d3.scaleLinear().domain([0,gaugeBarNum]).range([0, 1]);

var gaugeScoreG = svg.append("g")
	.attr("class","gaugeScore")
	.attr("transform","translate("+ width/2 +","+ height/2 +")")

for (var j = 0; j < scoreBarNum; j++) {
	var rotateDeg = 240/(gaugeBarNum-1)*(j -gaugeBarNum/2)
	var barX = Math.sin((240/(gaugeBarNum-1)*j -120 - rotateDeg)*Math.PI/180)*gaugeR;
	var barY = Math.cos((240/(gaugeBarNum-1)*j -120 -rotateDeg)*Math.PI/180)*(-gaugeR);

	gaugeScoreG.append("rect")
		.attr("class","GaugeScoreBar")
		.attr("width",4)
		.attr("height",function(){
			if (j == (scoreBarNum-1)) {return 30;}
			else{return 20;}
		})
		.attr("rx","2")
		.attr("ry","2")
		.style("transform-origin","2px 10px")
		.style("transform","rotate("+ rotateDeg +"deg)")
		.attr("x",barX)
		.attr("y",barY)
		.attr("fill",function(){
			return colorC(colorScale(j));
		})
}

svg.append('text')
	.attr('class','score')
	.text(dataset)
	.attr("transform","translate("+ width/2 +","+ (height/2+20) +")")