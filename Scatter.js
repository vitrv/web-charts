//scatterplot class
function Scatter(){
	this.xvector = null;
	this.yvector = null;

	this.xlabel = 'X axis';
	this.ylabel = 'Y axis';
	this.title  = 'Title';
}
Scatter.prototype.set_title = function(str){
	this.title = str;
	this.valid();
}
Scatter.prototype.set_xlabel = function(str){
	this.xlabel = str;
	this.valid();
}
Scatter.prototype.set_ylabel = function(str){
	this.ylabel = str;
	this.valid();
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

	this.clear();

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
    	.attr("text-anchor", "middle")
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
Scatter.prototype.clear = function() {
	d3.selectAll("g").remove(); //clear axises
    d3.selectAll("circle").remove(); //clear points
    d3.selectAll("text").remove(); //clear labels
}
//function to set up scatterplot, need to prevent memory leaks?
//need more elegant/intuitive param prompts at some point
Scatter.prototype.setup_chart = function() {
	this.xvector = new DataVector("X Vector");
	this.yvector = new DataVector("Y Vector");

	text_input("Title", this.set_title);
	text_input("X axis", this.set_xlabel);
	text_input("Y axis", this.set_ylabel);

};
