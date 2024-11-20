Word Hunt
-----

Word puzzle game where players try to make as many words as they can out of 7 letters

Live deployed and playable at https://word-hunt-cmjx.onrender.com/

Built With:
- Python
- HTML
- CSS
- JavaScript
- SQLAlchemy
- Jinja
- Flask

Rules:
- Create words out of the 7 letters
- Words must be at least 4 letters long
- Words must include the center letter (highlighted blue)
- Letters can be used multiple times in words
  
Scoring:
- 4 letter words are worth 1 point
- Words longer than 4 letters are worth 1 point per letter (eg, 6 letter word = 6 points)
  
Game Modes:
- There's a new game everyday that resets at midnight EST. I hand pick the letters for daily games.

Roadmap:
- [x] Gives feedback for incorrect inputs displaying why it is invalid
- [ ] Implement the ability to go back and play previous date's games
- [ ] Publish the randomized game button that generates a new game of 7 random letters
- [ ] Change the letter generation of the randomized mode to give letters different likelihoods of being chosen. Letters like 's' and 'e' will have increased chances, as well as groups of letters like 'ing', 'er', and 'ed' to make games more fun
- [ ] Custom game mode where you can create your own game by picking the letters
- [ ] Share game with friends button will let you share your stats for the daily game with friends
