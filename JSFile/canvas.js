let drawing = document.getElementById("drawing");
drawing.width = 1366;
drawing.height = 911;
console.log(window.innerWidth);
console.log(window.innerHeight);
let starGroup = new Array(9);
let circleGroup = new Array(200);
for (let i = 0; i < starGroup.length; i++) {
    starGroup[i] = new ShootingStar();
}

function Circle() {
    this.x = Math.random() * drawing.width;
    this.y = Math.random() * drawing.height;
}

for (let i = 0; i < circleGroup.length; i++) {
    circleGroup[i] = new Circle();
}

function ShootingStar() {
    this.initX = Math.random() * drawing.width;
    this.initY = Math.random() * (drawing.height / 8) + 50;
    this.x = this.initX;
    this.y = this.initY;
    this.length = Math.random() * 30 + 10;
    this.speed = 4 + Math.random() * 4;
    this.dura = Math.random() * 50 + 20;
    this.reset = function () {
        this.initX = Math.random() * drawing.width;
        this.initY = Math.random() * (drawing.height / 4);
        this.x = this.initX;
        this.y = this.initY;
        this.length = Math.random() * 30 + 10;
        this.dura = Math.random() * 300 + 20;
    }
}

function drawShootingStar() {
    if (drawing.getContext) {
        let context = drawing.getContext("2d");
        context.lineCap = "round";
        context.lineWidth = "3";
        context.fillStyle = "#fff";
        for (let i = 0; i < starGroup.length; i++) {
            if (starGroup[i].y - starGroup[i].initY >= starGroup[i].dura) {
                //context.clearRect(starGroup[i].x, starGroup[i].y, starGroup[i].length + 2, starGroup[i].length + 2);
                starGroup[i].reset();
                continue;
            }
            context.strokeStyle = "#fff";
            context.beginPath();
            context.moveTo(starGroup[i].x, starGroup[i].y);
            context.lineTo(starGroup[i].x + starGroup[i].length / 2, starGroup[i].y + starGroup[i].length);
            context.stroke();
            context.closePath();
            starGroup[i].x += starGroup[i].speed / 2;
            starGroup[i].y += starGroup[i].speed;
        }
        context.save();
        context.globalCompositeOperation = "destination-out";
        context.fillStyle = "rgba(0, 0, 0,0.2)";
        context.fillRect(0, 0, drawing.width, drawing.height);
        context.restore();
    }
    requestAnimationFrame(drawShootingStar);
}

requestAnimationFrame(drawShootingStar);
