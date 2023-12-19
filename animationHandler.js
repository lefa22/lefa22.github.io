const d = new Date();
let month = d.getMonth();

class Snowflake {
    constructor() {
        this.initialTransformationX = -80
        this.initialTransformationY = -150
        this.wind = 100
        this.type = Math.floor(Math.random() * 6) + 1;
        this.x = Math.floor(Math.random() * window.innerWidth)
        this.xVariation = Math.floor(Math.random() * 80)-40
        this.y = -300
        this.rotation = 0
        this.initialRoation = Math.floor(Math.random() * 400)-200
        this.id = Math.floor(Math.random() * 9999999)
        this.createElement()
    }

    createElement() {
        this.element = document.createElement("img")
        this.element.src = `Assets/Images/Snow/Snowflake${this.type}.svg`
        this.element.classList.add("snowflake")
        this.element.id = this.id
        this.element.style.left = (this.x + this.initialTransformationX) + "px";
        this.element.style.top = (this.y + this.initialTransformationY) + "px";
        document.getElementById("animationBox").appendChild(this.element)

    }

    animate() {
        this.rotation += this.initialRoation
        this.x += this.wind + this.xVariation
        this.y += 300
        this.element.style.transform = 'rotate(' + this.rotation + 'deg)';
        this.element.style.left = (this.x + this.initialTransformationX) + "px";
        this.element.style.top = (this.y + this.initialTransformationY) + "px";

        if (this.y + this.initialTransformationY > window.innerHeight  + 100) {
            this.delete()
        }
        // if (this.x + this.initialTransformationX > window.innerWidth) {
        //     this.element.classList.remove("animated")
        //     this.x = -this.wind + this.xVariation
        //     this.element.classList.add("animated")
        // }
    }

    delete() {
        this.element.remove()
        snowflakes.splice(snowflakes.indexOf(this), 1)
    }
}

if ((month == 11) || (month < 3) || true) {
    var snowflakes = []
    setInterval(function(){
        snowflakes.push(new Snowflake());
        snowflakes.forEach(snowflake => {
            snowflake.animate();
        });
    }, 3000)
}

// sf = new Snowflake();

// setInterval(function(){sf.animate();}, 3000)