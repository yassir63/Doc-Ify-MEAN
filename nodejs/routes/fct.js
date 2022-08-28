const express = require('express')
const router = express.Router();
const  connectDB  = require('../services/db2.js');
const mongoose = require('mongoose')

const docSchema = require('../models/docSchema.js');
const DocumentSchemas = new Map([['documents', docSchema]]);
var { Template } = require('../models/template.js');


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
    

  
  // this gets the different templates registered in the app 


router.get('/templates', async (req,res) => {

  const temps = await Template.find({})
  res.send(temps)


});


// this gets a certain instanced document

router.get('/docs/:id', async (req,res) => {

    const tenantDB = await switchDB(`${req.params.id}`,DocumentSchemas) 
    const tenantModel = await getDBModel(tenantDB, 'documents')
    const tenants = await tenantModel.find({})
    res.send(tenants)


});



// this gets a certain instanced template

router.get('/template/:id/:docname', async (req,res) => {

  const temp = await Template.findOne({id: `${req.params.id}`, name : `${req.params.docname}`})
  res.send(temp);

});





module.exports = router;