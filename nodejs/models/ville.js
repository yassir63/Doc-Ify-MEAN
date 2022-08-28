const mongoose = require('mongoose');
var Ville = mongoose.model('Ville',{
    _id:{type: String},
    value: {type: String}
 });

 module.exports = { Ville };