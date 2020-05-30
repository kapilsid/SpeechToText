from flask import Flask
from flask_cors import CORS
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('SIDDBETTER - app')

app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "*"}})

from app import views
