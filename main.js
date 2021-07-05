// Store canvas variables
const canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Store stats in variables to easily access later
const heightElement = document.getElementById("height");
const speedElement = document.getElementById("speed");
const accelerationElement = document.getElementById("acc");

const nfObject = new Intl.NumberFormat("en-US"); // Used for number formatting
let moving = false;


let diff = 0;
let img = new Image();
img.src = "skylongwithground.png";

let balloon = new Image();
balloon.src = "balloon.png";
let center;
let balloonHeight;

// Handles the initial loading of the canvas
function draw() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.height = h * 0.8;
    canvas.width = w * 0.98;
    diff = canvas.height - img.height;
    ctx.drawImage(img, 0, diff, canvas.width, img.height);

    center = Math.floor(canvas.width / 2) - Math.floor(balloon.width / 2);
    balloonHeight = canvas.height - balloon.height - 10;
    ctx.drawImage(balloon, center, balloonHeight);
}

// Declare and initialize values for calculations
let height = 0;
let velocity = 0;
let acceleration = 0;
let diameter = 2.4;
let mass = 2;
let m_gas = 0.164 * (4/3) * Math.PI * ((diameter/2) ** 3);
let time = 0;
let isFalling = false;

// Sets up the continuous call for the main balloon loop function
function moveup() {
    moving = true;
    setInterval(function() {
        loop();
    }, 3);
}

// Handles falling balloon behavior
function fallingBalloon() {
    if (height <= 10) {
        heightElement.innerText = "Height: 0";
        speedElement.innerText = "Speed: 0";
        accelerationElement.innerText = "Acceleration: 0";
        return;
    }
    fallingStats = falling(height, velocity, 3, mass, 0.3);
    height = fallingStats.height;
    velocity = fallingStats.velocity;
    acceleration = fallingStats.acceleration;
    let displayHeight = nfObject.format(height);
    heightElement.innerText = "Height: " + displayHeight;
    speedElement.innerText = "Speed: " + nfObject.format(velocity);
    accelerationElement.innerText = "Acceleration: " + nfObject.format(acceleration);
    int_height = Math.ceil(height / 4);
    ctx.drawImage(img, 0, diff + int_height, canvas.width, img.height);
    ctx.drawImage(balloon, center, balloonHeight);
    return;
}

// Handles the rising balloon behavior
function risingBalloon() {
    let info = stats(height, velocity, diameter, mass, m_gas, 0.3);
    height = info.height;
    velocity = info.velocity;
    diameter = info.diameter;
    acceleration = info.acceleration;
    let newVolume = (info.diameter / 2) **3 * (4/3) * Math.PI;
    if (newVolume > (4/3) * Math.PI * (12 ** 3)) {
        isFalling = true;
        velocity = 0;
        return;
    }
    let displayHeight = nfObject.format(height);
    heightElement.innerText = "Height: " + displayHeight;
    speedElement.innerText = "Speed: " + nfObject.format(velocity);
    accelerationElement.innerText = "Acceleration: " + nfObject.format(acceleration);
    int_height = Math.ceil(height / 4);
    if (int_height + canvas.height > img.height) {
        return;
    }
    ctx.drawImage(img, 0, diff + int_height, canvas.width, img.height);
    ctx.drawImage(balloon, center, balloonHeight);
}

// Loop function is continuously called to raise or lower the balloon
function loop() {
    time += 60;
    if (isFalling) {
        fallingBalloon();
    }
    else {
        risingBalloon();
    }
}

