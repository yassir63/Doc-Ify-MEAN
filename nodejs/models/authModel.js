const mongoose = require('mongoose')
const authModelSchema = new mongoose.Schema({

    username : {
        type: String,
        required : true,
        unique: true
    },
    email : {
        type: String,
        required : true
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
    },
    documents: [{type: mongoose.Schema.Types.ObjectId, ref: "Document"}]

})

module.exports = authModelSchema