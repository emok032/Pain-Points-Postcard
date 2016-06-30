//Global Variables
var inputText;
var inputStudent;



//Bubble object constructor
// function newBubble(keyword, text, student)


//New Pain-Point Bubble
function createBubble(keyword, text, student){
    var bubbleDiv = $("<div>").attr({class: "bubble"});
    var keyword = $("<h3>").text(keyword);
    var p = $("<p>").text(text);
    if(student){
        var bMod = $("<b>");
        var s = $("<p>").append(bMod).text(student);
    }
    bubbleDiv.append(keyword);
    bubbleDiv.append(p);
    $("#existingBubblesDiv").append(bubbleDiv)
}

//Basic NLP API logic
// var inputURL;

function callback(response){
    console.log(response);
    var reply = response.keywords[0].text;
    createBubble(reply, inputText, inputStudent);
}

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

            $("form-control").val("URL");//Shouldn't this clear the form??
        })