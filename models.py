import json
from datetime import date
from sqlalchemy.orm import validates
from sqlalchemy import create_engine, Column, Integer, String, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# declares base of the model
Base = declarative_base()

# table for entering new games


class Game(Base):
    __tablename__ = 'games'

    id = Column(Integer, primary_key=True)
    game_date = Column(Date, unique=True, nullable=False)
    letters = Column(String, nullable=False)
    special_letter = Column(String, nullable=False)

    @validates('letters')
    def convert_letters(self, key, letters):
        return json.dumps(letters)

    def get_letters_list(self):
        return json.loads(self.letters)


engine = create_engine('sqlite:///games.db')
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()
