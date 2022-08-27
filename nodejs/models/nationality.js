const mongoose = require('mongoose');

 // mongo will automatically create a model that has the plural noun of our model !

 var Nationality = mongoose.model('Nationality',{
    _id:{type: String},
    value: {type: String}
 });

 module.exports = {
    Nationality
 };
