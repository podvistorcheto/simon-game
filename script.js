'use strict'

// declaring vars
let gameOn = false;
let gameSequence = [];
let playerSequence = [];
let backlight;
let turn;
let hitRight;
// compTurn tracks whether is player or computer turn
let compTurn;
let intervalId;
let sound = true;
let playerWins;
let highscore = 0;

const gameOnButton = document.querySelector("#on");
let startCounter = document.querySelector("#turn");
const flashGreen = document.querySelector("#green");
const flashRed = document.querySelector("#red");
const flashYellow = document.querySelector("#yellow");
const flashBlue = document.querySelector("#blue");
const startButton = document.querySelector("#start");
const playAgain = document.getElementById("new-game");

// switch on the game console
gameOnButton.addEventListener('click', (event) => {
    if (gameOnButton.checked == true) {
        gameOn = true;
        startCounter.innerHTML = "--";
    } else {
        gameOn = false;
        startCounter = "";
        clearColor();
        clearInterval(intervalId);
    }
})

// start the game sequence
startButton.addEventListener('click', (event) => {
    if (gameOn) {
        play();
    }
    console.log('Start button clicked');
})

// method to randomize the sequence after clicking the start button
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
    compTurn = true;
    // code for the game starting to flashing the colors
    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    gameOn = false;

    if (backlight == turn) {
        // calling this method to stop execution of the intervalId variable
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        gameOn = true;
    }

    if (compTurn) {
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

// flashes the color for the player to guess the sequence
function flashColor() {
    flashGreen.style.backgroundColor = 'lightgreen';
    flashRed.style.backgroundColor = 'tomato';
    flashYellow.style.backgroundColor = 'yellow';
    flashBlue.style.backgroundColor = 'lightskyblue';
}

// clears the color backlight for the user to start guessing
function clearColor() {
    flashGreen.style.backgroundColor = 'darkgreen';
    flashRed.style.backgroundColor = 'darkred';
    flashYellow.style.backgroundColor = 'goldenrod';
    flashBlue.style.backgroundColor = 'darkblue';
}



function thatsWinner() {
    flashColor();
    // startCounter.innerHTML = "That's a Winner!";
    gameOn = false;
    playerWins = true;
}

// functions to flash the colors for the player
flashGreen.addEventListener('click', (event) => {
    if (gameOn) {
        playerSequence.push(1);
        check();
        one();
        if (!playerWins) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})


flashRed.addEventListener('click', (event) => {
    if (gameOn) {
        playerSequence.push(2);
        check();
        two();
        if (!playerWins) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})


flashYellow.addEventListener('click', (event) => {
    if (gameOn) {
        playerSequence.push(3);
        check();
        three();
        if (!playerWins) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

// 1. pay attention to the repetitive code for these function

flashBlue.addEventListener('click', (event) => {
    if (gameOn) {
        playerSequence.push(4);
        check();
        four();
        if (!playerWins) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})


// function to check the player choice is correct

function check() {
    if (playerSequence[playerSequence.length - 1] !== gameSequence[playerSequence.length - 1])
        hitRight = false;
    if (playerSequence.length == 3 && hitRight == true) {
        if (turn > highscore) {
            highscore = turn;
            document.querySelector("#highscore").textContent = highscore;
        }
        startCounter.innerHTML = 'Thats a Winner!';
        thatsWinner();
    }
    if (hitRight == false) {
        if (turn > highscore) {
            highscore = turn - 1;
            document.querySelector("#highscore").textContent = highscore;
        }
        flashColor();
        startCounter.innerHTML = 'Wrong Sequence!';
        gameOn = false;
        setTimeout(() => {
            clearColor();
        }, 800)
        compTurn = false;
        backlight = 0;
        hitRight = true;
        playerSequence = [];
        intervalId = setInterval(gameTurn, 800)
    }
    if (turn == playerSequence.length && hitRight && !playerWins) {
        turn++;
        playerSequence = [];
        compTurn = true;
        backlight = 0;
        startCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
}

// start new game

// const playNewGame = function () {
//     if (gameOn) {
//         play();
//     } else {
//         alert('Please click "Game ON" turn on the game console')
//     }
// }
// playNewGame();

// playAgain.addEventListener('click', playNewGame);