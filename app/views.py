from flask import request,jsonify
from flask_cors import CORS
from datetime import datetime
from app.SpeechModel import SpeechModel
import logging
from app import app,logger
import numpy as np

from flask import render_template

cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/listen",methods=["POST"])
def listen():
    """Entry point of this service. 
    """
    logger.info("listen --- ")
    content = request.get_json()
    
    print(content)

    data = request.data

    model = SpeechModel()

    data16 = np.frombuffer(data, dtype=np.int16)

    text = model.getText(data16)

    # response = jsonify({"tags": tags,"topic":topic,"lang":mylang})
    return(text)

@app.route("/")
def index():
    return render_template("public/speech2text.htm")