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

var url = 'https://redcap.uthscsa.edu/REDCap/api/';
var method = 'POST';
var xhr = createCORSRequest(method, url);
var data = "token=" + api_key + "&content=exportFieldNames&format=json" 

xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhr.onload = function() {
  // Success code goes here.
  console.log("hey");
  console.log(xhr.status);
  console.log(xhr.responseText);
};

xhr.onerror = function() {
  // Error code goes here.
  console.log("error");

};

xhr.send(data);