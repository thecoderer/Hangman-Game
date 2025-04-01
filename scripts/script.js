const letterButtons = document.querySelectorAll("button");
const clickSound = document.getElementById("click-sound");
const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
let currentWord, wrongGuessCount = 0;
const maxGuesses = 6;
const gameModal = document.querySelector('.game-modal');
const playAgain = document.querySelector('.play-again');


// Get the shared audio element
const hoverSound = document.getElementById("ping-sound");

// Attach a mouseenter event handler to each button
letterButtons.forEach(button => {
    button.addEventListener("mouseenter", function () {
        // Play the shared audio when any button is hovered
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
});
letterButtons.forEach(button => {
    button.addEventListener("click", function () {
        // Play the click sound when a button is clicked
        clickSound.currentTime = 0;
        clickSound.play();
    });
});
   // Add more word-hint pairs as needed

   const getRandomWord = () => {
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
};
const initGame = (button, clickedLetter) => {
    //Checking if the clickedLetter exists on the currentWord
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
            }
        })
        console.log(clickedLetter, " exists on the word");
    } else {
        wrongGuessCount++;
    }

    if(wrongGuessCount == 6) {
        gameModal.style.display = 'flex';
        keyboardDiv.style.display = 'none';
        initGame();
    } 
    
}
//Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
};
playAgain.addEventListener("click", e => gameModal.style.display = "none");
playAgain.addEventListener("click", e => keyboardDiv.style.display = "flex");
playAgain.addEventListener("click", getRandomWord);





 
getRandomWord();

