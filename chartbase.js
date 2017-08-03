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
function text_input(title, setter){
	var param = document.getElementById('p3');
	var text_field = document.createElement('input');
	text_field.type = 'text';
	text_field.value = title;
	text_field.setter = setter;
	param.appendChild(text_field);

	text_field.oninput = function () {
		this.setter.call(chart, this.value);
	}	
}
//Clear p2 div
function p_clear(){
	var list = document.getElementById('p2');

	while (list.hasChildNodes()) {   
    	list.removeChild(list.firstChild);
	}

	list = document.getElementById('p3');

	while (list.hasChildNodes()) {   
    	list.removeChild(list.firstChild);
	}
}
function table_clear(){
	var list = document.getElementById('table');

	while (list.hasChildNodes()) {   
    	list.removeChild(list.firstChild);
	}
}
//Handler for chart select menu, entry point
function select_chart(){
	var type = document.getElementById("type").value;
	
	p_clear();
	
	if (chart != null) {
		chart.clear(); 
		table_clear();
	}
	chart = null;

	if (type == "Scatter") {
		chart = new Scatter();
	}
	if (type == "Map") {
		error_msg();
	}
	if (type == "Bar") {
		error_msg();
	}
	if (chart != null)
		chart.setup_chart();
}

function error_msg(){
	var p = document.getElementById('p2');
		p.innerHTML = "This chart type isn't ready yet.";
}


