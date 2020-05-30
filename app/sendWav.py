import requests
import request



#data = open(r'testwavs/sh_f.wav', 'rb')  
#headers = {'content-type': 'audio/wav'}
url = "http://3.218.104.126:8090/listen"

#r = requests.post(url, data=data, headers=headers)


file = request.files['file']
files = {'file': file.read()}
r = requests.post(url, files=files)
print(r.text)   


