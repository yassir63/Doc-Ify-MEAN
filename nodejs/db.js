const mongoose = require('mongoose');

mongoose.createConnection('mongodb://localhost:27017/Projectnew', (err) => {
    if(!err)
    console.log('Connection Succesful !');
    else
    console.log('Connection Failed !' + JSON.stringify(err, undefined,2));
})


  

module.exports = mongoose;