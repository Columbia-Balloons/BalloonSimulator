const canvas = document.getElementById('myCanvas');
//setInterval(updateGameArea, 20);
var ctx = canvas.getContext('2d');
const heightElement = document.getElementById('height');
const speedElement = document.getElementById('speed');
const nfObject = new Intl.NumberFormat('en-US');
let cloud1;
let cloud2;
let myScore;
let moving = false;
let height = 1;
let clouds = [];
let frameNo = 0;

let diff = 0
let img = new Image();
img.src = 'background.png';

let balloon = new Image();
balloon.src = 'BackgroundBalloon.png';
let center;
let balloonHeight;

function draw() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.height = h * 0.5;
    canvas.width = w * 0.7;
    //ctx.canvas.width  = window.innerWidth;
    //ctx.canvas.height = window.innerHeight;
    //cloud1 = new piece(50, 40, 30, 10, 'white', 'piece');
    //cloud2 = new piece(30, 20, 150, 10, 'white', 'piece');
    //balloon = new piece(canvas.width / 2, canvas.height - 50, 30, 30, 'red', 'piece');
    //myScore = new piece(30, 10, 150, 20, 'black', 'text');
    
    
    //ctx.drawImage(img, 0, -2500, canvas.width, img.height);
    //balloon = new piece(canvas.width / 2, canvas.height - 50, 30, 30, 'red', 'piece');
    diff = canvas.height - img.height;
    ctx.drawImage(img, 0, diff, canvas.width, img.height);

    center = Math.floor(canvas.width / 2);
    balloonHeight = canvas.height - balloon.height -10;
    ctx.drawImage(balloon, center, balloonHeight);

}

function moveup() {
    moving = true;
    window.requestAnimationFrame(loop);
}


function loop() {
    let h0 = height;
    height += 10;
    let h1 = height;
    let displayHeight = nfObject.format(height);
    heightElement.innerText = "Height: " + displayHeight;
    let speed = (h1 - h0) / (1/20);
    speedElement.innerText = "Speed: " + nfObject.format(speed);
    //height += 10;
    int_height = Math.ceil(height)
    if (int_height + canvas.height > img.height) {
        return;
    }
    ctx.drawImage(img, 0, diff + int_height, canvas.width, img.height);
    
    
    /*
    let shake = Math.floor(Math.random() * 5) + 1;
    let sign = Math.random();
    if (sign >= 0.5) {
        center += shake;
    }
    else {
        center -= shake;
    }
    */
    
    ctx.drawImage(balloon, center, balloonHeight);
    window.requestAnimationFrame(loop);
}

function piece(x, y, width, height, color, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    //ctx.fillStyle = color;
    //ctx.fillRect(this.x, this.y, this.width, this.height);    
    this.update = function() {
        if (this.type === "text") {
            ctx.font = '15px Consolas';
            ctx.fillStyle = color;
            ctx.fillText("Height: " + height, this.x, this.y);
        }
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
}

function updateGameArea() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //cloud1.newPos();    
    //cloud1.update();

    //cloud2.newPos();    
    //cloud2.update();

    if (moving) {
        let h0 = height;
        height *= 1.01;
        let h1 = height;
        let displayHeight = nfObject.format(height);
        heightElement.innerText = "Height: " + displayHeight;
        let speed = (h1 - h0) / (1/20);
        speedElement.innerText = "Speed: " + nfObject.format(speed);


        frameNo += 1;
        if (frameNo == 1 || everyinterval(150)) {
            let h = canvas.height;
            let w = canvas.width;
            minWidth = 20;
            maxWidth = 60;
            w1 = Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
            w2 = Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
            x1 = Math.floor(Math.random() * w);
            minGap = 50;
            maxGap = 100;
            gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
            clouds.push(new piece(x1, 0, w1, w2, "white", "cloud"));
        }
        //clouds.push(new piece(10, x - height - gap, x, height + gap, "white", "cloud"));

        for (i = 0; i < clouds.length; i += 1) {
            clouds[i].y += speed;
            clouds[i].update();
        }
    }

    balloon.newPos();    
    balloon.update();
    
    //myScore.update();
}


function everyinterval(n) {
    if ((frameNo / n) % 1 == 0) {return true;}
    return false;
}