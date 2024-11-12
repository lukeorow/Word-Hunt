import json
from itertools import permutations, combinations, product
    
# generates a set of all possible words that use the 7 letters and contain the special letter
# words must also be 4 letters or longer and can use repeat letters
def generate_words(letters, special_letter):
    with open('python/words_dictionary.json') as f:
        data = json.load(f)
        valid_words = set(data.keys())
    
    found_words = set()
    for length in range(4, len(letters) + 1):
        for combo in combinations(letters, length):
            if special_letter in combo:
                for perm in product(combo, repeat=length):
                    word = ''.join(perm)
                    if word in valid_words and special_letter in word:
                        found_words.add(word)
    return found_words # returns a set

