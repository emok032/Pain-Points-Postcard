
function init(){

  body = document.body;
  currentPostcard = document.getElementById('currentPostcard');
  nullObject = document.createElement('div');
  TweenLite.defaultEase = Power2.easeOut;
  spacerZ = 50, maxDrag = 300, perspective = 800;

  TweenMax.set(currentPostcard, {
    perspective:perspective,
    perspectiveOrigin:'50% -100%'
  })
   TweenMax.set('#info',{
     position:'absolute',
     left:'50%',
     xPercent:-50,
     top:'10%',
     fontFamily:'Roboto Slab',
     fontSize:32,
     color:'rgba(44,46,47,1)',
     textAlign:'center'
   }) 
  TweenMax.set(nullObject, {
    position:'absolute',
    x:0
  })

  cardDataArray = ["(Postcard here)"];
  cardElementArray = [];

  createCards();

//   Draggable.create(nullObject, {
//     type:'x',
//     trigger:currentPostcard,
//     throwProps:true,
//     onDrag:throwUpdate,
//     onThrowUpdate:throwUpdate,
//     onDragEnd:dragEnd,
//     snap:[0]
//   })        
// }

function createCards(){

  for(var i = 0; i < cardDataArray.length; i++){

    //var cardSymbol = sym.createChildSymbol(cardDataArray[i], currentPostcard);
    //cardElement = cardSymbol.getSymbolElement();
    cardElement = document.createElement('div');
    cardPost = document.createElement('div');
    cardTitle = document.createElement('div'); // (Postcard) SUBJECT LINE: Need element name for Alchemy keywords
        // Change to .getElementByID
    cardTitle.className = 'card-title';
    cardPanel = document.createElement('div');
    cardBodyText = document.createElement('div'); // (Postcard) PAIN POINT Summary: Need element name for top pain point(s) text
        // Change to .getElementByID
    cardShareText = document.createElement('div');
    cardActionText = document.createElement('div');
    // cardPost.setAttribute('src', cardDataArray[i].imageUrl);

    // TweenMax.set(cardPost, {
    //   position:'absolute',
    //   alpha:0.8
    // })

// Insert Postcard keywords here
    cardTitle.innerHTML = cardDataArray[i].cardTitle;
    cardBodyText.innerHTML = cardDataArray[i].cardBody
    cardShareText.innerHTML = 'SHARE';
    cardActionText.innerHTML = 'EXPLORE';
    TweenMax.set(cardTitle, {
      position:'absolute',
      top:136,
      left:15,
      width:345,
      fontSize:26,
      color:'#fff',
      fontFamily:'Roboto Slab, sans-serif'
    })
    ;

    TweenMax.set(cardPanel, {
      position:'absolute',
      top:185,
      left:0,
      width:360,
      height:135,
      backgroundColor:'#fff',
      color:'#000',
      fontFamily:'Roboto, sans-serif'
    })
    TweenMax.set(cardBodyText, {
      position:'absolute',
      top:200,
      left:15,
      width:330,
      height:100,
      fontSize:15,
      color:'#000',
      fontFamily:'Roboto, sans-serif'
    })
    ;
    TweenMax.set([cardActionText, cardShareText], {
      position:'absolute',
      top:290,
      width:80,
      height:50,
      fontSize:15,
      color:'#000',
      fontFamily:'Roboto, sans-serif'
    })

    TweenMax.set(cardActionText, {
      left:115,
      color:'#FFAB40'
    })
    TweenMax.set(cardShareText, {
      left:15
    })
    ;

    // TweenMax.set(cardElement, {
    //   position:'absolute',
    //   left:'50%',
    //   xPercent:-50,
    //   top:'50%',
    //   yPercent:5,
    //   z:-(i * spacerZ),
    //   //autoAlpha:0,
    //   zIndex:-i,
    //   width:360,
    //   height:320,
    //   backgroundColor:'#000',
    //   borderRadius:'2px',
    //   overflow:'hidden',
    //   boxShadow:'0px 0px 5px 2px rgba(0,0,0,0.2)',
    //     scale:1
    // })

    // cardElement.appendChild(cardPost);
    cardElement.appendChild(cardPanel);
    cardElement.appendChild(cardBodyText);
    cardElement.appendChild(cardTitle);
    cardElement.appendChild(cardShareText);
    cardElement.appendChild(cardActionText);
    currentPostcard.appendChild(cardElement);

    cardElementArray.push(cardElement);
  }     
    // TweenMax.staggerFromTo(cardElementArray, 1, {
    //   scale:1
    // }, {
    //   scale:1,
    //   force3D:true,
    //   ease:Elastic.easeOut
    // }, 0.1, function(){
    //   //cardElementArray.reverse()
    // })

}

// function throwUpdate(){

//   var i = cardElementArray.length;


//   while(--i > -1){


//     var rot = nullObject._gsTransform.x/2;
//     var z = Math.abs(cardElementArray[i]._gsTransform.z/1);
//     var x = nullObject._gsTransform.x;
//     var y = nullObject._gsTransform.y;
//     TweenMax.to(cardElementArray[i], 0.7, {
//       x:x - (x * z),
//       y:-nullObject._gsTransform.x/1,
//       rotation:rot - (rot * z),
//         force3D:true,
//       ease:Power2.easeOut


//     })

//   }


 // throwSpeed = 1;

// }

// function dragEnd(){

//   var time = (nullObject._gsTransform.x / throwSpeed)/100;

//   if(nullObject._gsTransform.x > (maxDrag) || throwSpeed > 0){

//     time = (time>3) ? 1 : time;
//     TweenMax.to(cardElementArray[0], time, {
//       left:'+=100%',
//       ease:Power2.easeOut,
//       onStart:removeCard

//     })
//   }

// }

function removeCard(){

  var c = cardElementArray.shift();
   

  TweenMax.to(cardElementArray, 1, {
    z:'+=' + spacerZ,
    //ease:Back.easeOut,
    onComplete:checkCards,
    onCompleteParams:[c]
  })

}


function checkCards(c){
  c.parentNode.removeChild(c); 
  if(cardElementArray.length == 0){

    createCards();
  }
}


  $(cardElementArray).on("swipe",function(){
    $(this).hide();
  });



}

init();
