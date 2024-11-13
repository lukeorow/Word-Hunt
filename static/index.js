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
      if (data.is_valid && !correctWords.has(word)) {
        // makes sure the word hasn't been correctly guessed already
        addScore(word);
        addWordToFoundList(word);
        wordInput.value = ""; // empties the input box
      } else {
        // if invalid or if it's already been corrextly guessed and counted
        wordInput.classList.add("shake");
        setTimeout(() => {
          // removes shake animation when it's completed
          wordInput.classList.remove("shake");
          wordInput.value = "";
        }, 650);
      }
    })
    .catch((error) => console.error("Error:", error));
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

  const rect = wordInput.getBoundingClientRect();
  floatScore.style.left = `${rect.left + rect.width / 2}px`;
  floatScore.style.top = `${rect.top - 10}px`; // Position it above the input box

  document.body.appendChild(floatScore);

  setTimeout(() => {
    floatScore.remove();
  }, 1000);
}

// adds the correct words to the list to display on the scoreboard
function addWordToFoundList(word) {
  if (!correctWords.has(word)) {
    // makes sure the word isn't already on the list
    correctWords.add(word);
    const wordDiv = document.createElement("div");
    wordDiv.classList.add("word");
    wordDiv.textContent = word;
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
