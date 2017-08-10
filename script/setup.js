var chart_types= ["Scatter", "Bar", "Map", "Chord", "Pie", "Arc", "Tree", "Hive", "Box"];
var select = document.getElementById('type');
//global chart reference
var chart = null;

//canvas info
var width = 500;
var height= 500;
var margin = 80;

//Read in chart types to html
var selected = 0;

function ct() {
	selected = this.key;
	ctclear();
	ctdraw();
}

function ctdraw(){
	for (var i = 0; i < chart_types.length; i++) {
		var option = document.createElement("p");
		option.innerHTML = chart_types[i];
		option.key = i;
		if(i == selected) option.className = "sel";
		else option.className = "desel";
		select.appendChild(option);

		option.onclick = ct;
	}
}
function ctclear(){

	while (select.hasChildNodes()) {   
    	select.removeChild(select.firstChild);
	}
}

ctdraw();

select.onclick = select_chart;


alasql.options.cache = false;
index_db();
select_chart();
