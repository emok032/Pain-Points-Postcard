  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAHKU2KgIJFJxFQSgU4Sm_c2KiBPFb8H7A",
    authDomain: "pain-points-postcard.firebaseapp.com",
    databaseURL: "https://pain-points-postcard.firebaseio.com",
    storageBucket: "",
  };
  firebase.initializeApp(config);

  var database = firebase.database(); 


        var queryURL = "https://api.github.com";
        $.ajax({
                url: queryURL,
                method: 'GET'
            }).done(function(response) {

                console.log(queryURL);
                console.log(response);

                












            });