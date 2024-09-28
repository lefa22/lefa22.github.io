let cursor = document.getElementById("invertedcursor");
let buttons = document.getElementsByClassName("cursorButton");
let onButton = false;
let hoveredElement = null;

window.onpointermove = event => {
    for (let i = 0; i < buttons.length; i++) {
        if (buttons.item(i).matches(':hover')) {
            onButton = true
            hoveredElement = buttons.item(i);
            break;
        }
        else {
            onButton = false
            hoveredElement = null;
        }
    }
    if (!onButton) {
        const { clientX, clientY } = event;
        
        cursor.animate({
            left: `${clientX}px`,
            top: `${clientY}px`,
            borderRadius: `50%`,
            width: `30px`,
            height: `30px`
        }, { duration: 500, fill: "forwards" });
    }
    else if (onButton) {
        cursorFitToButton()
    }
}

function cursorFitToButton() {
    if (hoveredElement != null) {
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
  
setInterval(cursorFitToButton, 200)