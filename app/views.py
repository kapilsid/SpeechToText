from flask import request,jsonify
from datetime import datetime
import logging
from app import app,logger
import numpy as np
import base64
import librosa 
from flask import render_template
import soundfile as sf
import io
from app import model
import audioop
import json

@app.route("/listen",methods=["POST"])
def listen():
    """Entry point of this service. 
    """
    logger.info("listen --- ")
    
    data = request.data
    #wav, sr = sf.read(io.BytesIO(data))
    #wav = wav.T
    #wav = librosa.core.resample(wav,sr,16000)
    # try:
    #     converted = audioop.ratecv(wav, 2, 2, sr, 16000, None)
    #     data = audioop.tomono(converted[0], 2, 1, 0)
    # except:
    #     print('Failed to downsample wav')
    

    #print(wav)
    #print(sr)
    #data16 = np.frombuffer(data, dtype=np.int16)

    text = model.getText(data)
    print("decipheredtext",text)
    # response = jsonify({"tags": tags,"topic":topic,"lang":mylang})
    return(text)

@app.route("/")
def index():
    return render_template("public/speech2text.htm")