//global chart reference
var chart = null;

//Test data sets
var a = [1, 2, 4, 5, 6, 7, 8];
var b = [1, 4, 17, 30, 70, 140, 220];
var c = [1, 0, 1, 0, 0, 1, 1];
var data = {'a': a, 'b': b, 'c':c};

//canvas info
var width = 500;
var height= 500;
var margin = 80;

//Table 
function draw_table(x, y){

	var div = document.getElementById('table');
	var table = document.createElement("table");

	var header = document.createElement("tr");
	var hx = document.createElement("th");
	var hy = document.createElement("th");

	hx.innerHTML = "x";
    hy.innerHTML = "y";
	header.appendChild(hx);
	header.appendChild(hy);
	table.appendChild(header);

	for (var i in x) {
		var tr = document.createElement("tr");
		var tx = document.createElement("td");
		var ty = document.createElement("td");

        tx.innerHTML = x[i];
        ty.innerHTML = y[i];
		tr.appendChild(tx);
		tr.appendChild(ty);
		table.appendChild(tr);
	}
	div.appendChild(table);
}

//datavector class
function DataVector(name, callback){
	this.data = [];
	this.name = name;
	this.type = null;
	this.callback = callback;
}
DataVector.prototype.setup = function(){

}
DataVector.prototype.setdata = function(){

}


//scatterplot class
function Scatter(){
	this.xvector = null;
	this.yvector = null;
}
Scatter.prototype.valid = function() {
	if (this.xvector != null && this.yvector != null) {
		chart.draw();
		return true;
	}
	return false;
};

Scatter.prototype.draw = function(){
	draw_table(this.xvector, this.yvector);

	var svg = d3.select('svg')
			.attr("width", width)
			.attr("height", height);

	var chart_data = [];
	for (var i = 0; i < this.xvector.length; i++) {
		chart_data.push({"x": this.xvector[i], "y": this.yvector[i]});
	}

	var x = d3.scaleLinear().range([margin, width - margin]);
	var y = d3.scaleLinear().range([height - margin, margin]);

	x.domain(d3.extent(chart_data, function(d) { return d.x; }));
	y.domain(d3.extent(chart_data, function(d) { return d.y; }));


    d3.selectAll("g").remove(); //clear axises

    svg.append("g")
    .attr("transform", "translate(0," + (height - margin) + ")")
    .call(d3.axisBottom(x));

    svg.append("g")
    .attr("transform", "translate(" + (margin) + ", " + 0 + ")")
    .call(d3.axisLeft(y));

    var circle = svg.selectAll("circle")
    	.data(chart_data);

    circle.enter().append("circle")
    	.attr("r", 2.5)
    	.merge(circle)
    	.attr("cx", function(d){return x(d.x) })
    	.attr("cy", function(d){return y(d.y) });	
};

//function to set up scatterplot, need to prevent memory leaks?
//need more elegant/intuitive param prompts at some point
Scatter.prototype.setup_chart = function() {
	("cx", function(d){return d})
    var param = document.getElementById('p2');
    var br = document.createElement("br");

    selx = ask("X Vector", data, "setX()");    

    param.appendChild(br);
    param.appendChild(selx);

    sely = ask("Y Vector", data, "setY()");  
    param.appendChild(sely);  

};

//Clear p2 div
function clear(){
	var list = document.getElementById('p2');

	while (list.hasChildNodes()) {   
    	list.removeChild(list.firstChild);
	}
}
//Handler for chart select menu
function select_chart(){
	var type = document.getElementById("type").value;

	clear();
	if (type == "Scatter") {
		chart = new Scatter();
		chart.setup_chart();
	}
}

//create a select object populated with choices
function ask(l, k, callback){
	var select = document.createElement("select");
    

    var label = document.createElement("option");
	label.text = l;
	select.add(label);

    for (var key in k) {

		var option = document.createElement("option");
		option.text = key;
		select.add(option);
	}

	select.setAttribute("oninput", callback);
	select.setAttribute("id", callback); 
	return select; 
}



//temporary functions
function setX(){
	var choice = document.getElementById("setX()").value; //this is awkward??
	chart.xvector = data[choice];
	chart.valid();
}
function setY(){
	var choice = document.getElementById("setY()").value;
	chart.yvector = data[choice];
	chart.valid();
}





