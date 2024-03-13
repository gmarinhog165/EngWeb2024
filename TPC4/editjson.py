import json

with open('compositores.json', 'r', encoding='utf-8') as file:
    data = json.load(file)


compositores = {}
periodos = {}
periodos_id = 1

for line in data['compositores']:
    if ('id'and 'nome' and 'bio' and 'dataNasc' and 'dataObito' and 'periodo') not in line:
        continue
    c_id = line['id']
    c_nome = line['nome']
    c_bio = line['bio']
    c_dataNasc = line['dataNasc']
    c_dataObito = line['dataObito']
    c_periodo = line['periodo']


    if c_periodo not in periodos:
        periodos[c_periodo] = {"id": c_periodo, "compositor": [(c_id, c_nome)]}
    else:
        if (c_id, c_nome) not in periodos[c_periodo]['compositor']:
            periodos[c_periodo]['compositor'].append((c_id, c_nome))
    
    compositores[c_id] = {'id':c_id,'nome': c_nome, 'bio':c_bio, 'dataNasc':c_dataNasc, 'dataObito':c_dataObito, 'periodo': c_periodo}

result = {}
result["compositores"] = list(compositores.values())
result['periodos'] = list(periodos.values())

with open("compositores2.json", "w+") as f:
    json.dump(result, f, indent=4)
    

