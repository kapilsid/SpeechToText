from flask import request,jsonify
from datetime import datetime
from app.SpeechModel import SpeechModel
import logging
from app import app,logger
import numpy as np
import base64

from flask import render_template
import soundfile as sf
import io


@app.route("/listen",methods=["POST"])
def listen():
    """Entry point of this service. 
    """
    logger.info("listen --- ")
    
    data = request.data
    data = base64.b64decode(data)
    wav, samplerate = sf.read(io.BytesIO(data))
    print(wav)
    print(samplerate)
    model = SpeechModel()
    data16 = np.frombuffer(wav, dtype=np.int16)

    text = model.getText(data16)
    print("decipheredtext",text)
    # response = jsonify({"tags": tags,"topic":topic,"lang":mylang})
    return(text)

@app.route("/")
def index():
    return render_template("public/speech2text.htm")