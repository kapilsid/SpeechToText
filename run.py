from app import app
from app.SpeechModel import SpeechModel

if __name__ == '__main__':
    model = SpeechModel()
    app.run(ssl_context='adhoc',host='0.0.0.0',port=8090)