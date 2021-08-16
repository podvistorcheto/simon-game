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
}