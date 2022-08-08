const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./routes/auth')
const fct = require('./routes/fct')

const { mongoose } = require('./db.js');
var app = express();
require('dotenv').config()
// adminJs Implementation 
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')
AdminJS.registerAdapter(AdminJSMongoose)
app.use(express.static('public'))


// end


var fieldsController = require('./controllers/fieldsController.js')

// adminJS database connection
const adminJs = new AdminJS({
  databases: [mongoose],
  rootPath: '/admin',
  branding : {companyName: 'Doc-Ify',
    logo : 'http://localhost:3000/favicon2.png',
    favicon : 'http://localhost:3000/favicon2.png',
    
  }
})
// end
// adminJS route

const ADMIN = {
    email : process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
}

const router = AdminJSExpress.buildAuthenticatedRouter(adminJs , {
    cookieName: 'admin-js',
    cookiePassword: 'supersecret-and-long-password-for-a-cookie-in-the-browser',
    authenticate : async(email,password) => {
        // if(email === ADMIN.email && password === ADMIN.password){
        //     return ADMIN
        // }else{
        //     return null
        // }

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            return ADMIN
        }else{
            return null
        }
    }
});

//



app.use(adminJs.options.rootPath, router)
app.use(bodyParser.json());
app.use(express.json())
app.use(cors({origin: 'http://localhost:4200'})); // necessary to allow resource sharing and connect nodejs to angular
app.use(express.urlencoded({extended: true}))
app.use('/formulaire', fieldsController)
app.use('/auth' , auth)
app.use('/dashboard' , fct)
app.listen(3000, () => console.log('Server Running on port 3000 !'));


