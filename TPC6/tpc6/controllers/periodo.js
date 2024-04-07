var Periodo = require("../models/periodo")

module.exports.list = () => {
    return Periodo
        .find()
        .sort({_id : 1})
        .exec()
}

module.exports.insert = periodo => {
    return Periodo.create(periodo)
}

module.exports.deleteById = id => {
    return Periodo
            .findByIdAndDelete({_id : id})
            .exec()
}