var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const modalidadeSchema = new mongoose.Schema({
    _id: String, // Assuming "_id" is a string
    athletes: [String]
});

// Create model for Columbofilia athletes
const modalidade = mongoose.model('Modalidade', modalidadeSchema);

module.exports = modalidade;