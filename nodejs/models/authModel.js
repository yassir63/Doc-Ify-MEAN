const mongoose = require('mongoose')
// const docSchema = require('./docSchema')

// var Doc = mongoose.model('Doc', docSchema);

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
    // document,
    // references: [{ type: Schema.Types.ObjectId, ref: 'Doc' }]
    // documents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Doc'}],
    // eventsAttended: [{ type: Schema.Types.ObjectId, ref: 'Doc' }]

})

module.exports = authModelSchema