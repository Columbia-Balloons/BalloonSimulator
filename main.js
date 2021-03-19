const canvas = document.getElementById("myCanvas");
//setInterval(updateGameArea, 20);
var ctx = canvas.getContext("2d");
const heightElement = document.getElementById("height");
const speedElement = document.getElementById("speed");
const nfObject = new Intl.NumberFormat("en-US");
let myScore;
let moving = false;
//let height = 1;


let diff = 0;
let img = new Image();
img.src = "skylongwithground.png";

let balloon = new Image();
balloon.src = "BackgroundBalloon.png";
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
    balloonHeight = canvas.height - balloon.height - 10;
    ctx.drawImage(balloon, center, balloonHeight);
}


let height = 0;
let velocity = 0;
let diameter = 2.4;
let mass = 2;
let m_gas = 0.164 * (4/3) * Math.PI * ((diameter/2) ** 3);
let time = 0;

function moveup() {
    moving = true;
    setInterval(function() {
        loop();
    }, 3);
    //window.requestAnimationFrame(loop);

}


function loop() {
    time += 60;
    let info = stats(height, velocity, diameter, mass, m_gas, 0.3);
    height = info.height;
    velocity = info.velocity;


    let displayHeight = nfObject.format(height);
    heightElement.innerText = "Height: " + displayHeight;
    speedElement.innerText = "Speed: " + nfObject.format(velocity);
    int_height = Math.ceil(height / 4);
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
    //window.requestAnimationFrame(loop);
}

