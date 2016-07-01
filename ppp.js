//Global Variables
var inputText;
var inputStudent;

Bubble object constructor
function newBubble(nbKeyword, nbText, nbStudent, nbTime){
    this.nbKeyword = keyword,
    this.nbText = text,
    this.nbStudent = student,
    this.nbTime = time
}

//New Pain-Point Bubble
function createBubbleDiv(keyword, text, student){
    //Variables to create the new bubble Div
    var bubbleDiv = $("<div>").attr({class: "bubble"});
    var keyword = $("<h3>").text(keyword);
    var p = $("<p>").text(text);
    if(student){
        // var bMod = $("<b>");
        var s = $("<p><b>").text(student);
    }

    //Append everything to the screen
    bubbleDiv.append(keyword);
    bubbleDiv.append(p);
    bubbleDiv.append(s);
    $("#existingBubblesDiv").append(bubbleDiv);

    //Create a new object for the bubble
    var bubbleObj = newBubble(keyword, text, student, /*moment.js time function?*/)
}

//Basic NLP API logic
// var inputURL;

function callback(response){
    console.log(response);
    var reply = response.keywords[0].text;
    createBubbleDiv(reply, inputText, inputStudent);
}

//Keyword analysis
$(".btn").on("click", function(){
            inputText = $("textarea").val();
            inputStudent = $("#userName").val();
            // inputText = encodeURI(inputText); 
            console.log(inputText);

            var queryURL = "https://gateway-a.watsonplatform.net/calls/text/TextGetRankedKeywords"

            $.ajax({
                url: queryURL,
                method: 'POST',
                data: {
                    apikey: "4947c53fd9c0d11744fe266fc5b7f3273e5e33ab",
                    outputMode: "json",
                    text: inputText
                }
            }).done(callback);

            $(".form-control").val("");//Shouldn't this clear the form??
        })

//
