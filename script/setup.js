var chart_types= ["Scatter", "Bar", "Map", "Chord", "Pie", "Arc", "Tree", "Hive", "Box"];
var select = document.getElementById('type');
//global chart reference
var chart = null;
var labels = {};

//fibonacci json, for reasons
var fib = [{"n": 1, "fn": 1 },
		   {"n": 2, "fn": 1 },
		   {"n": 3, "fn": 2 },
		   {"n": 4, "fn": 3 },
		   {"n": 5, "fn": 5 },
		   {"n": 6, "fn": 8 },
		   {"n": 7, "fn": 13 },
		   {"n": 8, "fn": 21 },
		   {"n": 9, "fn": 34 },
		   {"n": 10, "fn": 55 }
			];
//canvas info
var width = 600;
var height= 600;
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
function animate_panel(){
	this.classList.toggle("active");
    	var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      	panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
}

ctdraw();
select.onclick = select_chart;


//Add handlers to accordions
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  	acc[i].onclick = animate_panel;
}
//Leave first panel open by default
acc[0].onclick();

alasql.options.cache = false;
index_db();

