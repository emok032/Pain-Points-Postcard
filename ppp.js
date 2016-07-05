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
// var canVote = true;

// $(".container-fluid").on("click", ".voteIcon", function(){
//     if(canVote){
//         //increment the appropriate object's voteCount by 1;
//         canVote = false;
//     }
//     else{"message: you've already voted!"}
// })

//Bubble object constructor
function bubbleObj(nbStudent, nbText, nbKeyword, nbTime, nbVotes){
    this.nbStudent = nbStudent,
    this.nbText = nbText,
    this.nbKeyword = nbKeyword,
    this.nbTime = nbTime,
    this.nbVotes = nbVotes
}

function renderPostcard(inputObj1, inputObj2){

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

    //Div to hold the first pain point
    var pp1 = $("<div>").attr({class: "col-xs-6 pp1"});
    pp1.text(/*bubble text*/)
    postBody.append(pp1);

    //Div to hold the second pain point

    postDiv.append(titleBar);
    postDiv.append(pp1);
    postDiv.append(pp2);

}

function renderBubble(inputObj, insertDiv){
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
    var m = $("<h4>").text(inputObj.nbTime);
    var v = $("<span>").attr({
        class:"glyphicon glyphicon-plus",
        "aria-hidden": "true",
    });
    v.text("Vote");

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
    var inputObj = childSnapshot.val();
    renderBubble(inputObj, "#existingBubblesDiv");
})

$(".btn").on("click", function(){
    inputText = $("textarea").val();
    inputStudent = $("#userName").val();
    console.log("inputText: " + inputText);

    newBubble(inputStudent, inputText);

    $(".form-control").val("");//Shouldn't this clear the form??
})


