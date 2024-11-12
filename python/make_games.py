import random
import string

# randomly generates 7 letters for a "random" game
def generate_random_game():
    letters = []
    vowels = "aeiou"
    consonants = ''.join([c for c in string.ascii_lowercase])
    
    # picks two vowels and adds them to letters
    selected_vowels = random.sample(vowels, k=2)
    letters.extend(selected_vowels)
    
    # picks the remaining letters as consonants
    while len(letters) < 7:
        cons = random.sample(consonants, k=1)[0]
        if cons not in letters: # makes sure that there are no duplicate letters
            letters.extend(cons)
    
    # makes sure that if there is a q, then there is also a u
    if 'q' in letters and 'u' not in letters: # since we need a 'u' if one of our letters is  'q'
        letters.remove(random.choice([c for c in letters if c != 'q'])) # removes a letters that isn't q
        letters.append('u')
    
    random.shuffle(letters)
    special_letter = letters[6]
    
    
    return letters, special_letter
    

letters, special_letter = generate_random_game()

print(letters)
#print(special_letter)
    


    
        