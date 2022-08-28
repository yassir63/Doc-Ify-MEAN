const mongoose = require('mongoose');
var Template = mongoose.model('Template',{ 
    _id:{type: String} ,
   name:{type: String} ,
   texte:{type: String},
   fields: [{type: String}],
   field_nature: [{type: String}],
   field_types: [{type: String}]
});


module.exports = { Template };
