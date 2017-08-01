var chart_types= ["Scatter", "Map", "Bar"];
var select = document.getElementById('type');

//Read in chart types to html
for (var i = 0; i < chart_types.length; i++) {
	var option = document.createElement("option");
	option.text = chart_types[i];
	select.add(option);
}

alasql.options.cache = false;
index_db();

//read_data("anthro_bmi");
//read_data("age_yrs");


