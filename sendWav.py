import requests

data = open(r'testwavs/sh_f.wav', 'rb')  
headers = {'content-type': 'audio/wav'}
url = "http://3.218.104.126//listen"

r = requests.post(url, data=data, headers=headers)

print(r)
print(r.text)   


