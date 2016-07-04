//Global Variables

//Bubble object constructor
function bubbleObj(nbStudent, nbText, nbKeyword, nbTime){
    this.nbStudent = nbStudent,
    this.nbText = nbText,
    this.nbKeyword = nbKeyword,
    this.nbTime = nbTime
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
    var keyArray = inputObj.nbKeyword
    for(var i = 0; i < keyArray.length; i++){

        //Create a new link out of each keyword
        var k = keyArray[i] + " ";
        var link = $("<a>").attr({"href": "#"});
        link.text(k);

        //Append each keyword link to bubbleDiv
        bubbleDiv.append(link);

        //Append the new bubbleDiv to the bubble area on the main page
        $(insertDiv).append(bubbleDiv); 
    }
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
        if(reply.length > 3){limit = 2}//Use up to the first three keywords in the response
        else{limit = reply.length-1};
        for(var i = 0; i <= limit; i++){
            keyArray.push("#" + reply[i].text )//Push each keyword to keyArray
        }

        //Creates new object from student-generated info and AJAX call
        var fireBaseObj = new bubbleObj(inputStudent, inputText, keyArray /* add moment.js timestamp*/);
        console.log(fireBaseObj);

        //Send object to firebase here

        renderBubble(fireBaseObj, "#existingBubblesDiv")
    });
}

$(".btn").on("click", function(){
    inputText = $("textarea").val();
    inputStudent = $("#userName").val();
    console.log("inputText: " + inputText);

    newBubble(inputStudent, inputText);

    $(".form-control").val("");//Shouldn't this clear the form??
})

