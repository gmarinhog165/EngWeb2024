// FAZER npm init
// DEPOIS npm i axios --save

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var compositoresServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /compositores --------------------------------------------------------------------
                if(req.url == '/compositores'){
                    axios.get('http://localhost:3000/compositores')
                    .then(resposta => {
                        res.writeHead(200, {'Content-Type': "text/html"})
                        // @TODO mudar o template
                        res.end(templates.compositoresListPage(resposta.data, d))
                    })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type': "text/html"})
                        res.end(templates.errorPage(erro, d))
                    })
                }
                // GET /compositores/:id --------------------------------------------------------------------
                else if (/\/compositores\/C[0-9]{1,3}/.test(req.url)){
                    axios.get('http://localhost:3000' + req.url)
                    .then(resposta => {
                        res.writeHead(200, {'Content-Type': "text/html"})
                        res.end(templates.compositorPage(resposta.data, d))
                    })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type': "text/html"})
                        res.end(templates.errorPage(erro, d))
                    })
                }
                // GET /compositores/registo --------------------------------------------------------------------
                else if (req.url == '/compositores/registo'){
                    res.writeHead(200, {'Content-Type': "text/html"})
                    res.end(templates.compositorFormPage(d))
                }
                // GET /compositores/edit/:id --------------------------------------------------------------------
                else if (/\/compositores\/edit\/C[0-9]{1,3}/.test(req.url)){
                    var partes = req.url.split('/')
                    var idAluno = partes[3] // [partes.length -1]
                    axios.get('http://localhost:3000/compositores/' + idAluno)
                    .then(resposta => {
                        res.writeHead(200, {'Content-Type': "text/html"})
                        res.end(templates.compositorFormEditPage(resposta.data, d))
                    })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type': "text/html"})
                        res.end(templates.errorPage(erro, d))
                    })

                }
                // GET /compositores/delete/:id --------------------------------------------------------------------
                else if (/\/compositores\/delete\/C[0-9]{1,3}/.test(req.url)){
                    var partes = req.url.split('/')
                    var idAluno = partes[3] // [partes.length -1]
                    axios.delete('http://localhost:3000/compositores/' + idAluno)
                    .then(resposta => {
                        res.writeHead(200, {'Content-Type': "text/html"})
                        res.end(templates.compositorPage(resposta.data, d))
                    })
                    .catch( erro => {
                        res.writeHead(521, {'Content-Type': "text/html"})
                        res.end(templates.errorPage(erro, d))
                    })
                }
                else if (req.url == '/periodos') {
                    axios.get('http://localhost:3000/periodos')
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'});
                            res.end(templates.periodosPage(resposta.data, d));
                        })
                        .catch(erro => {
                            res.writeHead(520, {'Content-Type': 'text/html'});
                            res.end(templates.errorPage(erro, d));
                        });
                }
                // GET /compositores/registo --------------------------------------------------------------------
                else if (req.url == '/periodos/registo'){
                    res.writeHead(200, {'Content-Type': "text/html"})
                    res.end(templates.periodoFormPage(d))
                }
                // GET /compositores/edit/:id --------------------------------------------------------------------
                else if (/\/periodos\/edit\/\w+/.test(req.url)){
                    var partes = req.url.split('/')
                    var idAluno = partes[3] // [partes.length -1]
                    axios.get('http://localhost:3000/periodos/' + idAluno)
                    .then(resposta => {
                        res.writeHead(200, {'Content-Type': "text/html"})
                        res.end(templates.periodoFormPage(resposta.data, d))
                    })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type': "text/html"})
                        res.end(templates.errorPage(erro, d))
                    })

                }
                // GET /compositores/delete/:id --------------------------------------------------------------------
                else if (/\/compositores\/delete\/\w+/.test(req.url)){
                    var partes = req.url.split('/')
                    var idAluno = partes[3] // [partes.length -1]
                    axios.delete('http://localhost:3000/periodos/' + idAluno)
                    .then(resposta => {
                        res.writeHead(200, {'Content-Type': "text/html"})
                        res.end(templates.periodoPage(resposta.data, d))
                    })
                    .catch( erro => {
                        res.writeHead(521, {'Content-Type': "text/html"})
                        res.end(templates.errorPage(erro, d))
                    })
                }
                else if (/\/periodos\/\w+/.test(req.url)){
                    axios.get('http://localhost:3000' + req.url)
                    .then(resposta => {
                        res.writeHead(200, {'Content-Type': "text/html"})
                        res.end(templates.periodoPage(resposta.data, d))
                    })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type': "text/html"})
                        res.end(templates.errorPage(erro, d))
                    })
                }
                // GET ? -> Lancar um erro
                else{
                    res.writeHead(404, {'Content-Type': "text/html"})
                    // meter a template mais bonitinha e tal
                    res.end(templates.errorPage(`Pedido Não Suportado: ${req.url}`, d))
                }
                console.log("wtf")
                break
            case "POST":
                // POST /alunos/registo --------------------------------------------------------------------
                if(req.url == '/compositores/registo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/compositores', result)
                            .then(resposta => {
                                res.writeHead(200, {'Content-Type': "text/html"})
                                res.end(templates.compositorPage(resposta.data, d))
                            })
                            .catch( erro => {
                                res.writeHead(520, {'Content-Type': "text/html"})
                                res.end(templates.errorPage(erro, d))
                            })

                        } else {
                            res.writeHead(200, {'Content-Type': "text/html"})
                            res.end("<p>Unable to collect data from body...</p>")
                        }
                    })
                }
                // POST /alunos/edit/:id --------------------------------------------------------------------
                else if(/\/compositores\/edit\/C[0-9]{1,3}/.test(req.url)){
                    var partes = req.url.split('/')
                    var idAluno = partes[3] // [partes.length -1]
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/compositores/' + idAluno, result)
                            .then(resposta => {
                                res.writeHead(200, {'Content-Type': "text/html"})
                                res.end(templates.compositorPage(resposta.data, d))
                            })
                            .catch( erro => {
                                res.writeHead(522, {'Content-Type': "text/html"})
                                res.end(templates.errorPage(erro, d))
                            })

                        } else {
                            res.writeHead(200, {'Content-Type': "text/html"})
                            res.end("<p>Unable to collect data from body...</p>")
                        }
                    })
                }
                // POST ? -> Lancar um erro
                
            default: 
                // Outros metodos nao sao suportados
        }
    }
})

compositoresServer.listen(7777, ()=>{
    console.log("Servidor Ã  escuta na porta 7777...")
})



