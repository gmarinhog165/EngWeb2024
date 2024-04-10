var Pessoa = require("../models/pessoa")

module.exports.list = () => {
    return Pessoa
        .find()
        .sort({nome : 1})
        .exec()
}

module.exports.findById = function(id){
    return Pessoa.findOne({_id: id})
    .exec()
}

module.exports.insert = comp => {
    return Pessoa.create(comp)
}

module.exports.edit = (id, comp) => {
    return Pessoa.updateOne({_id : id}, comp)
}

module.exports.deleteById = id => {
    return Pessoa
            .findByIdAndDelete({_id : id})
            .exec()
}

module.exports.findNamesByIds = function(ids) {
    return Promise.all(ids.map(id => {
        return Pessoa.findById(id)
            .exec()
            .then(data => data.nome) // Extracting the name
            .catch(error => {
                console.error(`Error finding name for ID ${id}: ${error}`);
                return null;
            });
    }))
    .then(names => names.filter(name => name !== null).sort()); // Sort the names alphabetically
}