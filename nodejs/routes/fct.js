const express = require('express')
const router = express.Router();
const  connectDB  = require('../db2.js');
const mongoose = require('mongoose')

const docSchema = require('../models/docSchema.js');
const DocumentSchemas = new Map([['documents', docSchema]]);


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
    
        

router.get('/:id', async (req,res) => {

    const tenantDB = await switchDB(`${req.params.id}`,DocumentSchemas) 
    const tenantModel = await getDBModel(tenantDB, 'documents')
    const tenants = await tenantModel.find({})

    // console.log(req.body.user)
    
    // return tenants;
    res.send(tenants)


});





module.exports = router;