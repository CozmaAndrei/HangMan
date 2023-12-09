const guessWordOptions = document.getElementById("guessWordOptions");
const message = document.getElementById("message");
const numberOfLives = document.getElementById("numberOfLives");
const wordOptions = ["programmer", "wellcode", "code"]
let wordHidden = [];
const theNumberOfLettersFromAlphabet = 26;
const ASCIIposition = 97;
let lives = 7;
const alphabetArray = [];
const randomWordOptions = wordOptions[Math.floor(Math.random() * wordOptions.length)];

function setupGame() {
    buildTheAlphabet();
    displayHiddenWord();
    createAlphabetButtons();
}

function buildTheAlphabet() {
    for (let i = 0; i < theNumberOfLettersFromAlphabet; ++i) {
        alphabetArray.push(String.fromCharCode(ASCIIposition + i));
    }
}

function displayHiddenWord() {
    for (let i = 0; i < randomWordOptions.length; ++i) {
        wordHidden[i] = "_";
    }
    guessWordOptions.innerHTML = `Guess the word: ${wordHidden.join("")}`;
    numberOfLives.innerHTML = `Your lives: ${lives} ♥`;
}

function createAlphabetButtons() {
    for (let i = 0; i < alphabetArray.length; ++i) {
        const buttons = document.createElement("button");
        document.getElementById("firstContainer").appendChild(buttons);
        buttons.className = "btn btn-info btn-outline-dark";
        buttons.innerHTML = `${alphabetArray[i]}`;
        buttons.addEventListener("click", findTheHiddenWord);
    }
}

function findTheHiddenWord(event) {
    let characters = randomWordOptions.length;
    let letter = event.target.innerHTML;
    event.target.setAttribute("disabled", "");
    if(randomWordOptions.includes(letter)) {
        for (let j = 0; j < randomWordOptions.length; ++j) {
            if (randomWordOptions[j] === letter) {
                wordHidden[j] = letter;
                guessWordOptions.innerHTML = `Guess the word: ${wordHidden.join("")}`;
                --characters;
                if (characters === 0) {
                    message.innerHTML = "YOU WIN !";
                    disabledAlphabet();
                }
            }
        }
    } else {
        --lives;
        numberOfLives.innerHTML = `Your lives: ${lives} ♥`;
        if (lives < 1) {
            message.innerHTML = "YOU LOSE !";
            disabledAlphabet();
        }
    }
}

function disabledAlphabet() {
    document.querySelectorAll(".btn").forEach(elem => {
        elem.disabled = true;
    });
}

setupGame();
