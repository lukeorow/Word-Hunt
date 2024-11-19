// gets the special letter
const specialLetter = document
  .querySelector(".special-letter")
  .textContent.trim()
  .toLowerCase();

// handles adding the letter to the input box when the letter circles are clicked
const wordInput = document.getElementById("wordInput");
document.querySelectorAll(".letter").forEach((button) => {
  button.addEventListener("click", () => {
    if (wordInput.value.length < 16) {
      const letter = button.getAttribute("data-letter");
      wordInput.value += letter;
      wordInput.focus();
    }
  });
});
document.querySelectorAll(".special-letter").forEach((button) => {
  button.addEventListener("click", () => {
    if (wordInput.value.length < 16) {
      const letter = button.getAttribute("data-letter");
      wordInput.value += letter;
      wordInput.focus();
    }
  });
});

// handles when the delete button is pressed
document.getElementById("deleteButton").addEventListener("click", () => {
  wordInput.value = wordInput.value.slice(0, -1);
});

// handles when the enter button is pressed
const resultDisplay = document.getElementById("resultDisplay");
const enterButton = document.getElementById("enterButton");
let score = 0;
const scoreElement = document.getElementById("score");
const correctWords = new Set();
const foundWordsList = document.getElementById("foundWordsList"); // stores all of the correctly guessed words
let incorrectMessage = ""; // the message that will be displayed if an entry is invalid

function checkWordValidity(word) {
  // checks if the input is a valid word, handles both scenarios
  fetch("/check_word", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word: word }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Word entered:", word);
      console.log("Word length:", word.length);
      if (data.is_valid && !correctWords.has(word)) {
        // makes sure the word hasn't been correctly guessed already
        addScore(word);
        addWordToFoundList(word);
        wordInput.value = ""; // empties the input box
      } else if (word.length < 4) {
        // words must be at least 4 letters
        incorrectMessage = "Word too short!";
        handleIncorrectGuess(wordInput, incorrectMessage);
        addIncorrectMessage(incorrectMessage);
      } else if (correctWords.has(word)) {
        // word has already been found
        incorrectMessage = "Word already found!";
        handleIncorrectGuess(wordInput, incorrectMessage);
      } else if (!word.includes(specialLetter)) {
        incorrectMessage = "Missing center letter!";
        handleIncorrectGuess(wordInput, incorrectMessage);
      } else if (!data.is_valid) {
        // word not in the list of generated words
        incorrectMessage = "Not in word list";
        handleIncorrectGuess(wordInput, incorrectMessage);
      } else {
        // all others
        handleIncorrectGuess(wordInput, incorrectMessage);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function handleIncorrectGuess(wordInput, incorrectMessage) {
  wordInput.classList.add("shake");
  setTimeout(() => {
    // removes shake animation when it's completed
    wordInput.classList.remove("shake");
    wordInput.value = "";
  }, 650);
  addIncorrectMessage(incorrectMessage);
}

// event listener for the Enter button
enterButton.addEventListener("click", () => {
  const word = wordInput.value.trim();
  if (word) {
    checkWordValidity(word);
  }
});

// even listener for the enter key
wordInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const word = wordInput.value.trim();
    if (word) {
      checkWordValidity(word);
    }
  }
});

// handles adding score when a word is correct
function addScore(word) {
  l = word.length;
  let scoreAdded = 0;
  if (l === 4) {
    scoreAdded = 1;
  } else {
    scoreAdded = l;
  }
  score += scoreAdded;

  scoreElement.textContent = score; // updates the score in html

  addFloatingScore(scoreAdded);

  scoreElement.classList.add("pop-in");
  setTimeout(() => {
    scoreElement.classList.remove("pop-in");
  }, 500);
}

// adds a floating +score to the input box when the input is valid
function addFloatingScore(points) {
  const floatScore = document.createElement("div");
  floatScore.classList.add("float-score");
  floatScore.textContent = `+${points}`;

  // puts the floating score above the input box
  const rect = wordInput.getBoundingClientRect();
  floatScore.style.left = `${rect.left + rect.width / 2}px`;
  floatScore.style.top = `${rect.top - 10}px`; // above the box

  document.body.appendChild(floatScore);

  setTimeout(() => {
    floatScore.remove();
  }, 1000);
}

// adds a message that displays why an invalid input is invalid
function addIncorrectMessage(message) {
  const displayMessage = document.createElement("div");
  displayMessage.classList.add("float-incorrect-message");
  displayMessage.textContent = `${message}`;

  // places the incorrect message above the word input box
  const rect = wordInput.getBoundingClientRect();
  displayMessage.style.left = `${rect.left + rect.width / 3}px`;
  displayMessage.style.top = `${rect.top - 25}px`;

  document.body.appendChild(displayMessage);

  setTimeout(() => {
    displayMessage.remove();
  }, 1000);
}

// adds the correct words to the list to display on the scoreboard
function addWordToFoundList(word) {
  const lowercaseWord = word.toLowerCase(); // makes them all display as lowercase regardless of input
  if (!correctWords.has(lowercaseWord)) {
    // makes sure the word isn't already on the list
    correctWords.add(lowercaseWord);
    const wordDiv = document.createElement("div");
    wordDiv.classList.add("word");
    wordDiv.textContent = lowercaseWord;
    foundWordsList.appendChild(wordDiv);
  }
}

// adds a pop up that gives the instructions when the "how to play" button is clicked
const howToPlayButton = document.getElementById("htpButton");
const popupOverlay = document.getElementById("popupOverlay");
const closePopup = document.getElementById("closePopup");

howToPlayButton.addEventListener("click", () => {
  popupOverlay.style.display = "flex";
});

closePopup.addEventListener("click", () => {
  popupOverlay.style.display = "none";
});

popupOverlay.addEventListener("click", (event) => {
  if (event.target === popupOverlay) {
    popupOverlay.style.display = "none";
  }
});
