document.getElementById("glyph-1").addEventListener("click", draftEmail);

function draftEmail(){
	var email = document.getElementById('email').textContent;
	console.log(email);

	var subject = 'Interested in adoption';

	var breed = document.getElementById('breed').textContent;
	var photoURL = document.getElementById('detail-image').src;
	var pathArray = window.location.pathname.split( '/' );
	var slug = pathArray[pathArray.length - 1];

	var firstName = document.getElementById('firstName').textContent;
	if(firstName != ''){
		var body = "Hi!%0D%0A%0D%0AI'm interested in this " + breed + " you've listed. Here is a link to the pet:%0D%0Ahttp://www.petswipeapp.com/pets/pet/" + slug + "%0D%0ACan you send more information on a time and place to meet this pet?%0D%0A%0D%0A-" + firstName + "%0D%0A%0D%0Avia PetSwipe";
	} else{
		var body = "Hi!%0D%0A%0D%0AI'm interested in this " + breed + " you've listed. Here is a link to the pet:%0D%0Ahttp://www.petswipeapp.com/pets/pet/" + slug + "%0D%0ACan you send more information on a time and place to meet this pet?%0D%0A%0D%0Avia PetSwipe";
	}

	window.open('mailto:' + email +'?subject=' + subject + '&body=' + body);

}