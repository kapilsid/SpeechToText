from flask import Flask
from flask import request,jsonify
from flask_cors import CORS
from datetime import datetime
from SpeechModel import SpeechModel

app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/listen",methods=["POST"])
def tag():
    """Entry point of this service. 
    """
    content = request.get_json()
    data = content['data']
    
    # model = SpeechModel()

    # data16 = np.frombuffer(b, dtype=np.int16)

    # text = model.getText(data16)

    # response = jsonify({"tags": tags,"topic":topic,"lang":mylang})
    # return(response)



if __name__ == '__main__':
    app.run(host='0.0.0.0')
