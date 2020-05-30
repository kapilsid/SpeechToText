from flask import Flask
from flask import request,jsonify
from flask_cors import CORS
from datetime import datetime
from SpeechModel import SpeechModel
import logging

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('SIDDBETTER - app')


app = Flask(__name__)

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


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8090)
