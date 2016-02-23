var currentPet;
var pets;

$(document).ready(function(event) {
  Parse.initialize("yua5fdBvuC6pgVBEAXhNHkmcGKxBjuigVlj6l8xH", "5JEy0rGbNldrTrNKY5B2KZEmb2ojffapaaCeUxRO");

  $("div#swipe_like").on( "click", function() {
    swipeLike();
  }); 

  $("div#swipe_dislike").on( "click", function() {
    swipeDislike();
  }); 

  getPets();

  function getPets(){
    pets = JSON.parse(document.getElementById('json').textContent);
    var city = document.getElementById('city').textContent;
    addNewProfile(pets);
  } 

  function swipe() {
    Draggable.create("#photo", {
        throwProps:true,
        onDragEnd:function(endX) {
          if(Math.round(this.endX) > 0 ) {
            swipeLike();      
          }
          else {
            swipeDislike();
          }
          console.log(Math.round(this.endX));
      }
    });
  }


  function swipeLike() {
      console.log('liked');
      like(currentPet);
    
      var $photo = $("div.content").find('#photo');

      var swipe = new TimelineMax({repeat:0, yoyo:false, repeatDelay:0, onComplete:remove, onCompleteParams:[$photo]});
      swipe.staggerTo($photo, 0.8, {bezier:[{left:"+=400", top:"+=300", rotation:"60"}], ease:Power1.easeInOut});

      addNewProfile(pets);
  }

  function swipeDislike() {
    
      var $photo = $("div.content").find('#photo');

      var swipe = new TimelineMax({repeat:0, yoyo:false, repeatDelay:0, onComplete:remove, onCompleteParams:[$photo]});
      swipe.staggerTo($photo, 0.8, {bezier:[{left:"+=-350", top:"+=300", rotation:"-60"}], ease:Power1.easeInOut});

      addNewProfile(pets);
  }

  function remove(photo) {
      $(photo).remove();
  }

  function addNewProfile(pets) {
    var randomObjects = [];
    //store element in randomObjects  
    var randomIndex = Math.floor(Math.random() * pets.pets.length);
    var randomObject = pets.pets[randomIndex];
    randomObjects.push(randomObject);
    pets.pets.splice(randomIndex, 1);

    var photoURL = randomObject.photoURL;
    var name = randomObject.breed;
    var age = randomObject.age;
    currentPet = randomObject.id;


    // var names = ['Lieke', 'Christina', 'Sanne', 'Soraya', 'Chanella', 'Larissa', 'Michelle'][Math.floor(Math.random() * 7)];
    // var ages = ['19','22','18','27','21', '18', '24'][Math.floor(Math.random() * 7)]
    // var photos = ['1', '2', '3', '4', '5', '6', '7'][Math.floor(Math.random() * 7)]
    $("div.content").prepend('<div class="photo" id="photo" style="background-image:url(' + photoURL + ')">'
      + '<span class="meta">' 
      + '<p>'+name+', '+age+'</p>' 
      + '<span class="moments">0</span>' 
      + '<span class="users">0</span>' 
      + '</span>' 
      + '</div>');

      swipe();
  }

  function like(pet){
    var currentUser = Parse.User.current();
    if (currentUser) {
          console.log('logged in. liking pet...');
          
          //get last element in path
          var Pets = Parse.Object.extend("pet");
          var query = new Parse.Query(Pets);
          query.equalTo("objectId", pet);
          query.find({
              success: function(pet) {
                     //add 'pet' to user's relations
                     var relation = currentUser.relation("likes");
                     relation.add(pet);
                     currentUser.save();
                     console.log('pet liked!');
             }
         });
      } else { //should already be logged in but do it again
      function statusChangeCallback(response) {
          console.log('statusChangeCallback');
          console.log(response);
          // The response object is returned with a status field that lets the
          // app know the current login status of the person.
          // Full docs on the response object can be found in the documentation
          // for FB.getLoginStatus().
          if (response.status === 'connected') {
              // Logged into your app and Facebook.
              testAPI();
          } else if (response.status === 'not_authorized') {
              // The person is logged into Facebook, but not your app.
              document.getElementById('status').innerHTML = 'Please log ' +
              'into this app.';
          } else {
              // The person is not logged into Facebook, so we're not sure if
              // they are logged into this app or not.
              document.getElementById('status').innerHTML = 'Please log ' +
              'into Facebook.';
          }
      }

      // This function is called when someone finishes with the Login
      // Button.  See the onlogin handler attached to it in the sample
      // code below.
      function checkLoginState() {
          FB.getLoginStatus(function(response) {
                            statusChangeCallback(response);
                            });
      }

      window.fbAsyncInit = function() {
        Parse.FacebookUtils.init({
           appId      : '916922701701022',
           status     : true,
           cookie     : true,  // enable cookies to allow the server to access
           // the session
           xfbml      : true,  // parse social plugins on this page
           version    : 'v2.2' // use version 2.2
         });
        Parse.FacebookUtils.logIn(null, {
          success: function(user) {
            console.log('switch');
            // window.location = '/';
            like(pet);
            if (!user.existed()) {
              alert("User signed up and logged in through Facebook!");
            } else {
              alert("User logged in through Facebook!");
            }
          },
          error: function(user, error) {
            alert("User cancelled the Facebook login or did not fully authorize.");
            console.log(error);
          }
        });
        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });    
      };

      // Load the SDK asynchronously
      (function(d, s, id) {
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) return;
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

      // Here we run a very simple test of the Graph API after login is
      // successful.  See statusChangeCallback() for when this call is made.
      function testAPI() {
          console.log('Welcome!  Fetching your information.... ');
          FB.api('/me', function(response) {
                 console.log('Successful login for: ' + response.name);
                 document.getElementById('status').innerHTML =
                 'Thanks for logging in, ' + response.name + '!';
                 });
      }
    }
  }
});
