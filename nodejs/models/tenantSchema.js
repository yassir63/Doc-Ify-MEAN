const mongoose = require('mongoose')
const tenantSchema = mongoose.Schema({
  username : {
    type: String,
    required : true
},
email : {
    type: String,
    required : true,
    unique: true,
},
password : {
    type: String,
    required : true
},
gender : {
    type: String,
    required : true
},
dob : {
    type: String,
    required : true
}
})

module.exports = tenantSchema

