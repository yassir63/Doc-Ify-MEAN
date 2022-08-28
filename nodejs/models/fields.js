 const mongoose = require('mongoose');
 var Field = mongoose.model('Field',{  
      _id:{type: String},
      label : {type: String},
      value : {type : String},
      type : {type : String},
      nature:{type: String},

 });

 module.exports = { Field };
