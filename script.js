const words = [
    "India",
    "Australia",
    "Italy",
    "France",
    "Germany",
    "Luxembourg",
    "Morocco",
    "Netherlands",
    "Japan",
    "Brazil",
    "Canada",
    "Egypt",
    "Spain",
    "Portugal",
    "Greece",
    "Norway",
    "Sweden",
    "Finland",
    "Denmark",
    "Switzerland",
    "Austria",
    "Belgium",
    "Poland",
    "Turkey",
    "Mexico",
    "Argentina",
    "Chile",
    "Peru",
    "Colombia",
    "Kenya",
    "Nigeria",
    "Ghana",
    "Thailand",
    "Vietnam",
    "Indonesia",
    "Malaysia",
    "Singapore",
    "Philippines",
    "China",
    "Russia",
    "Ukraine",
    "Ireland",
    "Iceland",
    "NewZealand",
    "SouthKorea",
    "SouthAfrica",
    "SaudiArabia",
];

let selectedWord = "";
let guessedList = [];
let attemptsLeft = 6;
let gameOver = false;


function initializeGame() {
let randomIndex =  Math.floor(Math.random() * words.length);
selectedWord =  words[randomIndex].toLowerCase();
console.log("Selected word:", selectedWord);

guessedList = [];
attemptsLeft = 6;
gameOver = false;

let showWord = "";
for (let i = 0; i < selectedWord.length; i++){
    showWord += "_ ";
}

document.getElementById("showWord").textContent = showWord.trim();
document.getElementById("letter-input").value = "";

document.getElementById("attempts").textContent = attemptsLeft;
document.getElementById("guessedLetters").textContent = "None";

document.getElementById("letter-input").disabled = false;
document.getElementById("guess-btn").disabled = false;

document.getElementById("play-again-btn").style.display = "none";
}
 

function guessLetter() {

    if (gameOver) {
        return;
    }

    let inputElement = document.getElementById("letter-input");

    if (!inputElement.value){
        alert("Empty Input Box. Please add input letter");
        return;
    }

    let letter= inputElement.value.toLowerCase().trim();

    if (letter.length !== 1 || !/[a-z]/.test(letter)) {
        alert("Please enter a single alphabet letter.");
        inputElement.value = "";
        return;
    }

    inputElement.value = "";
    
    if(guessedList.includes(letter)){
        alert("You have already guessed that letter!");
        return;
    }

    guessedList.push(letter);

    document.getElementById("guessedLetters").textContent =
        guessedList.join(", ");
        
    // Check if guessed letter exists
    let isCorrect = selectedWord.includes(letter);

    if (!isCorrect) {
        attemptsLeft--;
        document.getElementById("attempts").textContent = attemptsLeft;
    }        


    let updatedDisplay = "";
    let allLettersGuessed = true;
    for (let i= 0; i< selectedWord.length; i++) {
        if (guessedList.includes(selectedWord[i].toLowerCase())){
            updatedDisplay += selectedWord[i] + " ";
        }
        else{
            updatedDisplay += "_ ";
            allLettersGuessed = false;
        }
    }
    document.getElementById("showWord")
    .textContent =  updatedDisplay.trim();


if (allLettersGuessed) {

    gameOver = true;

    // Disable input and submit button
    document.getElementById("letter-input").disabled = true;
    document.getElementById("guess-btn").disabled = true;

    // Show Play Again button
    document.getElementById("play-again-btn").style.display = "inline-block";

    // Popup message
    alert(`Congratulations! You guessed the word: ${selectedWord.toUpperCase()}`);

    return;
}

if (attemptsLeft <= 0) {

    attemptsLeft = 0;
    document.getElementById("attempts").textContent = attemptsLeft;

    gameOver = true;

    // Reveal the word
    document.getElementById("showWord").textContent =
        selectedWord.toUpperCase().split("").join(" ");

    // Disable input and submit button
    document.getElementById("letter-input").disabled = true;
    document.getElementById("guess-btn").disabled = true;

    // Show Play Again button
    document.getElementById("play-again-btn").style.display = "inline-block";

    // Popup message
    alert(`Game Over! The word was: ${selectedWord.toUpperCase()}`);

    return;
}
}


function resetGame(){
    initializeGame();
}

window.onload = initializeGame;

document.getElementById("letter-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        guessLetter();
    }
});