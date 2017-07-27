var labels = {};

var createCORSRequest = function(method, url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
    	// Most browsers.
		xhr.open(method, url, true);
	} else if (typeof XDomainRequest != "undefined") {
		// IE8 & IE9
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		// CORS not supported.
		xhr = null;
	}
	return xhr;
};

function index_db() {

	var method = 'POST';
	var xhr = createCORSRequest(method, api_url);
	var data = "token=" + api_key + "&content=metadata&format=json" 
	var metadata = [];

	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onload = function() {
		// Success code goes here.
		console.log(xhr.status);
		//console.log(xhr.responseText);
		metadata = JSON.parse(xhr.responseText);
		//console.log(metadata[0]);

		for (var i in metadata){
  			var z = {'label': metadata[i]['field_label'], 'name':  metadata[i]['field_name'] ,'type':  metadata[i]['field_type']  };
  			labels[metadata[i]['field_name']] = z;
  			//labels.push(z);
  		}
  		console.log(labels);
	};

	xhr.onerror = function() {
  		// Error code goes here.
  		console.log("error");
	};

	xhr.send(data);

}

function read_data(field_name) {

	var method = 'POST';
	var xhr = createCORSRequest(method, api_url);
	var data = "token=" + api_key + "&content=record&format=json&type=flat&fields=participant_id," + field_name; 
	var records = [];

	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onload = function() {
		// Success code goes here.
		//console.log(xhr.status);
		//console.log(xhr.responseText);
		records = JSON.parse(xhr.responseText);
		console.log(records);

		/*for (var i in records){
  			var z = {'label': metadata[i]['field_label'], 'name':  metadata[i]['field_name'] ,'type':  metadata[i]['field_type']  };
  			labels.push(z);
  		}*/

	};

	xhr.onerror = function() {
  		// Error code goes here.
  		console.log("error");
	};

	xhr.send(data);

}