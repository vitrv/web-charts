//bar graph class
function Bar(){
	this.xvector = new DataVector("Categories");
	this.yvector = new DataVector("Data");

	this.postdata = [];

	this.title = new TextInput("Title");
	this.xlabel = new TextInput("X axis");
	this.ylabel = new TextInput("Y axis");

	this.c_data = new FileRead();
}
Bar.prototype.valid = function() {
		if (this.c_data.content != null) {
		var _data = this.c_data.content;
		var m = [];
		for (var key in _data[0]){
			m.push(key);
		}
		chart.draw(m[0], m[1], _data);
	}

	if (this.xvector.data != null && this.yvector.data != null) {
		this.postdata = [];
		chart.preprocess();
		return true;
	}
	return false;
};
//create mapping from categories to averages
Bar.prototype.preprocess = function(){

	var xname = this.xvector.fieldname;
	var yname = this.yvector.fieldname;

	alasql("CREATE TABLE xvector (" + xname + " INT, event string, id INT)");
	alasql("CREATE TABLE yvector (" + yname +  " INT, event string, id INT)");

	alasql.tables.xvector.data = this.xvector.data;
	alasql.tables.yvector.data = this.yvector.data;

	var vector = alasql("SELECT * FROM xvector NATURAL JOIN yvector");

	alasql("DROP TABLE xvector");
	alasql("DROP TABLE yvector");

	var cat = {};

	for(key in vector){
		cat[vector[key][this.xvector.fieldname]] = [];
	}
	for(key in vector){
		cat[vector[key][this.xvector.fieldname]].push(parseFloat(vector[key][this.yvector.fieldname]));
	}

	for(key in cat){
		var z = {}
		z['data'] = key;
		z['avg'] = cat[key].reduce(function(total, n){
			return total + n;
		}, 0) / cat[key].length;


		this.postdata.push(z);
	}

	chart.draw('data', 'avg', this.postdata);
	
}
Bar.prototype.draw = function(xname, yname, _data){
	
	draw_table(_data);

	var svg = d3.select('svg')
			.attr("width", width)
			.attr("height", height);


	this.clear();

	//set up scale
	var x = d3.scaleBand().range([0, width - margin - margin]).padding(0.2);
    var y = d3.scaleLinear().range([height - margin - margin, 0]);

  	x.domain(_data.map(function(d) { return d[xname]; }));
  	y.domain([0, d3.max(_data, function(d) { return parseFloat(d[yname]); })]);

	var g = svg.append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")");

    //draw axis
	g.append("g")
    .attr("transform", "translate(0," + (height - margin - margin) + ")")
    .call(d3.axisBottom(x));

    g.append("g")
    .attr("transform", "translate(" + 0 + ", " + 0 + ")")
    .call(d3.axisLeft(y));

    //draw bars
	g.selectAll(".bar")
    .data(_data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d[xname]); })
      .attr("y", function(d) { return y(parseFloat(d[yname])); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - margin - margin - y(parseFloat(d[yname])); });

    //draw labels
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
	
};
Bar.prototype.clear = function() {
	d3.selectAll("g").remove(); //clear axises
    d3.selectAll("rect").remove(); //clear points
    d3.selectAll("text").remove(); //clear labels
}