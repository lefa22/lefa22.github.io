let buttons = document.getElementsByClassName("cursorButton");
let icons = document.getElementsByClassName("cursorIcon");
let onButton = false;
let onIcon = false;
let hoveredElement = null;
let animationDuration = reducedMotion ? 0 : 1;

// Create and inject SVG filter
const svgFilter = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgFilter.id = 'filter';
svgFilter.setAttribute('style', 'position: absolute; height: 0;');

const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
filter.id = 'two-color-flatten';

const feColorMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
feColorMatrix.setAttribute('type', 'matrix');
feColorMatrix.setAttribute('values', `
    0.2 0 0 0 0
    0 0.743 0 0 0
    0 0 0.182 0 0
    0 0 0 1 0
`);

filter.appendChild(feColorMatrix);
svgFilter.appendChild(filter);
document.body.insertBefore(svgFilter, document.body.firstChild);

// Create and inject cursor elements
const cursorBox = document.createElement('div');
cursorBox.id = 'cursorBox';
const invertedCursor = document.createElement('div');
invertedCursor.id = 'invertedcursor';

const cursorText = document.createElement('span');
cursorText.textContent = '';
cursorText.className = 'cursorText material-symbols-rounded';
invertedCursor.appendChild(cursorText);

cursorBox.appendChild(invertedCursor);
document.body.appendChild(cursorBox);



let cursor = document.getElementById("invertedcursor");

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
        for (let i = 0; i < icons.length; i++) {
            if (icons.item(i).matches(':hover')) {
                onIcon = true;
                hoveredElement = icons.item(i);
                break;
            }
            else {
                onIcon = false;
                hoveredElement = null;
            }
        }
    }
    if (cursorText.textContent != "" && !onIcon) {
        cursor.style.backdropFilter = `invert(100%) grayscale(100%) url(#two-color-flatten)`;
        cursorText.style.fontSize = `0px`;
        cursor.style.backgroundColor = `rgba(122, 224, 117, 0)`;
    }
    
    if (!onButton && !onIcon) {
        const { clientX, clientY } = event;
        
        cursor.animate({
            left: `${clientX}px`,
            top: `${clientY}px`,
            borderRadius: `50%`,
            width: `30px`,
            height: `30px`
        }, { duration: 500*animationDuration, fill: "forwards" });
    }
    else if (onButton) {
        cursorFitToButton()
    }
    else if (onIcon) {
        const { clientX, clientY } = event;
        cursor.animate({
            left: `${clientX}px`,
            top: `${clientY}px`,
            borderRadius: `50%`,
            width: `100px`,
            height: `100px`
        }, { duration: 500*animationDuration, fill: "forwards" });
        cursor.style.backdropFilter = `invert(100%) grayscale(100%) url(#two-color-flatten) blur(3px)`;
        cursorText.style.fontSize = `80px`;
        cursorText.textContent = hoveredElement.dataset.cursorIcon;
        cursor.style.backgroundColor = `rgba(122, 224, 117, 0.6)`;
        if (navigator.userAgent.search("Firefox") > -1) {
            cursor.style.backgroundColor = `rgba(122, 224, 117, 1)`;
        }
    }
}

function cursorFitToButton() {
    if (onButton && hoveredElement != null) {
        let rect = hoveredElement.getBoundingClientRect()
        cursor.animate({
            left: `${rect.left + rect.width/2}px`,
            top: `${rect.top + rect.height/2}px`,
            borderRadius: `5px`,
            width: `${rect.width + 10}px`,
            height: `${rect.height + 10}px`
        }, { duration: 400*animationDuration, fill: "forwards" });
    }
}

function updateCursorLists() {
    let buttons = document.getElementsByClassName("cursorButton");
    let icons = document.getElementsByClassName("cursorIcon");
}
  
setInterval(cursorFitToButton, 200)