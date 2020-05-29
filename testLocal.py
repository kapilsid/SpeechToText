from SpeechModel import SpeechModel
import librosa
import os
import numpy as np

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

SAMPLE_RATE = 16000
WAVDIR = "testwavs"
model = SpeechModel()
print(model)

fname = os.path.join(WAVDIR, "6.wav")
b, sr = librosa.core.load(fname, sr=SAMPLE_RATE,duration=0.12,mono=True)
data16 = np.frombuffer(b, dtype=np.int16)

text = model.getText(data16)

print(text)