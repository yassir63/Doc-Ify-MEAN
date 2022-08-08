const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = "ezgfjkzfozelfzmjfmoze" // you can choose to do npm i dotenv and have an env file and store it there !
const authModelSchema = require('../models/authModel')
const verifyToken = require('../verifyToken')
const  connectDB  = require('../db2.js');
const mongoose = require('mongoose')


// const connectDB = require('../services/mongo.connect.js')
const TenantSchema = require('../models/tenantSchema.js')
const DocSchema = require('../models/docSchema.js')
const { ObjectID } = require('bson')


const AuthSchemas = new Map([['authUsers', authModelSchema]])


const DocumentSchemas = new Map([['documents', DocSchema]])
const TenantSchemas = new Map([['tenant', TenantSchema]])



        /** Switche to db on same connection pool
 * @return new connection
 */
         const switchDB = async (dbName, dbSchema) => {
            const mongo  = await connectDB()
            if (mongo.connection.readyState === 1) {
              const db = mongo.connection.useDb(dbName, { useCache: true })
              // Prevent from schema re-registration
              if (!Object.keys(db.models).length) {
                dbSchema.forEach((schema, modelName) => {
                  db.model(modelName, schema)
                })
              }
              return db
            }
            throw new Error('err')
          }
        
          
          /**
           * @return model from mongo
           */
          const getDBModel = async (db, modelName) => {
            return db.model(modelName)
          }


           // database creation
  const initDocs = async () => {
    const customers = await getAllTenants()
    const createDocuments = customers.map(async (tenant) => {
      const userDB = await switchDB(tenant.username, DocumentSchemas)    // create databse with document collection !
      // const documentModel = await getDBModel(userDB, 'documents')
    //   await documentModel.deleteMany({})
    //   return documentModel.create({
    //     docId: new ObjectID,
    //     name: 'John',
    //     date: '23/6/2019',
    //   })
    // })
    // const results = await Promise.all(createDocuments)
  })
  }
  
  const getAllTenants = async () => {
    const tenantDB = await switchDB('Projectnew', AuthSchemas)  // Project + authUsers
    const tenantModel = await getDBModel(tenantDB, 'authUsers')
    const tenants = await tenantModel.find({}) // return different users in our case !
    return tenants
  }


router.post('/login', async(req,res) => {

    const username = req.body?.email
    const password = req.body?.password
    // console.log('details', username, password);
    const tenantDB = await switchDB('Projectnew', AuthSchemas)   // Project + authUsers
    const tenant = await getDBModel(tenantDB, 'authUsers')
    if(username && password) {
    await tenant.findOne({email: username}).then(existUser => {
        if(existUser && existUser._id) {
            bcrypt.compare(password, existUser?.password, async function(err, response) {
                if(!err && response) {
                //    const auth = jwt.sign(
                //        { user_id: existUser._id, username },
                //        'secretKey'
                //      );

                const authToken = jwt.sign({_id : existUser._id , email : existUser.email} , secretKey , {
                    expiresIn : '1h'
                })
                // const tenantDB = await switchDB(existUser.username, DocumentSchemas) 
                // mongoose.disconnect();
                // mongoose.connection.close();
                
                   res.json({status: 'ok',loginUser : true, data: {existUser , response ,authToken}});
                  //  mongoose.connection.close();
                   return;
                } else {
                   res.json({status: 'warn', loginUser : false, data: 'Please enter valid password'});
                   return;
                }
            })   
        } else {
            res.json({status: 'warn', loginUser : false, data: 'Please enter valid password'});
            return;

        }
        }, (error) => {
            res.json({status: 'error' , data : error})
            return;
        })
    }
});


router.get('/dashboard', verifyToken , async (req,res) => {
    if(req && req.decodedToken){
        res.json({status : 'ok', data : 'ok'})
        return;
    }else{
        res.json({status : 'error', data : 'error'})
        return;
    }
})


router.post('/register', async(req,res) => {
    const registerUserData = {
        username: req.body.username,
        email : req.body.email,
        password : req.body.password | String, // hein ?
        gender : req.body.gender,
        dob : req.body.dob,
        documents : new ObjectID
    }
    
    const salt = await bcrypt.genSalt(10)
    await bcrypt.hash(req.body.password , salt).then(hashedPassword => {
        if(hashedPassword) {
            console.log('hashed password' , hashedPassword)
            registerUserData.password = hashedPassword
        }
    })

  
  const initTennants  = async () => {
    const tenantDB = await switchDB('Projectnew', AuthSchemas)   // Project + authUsers
    const tenant = await getDBModel(tenantDB, 'authUsers')
    // await tenant.deleteMany({})
    await tenant.create(registerUserData).then(userStoredData => {
        if(userStoredData && userStoredData._id) {
            console.log('user stored data' , userStoredData)
            res.json({status:'ok' , data : userStoredData})
            return;
        }
    }).catch(err => {
        if(err) {
            res.json({status:'error' , data : 'error'})
            return;
        }
    })
  }
  

  await initTennants()
  await initDocs()

})


module.exports = router;