import os
import deepspeech
import flask

DEEPSPEECH_MODEL_DIR = flask.url_for('deepspeech-0.6.0-models')
MODEL_FILE_PATH = os.path.join(DEEPSPEECH_MODEL_DIR, 'output_graph.pbmm')
BEAM_WIDTH = 500
LM_FILE_PATH = os.path.join(DEEPSPEECH_MODEL_DIR, 'lm.binary')
TRIE_FILE_PATH = os.path.join(DEEPSPEECH_MODEL_DIR, 'trie')
LM_ALPHA = 0.75
LM_BETA = 1.85

class SpeechModel:
    
    def __init__(self):
        self.model = deepspeech.Model(MODEL_FILE_PATH, BEAM_WIDTH)
        self.model.enableDecoderWithLM(LM_FILE_PATH, TRIE_FILE_PATH, LM_ALPHA, LM_BETA)
    
    def getText(self,data16):
        text = self.model.stt(data16)
        return text

