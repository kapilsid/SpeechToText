from flask import Flask
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('SIDDBETTER - app')

app = Flask(__name__)


from app import views
