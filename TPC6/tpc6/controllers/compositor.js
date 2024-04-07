var Compositor = require("../models/compositor")

module.exports.list = () => {
    return Compositor
        .find()
        .sort({nome : 1})
        .exec()
}

module.exports.findById = id => {
    return Compositor
            .findOne({_id : id})
            .exec()
}

module.exports.insert = comp => {
    return Compositor.create(comp)
}

module.exports.edit = (id, comp) => {
    return Compositor.updateOne({_id : id}, comp)
}

module.exports.deleteById = id => {
    return Compositor
            .findByIdAndDelete({_id : id})
            .exec()
}

