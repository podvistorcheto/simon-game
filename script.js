'use strict'

// declaring vars
let gameOn = false;
let gameSequence = [];
let playerSequence = [];
let backlight;
let turn;
let hitRight;
let gameTurn;
let intervalId;
let sound = true;
let playerWins;

const gameOnButton = document.querySelector("#on");
let startCounter = document.querySelector("#turn");
const flashGreen = document.querySelector("#green");
const flashRed = document.querySelector("#red");
const flashYellow = document.querySelector("#yellow");
const flashBlue = document.querySelector("#blue");
const startButton = document.querySelector("#start");

gameOnButton.addEventListener('click', (event) => {
    if (gameOnButton.checked == true) {
        gameOn = true;
        startCounter.innerHTML = "--";
    } else {
        gameOn = false;
        startCounter = "";
    }
})

startButton.addEventListener('click', (event) => {
    if (gameOn) {
        play();
    }
    console.log('Start button clicked');
})

function play() {
    playerWins = false;
    gameSequence = [];
    playerSequence = [];
    backlight = 0;
    turn = 1;
    intervalId = 0;
    startCounter.innerHTML = 1;
    hitRight = true;
    for (let i = 0; i < 20; i++) {
        gameSequence.push(Math.floor(Math.random() * 4) + 1);
    }
    console.log(gameSequence);
    gameTurn = true;
    intervalId = setInterval(gameFlash, 800);
}

function gameFlash() {
    gameOn = false;

    if (backlight == turn) {
        clearInterval(intervalId);
        gameTurn = false;
        clearColor;
        gameOn = true;
    }

    if (gameTurn) {
        clearColor();
        setTimeout(() => {
            if (gameSequence[backlight] == 1) one();
            if (gameSequence[backlight] == 2) two();
            if (gameSequence[backlight] == 3) three();
            if (gameSequence[backlight] == 4) four();
            backlight++;
        }, 200);
    }
}

function one() {
    if (sound) {
        let audio = document.getElementById("sound-one")
        audio.play();
    }
    sound = true;
    flashGreen.style.backgroundColor = 'lightgreen';
}

function two() {
    if (sound) {
        let audio = document.getElementById("sound-two")
        audio.play();
    }
    sound = true;
    flashRed.style.backgroundColor = 'tomato';
}

function three() {
    if (sound) {
        let audio = document.getElementById("sound-three")
        audio.play();
    }
    sound = true;
    flashYellow.style.backgroundColor = 'orange';
}


function four() {
    if (sound) {
        let audio = document.getElementById("sound-four")
        audio.play();
    }
    sound = true;
    flashBlue.style.backgroundColor = 'lightskyblue';
}

function clearColor() {
    flashGreen.style.backgroundColor = 'darkcolor';
    flashRed.style.backgroundColor = 'darkred';
    flashYellow.style.backgroundColor = 'goldenrod';
    flashBlue.style.backgroundColor = 'darkblue';
}