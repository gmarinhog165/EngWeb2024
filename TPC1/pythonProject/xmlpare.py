import os
import xml.etree.ElementTree as ET


def is_valid_xml(xml_string):
    try:
        ET.fromstring(xml_string)
        return True
    except ET.ParseError:
        return False


def is_valid_xml_file(file_path):
    try:
        with open(file_path, 'r') as file:
            xml_string = file.read()
            return is_valid_xml(xml_string)
    except FileNotFoundError:
        print(f"File '{file_path}' not found.")
        return False


def extract_text_with_tags(element):
    text = ''.join(element.itertext())
    return text.strip() if text else ''


def parse_xml():
    template = """<!DOCTYPE html>
    <html lang="pt-PT">
    <head>
        <title>Mapa</title>
        <meta charset="utf-8">
    </head>
    <body>
    """

    html = """<!DOCTYPE html>
            <html lang="pt-PT">
            <head>
                <title>Mapa</title>
                <meta charset="utf-8">
            </head>
            <body>
            """
    html += "<ol>"
    # Abrir ficheiro e validar
    folder_path = '/home/goncalo/Desktop/3ano/EW/EngWeb2024/TPC1/pythonProject/texto/'
    xml_files = sorted([f for f in os.listdir(folder_path) if f.endswith('.xml')])
    for filename in xml_files:
            file_path = os.path.join(folder_path, filename)
            if is_valid_xml_file(file_path) is False:
                pass
            tree = ET.parse(file_path)
            root = tree.getroot()

            # Processamento XML -> HTML

            #Processamento do titulo {NÚMERO | NOME}
            rua = root.find(".//meta/nome").text
            numero = root.find(".//meta/número").text
            path = rua.replace(" ", "")
            ficheiroRua = open(f"html/{path}.html", "w")
            templateRua = template
            templateRua += f"<h1>Número: {numero}</h1>"
            templateRua += f"<h2>Nome: {rua}</h2>"

            # Processamento das Imagens
            imagem_path = root.findall(".//figura")
            for elem in imagem_path:
                pth = elem.find('imagem').attrib['path']
                lgd = elem.find('legenda').text

                templateRua += f'''
                    <div class="figure">
                        <img src="{pth}" alt="{lgd}" style="width: {50}%; height: auto;">
                        <figcaption>{lgd}</figcaption>
                    </div>
                '''

            # Processamento dos parágrafos

            all_para_text = []
            for element in root.iter():
                if element.tag == 'lista-casas':
                    break
                if element.tag == 'para':
                    para_text = extract_text_with_tags(element)
                    all_para_text.append(para_text)

            for text in all_para_text:
                templateRua += f'<p>{text}</p>'

            #Processamento lista-casas
            templateRua += "<h3>Lista de Casas</h3><ul>"
            casa_path = root.findall(".//casa")
            for elem in casa_path:
                num = elem.find('número').text if elem.find('número') is not None else ''
                ent = elem.find('enfiteuta').text if elem.find('enfiteuta') is not None else ''
                foro = elem.find('foro').text if elem.find('foro') is not None else ''
                desc = extract_text_with_tags(elem.find('desc')) if elem.find('desc') is not None else ''
                templateRua += f'''
                <li>Casa:
                    <ul>
                        <li>Número: {num}</li>
                        <li>Enfiteuta: {ent}</li>
                        <li>Foro: {foro}</li>
                        <li>Desc: {desc}</li>
                    </ul>
                </li>
                '''
            templateRua += "</ul>"


            #Escrita em ficheiro

            templateRua += "</body>"
            ficheiroRua.write(templateRua)
            ficheiroRua.close()

            html += f'<li><a href="html/{path}.html">{rua} </a></li>'


    #Escrita do Ficheiro
    html += "</ol>"
    html += "</body>"
    ficheiroHtml = open("ruas.html", "w", encoding="utf-8")
    ficheiroHtml.write(html)
    ficheiroHtml.close()

def main():
    parse_xml()

if __name__ == '__main__':
    main()

