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
			if ( metadata[i]['field_type'] != "notes"){
  				var z = {'label': metadata[i]['field_label'], 'name':  metadata[i]['field_name'] ,'type':  metadata[i]['field_type']  };
  				labels[metadata[i]['field_name']] = z;
  				//labels.push(z);
  			}
  		}
  		select_default();
	};

	xhr.onerror = function() {
  		// Error code goes here.
  		console.log("error");
	};

	xhr.send(data);

}

function read_data(field_name, obj) {

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

		obj.data = [];
		
		for (var i in records){
			if( records[i][field_name] != null &&  records[i][field_name] != ""){
  				var z = {'id': records[i]['participant_id'] ,'event':  records[i]['redcap_event_name']  };
  				z[field_name] = records[i][field_name]
  				obj.data.push(z);
  			}
  		}
  		chart.valid();
  		//console.log(data_vector);
  		//return data_vector;
	};

	xhr.onerror = function() {
  		// Error code goes here.
  		console.log("error");
	};

	xhr.send(data);

}