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

const { mongoose } = require('./db.js');
var app = express();
require('dotenv').config()
// adminJs Implementation 
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')
AdminJS.registerAdapter(AdminJSMongoose)
app.use(express.static('public'))

const tesseract = createWorker()

// end

var texte = ''; 



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


// app.use(fileUpload());





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

// app.use(fileUpload());

app.post("/extract-text", fileUpload(), (req, res) => {
        // res.setHeader("Content-Type", "text/html");
  

    // console.log(req.files.file.data)
    // console.log(req.files.pdfFile)
    pdfParse(req.files.file.data).then(result => {
        html = converter.makeHtml(result.text);

        // console.log(typeof html)
        res.send({content: html});
        
        // console.log(html)
   
    });
// console.log(req.files)
});

// pdfUtil = require('pdf-to-text');

// const storagepdf = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, '_backend/pdfs');
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname
//     // console.log(name)
//     cb(null, name );
//   }
// });

// app.post('/api/pdf', multer({ storage: storagepdf }).single('pdf'),
//   (req, res, next) => {
//     pdfUrl = path.join(__dirname,'_backend')
//     pdfUrl = path.join(pdfUrl,'pdfs')
//     pdfUrl = path.join(pdfUrl,req.file.originalname)
//     // console.log(req.file)
//     // pdfUrl = __dirname + '/pdfs/' + req.file.originalname;
//     // console.log(__dirname)
//     // console.log(pdfUrl)

//     pdfUtil.pdfToText(pdfUrl, function(err, data) {
//       res.send(data)
//   });
//   });
 



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
// Express settings

// app.get('/api', function (req, res) {
//   res.end('File catcher');
// });
// POST File
app.post('/api/upload', upload.single('image'), async function (req, res) {
    console.log(req.file.path);
    // const config = {
    //   lang: "eng",
    //   oem: 1,
    //   psm: 3,
    // };

    await tesseract.load()
  await tesseract.loadLanguage('eng')
  await tesseract.initialize('eng')
  
  const { data: { text } }  = await tesseract
      .recognize(req.file.path);
    //   .then((text) => {
    //     html = converter.makeHtml(text);
    //      console.log("Result:", html);
    //    //   await tesseract.terminate()

    //    //   res.status(400).send(html) ;
    //      //res.send(html);
    //  })
    //  .catch((error) => {
    //    console.log(error.message);
    //  });

      await tesseract.terminate()

      html = converter.makeHtml(text);
         console.log("Result:", html);
         texte = html;
        //  res.send(html);

    //   console.log(text)


     
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



  app.get('/api/upload/get', (req,res) => {
    res.send({content: texte});
  })