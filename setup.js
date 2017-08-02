var chart_types= ["Scatter", "Map", "Bar"];
var select = document.getElementById('type');
//global chart reference
var chart = null;

//canvas info
var width = 500;
var height= 500;
var margin = 80;

//Read in chart types to html
for (var i = 0; i < chart_types.length; i++) {
	var option = document.createElement("option");
	option.text = chart_types[i];
	select.add(option);
}

alasql.options.cache = false;
index_db();
