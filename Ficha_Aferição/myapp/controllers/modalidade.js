var Modalidade = require("../models/modalidade")

module.exports.list = () => {
    return Modalidade
        .find()
        .sort({nome : 1})
        .exec()
}

module.exports.findById = function(id){
    return Modalidade.findOne({_id: id})
    .exec()
}

