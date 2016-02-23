// This is called with the results from from FB.getLoginStatus().
Parse.initialize("yua5fdBvuC6pgVBEAXhNHkmcGKxBjuigVlj6l8xH", "5JEy0rGbNldrTrNKY5B2KZEmb2ojffapaaCeUxRO");

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
      window.location = '/';
    
    
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