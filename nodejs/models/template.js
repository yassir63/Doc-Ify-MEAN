const mongoose = require('mongoose');

// mongo will automatically create a model that has the plural noun of our model !

var Template = mongoose.model('Template',{ 
    _id:{type: String} ,
   name:{type: String} ,
   texte:{type: String},
   fields: [{type: String}],
   field_nature: [{type: String}],
});


module.exports = {
   Template
};
