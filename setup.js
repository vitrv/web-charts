var chart_types= ["Scatter", "Map", "Bar"];
var select = document.getElementById('type');


var api_url = 'https://redcap.uthscsa.edu/REDCap/api/'
var api_key = '85756E00F50FA35FC6532742FAF10B79'

for (var i = 0; i < chart_types.length; i++) {
	var option = document.createElement("option");
	option.text = chart_types[i];
	select.add(option);
}

//read in api labels here