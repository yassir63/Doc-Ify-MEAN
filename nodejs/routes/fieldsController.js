const express = require('express');
var router = express.Router();
const { ObjectID } = require('bson');
const mongoose = require('../services/db.js')
const connectDB = require('../services/db2.js');
const { Nationality } = require('../models/nationality.js')
const { Ville } = require('../models/ville.js')
var { Field } = require('../models/fields.js');
var { Template } = require('../models/template.js');
const docSchema = require('../models/docSchema.js');
const Document = mongoose.model('Document', docSchema);
const DocumentSchemas = new Map(['documents', docSchema]);
const Docs = ["contrat-travail", "convention-stage"]
var { MongoClient } = require('mongodb');
var db;


/** Switche to db on same connection pool
 * @return new connection
 */
const switchDB = async (dbName, dbSchema) => {
  const mongo = await connectDB()
  if (mongo.connection.readyState === 1) {
    const db = mongo.connection.useDb(dbName, {
      useCache: true
    })
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



// this gets the diffenrent already established fields in the database such as different nationalities ... 


router.get('/known/:collection', async (req, res) => {



  const client = new MongoClient('mongodb://localhost:27017')
  await client.connect();
  const db = client.db('Projectnew')

  const result = await db.collection(req.params.collection).find({}).toArray();
  res.send(result)
});


// this is just used for testing and it gets all fields registered in the app by different users !



router.get('/', (req, res) => {
  Field.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in retrieving data from database !' + JSON.stringify(err, undefined, 2));
    }
  });

});


// gets an instanced document along with its fields

router.get('/:id/:doc', async (req, res) => {


  const tenantDB = await switchDB(req.params.user, DocumentSchemas) // Project + authUsers
  const tenantModel = await getDBModel(tenantDB, 'documents')



  const result = await tenantModel.findById(req.params.id).
  populate({
    path: "fields",
    model: "Field"
  });

  res.send(result)

});


// saves a document along its fields in the database 

router.post('/', async (req, res) => {


  const tenantDB = await switchDB(`${req.body.Field[1].value}`, DocumentSchemas) // Project + authUsers
  const tenantModel = await getDBModel(tenantDB, 'documents')


  fieldArray = [];
  fieldLabel = [];
  fieldNature = [];
  fieldType = [];



  for (let i = 0; i < req.body.Field.length; i++) {
    var field = new Field({
      _id: new ObjectID,
      label: req.body.Field[i].label,
      value: req.body.Field[i].value,
      type: req.body.Field[i].type,
      nature: req.body.Field[i].nature,
    });

    fieldArray.push(field._id)
    fieldLabel.push(field.label)
    fieldNature.push(field.nature)
    fieldType.push(field.type)


    field.save();
  }
 
  res.send(field)

  let data = '';
  if (Docs.includes(req.body.Field[2].value)) {
    data = null;
  } else {
    data = req.body.Field[4].value;
  }

  var doc = new tenantModel({
    _id: req.body.Field[0].value,
    name: req.body.Field[2].value,
    date: req.body.Field[3].value,
    texte: data,
    fields: fieldArray
  });


  doc.save((data, err) => {
    if (!err) {
      res.send(data);
    }

  });


});



// saves a template in the database as well as an instance of it as a document and its fields

router.post('/template', async (req, res) => {


  const tenantDB = await switchDB(`${req.body.Field[1].value}`, DocumentSchemas) // Project + authUsers
  const tenantModel = await getDBModel(tenantDB, 'documents')

  fieldArray = [];
  fieldLabel = [];
  fieldNature = [];
  fieldType = [];



  for (let i = 0; i < req.body.Field.length; i++) {
    var field = new Field({
      _id: new ObjectID,
      label: req.body.Field[i].label,
      value: req.body.Field[i].value,
      type: req.body.Field[i].type,
      nature: req.body.Field[i].nature,
    });

    fieldArray.push(field._id)
    fieldLabel.push(field.label)
    fieldNature.push(field.nature)
    fieldType.push(field.type)


    field.save();
  }

  res.send(field)


  var template = new Template({
    _id: new ObjectID,
    name: req.body.Field[2].value,
    date: req.body.Field[3].value,
    texte: req.body.Field[4].value,
    fields: fieldLabel,
    field_nature: fieldNature,
    field_types: fieldType

  });


  template.save();


  var doc = new tenantModel({
    _id: req.body.Field[0].value,
    name: req.body.Field[2].value,
    date: req.body.Field[3].value,
    texte: req.body.Field[4].value,
    fields: fieldArray
  });



  doc.save((data, err) => {
    if (!err) {
      res.send(data);
    }

  });

});







module.exports = router;