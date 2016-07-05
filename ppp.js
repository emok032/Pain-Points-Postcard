  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAHKU2KgIJFJxFQSgU4Sm_c2KiBPFb8H7A",
    authDomain: "pain-points-postcard.firebaseapp.com",
    databaseURL: "https://pain-points-postcard.firebaseio.com",
    storageBucket: "pain-points-postcard.appspot.com",
  };
  firebase.initializeApp(config);
  var database = firebase.database(); 

//Global Variables
var bubbleCompare = [];

//Bubble object constructor
function bubbleObj(nbStudent, nbText, nbKeyword, nbTime, nbVotes){
    this.nbStudent = nbStudent,
    this.nbText = nbText,
    this.nbKeyword = nbKeyword,
    this.nbTime = nbTime,
    this.nbVotes = nbVotes
}

function renderPostcard(inputObj1, inputObj2){

    console.log("inputObj1: " + inputObj1);
    console.log("inputObj2: " + inputObj2);

    var postDiv = $("<div>").attr({class: "postDiv"});//New postcard div

    var titleBar = $("<div>").attr({class: "row"});//New titlebar div

    //Title to append
    var postTitle = $("<div>").attr({class: "col-xs-9 postTitle"});
    postTitle.text("Paint Points Postcard");
    titleBar.append(postTitle);

    //Timestamp to append
    var postDate = $("<div>").attr({class: "col-xs-3 postDate"});
    postDate.text(/*dateObj*/)
    titleBar.append(postDate);

    //Body div to hold pain points
    var postBody = $("<div>").attr({class: "row postBody"});

    //Div to hold the first pain point\\
    var pp1 = $("<div>").attr({class: "col-xs-6 pp1"});

    var title = $("<h3>").text("From " + inputObj1.nbStudent + ", with " + inputObj1.nbVotes + ":")
    var body = $("<p>").text(inputObj1.nbText)
    var time = $("<h5>").text(inputObj1.nbTime);

    pp1.append(title);
    pp1.append(body);
    pp1.append(time);
    //Div to hold the first pain point\\

    //Div to hold the second pain point
    var pp2 = $("<div>").attr({class: "col-xs-6 pp1"});

    var title = $("<h3>").text("From " + inputObj2.nbStudent + ", with " + inputObj2.nbVotes + ":")
    var body = $("<p>").text(inputObj2.nbText)
    var time = $("<h5>").text(inputObj2.nbTime);

    pp2.append(title);
    pp2.append(body);
    pp2.append(time);

    postDiv.append(titleBar);
    postDiv.append(pp1);
    postDiv.append(pp2);

    $("#currentPostcard").html(postDiv);
}

function renderBubble(inputObj, insertDiv, keyID){
    //Create a new div for our new bubble, and variables for the student's name and pain point text
    var bubbleDiv = $("<div>").attr({class: "enjoy-CSS"});
    var s = $("<h3>").text(inputObj.nbStudent + ": ")
    var t = $("<p>").text(inputObj.nbText)

    //Add the student name and text to the new bubbleDiv
    bubbleDiv.append(s);
    bubbleDiv.append(t);

    //Turn each keyword into a clickable link (up to a max of three keywords), and append each one to bubbleDiv
    var keyArray = inputObj.nbKeyword;
  
    if (keyArray){
        for(var i = 0; i < keyArray.length; i++){

        //Create a new link out of each keyword
        var k = keyArray[i] + " ";
        var link = $("<a>").attr({"href": "#"});
        link.text(k);

        //Append each keyword link to bubbleDiv
        bubbleDiv.append(link);
        }
    }

    //Append timestamp and voting button
    var m = $("<h5>").text(inputObj.nbTime);
    var v = $("<span>").attr({
        class:"glyphicon glyphicon-plus",
        id: keyID,
        "aria-hidden": "true"
    });
    v.text("Vote [" + inputObj.nbVotes + " votes]");

    bubbleDiv.append(m);
    bubbleDiv.append(v);

    //Append the new bubbleDiv to the bubble area on the main page
    $(insertDiv).append(bubbleDiv); 
}

function newBubble(inputStudent, inputText){
    var queryURL = "https://gateway-a.watsonplatform.net/calls/text/TextGetRankedConcepts";

    $.ajax({
        url: queryURL,
        method: 'POST',
        data: {
            apikey: "4947c53fd9c0d11744fe266fc5b7f3273e5e33ab",
            outputMode: "json",
            text: inputText
        }
    }).done(function(response){
        console.log(response);
        var reply = response.concepts;

        //Add keywords from AJAX call
        var keyArray = [];
        var limit;
        console.log(reply.length);
        if(reply.length > 0){
            if(reply.length > 3){limit = 2}//Use up to the first three keywords in the response
            else{limit = reply.length-1};
            for(var i = 0; i <= limit; i++){
            keyArray.push("#" + reply[i].text )//Push each keyword to keyArray
            }
        }
        
        //If the student doesn't provide a name, use "Anonumous"
        if(!inputStudent){inputStudent = "Anonymous"}

        //Creates new object from student-generated info and AJAX call
        var fireBaseObj = new bubbleObj(inputStudent, inputText, keyArray, moment().format("MMMM Do YYYY, h:mm a"), 0);
        console.log(fireBaseObj);

        //Pushes bject to Firebase
        database.ref().push(fireBaseObj);
    })
}

/******************************   Running Code   *********************************/

//Listener adds new bubbles on screen automatically
database.ref().on('child_added', function(childSnapshot, prevChildKey){
    var key = childSnapshot.key;
    // console.log("key: " + key);
    var inputObj = childSnapshot.val();
    renderBubble(inputObj, "#existingBubblesDiv", key);
})

$(".btn").on("click", function(){
    inputText = $("textarea").val();
    inputStudent = $("#userName").val();
    console.log("inputText: " + inputText);

    newBubble(inputStudent, inputText);

    $(".form-control").val("");//Shouldn't this clear the form??
})

//Allows users to upvote individual bubbles 
$(".container-fluid").on("click", ".glyphicon", function(){
    var key = $(this).attr("id");
    database.ref(key).once("value", function(snapshot){
        var votes = snapshot.val().nbVotes;
        // console.log(key + " votes: " + votes);
        votes++;
        database.ref(key).update({nbVotes: votes});
    })
})

//Listener to update on-screen vote counts
database.ref().on("child_changed", function(snapshot){
    // console.log("lSnapshot: " + snapshot)
    var key = snapshot.key;
    // console.log("lKey: " + key);

    var votes = snapshot.val().nbVotes;
    // console.log("lVotes: " + votes);

    var div = $("#" + key);
    div.text("Vote [" + votes + " votes]");
})

//Listener to render the Postcard
database.ref().on("value", function(snapshot){

    snapshot.forEach(function(childSnapshot){
        var childObj = childSnapshot.val()
        var childKey = childSnapshot.key;
        var childVotes = childObj.nbVotes;
        console.log()

        for (var i = 0; i < 2; i++){
            if (!bubbleCompare[i]){
                bubbleCompare[i] = childObj;
                break;
            }
            else if(childVotes > bubbleCompare[i].nbVotes){
                bubbleCompare[i] = childObj;
                break;
            }
            else{continue}
        }
    })
    renderPostcard(bubbleCompare[0], bubbleCompare[1]);
})

