from flask import Flask
import logging
from flask_cors import CORS
from app.SpeechModel import SpeechModel

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('SIDDBETTER - app')

app = Flask(__name__)
model = SpeechModel()

cors = CORS(app, resources={r"/*": {"origins": "*"}})


from app import views
