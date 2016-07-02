//Global Variables

//Bubble object constructor
function bubbleObj(nbStudent, nbText, nbKeyword, nbTime){
    this.nbStudent = nbStudent,
    this.nbText = nbText,
    this.nbKeyword = nbKeyword,
    this.nbTime = nbTime
}

function bubbleFactory(inputText, inputStudent){
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
        var keyArray = [];//This will be added to this bubble's Firebase object

        //Create a new div for our new bubble, and append the student's name and inputted text
        var bubbleDiv = $("<div>").attr({class: "bubble"});
        var s;//Either we add the student's submitted name/username, or we add "Anonymous"
            if(inputStudent){s = $("<h3>").text(inputStudent + ":")}
            else {s = $("<h3>").text("Anonymous: ")};
        var t = $("<p>").text(inputText);//Turn the submitted text into a new paragraph element

        bubbleDiv.append(s);//Add the student name and text to the new bubbleDiv
        bubbleDiv.append(t);
        
        //Create link-enabled keyword hashtags from the Alchemy API
        var limit;
        var responseLength = reply.length;
        console.log(responseLength);
        if(responseLength > 3){limit = 2}//Use up to the first three keywords in the response
        else{limit = responseLength-1};

        //Turn each keyword into a clickable link (up to a max of three keywords), and append each one to bubbleDiv
        for(var i = 0; i <= limit; i++){
            //Create a new link out of each keyword
            var k = " #" + reply[i].text + " ";
            var link = $("<a>").attr({"href": "#"});
            link.text(k);

            bubbleDiv.append(link);//Append each keyword link to bubbleDiv

            keyArray.push(k)//Push each keyword to keyArray
        }

        $("#existingBubblesDiv").append(bubbleDiv); //Append the new bubbleDiv to the bubble area on the main page

        //Create a new object for each bubble, to be sent to Firebase
        var fireBaseObj  = new bubbleObj(s, t, keyArray)//Should we pass a moment.js object as an argument for nbTime?
        console.log(fireBaseObj);
    });
}

$(".btn").on("click", function(){
    inputText = $("textarea").val();
    inputStudent = $("#userName").val();
    console.log(inputText);

    bubbleFactory(inputText, inputStudent);

    $(".form-control").val("");//Shouldn't this clear the form??
})

