import json
import locale

# Set the locale to the system's default or a specific one that sorts accents correctly
locale.setlocale(locale.LC_ALL, 'pt_PT.UTF-8')


f=open("mapa-virtual.json","r").read()
dados =json.loads(f)

#print(dados['cidades'][0])
#print(dados['ligacoes'][0])

def json_to_html_pages():
    html = """<!DOCTYPE html>
    <html lang="pt-PT">
    <head>
        <title>Mapa</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
    """

    template = """<!DOCTYPE html>
    <html lang="pt-PT">
    <head>
        <title>Cidade</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
    """

    ligacoes_a_cada_cidade = {}
    for ligs in dados['ligacoes']:
        if ligs['origem'] not in ligacoes_a_cada_cidade:
            ligacoes_a_cada_cidade[ligs['origem']] = []
        ligacoes_a_cada_cidade[ligs['origem']].append((ligs['destino']))

    nomes_ids_cidades = {}
    for elem in dados['cidades']:
        nomes_ids_cidades[elem['id']] = elem['nome']

    pagina_cada_cidade = {}
    for info in dados['cidades']:
        nome = info['nome']
        idCidade = info['id']

        ficheiroCidade = open(f"html/{idCidade}.html", "w")

        templateCidade = template
        templateCidade += f"""<div class="w3-container w3-teal">
            <h1>{nome}</h1>
            </div>"""
        templateCidade += f"<h2>Distrito: {info['distrito']}</h2>"
        templateCidade += f"<b>População: </b>{info['população']}"
        templateCidade += "<br>"
        templateCidade += f"<b>Descrição: </b>{elem['descrição']}"
        templateCidade += f"<h3> Ligações: </h3>"

        if idCidade in ligacoes_a_cada_cidade:
            for ligacoes in ligacoes_a_cada_cidade[idCidade]:
                templateCidade += f'<a href="http://localhost:3000/{ligacoes}">{nomes_ids_cidades[ligacoes]}</a>'
                templateCidade += "<br>"

        templateCidade += "</body>"
        ficheiroCidade.write(templateCidade)
        ficheiroCidade.close()

    html += """<div class="w3-container w3-teal">
    <h1> Cidades </h1>
    </div>"""
    html += """<div class="w3-container">
    <ul class="w3-ul">"""
    tuples_list = list(nomes_ids_cidades.items())
    sorted_tuples = sorted(tuples_list, key=lambda x: locale.strxfrm(x[1]))
    for id, nome in sorted_tuples:
        html += f'<li><a href="http://localhost:3000/{id}">{nome} </a></li>'

    html += "</ul></div>"
    html += "</body>"

    ficheiroHtml = open("html/mapa.html", "w", encoding="utf-8")
    ficheiroHtml.write(html)
    ficheiroHtml.close()

json_to_html_pages()



