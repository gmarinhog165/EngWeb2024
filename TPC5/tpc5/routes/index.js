var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  res.render('index', { titulo: 'Gestão de Compositores', data: d });
});

router.get('/compositores', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.get('http://localhost:3000/compositores')
                    .then(resposta => {
                      res.render('listaCompositores', { titulo: 'Lista de Compositores', lista: resposta.data, data: d});
                    })
                    .catch( erro => {
                      res.render('error', {error: erro, message: 'Erro ao recuperar os compositores'})
                    })
});

router.get('/compositores/registo', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.get('http://localhost:3000/periodos')
    .then(resp2 => {
      console.log(resp2.data)
      res.render('registoCompositor', { titulo: 'Registo de Compositor', data: d, periodos: resp2.data});
    })
    .catch( erro => {
      res.render('error', {error: erro, message: 'Erro ao recuperar os compositores'})
    })
});

router.get('/compositores/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.get('http://localhost:3000/periodos')
    .then(resp2 => {
      axios.get('http://localhost:3000/compositores/' + req.params.id)
      .then(resposta => {
        res.render('editarCompositor', { titulo: 'Edição de Compositor', data: d, periodos: resp2.data, data2: resposta.data});
      })
      
    })
    .catch( erro => {
      res.render('error', {error: erro, message: 'Erro ao recuperar os compositores'})
    })
});

router.get('/compositores/:id', function(req, res){
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/compositores/' + req.params.id)
                    .then(resposta => {
                      res.render('compositor', {titulo: 'Consulta de compositor', comp: resposta.data,data: d});
                    })
                    .catch( erro => {
                      res.render('error',{erro,message:'Erro ao recuperar o compositor.'})
                    })
});

router.get('/periodos', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.get('http://localhost:3000/periodos')
                    .then(resposta => {
                      res.render('listaPeriodos', { titulo: 'Lista de Periodos', lista: resposta.data, data: d});
                    })
                    .catch( erro => {
                      res.render('error', {error: erro, message: 'Erro ao recuperar os periodos'})
                    })
});

router.get('/periodos/registo', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  res.render('registoPeriodo', {data: d, titulo: 'Registo de Periodo'})
});




router.post('/compositores/registo', function(req,res) {
  var d = new Date().toISOString().substring(0,16)
  console.log(JSON.stringify(req.body))
  axios.post('http://localhost:3000/compositores', req.body)
  .then( resposta => {
    res.render('confirmRegisto', {info: req.body, data:d , titulo: "Registo de compositor com sucesso"})
  })
  .catch( erro => {
    res.render('erro', {error: erro, message: 'Erro ao recuperar os alunos'})
  })
});

router.post('/compositores/delete/:id', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.delete('http://localhost:3000/compositores/' + req.params.id)
  .then( resposta => {
    res.render('confirmDelete', {info: req.body, data:d , titulo: "Compositor Eliminado com Sucesso"});
  })
  .catch( erro => {
    res.render('erro', {error: erro, message: 'Erro ao eliminar compositor'})
  })
})


router.post('/compositores/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.put('http://localhost:3000/compositores/' + req.params.id, req.body)
  .then(resposta => {
    res.render('confirmEdit', {info: req.body, data:d , titulo: "Edição de compositor com sucesso"})
  })
  .catch( erro => {
    res.render('erro', {error: erro, message: 'Erro ao recuperar os periodos'})
  })
})


router.post('/periodos/registo', function(req,res) {
  var d = new Date().toISOString().substring(0,16)
  console.log(JSON.stringify(req.body))
  axios.post('http://localhost:3000/periodos', req.body)
  .then( resposta => {
    res.render('confirmRegisto', {info: req.body, data:d , titulo: "Registo de periodo com sucesso"})
  })
  .catch( erro => {
    res.render('erro', {error: erro, message: 'Erro ao recuperar os periodos'})
  })
});






module.exports = router;
