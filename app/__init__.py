from flask import Flask
import logging
from flask_cors import CORS
from app.SpeechModel import SpeechModel

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('SIDDBETTER - app')

app = Flask(__name__)
model = SpeechModel()

cors = CORS(app, resources={r"/*": {"origins": "*"}})

gunicorn_error_logger = logging.getLogger('gunicorn.error')
app.logger.handlers.extend(gunicorn_error_logger.handlers)
app.logger.setLevel(logging.INFO)

from app import views
