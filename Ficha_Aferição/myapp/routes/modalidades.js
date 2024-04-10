var express = require('express');
var router = express.Router();
var Pessoa = require("../controllers/pessoa")
var Modalidade = require("../controllers/modalidade")

/* GET users listing. */
router.get('/modalidades', function(req, res) {
  Modalidade.list()
  .then(data => res.jsonp(data))
  .catch(erro => res.jsonp(erro))
});

router.get('/modalidade/:id', (req, res) => {
  Modalidade.findById(req.params.id)
    .then(data => {
      return Pessoa.findNamesByIds(data.athletes); // Call findNamesByIds from Pessoa model
    })
    .then(athleteNames => res.json(athleteNames)) // Send the athlete names as response
    .catch(error => res.status(500).json({ message: "Server Error", error: error }));
});


module.exports = router;
