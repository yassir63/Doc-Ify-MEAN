const mongoose = require('mongoose')
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
  texte : {
    type :String,
  },
  fields:  [{type: mongoose.Schema.Types.ObjectId, ref: "Field"}]
})

module.exports = docSchema

