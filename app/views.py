from flask import request,jsonify
from datetime import datetime
from app import app,logger
import numpy as np
import base64
import librosa 
from flask import render_template
import soundfile as sf
import io
from app import model

import audioop



@app.route("/listen",methods=["POST"])
def listen():
    """Entry point of this service. 
    """
    logger.info("listen --- ")
    
    data = request.data
    #wav, sr = sf.read(io.BytesIO(data))
    #wav = wav.T
    
    #wav = librosa.core.resample(wav,sr,16000)
    
    #print(wav)
    #print(sr)
    data16 = np.frombuffer(data, dtype=np.int16)

    text = model.getText(data16)
    logger.info("decipheredtext",text)
    # response = jsonify({"tags": tags,"topic":topic,"lang":mylang})
    return(text)

@app.route("/")
def index():
    return render_template("public/speech2text.htm")