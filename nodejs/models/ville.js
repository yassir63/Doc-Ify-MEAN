const mongoose = require('mongoose');

 // mongo will automatically create a model that has the plural noun of our model !

 var Ville = mongoose.model('Ville',{
    _id:{type: String},
    value: {type: String}
 });

 module.exports = {
    Ville
 };