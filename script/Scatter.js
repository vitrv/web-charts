//scatterplot class
function Scatter(){
	this.xvector = new DataVector("X Vector");
	this.yvector = new DataVector("Y Vector");

	this.title = new TextInput("Title");
	this.xlabel = new TextInput("X axis");
	this.ylabel = new TextInput("Y axis");

	this.c_data = new FileRead();
}
Scatter.prototype.valid = function() {
	if (this.c_data.content != null) {
		var _data = this.c_data.content;
		var m = [];
		for (var key in _data[0]){
			m.push(key);
		}
		chart.draw(m[0], m[1], _data);
	}

	if (this.xvector.data != null && this.yvector.data != null) {
		chart.preprocess();
		return true;
	}
	return false;
};
Scatter.prototype.preprocess = function() {

	var xname = this.xvector.fieldname;
	var yname = this.yvector.fieldname;

	alasql("CREATE TABLE xvector (" + xname + " INT, event string, id INT)");
	alasql("CREATE TABLE yvector (" + yname +  " INT, event string, id INT)");

	alasql.tables.xvector.data = this.xvector.data;
	alasql.tables.yvector.data = this.yvector.data;

	var chart_data = alasql("SELECT * FROM xvector NATURAL JOIN yvector");

	alasql("DROP TABLE xvector");
	alasql("DROP TABLE yvector");

	chart.draw(xname, yname, chart_data);


}

Scatter.prototype.draw = function(xname, yname, _data){

    draw_table(_data);
	var svg = d3.select('svg')
			.attr("width", width)
			.attr("height", height);


	var x = d3.scaleLinear().range([margin, width - margin]);
	var y = d3.scaleLinear().range([height - margin, margin]);

	x.domain(d3.extent(_data, function(d) { return parseFloat(d[xname]); }));
	y.domain(d3.extent(_data, function(d) { return parseFloat(d[yname]); }));

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
    	.text(this.title.label);

    svg.append("text")
    	.attr("class", "x label")
    	.attr("text-anchor", "middle")
    	.attr("x", width/2)
    	.attr("y", height - margin/2)
    	.text(this.xlabel.label);

    svg.append("text")
    	.attr("class", "y label")
    	.attr("text-anchor", "middle")
    	.attr("transform", "rotate(-90)")
    	.attr("x", -height/2)
    	.attr("y", margin/2)
    	.text(this.ylabel.label);

    var circle = svg.selectAll("circle")
    	.data(_data);

    circle.enter().append("circle")
    	.attr("r", 2.5)
    	.merge(circle)
    	.attr("cx", function(d){return x( parseFloat( d[xname]) ) })
    	.attr("cy", function(d){return y( parseFloat( d[yname]) ) });	
};
Scatter.prototype.clear = function() {
	d3.selectAll("g").remove(); //clear axises
    d3.selectAll("circle").remove(); //clear points
    d3.selectAll("text").remove(); //clear labels
}