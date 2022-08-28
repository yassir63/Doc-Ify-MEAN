const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./routes/auth')
const fct = require('./routes/fct')
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const showdown = require('showdown');
const path = require('path');
const multer = require('multer');
const { createWorker } = require('tesseract.js');
converter = new showdown.Converter();
const { Nationality } = require('./models/nationality')
const { Ville } = require('./models/ville')
const { mongoose } = require('./services/db.js');
var app = express();
var texte = ''; 
var fieldsController = require('./routes/fieldsController.js')

require('dotenv').config()



// adminJs Implementation 

const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')
AdminJS.registerAdapter(AdminJSMongoose)
app.use(express.static('public'))

const tesseract = createWorker()

// end






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
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            return ADMIN
        }else{
            return null
        }
    }
});

// end

// middlewares !

app.use(adminJs.options.rootPath, router)
app.use(bodyParser.json());
app.use(express.json())
app.use(cors({origin: 'http://localhost:4200'})); 
app.use(express.urlencoded({extended: true}))
app.use('/formulaire', fieldsController)
app.use('/auth' , auth)
app.use('/dashboard' , fct)

// server port

app.listen(3000, () => console.log('Server Running on port 3000 !'));



// PDF File text Extraction !


app.post("/extract-text", fileUpload(), (req, res) => {
    pdfParse(req.files.file.data).then(result => {
        html = converter.makeHtml(result.text);
        res.send({content: html});
    });
});




// Image text Extraction and Storage !


// File upload settings  
const PATH = './uploads';
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
let upload = multer({
  storage: storage
});


app.post('/api/upload', upload.single('image'), async function (req, res) {
    console.log(req.file.path);
    // const config = {
    //   lang: "eng",
    //   oem: 1,
    //   psm: 3,
    // };


    // tesseract library implementation !

  await tesseract.load()
  await tesseract.loadLanguage('eng')
  await tesseract.initialize('eng')
  
  const { data: { text } }  = await tesseract
      .recognize(req.file.path);

      await tesseract.terminate()

      html = converter.makeHtml(text);
      texte = html;

    if (!req.file) {
      console.log("No file is available!");
      return res.send({
        success: false
      });
    } else {
      console.log('File is available!');
      return res.send({
        success: true
      })
    }

  });


  // get extrcated text !

  app.get('/api/upload/get', (req,res) => {
    res.send({content: texte});
  })

