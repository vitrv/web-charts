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
		console.log(xhr.status);
		metadata = JSON.parse(xhr.responseText);

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
  		console.log("Redcap data not available");
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
	};

	xhr.onerror = function() {
  		console.log("error");
	};

	xhr.send(data);

}