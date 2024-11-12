from python.get_words import *
from python.make_games import generate_random_game


# 
def start_game():
    #letters = ['t', 'i', 'n', 'g', 'e', 'l', 'r']
    #special_letter = 'l'
    
    letters, special_letter = generate_random_game()
    game_words = generate_words(letters, special_letter)
    
    points = 0
    words_found = []
    num_words_found = 0
    playing = True
    
    while playing == True:
        guess = str(input("Enter word: "))
        if guess == 'q' or  guess == 'Q':
            playing == False
            break
        elif guess in game_words:
            points += add_points(guess)
            words_found.append(guess)
            num_words_found += 1
            print("Great job!")
            print("Score = " + str(points))
        else:
            print("Word not valid")
    
# this gives 1 point
def add_points(word):
    word_length = len(word)
    if word_length == 4:
        points = 1
    elif word_length > 4:
        points = len(word)
    return points
        
        

        
#start_game()
        
            
            
            
        
    
    
    