Parse.initialize("yua5fdBvuC6pgVBEAXhNHkmcGKxBjuigVlj6l8xH", "5JEy0rGbNldrTrNKY5B2KZEmb2ojffapaaCeUxRO");
window.onload = getPets();

function getPets(){
    if(Parse.User.current()){
        var currentUser = Parse.User.current();
        var relation = currentUser.relation("likes");
        var query = relation.query();
        query.find({
          success: function(results) {
            // alert("Successfully retrieved " + results.length + " scores.");
            generateCards(results);
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
    } else{
        alert("Must Log In!");
    }
}

function generateCards(pets){
    var numCards = pets.length;
    
    var cards = [];
    for(var i = 0; i < numCards; i++){
        cards.push(pets[i]);
    }
    
    //append to html
    var div = document.getElementById("petsdiv");
    var description = document.createElement('p');
    description.style.textAlign = 'center';
    description.id = 'page-description';
//    description.style.backgroundColor = '#000';
    description.textContent = "Pets Liked";
    div.appendChild(description);
    
    //make table
    var table = document.createElement('table');
    table.align = 'center';
    // table.width = '100%';
    table.id = 'cards';
    
    //table body
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);
    
    var columns = 2;
    var rows = pets.length/2;
    
    //array will contain objects queried in a random order
    var randomObjects = [];
    
    //create row element <tr>
    for (var i=0; i<rows; i++){
        var tr = document.createElement('tr');
        tr.id = i;
        tbody.appendChild(tr);
        
        //create column element <td>
        for (var j=0; j<columns; j++){
            //store element in randomObjects
            var randomIndex = 0;
            var randomObject = cards[randomIndex];
            randomObjects.push(randomObject);
            cards.splice(randomIndex, 1);
            if(typeof randomObject != 'undefined'){


                var td = document.createElement('td');
                td.class = 'divbutton';
                tr.appendChild(td);


                //unlike btn
                var btn = document.createElement('button');
                btn.style.display = 'none';
                var t = document.createTextNode("unlike");
                btn.appendChild(t);
                td.appendChild(btn);
                
                var img = document.createElement('img');
                
                
                if(randomObject.get('photoURL')){
                    var photoURL = randomObject.get('photoURL');
                    img.src = photoURL;
                    // td.style.backgroundImage = 'url(' + photoURL +')';
                } else{
                    var photoURL = randomObject.get('photo').url();
                    img.src = photoURL;
                    // td.style.backgroundImage = 'url(' + photoURL +')';
                }
                img.align = 'center';
                img.style.maxHeight = '300px';
                img.style.display = 'block';
                img.style.paddingLeft = '5px';
                img.style.paddingRight = '5px';
                img.style.marginLeft = 'auto';
                img.style.marginRight = 'auto';
                img.style.marginTop = '5px';
                td.appendChild(img);
                
                var breed = document.createElement('p');
                breed.id = 'pet-name';
                breed.textContent = randomObject.get('breed') + ', ' + randomObject.get('gender');
                td.appendChild(breed);
                
                var linebreak = document.createElement('br');
                td.appendChild(linebreak);
                
                var cardDetail = document.createElement('p');
                cardDetail.id = 'pet-city';
                cardDetail.innerHTML = randomObject.get('age2') + '<br />' + randomObject.get('city');
                td.appendChild(cardDetail);
            }
        }
    }
    div.appendChild(table);
    
    var cardElements = document.getElementsByTagName('td');
    var numPickedCards = 0;
    var match = [];
    
    for (var i = 0; i < cardElements.length; i++) {
        cardElements[i].addEventListener('click', handlePick);
    }
    
    function handlePick(event){
        var rowIndex = this.parentNode.id;
        var colIndex = this.cellIndex;
        var value = (+rowIndex*columns + +colIndex);
        console.log('jump to pet detail page for pet: ' + randomObjects[value].get('breed'));
        console.log('objectId: ' + randomObjects[value].id);
        window.open('/pet/' + randomObjects[value].id, '_blank');
    }
}


//show unlike on hover
$(document).ready(function () {
                $(document).on('mouseenter', '.divbutton', function () {
                    $(this).find(":button").show();
                }).on('mouseleave', '.divbutton', function () {
                    $(this).find(":button").hide();
                });
            });
