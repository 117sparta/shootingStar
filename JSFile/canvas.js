let drawing = document.getElementById("drawing");
drawing.width = window.innerWidth;
drawing.height = window.innerHeight;
console.log(window.innerWidth);
console.log(window.innerHeight);
let starGroup = new Array(9);
for (let i = 0; i < starGroup.length; i++) {
    starGroup[i] = new ShootingStar();
}

function ShootingStar() {
    this.initX = Math.random() * window.innerWidth;
    this.initY = Math.random() * (window.innerHeight / 8);
    this.x = this.initX;
    this.y = this.initY;
    this.length = Math.random() * 30 + 14;
    this.speed = 8;
    this.dura = Math.random() * 50 + 20;
    this.reset = function () {
        this.initX = Math.random() * window.innerWidth;
        this.initY = Math.random() * (window.innerHeight / 4);
        this.x = this.initX;
        this.y = this.initY;
        this.length = 35;
        this.dura = Math.random() * 300 + 20;
    }
}

function drawShootingStar() {
    if (drawing.getContext) {
        let context = drawing.getContext("2d");
        context.lineCap = "round";
        context.fillStyle = "rgba(0,0,0,0.3)";
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);
        for (let i = 0; i < starGroup.length; i++) {
            if (starGroup[i].x - starGroup[i].initX >= starGroup[i].dura) {
                context.clearRect(starGroup[i].x, starGroup[i].y, starGroup[i].length + 2, starGroup[i].length + 2);
                starGroup[i].reset();
                continue;
            }
            let step = starGroup[i].length / 5;
            context.strokeStyle = "rgba(255,255,255,1)";
            let endX = starGroup[i].x;
            let endY = starGroup[i].y;
            context.beginPath();
            context.moveTo(starGroup[i].x, starGroup[i].y);
            context.lineTo(starGroup[i].x + starGroup[i].length, starGroup[i].y + starGroup[i].length);
            /*let opa = 0.3;
            for (let j = 0; j < 5; j++) {
                context.beginPath();
                endX += step;
                endY += step;
                context.moveTo(starGroup[i].x + j * step, starGroup[i].y + j * step);
                context.lineTo(endX, endY);
                context.stroke();
                context.closePath();
                context.strokeStyle = "rgba(255,255,255," + opa + ")";
                opa += 0.2;
            }
            */
            context.stroke();
            context.closePath();
            starGroup[i].x += starGroup[i].speed;
            starGroup[i].y += starGroup[i].speed;
            //context.clearRect(starGroup[i].x - starGroup[i].speed-2, starGroup[i].y - starGroup[i].speed-2, starGroup[i].speed + 4, starGroup[i].speed + 4);
        }
    }
}

let fallback = setInterval(drawShootingStar, 35);
