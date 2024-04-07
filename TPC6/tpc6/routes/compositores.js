var express = require('express');
var router = express.Router();
var Compositor = require("../controllers/compositor")
var Periodo = require("../controllers/periodo")

/* GET home page. */
router.get('/compositores', function(req, res) {
  Compositor.list()
    .then(data => res.render('../views/listaCompositores.pug', {titulo: "Lista de Compositores", lista: data}))
    .catch(erro => res.jsonp(erro))
});


router.get('/compositores/registo', function(req, res) {
  Periodo.list()
  .then(data => res.render('../views/registoCompositor.pug', {
    titulo: 'Registo de compositor',
    periodos: data
}))
  .catch(erro => res.jsonp(erro))
});


router.get('/compositores/edit/:id', function(req, res){
  console.log(req.data)
  Periodo.list()
    .then(periodos => {
      Compositor.findById(req.params.id) // Assuming you pass the id to the edit function
        .then(data => res.render('../views/editarCompositor.pug', {
          titulo: 'Edição de compositor',
          periodos: periodos, // Pass the resolved periodos here
          data2: data
        }))
        .catch(error => {
          // Handle error from Compositor.edit
          console.error(error);
          res.status(500).send("Error occurred while fetching compositor data");
        });
    })
    .catch(error => {
      // Handle error from Periodo.list
      console.error(error);
      res.status(500).send("Error occurred while fetching periodos");
    });
});


router.get('/compositores/:id', function(req, res) {
  Compositor.findById(req.params.id)
  .then(data => res.render('../views/compositor.pug', {titulo: 'Consulta de compositor', comp: data}))
  .catch(erro => res.jsonp(erro))
});


router.post('/compositores', function (req, res) {
  console.log(req.body)
  Compositor.insert(req.body)
    .then(data => res.render('../views/listaCompositores.pug', {titulo: "Lista de Compositores", lista: data}))
    .catch(erro => res.status(523).jsonp(erro))
});


router.post('/compositores/edit/:id', function (req, res) {
  Compositor.edit(req.params.id, req.body)
    .then(data => res.render('../views/confirmEdit.pug', {info: req.body, titulo: "Edição de compositor com sucesso"}))
    .catch(erro => res.status(523).jsonp(erro))
})


router.post('/compositores/delete/:id', function(req, res){
  Compositor.deleteById(req.params.id)
  .then(data => res.render('../views/confirmDelete.pug', {info: req.body, titulo: "Compositor Eliminado com Sucesso"}))
  .catch(erro => res.status(523).jsonp(erro))
})



module.exports = router;
