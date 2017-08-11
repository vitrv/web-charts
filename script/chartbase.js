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
//text input class
function TextInput(title){
	this.label = title;
	var param = document.getElementById('p3');
	var text_field = document.createElement('input');
	text_field.type = 'text';
	text_field.value = title;
	param.appendChild(text_field);

	text_field.set = this.set;
	text_field.link = this;

	text_field.oninput = function () {
		this.set.call(this.link, this.value);
	};
}

TextInput.prototype.set = function(value){
	this.label = value;
	chart.valid();
}

//file upload class
function FileRead(){
	this.content = null;
	var param = document.getElementById('p1');
	var file_field = document.createElement('input');
	file_field.type = 'file';
	file_field.className = "inputfile";
	file_field.name = 'file';
	file_field.id = 'file';
	var link = this;
	var set = this.set;
	param.appendChild(file_field);

	file_field.onchange = function () {
		var filename = this.files[0].name;
		var label = document.getElementById('fi');
	    label.innerHTML = filename;
		Array.prototype.forEach.call(this.files, function(file) {

      		var reader = new FileReader();
      		reader.onload = function() {
                var c = d3.csvParse(reader.result);
                set.call(link, c);
      		};
      		reader.readAsText(file);
      	});	
	};
}

FileRead.prototype.set = function(file){
	this.content = file;
	chart.valid();
}

//Clear p divs
function p_clear(){
	var list = document.getElementById('p1');

	while (list.hasChildNodes()) {   
    	list.removeChild(list.firstChild);
	}

	list = document.getElementById('p2');

	while (list.hasChildNodes()) {   
    	list.removeChild(list.firstChild);
	}

	list = document.getElementById('p3');

	while (list.hasChildNodes()) {   
    	list.removeChild(list.firstChild);
	}

		list = document.getElementById('msg');

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
	var type = selected;
	
	p_clear();
	
	if (chart != null) {
		chart.clear(); 
		table_clear();
	}
	chart = null;

	if (type == 0) {
		chart = new Scatter();
	}

	if (type == 1) {
		chart = new Bar();
	}

	if (type > 1) {
		error_msg();
	}
}

function select_default(){
	chart= new Scatter();
	chart.c_data.content = fib;
	chart.title.label = "Example Graph!";
	chart.xlabel.label = "n";
	chart.ylabel.label = "f(n)";
	chart.valid();
}

function error_msg(){
	var p = document.getElementById('msg');
		p.innerHTML = "This chart type isn't ready yet!";
}


