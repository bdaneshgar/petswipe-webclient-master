var locationGranted = false;
var zipRemoved = false;

window.onload = function() {
	if (navigator.geolocation) {
		console.log('Geolocation is supported!');
		var startPos;
		var geoSuccess = function(position) {
	    	startPos = position;
			
	    	var latNode = document.createElement('p');
	    	var lngNode = document.createElement('p');
	    	latNode.textContent = startPos.coords.latitude;
	    	lngNode.textContent = startPos.coords.longitude;
	    	latNode.id = 'lat';
	    	lngNode.id = 'lng';
	    	document.getElementById('full-screen').appendChild(latNode);
	    	document.getElementById('full-screen').appendChild(lngNode);



	    	console.log('latitude: ' + startPos.coords.latitude + 'longitude: ' + startPos.coords.longitude);
	    	locationGranted = true;

			updateZIP();
		};
		var geoError = function(error) {
			console.log('Error occurred. Error code: ' + error.code);
		};
		navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

	}else {
		console.log('Geolocation is not supported for this Browser/OS version yet.');
	}
};

function updateZIP(){

	if(!document.getElementById('zip-or-city-form').value){
		var lat = document.getElementById('lat').textContent;
		var lng = document.getElementById('lng').textContent;	

		var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyBzBkPk9Cun5_rH2GU_dbnJ2UMWCYshkzE';
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
		req.addEventListener('load', function(){
			if (req.status >= 200 && req.status < 400) {
				var jsonObj = JSON.parse(req.responseText);
				city = jsonObj.results[0].address_components[3].long_name;
				zip = jsonObj.results[0].address_components[8].long_name;
				document.getElementById('zip-or-city-form').value = city + ', ' + zip;
			}
		});
		req.send();
	} else{
		console.log('already location being put');
	}
}


//ANIMATIONS

function move(elem) {
	var top = 106;
	function frame() {
	    top = top-3;
	    elem.style.marginTop = top + 'px';
	    if (top <= 0)
			clearInterval(id)
	}
	var id = setInterval(frame, 1);
}

function fadeOut(el){
  el.style.opacity = 1;

	(function fade() {
		if ((el.style.opacity -= .2) < 0) {
			el.style.display = "none";
			zipRemoved = true;
		    document.getElementById('search-container').style.marginTop = 106 + 'px';
			console.log('zipremoved');
		} else {
			requestAnimationFrame(fade);
		}
	})();
}

function fadeIn(el, display){
	el.style.opacity = 0;
	el.style.display = display || "block";

	(function fade() {
    	var val = parseFloat(el.style.opacity);
    	if (!((val += .1) > 1)) {
		    el.style.opacity = val;
		    requestAnimationFrame(fade);
    	}	
  	})();
}