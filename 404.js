address = window.location.toString();
let heading = document.getElementById("heading");
document.getElementById("windowLocation").innerText = address;



function mouseOnHeading() {
    for (let i = 0; i < 3; i++) {
        for (let i2 = 0; i2 < 10; i2++) {
            if (i == 0) {
                setTimeout(() => {heading.innerHTML = `${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`}, (i*10+i2)*40);
            }
            else if (i == 1) {
                setTimeout(() => {heading.innerHTML = `4${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`}, (i*10+i2)*40);
            }
            else if (i == 2) {
                setTimeout(() => {heading.innerHTML = `40${Math.floor(Math.random()*10)}`}, (i*10+i2)*40);
            }
        }
    }
    setTimeout(() => {heading.innerHTML = "404";}, 30*40);
}

mouseOnHeading()