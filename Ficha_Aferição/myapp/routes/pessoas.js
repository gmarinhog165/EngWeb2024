var express = require('express');
var router = express.Router();
var Pessoa = require("../controllers/pessoa")

/* GET home page. */
router.get('/pessoas', function(req, res) {
  Pessoa.list()
  .then(data => res.jsonp(data))
  .catch(erro => res.jsonp(erro))
});

router.get('/pessoas/:id', function(req, res) {
  Pessoa.findById(req.params.id)
  .then(data => res.jsonp(data))
  .catch(erro => res.jsonp(erro))
});

router.post('/pessoas', function (req, res) {
  console.log(req.body)
  Pessoa.insert(req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.status(523).jsonp(erro))
});


router.post('/pessoas/edit/:id', function (req, res) {
  Pessoa.edit(req.params.id, req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.status(523).jsonp(erro))
})


router.post('/pessoas/delete/:id', function(req, res){
  Pessoa.deleteById(req.params.id)
  .then(data => res.jsonp(data))
  .catch(erro => res.status(523).jsonp(erro))
})


module.exports = router;