from flask import Flask, render_template, request, jsonify
from python.make_games import generate_random_game
#from python.play_game import *
from python.get_words import generate_words

app = Flask(__name__, static_url_path='/static')

letters, special_letter = generate_random_game()
words_list = generate_words(letters, special_letter)

@app.route('/')
def index():
    return render_template('index.html', letters=letters, special_letter=special_letter)

@app.route('/check_word', methods=['POST'])
def check_word():
    words_list = generate_words(letters, special_letter)
    data = request.json # gets the json data from the requerst
    input_word = data.get("word", "").lower()
    is_valid = input_word in words_list
    return jsonify({"is_valid": is_valid})


if __name__ == '__main__':
    app.run(debug=True)