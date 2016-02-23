var express = require('express');
var router = express.Router();


var Parse = require('parse/node').Parse;
Parse.initialize("yua5fdBvuC6pgVBEAXhNHkmcGKxBjuigVlj6l8xH", "5JEy0rGbNldrTrNKY5B2KZEmb2ojffapaaCeUxRO");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PetSwipe' });
});


router.get('/swipe', function(req, res, next) {
	var location = string_to_slug(req.query.location);
	var maxDistance = 50;
	var totalPets = 0;

	if(location){
		console.log('location is: ' + location);
		var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=AIzaSyBzBkPk9Cun5_rH2GU_dbnJ2UMWCYshkzE';

		var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
		req.addEventListener('load', function(){
			if (req.status >= 200 && req.status < 400) {
				var jsonObj = JSON.parse(req.responseText);
				var lat = jsonObj.results[0].geometry.location.lat;
				var lng = jsonObj.results[0].geometry.location.lng;
				var hasNumber = /\d/
				if(hasNumber.test(location))
					var city = jsonObj.results[0].address_components[1].long_name;
				else
					var city = jsonObj.results[0].address_components[0].long_name;
				var point = new Parse.GeoPoint({latitude: lat, longitude: lng});
				var staticMapURL = 'url(https://maps.googleapis.com/maps/api/staticmap?center=' + lat + ',' + lng + '&zoom=13&size=' + 305 + 'x' + 550 +
 				'&style=element:labels|visibility:off&style=element:geometry.stroke|visibility:off&style=feature:landscape|element:geometry|saturation:-100&key=AIzaSyBzBkPk9Cun5_rH2GU_dbnJ2UMWCYshkzE)';

				console.log('coords: ' + lat + ' ' + lng);
				console.log(point);


				var Pets = Parse.Object.extend("pet");
				var query = new Parse.Query(Pets);
				query.withinMiles("location", point, maxDistance);
				query.limit(100);
				query.find({
					success: function(pets) {
					    console.log("Successfully retrieved " + pets.length + " pets.");
					    totalPets = pets.length;

						var myarray = [];
						var myJSON = "";
						for (var i = 0; i < pets.length; i++) {
							if(pets[i].get('photoURL')){
								var photoURL = pets[i].get('photoURL');
							} else{
								var photoURL = pets[i].get('photo').url();
							}
						    var pet = {
						        "id": pets[i].id,
						        "photoURL": photoURL,
						        "breed": pets[i].get('breed'),
						        "gender": pets[i].get('gender'),
						        "age": pets[i].get('age2'),
						        "city": pets[i].get('city')
						    };
						    myarray.push(pet);
						}
						myJSON = JSON.stringify({'pets': myarray});
						console.log('city: ' + city);
					    res.render('swipe', {title: 'PetSwipe' , headers: req.headers, 'location': location, 'city': city, 'json': myJSON, 'map': staticMapURL});
					}
				});
			}
		});
		req.send();
	} else{
		console.log('no location');
		res.redirect('/');
	}
});


router.get('/login', function(req, res) {
	var redirect = req.params.redirect;
    res.render('login', {title: 'PetSwipe' , headers: req.headers});
});


router.get('/likes', function(req, res) {
    res.render('likes', {title: 'PetSwipe' , headers: req.headers});
});

router.get('/pet/:slug', function(req, res) {
	var currentUser = Parse.User.current();
	var firstName = '';
	if(currentUser != null){
		firstName = currentUser.get('firstName');
	}

	var Pets = Parse.Object.extend("pet");
	var query = new Parse.Query(Pets);
	query.equalTo("objectId", req.params.slug);
	query.find({
		success: function(pet) {
			var photoURL = '';
			if(pet[0].get('photoURL')){
				photoURL = pet[0].get('photoURL');
			} else{
				photoURL = pet[0].get('photo').url();
			}

		    console.log('Successfully retrieved ' + pet[0].get('breed'));
	    	res.render('detail', {title: 'PetSwipe', headers: req.headers, 
	    		'photoURL': photoURL,
	    		'breed': pet[0].get('breed'), 
	    		'gender': pet[0].get('gender'),
	    		'city': pet[0].get('city'),
	    		'email': pet[0].get('email'),
	    		'firstName': firstName,
	    		'description': pet[0].get('description')});
		}
	});
});


function string_to_slug(str) {
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();

	// remove accents, swap ñ for n, etc
	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
	var to   = "aaaaeeeeiiiioooouuuunc------";

	for (var i=0, l=from.length ; i<l ; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
	.replace(/\s+/g, '-') // collapse whitespace and replace by -
	.replace(/-+/g, '-'); // collapse dashes

  return str;
}



module.exports = router;
