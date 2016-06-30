{
  "credentials": {
    "url": "https://gateway-a.watsonplatform.net/calls",
    "note": "It may take up to 5 minutes for this key to become active",
    "apikey": "4947c53fd9c0d11744fe266fc5b7f3273e5e33ab"
  }
}

curl "https://gateway-a.watsonplatform.net/calls/url/URLGetAuthors?apikey=API_KEY&url=www.ibm.com"


curl -X POST \
-d "apikey=4947c53fd9c0d11744fe266fc5b7f3273e5e33ab" \
-d "outputMode=json" \
-d "url=http://www.twitter.com/ibmwatson" \
"https://gateway-a.watsonplatform.net/calls/url/URLGetRankedKeywords"

var queryURL = "https://gateway-a.watsonplatform.net/calls/url/URLGetRankedKeywords"

$.ajax({
	url: queryURL,
	method: 'POST',
	data: {
		apikey: "4947c53fd9c0d11744fe266fc5b7f3273e5e33ab",
		outputMode: "json",
		url: "http://www.twitter.com/ibmwatson"
	}
}).done(function(response){
	console.log(response)
}




