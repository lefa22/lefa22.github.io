const morphTime = 0.75;
let time = new Date();
let previousSeconds = -1
let previousClock = [-1, -1,  -1, -1,  -1, -1]
let morph = [true, true, true, true, true, true]

let p1 = [document.getElementById("s1_1"), document.getElementById("s1_2"), document.getElementById("s1_4"), document.getElementById("s1_5"), document.getElementById("s1_7"), document.getElementById("s1_8")]
let p2 = [document.getElementById("s2_1"), document.getElementById("s2_2"), document.getElementById("s2_4"), document.getElementById("s2_5"), document.getElementById("s2_7"), document.getElementById("s2_8")]

function setMorph() {
    let currentClock = [
        getPartofNumber(time.getHours(), 0),
        getPartofNumber(time.getHours(), 1),
        getPartofNumber(time.getMinutes(), 0),
        getPartofNumber(time.getMinutes(), 1),
        getPartofNumber(time.getSeconds(), 0),
        getPartofNumber(time.getSeconds(), 1)
    ]
    
    for (let i = 0; i<6; i++) {
        if (morph[i]) {
            let fraction = (time.getMilliseconds())/1000
            
            p2[i].style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            p2[i].style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
        
            fraction = 1 - fraction;
            p1[i].style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            p1[i].style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
            
            if (currentClock[i]-1 == -1) {
                if (i == 3 || i == 5) {
                    p1[i].innerHTML = 9
                } 
                else if (i == 2 || i == 4) {
                    p1[i].innerHTML = 5
                }
                else if (i == 1) {
                    if (previousClock[0] >2) {
                        p1[i].innerHTML = 9
                    }
                    else {
                        p1[i].innerHTML = 3
                    }
                }
                else {
                    p1[i].innerHTML = 2
                }
            }
            else {
                p1[i].innerHTML = currentClock[i]-1
            }
            
            p2[i].innerHTML = currentClock[i]
        }
    }

    previousClock = currentClock

}

function setupNewMorph() {
    let currentClock = [
        getPartofNumber(time.getHours(), 0),
        getPartofNumber(time.getHours(), 1),
        getPartofNumber(time.getMinutes(), 0),
        getPartofNumber(time.getMinutes(), 1),
        getPartofNumber(time.getSeconds(), 0),
        getPartofNumber(time.getSeconds(), 1)
    ]

    for (let i = 0; i<6; i++) {
        if (previousClock[i] != currentClock[i]) {
            morph[i] = true
        }
        else {
            morph[i] = false
        }

        p2[i].style.filter = "";
        p2[i].style.opacity = "100%";
        
        p1[i].style.filter = "";
        p1[i].style.opacity = "0%";
    }
}

function animate() {
    requestAnimationFrame(animate);
    time = new Date();
    
    if (time.getSeconds() == previousSeconds) {
    
        setMorph();
        
      } else {
        previousSeconds = time.getSeconds()
        setupNewMorph();
      }
}

function getPartofNumber(number, index) {
    if ((number+"").length == 1) {
        if (index) {
            return number
        }
        else {
            return 0
        }
    }
    else {
        if (index) {
            return Number((number+"").slice(1, 2))
        }
        else {
            return Number((number+"").slice(0, 1))
        }
    }
}



animate();

function closePopup() {
    
    let blurContainer = document.getElementById("blurContainer");
    let popup = document.getElementById("popup");

    blurContainer.style.backdropFilter = "blur(0px)";
    popup.style.top = "100px"
    popup.style.backgroundColor = "rgba(0, 0, 0, 0)"
    popup.style.borderColor = "rgba(123, 224, 117, 0)"
    popup.style.boxShadow = "none"
    popup.getElementsByTagName("div")[0].style.opacity = "0%"
    setTimeout(deletePopup, 2000)
}

function deletePopup() {
    document.getElementById("blurContainer").remove()
}

function closeFirefoxPopup() {
    document.getElementById("firefoxPopup").style.top = "-400px"
}

if (navigator.userAgent.search("Firefox") > -1) {
    document.getElementById("firefoxPopup").removeAttribute("hidden")
}