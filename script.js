const guessTheWord = document.getElementById("guessTheWord");
const winOrNotMessage = document.getElementById("winOrNotMessage");
const theLives = document.getElementById("theLives");
const theWord = ["programmer", "wellcode", "code"]
let wordHidden = [];
let lives = 7;
const alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const randomWordOfGuess = theWord[Math.floor(Math.random() * theWord.length)];
let characters = randomWordOfGuess.length;

hiddenRandomWord();

function hiddenRandomWord() {
    for (let i = 0; i < randomWordOfGuess.length; ++i) {
        wordHidden[i] = "_";
    }
    guessTheWord.innerHTML = `Guess the word: ${wordHidden.join("")}`;
    theLives.innerHTML = `Your lives: ${lives} ♥`;
}

createAlphabetAndFindTheHiddenWord();

function createAlphabetAndFindTheHiddenWord() {
    for (let i = 0; i < 26; ++i) {
        const buttons = document.createElement("button");
        document.getElementById("firstContainer").appendChild(buttons);
        buttons.className = "btn btn-info btn-outline-dark";
        buttons.innerHTML = `${alphabetArray[i]}`;
        let letter = buttons.innerHTML;
        buttons.addEventListener("click", () => {
            buttons.setAttribute("disabled", "");
            if(randomWordOfGuess.includes(letter)) {
                for (let j = 0; j < randomWordOfGuess.length; ++j) {
                    if (randomWordOfGuess[j] === letter) {
                        wordHidden[j] = letter;
                        guessTheWord.innerHTML = `Guess the word: ${wordHidden.join("")}`;
                        --characters;
                        if (characters === 0) {
                            winOrNotMessage.innerHTML = "YOU WIN !";
                            disabledAlphabet();
                        }
                    }
                }
            } else {
                --lives;
                theLives.innerHTML = `Your lives: ${lives} ♥`;
                if (lives < 1) {
                    winOrNotMessage.innerHTML = "YOU LOSE !";
                    disabledAlphabet();
                }
            }
        });
    }
}

function disabledAlphabet() {
    document.querySelectorAll(".btn").forEach(elem => {
        elem.disabled = true;
    });
}
