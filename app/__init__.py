from flask import Flask
import logging
from flask_cors import CORS


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('SIDDBETTER - app')

app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "*"}})


from app import views
