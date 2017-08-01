//global chart reference
var chart = null;

//canvas info
var width = 500;
var height= 500;
var margin = 80;

//Table 
function draw_table(data){

	var div = document.getElementById('table');

	//clear existing tables
	while (div.hasChildNodes()) {   
    	div.removeChild(div.firstChild);
	}

	var table = document.createElement("table");
	var header = document.createElement("tr");

    for (var key in data[0]){
		var h = document.createElement("th");
		h.innerHTML = key;
		header.appendChild(h);
	}
	table.appendChild(header);

	for (var i in data) {

		var tr = document.createElement("tr");
		for (var key in data[i]) {
			var td = document.createElement("td");
        	td.innerHTML = data[i][key];
			tr.appendChild(td);
		}

		table.appendChild(tr);
	}

	div.appendChild(table);
}

//datavector class
function DataVector(name){
	this.data = null;
	this.fieldname = null;

	this.name = name;
	this.view_obj = null;
	this.setup();
}
DataVector.prototype.setup = function(){
	var param = document.getElementById('p2');
	sel = sl(this.name);    
    param.appendChild(sel);
    this.view_obj = sel;
    sel.pair = this;
    
    sel.oninput = this.setdata;
}
DataVector.prototype.setdata = function(){
	this.pair.fieldname = this.value;
	read_data(this.value, this.pair);
}
DataVector.prototype.at = function(i){ //fix
	console.log(this.data[i]);
	this.data[i];
}
DataVector.prototype.len = function(){ //fix
	this.data.length;
}

function sl(l){
	var select = document.createElement("select");
    var label = document.createElement("option");
	label.text = l;
	select.add(label);
    for (var key in labels) {
		var option = document.createElement("option");
		option.text = key;
		select.add(option);
	}
	return select; 
}


//scatterplot class
function Scatter(){
	this.xvector = null;
	this.yvector = null;

	this.xlabel = 'x axis';
	this.ylabel = 'y axis';
	this.title  = 'title';
}
Scatter.prototype.valid = function() {
	if (this.xvector.data != null && this.yvector.data != null) {
		chart.draw();
		return true;
	}
	return false;
};

Scatter.prototype.draw = function(){

	var xname = this.xvector.fieldname;
	var yname = this.yvector.fieldname;

	alasql("CREATE TABLE xvector (" + xname + " INT, event string, id INT)");
	alasql("CREATE TABLE yvector (" + yname +  " INT, event string, id INT)");

	alasql.tables.xvector.data = this.xvector.data;
	alasql.tables.yvector.data = this.yvector.data;

	var chart_data = alasql("SELECT * FROM xvector NATURAL JOIN yvector");

	alasql("DROP TABLE xvector");
	alasql("DROP TABLE yvector");

	
	draw_table(chart_data);

	var svg = d3.select('svg')
			.attr("width", width)
			.attr("height", height);


	var x = d3.scaleLinear().range([margin, width - margin]);
	var y = d3.scaleLinear().range([height - margin, margin]);

	x.domain(d3.extent(chart_data, function(d) { return parseFloat(d[xname]); }));
	y.domain(d3.extent(chart_data, function(d) { return parseFloat(d[yname]); }));

    d3.selectAll("g").remove(); //clear axises
    d3.selectAll("circle").remove(); //clear points
    d3.selectAll("text").remove(); //clear labels

    svg.append("g")
    .attr("transform", "translate(0," + (height - margin) + ")")
    .call(d3.axisBottom(x));

    svg.append("g")
    .attr("transform", "translate(" + (margin) + ", " + 0 + ")")
    .call(d3.axisLeft(y));

	svg.append("text")
    	.attr("class", "title")
    	.attr("text-anchor", "middle")
    	.attr("x", width/2)
    	.attr("y", margin/2)
    	.text(this.title);

    svg.append("text")
    	.attr("class", "x label")
    	.attr("text-anchor", "middle")
    	.attr("x", width/2)
    	.attr("y", height - margin/2)
    	.text(this.xlabel);

    svg.append("text")
    	.attr("class", "y label")
    	.attr("text-anchor", "end")
    	.attr("transform", "rotate(-90)")
    	.attr("x", -height/2)
    	.attr("y", margin/2)
    	.text(this.ylabel);

    var circle = svg.selectAll("circle")
    	.data(chart_data);

    circle.enter().append("circle")
    	.attr("r", 2.5)
    	.merge(circle)
    	.attr("cx", function(d){return x( parseFloat(d[xname])) })
    	.attr("cy", function(d){return y( parseFloat(d[yname])) });	
};

//function to set up scatterplot, need to prevent memory leaks?
//need more elegant/intuitive param prompts at some point
Scatter.prototype.setup_chart = function() {
	this.xvector = new DataVector("X Vector");
	this.yvector = new DataVector("Y Vector");

};

//Clear p2 div
function clear(){
	var list = document.getElementById('p2');

	while (list.hasChildNodes()) {   
    	list.removeChild(list.firstChild);
	}
}
//Handler for chart select menu, entry point
function select_chart(){
	var type = document.getElementById("type").value;

	clear();
	if (type == "Scatter") {
		chart = new Scatter();
	}
	if (chart != null)
		chart.setup_chart();
}



