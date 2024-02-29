# TPC3 - Filmes Americanos

## Realização
Para a realização deste TPC foi necessário alterar bastante o ficheiro JSON de forma a poder cumprir os objetivos do enunciado que eram:

1. Dataset de filmes americanos
2. GET /filmes            página com uma listagem dos filmes (links embutidos para os filmes)
3. GET /filmes/<filmeID>  página do filme (apresentar atributos do filme cast*, genre*, ...)
4. GET /atores            página com uma listagem dos atores (links embutidos para os atores)
5. GET /atores/<atorID>   página do ator
6. GET /generos           página com uma listagem dos generos
7. GET /generos/<generoX> página com os filmes do genero X

De seguida foram criadas páginas HTML para as listas de filmes, géneros e atores e também para cada elemento em específico, havendo sempre pedidos ao servidor para aceder às páginas através de operações GET.
Toda a informação é selecionada a partir do JSON-Server para o nosso servidor que apenas a gere.