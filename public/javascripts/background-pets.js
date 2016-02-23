Parse.initialize("yua5fdBvuC6pgVBEAXhNHkmcGKxBjuigVlj6l8xH", "5JEy0rGbNldrTrNKY5B2KZEmb2ojffapaaCeUxRO");
window.onload = getPets();

function getPets(){
    var Pets = Parse.Object.extend("pet");
    var query = new Parse.Query(Pets);
        query.find({
          success: function(results) {
            alert("Successfully retrieved " + results.length + " pets for background.");
            generateCards(results);
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
    });
}

function generateCards(pets){
    var numCards = pets.length;
    
    var cards = [];
    for(var i = 0; i < numCards; i++){
        cards.push(pets[i]);
    }
    
    //append to html
    var div = document.getElementsByTagName("body")[0];
    var photoURL1 = pets[0].get('photoURL');
    var photoURL2 = pets[1].get('photoURL');

    div.style.background = 'url(' + photoURL1 + ') 0 100%, url(' + photoURL2 +') 50px 50px';
    
}
