import SpeechModel 
import librosa

SAMPLE_RATE = 16000
WAVDIR = "testwavs"
model = new SpeechModel()

fname = os.path.join(DIR, "6.wav")
b, sr = librosa.core.load(fname, sr=SAMPLE_RATE,duration=0.12,mono=True)
data16 = np.frombuffer(b, dtype=np.int16)

text = model.stt(data16)

print(text)