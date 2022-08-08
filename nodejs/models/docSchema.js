const mongoose = require('mongoose')
// const { Field } = require('./fields')


const docSchema = mongoose.Schema({
  _id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  date: {
    type: String,
  },
  // fields:  {
  //   $ref: "fields",
    
  // }
  fields:  [{type: mongoose.Schema.Types.ObjectId, ref: "Field"}]
})




module.exports = docSchema



// var Document = mongoose.model('Document',{
//   _id: {
//     type: String,
//     unique: true,
//   },
//   name: {
//     type: String,
//   },
//   date: {
//     type: String,
//   },
//   // fields:  {
//   //   $ref: "fields",
    
//   // }
//   // fields:  [{type: mongoose.Schema.Types.ObjectId, ref: Field}]
// })


// module.exports = {Document};
