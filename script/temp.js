//chart def template
function <name>(){
	//add class variables in here
}

//define some setters for callback functions

<name>.prototype.valid = function() {
	if (/* define validity conditions*/) {
		chart.draw();
		return true;
	}
	return false;
};

<name>.prototype.draw = function(){
	//define draw function
	draw_table(/*raw data*/)

	this.clear();
	
};
<name>.prototype.clear = function() {
	d3.selectAll("g").remove(); //clear axises
    d3.selectAll("circle").remove(); //clear points
    d3.selectAll("text").remove(); //clear labels

    //add any more things that need to be cleared
}
//function to set up scatterplot, need to prevent memory leaks?
//need more elegant/intuitive param prompts at some point
<name>.prototype.setup_chart = function() {
	//do chart setup stuff here
};
