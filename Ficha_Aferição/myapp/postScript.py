import json
import requests


with open('dataset-extra1.json', 'r') as arquivo_json:
    # Carrega o conteúdo do arquivo JSON em um objeto Python
    dados = json.load(arquivo_json)

with open('dataset-extra2.json', 'r') as arquivo_json:
    # Carrega o conteúdo do arquivo JSON em um objeto Python
    dados2 = json.load(arquivo_json)

with open('dataset-extra3.json', 'r') as arquivo_json:
    # Carrega o conteúdo do arquivo JSON em um objeto Python
    dados3 = json.load(arquivo_json)


for data in dados:
    requests.post('http://localhost:3000/pessoas', json=data)

for data in dados2:
    requests.post('http://localhost:3000/pessoas', json=data)

for data in dados3:
    requests.post('http://localhost:3000/pessoas', json=data)
