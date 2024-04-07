var express = require('express');
var router = express.Router();
var Periodo = require("../controllers/periodo")

/* GET users listing. */
router.get('/periodos', function(req, res) {
  Periodo.list()
    .then(data => res.render('../views/listaPeriodos.pug', {titulo: "Lista de Periodos", lista: data}))
    .catch(erro => res.jsonp(erro))
});


router.get('/periodos/registo', function(req, res) {
  res.render('../views/registoPeriodo.pug', {titulo: "Registo de Periodo"})
});


router.post('/periodos/delete/:id', function(req, res){
  Periodo.deleteById(req.params.id)
  .then(data => res.render('../views/confirmDelete.pug', {info: req.body, titulo: "Periodo Eliminado com Sucesso"}))
  .catch(erro => res.status(523).jsonp(erro))
})

router.post('/periodos/registo', function (req, res) {
  console.log(req.body)
  Periodo.insert(req.body)
    .then(data => res.render('../views/confirmRegisto.pug', {titulo: "Periodo Registado com Sucesso", info: req.body}))
    .catch(erro => res.status(523).jsonp(erro))
});


module.exports = router;