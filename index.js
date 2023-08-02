let cursor = document.getElementById("invertedcursor");
let bgCursor = document.getElementById("backgroundcursor");
let buttons = document.getElementsByClassName("cursorButton");
let onButton = false;
let hoveredElement = null;

window.onpointermove = event => {
  const { clientX, clientY } = event;

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
    left: `${clientX}px`,
    top: `${clientY}px`,
  }, { duration: 50, fill: "forwards" });

  if (!onButton) {
    cursor.animate({
      left: `${clientX}px`,
      top: `${clientY}px`,
      borderRadius: `50%`,
      width: `30px`,
      height: `30px`
    }, { duration: 500, fill: "forwards" });
  }
  else if (onButton) {
    let rect = hoveredElement.getBoundingClientRect()
    
    cursor.animate({
      left: `${rect.left + rect.width/2}px`,
      top: `${rect.top + rect.height/2}px`,
      borderRadius: `5px`,
      width: `${rect.width + 10}px`,
      height: `${rect.height + 10}px`
    }, { duration: 400, fill: "forwards" });
  }
}

