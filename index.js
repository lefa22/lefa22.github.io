let cursor = document.getElementById("invertedcursor");
let bgCursor = document.getElementById("backgroundcursor");
let buttons = document.getElementsByClassName("cursorButton");
let onButton = false;
let hoveredElement = null;
let more = 0;
let mouseX = 0;
let mouseY = -150;
let letters = Array.from(document.getElementsByClassName("headerSpan"));

window.onpointermove = event => {
  const { clientX, clientY } = event;
  mouseX = clientX;
  mouseY = clientY;
}


window.onmousedown = event => {
    more = 30;
}

window.onmouseup = event => {
  more = 0;
}

function updateCursor() {
  for (let i = 0; i < buttons.length; i++) {
    if (buttons.item(i).matches(':hover')) {
     onButton = true
     hoveredElement = buttons.item(i);
     break;
    }
    else {
     onButton = false
    }
 }

 bgCursor.animate({
   left: `${mouseX}px`,
   top: `${mouseY}px`,
 }, { duration: 50, fill: "forwards" });

 if (!onButton) {
   cursor.animate({
     left: `${mouseX}px`,
     top: `${mouseY}px`,
     borderRadius: `50%`,
     width: `${30+more}px`,
     height: `${30+more}px`
   }, { duration: 500, fill: "forwards" });
 }
 else if (onButton) {
   let rect = hoveredElement.getBoundingClientRect()
   
   cursor.animate({
     left: `${rect.left + rect.width/2}px`,
     top: `${rect.top + rect.height/2}px`,
     borderRadius: `5px`,
     width: `${rect.width + 10 + more}px`,
     height: `${rect.height + 10 + more}px`
   }, { duration: 400, fill: "forwards" });
 }
}

setInterval(updateCursor, 50)

let calledOnce = false;

function mouseOnHeader(status) {
    if (status && !calledOnce) {
      letters.forEach(letter => {
        letter.animate({
          left: `${Math.random()*50-25}px`,
          top: `${Math.random()*50-25}px`
        }, { duration: 400, fill: "forwards"});
        console.log(letter)
        calledOnce = true;
    });
  }
    else if (!status) {
      letters.forEach(letter => {
      letter.animate({
        left: `0px`,
        top: `0px`
      }, { duration: 400, fill: "forwards" });
      console.log(letter)
      calledOnce = false;
  });
}
}