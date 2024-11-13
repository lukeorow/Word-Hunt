from flask import Flask, render_template, request, jsonify, redirect, url_for
from python.make_games import generate_random_game
# from python.play_game import *
from datetime import date, datetime
from models import Game, session
from python.get_words import generate_words

app = Flask(__name__, static_url_path='/static')


# letters, special_letter = generate_random_game()
# words_list = generate_words(letters, special_letter)

# lets you load a game from a specific date in the db
def load_game(date):
    game = session.query(Game).filter_by(game_date=date.today()).first()
    letters = game.get_letters_list()
    special_letter = game.special_letter
    return letters, special_letter


@app.route('/')
def index():
    game_date = date.today()
    letters, special_letter = load_game(date)  # loads game for today's date
    return render_template('index.html', letters=letters, special_letter=special_letter, game_date=game_date)


@app.route('/check_word', methods=['POST'])
def check_word():
    game = session.query(Game).filter_by(game_date=date.today()).first()
    letters = game.get_letters_list()
    special_letter = game.special_letter

    words_list = generate_words(letters, special_letter)
    data = request.json  # gets the json data from the requerst
    input_word = data.get("word", "").lower()
    is_valid = input_word in words_list
    return jsonify({"is_valid": is_valid})


@app.route('/play_previous_game')
def play_previous_game():
    # Get the date from the query parameter
    date_str = request.args.get('date')
    if not date_str:
        # Redirect to today's game if no date is provided
        return redirect(url_for('index'))

    # Parse the date and query the database for the game
    try:
        game_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        game = session.query(Game).filter_by(game_date=game_date).first()
    except ValueError:
        return redirect(url_for('index'))  # Redirect if date parsing fails

    if not game:
        return render_template('error.html', message="Game not found for this date.")

    # Retrieve letters and special letter for the specified date
    letters = game.get_letters_list()
    special_letter = game.special_letter

    # Render the main game page (`index.html`) with the previous game's letters and special letter
    return render_template(
        'index.html',
        letters=letters,
        special_letter=special_letter,
        game_date=game_date
    )


if __name__ == '__main__':
    app.run(debug=True)
