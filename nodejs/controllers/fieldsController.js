const express = require('express');
var router = express.Router();
const { ObjectID } = require('bson');
const mongoose = require('../db.js')
const  connectDB  = require('../db2.js');
const { Nationality } = require('../models/nationality.js')
const { Ville } = require('../models/ville.js')

var { Field } = require('../models/fields.js');

var { Template } = require('../models/template.js');

const docSchema = require('../models/docSchema.js');
const Document = mongoose.model('Document', docSchema);
const DocumentSchemas = new Map([['documents', docSchema]]);


const Docs = ["contrat-travail","convention-stage"]

var {MongoClient }= require('mongodb');
var db;


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
    
router.get('/known/:collection', async(req,res) => {

// Initialize connection once
// MongoClient.connect("mongodb://localhost:27017/Projectnew", (err, database) => {
//   // if(err) throw err;

//   db = database;
//   console.log(database)
//   console.log(db)

//   // Start the application after the database connection is ready;
// });

const client = new MongoClient('mongodb://localhost:27017')
await client.connect();
const db = client.db('Projectnew')
  // console.log(req.params.collection);
  // const user = await getDBModel(mongoose,req.params.collection);
  // console.log(mongoose)
  // console.log(user.find())
  // console.log(user)
  // const result = await user.find();
  //     res.send(result);
  const result = await db.collection(req.params.collection).find({}).toArray();  // db.collection('Nationality').find({}, function(err, docs) {
  //   console.log('salam')
  //   console.log(docs)
  //   res.send(docs)
  //   });

  // const result = collection.find();
  // console.log(result)
  res.send(result)
});
              

              

router.get('/', (req,res) => {
    Field.find((err,docs) => {
        if(!err) {res.send(docs);}
        else {console.log('Error in retrieving data from database !' + JSON.stringify(err, undefined,2));
    }
    });
    // mongoose.connection.close();
});


// router.post('/document', (req,res) => {
//     var doc = new Document ({
//         _id: new ObjectID,
//         name: req.body.name,
//         date: req.body.date,
//         fields:null
//     });

//     // console.log(doc)

//     doc.save((data,err) => {
//         if (!err) { res.send(data);}
//         else { console.log('Error in Field Save !' + JSON.stringify(err,undefined,2));
//         }
    
//     });

//     // field.save((err,doc) => {
//     //  console.log(err)
//     // });
// });

router.get('/:id/:user', async (req,res) => {
    // if(!ObjectID.isValid(req.params.id))
    // return res.status(400).send(`No Record found with the given Id :  ${req.params.id}`);
console.log(req.params.id)
console.log(req.params.user)
const tenantDB = await switchDB(req.params.user, DocumentSchemas)  // Project + authUsers
    const tenantModel = await getDBModel(tenantDB, 'documents')

//     tenantModel.findById(req.params.id, (err,doc) =>
//     {

//         // array = [];
//         // var emp = new Field({
//         //     company_name: doc.company_name,
//         //     company_acronym: req.body.company_acronym,

//         // });

//         // console.log(req.params.id);
//         // console.log(doc);
//         if(!err) {
//             console.log(doc)
//             // console.log(doc.fields.length)
//             // console.log(doc.fields[0])
//             for(let i = 0; i< doc.fields.length;i++){
//                 // console.log(doc.fields[i])
//             //     Field.findById(doc.fields[i], (doc,err) =>{
//             //         console.log(doc.fields[i])
//             //         array.push(doc);
//             //     })
//             console.log(doc.fields[i].id)
          

//             }

//             // console.log(array)
//         res.send(doc)
//         // return doc;
//         // console.log(doc)
//         // console.log(emp.company_name);
//         }
//         else {
//             console.log(err)
//             // console.log('Error in retrieving Data !' + JSON.stringify(err,undefined,2));
//     }
// })

const result = await tenantModel.findById(req.params.id).
populate({path: "fields", model:"Field"});
// res.send(result)
// console.log(result)
// res.json(result)
res.send(result)

  // prints "The author is Ian Fleming"

    // console.log("salam");

});

router.post('/', async (req,res) => {
    // await mongoose.disconnect();
    // mongoose.connection.close();


//     mongoose.connect(`mongodb://localhost:27017/${req.body.user}`, (err) => {
//     if(!err)
//     console.log(`Connection to ${req.body.user} Succesful !`);
//     else
//     console.log('Connection Failed !' + JSON.stringify(err, undefined,2));
// })

 const tenantDB = await switchDB(`${req.body.Field[1].value}`, DocumentSchemas)  // Project + authUsers
    const tenantModel = await getDBModel(tenantDB, 'documents')
    
    // var field = new Field ({
    //     _id: req.body.id,
    //     // company_name: req.body.company_name,
    //     // company_owner: req.body.company_owner,
    //     // institut: req.body.institut,
    //     // directeur: req.body.directeur,
    //     // niveau_stagiaire:req.body.niveau_stagiaire,
    //     // nom_stagiaire:req.body.nom_stagiaire,
    //     // specialite_stagiaire:req.body.specialite_stagiaire,
    //     // date_debut:req.body.date_debut,
    //     // date_fin:req.body.date_fin,
    //     // date_ecriture:req.body.date_ecriture,

    //     // salarie :req.body.salarie,
    //     // employeur:req.body.employeur,
    //     // societe:req.body.societe,
    //     // renumeration:req.body.renumeration,
    //     // date_debut_contrat:req.body.date_debut_contrat,
    //     // type_contrat:req.body.type_contrat,
    //     // ville_ecriture:req.body.ville_ecriture,
    //     // adresse_societe:req.body.adresse_societe,
    //     label : req.body.label,
    //     value : req.body.value,
    //     type : req.body.type

    // }) ;
    fieldArray = [];
    fieldLabel = [];
    fieldNature = [];
    fieldType = [];



    for(let i=0; i<req.body.Field.length;i++){
        var field = new Field ({
    _id: new ObjectID,
    label : req.body.Field[i].label,
    value : req.body.Field[i].value,
    type : req.body.Field[i].type,
    nature: req.body.Field[i].nature,
        });

        fieldArray.push(field._id)
        // console.log(fieldArray)
        fieldLabel.push(field.label)
        fieldNature.push(field.nature)
        fieldType.push(field.type)


        field.save(
    //         (err,doc) => {
    //     // if (!err) { res.send(doc);}
    //     // else { console.log(err)
    //     //     // console.log('Error in Field Save !' + JSON.stringify(err,undefined,2));
    // }}
    );
    }
    console.log("hna")

    res.send(field)
    // console.log(req.body.Field.length)
    // console.log(req.body.Field[0])
    // console.log(req.body.Field)


    // field = req.body; !!!!!!!!!!!!!

    //  field.save((err,doc) => {
    //     if (!err) { res.send(doc);}
    //     else { console.log(err)
    //         // console.log('Error in Field Save !' + JSON.stringify(err,undefined,2));
    // }});


    // var template = new Template ({
    //   _id: new ObjectID,
    //   name: req.body.Field[2].value,
    //   date: req.body.Field[3].value,
    //   texte: req.body.Field[4].value,
    //   fields: fieldLabel,
    //   field_nature: fieldNature,
    //   field_types: fieldType

    //       });
    

    //       template.save(
    //         //         (err,doc) => {
    //         //     // if (!err) { res.send(doc);}
    //         //     // else { console.log(err)
    //         //     //     // console.log('Error in Field Save !' + JSON.stringify(err,undefined,2));
    //         // }}
    //         );

    let data = '';
    if(Docs.includes(req.body.Field[2].value)){
      data = null;
    }else{
      data = req.body.Field[4].value;
    }
    
    var doc = new tenantModel ({
        _id: req.body.Field[0].value,
        name: req.body.Field[2].value,
        date: req.body.Field[3].value,
        texte: data,  // this should be known for evry DOC ATTENTION !!!!!!!!!!!!!!!!!!
        fields: fieldArray
    });

    // const userDB = await switchDB(tenant.username, DocumentSchemas)  
    // const documentModel = await getDBModel(userDB, 'documents')

    // console.log(doc)

     doc.save((data,err) => {
        if (!err) { res.send(data);}
        // else { console.log('Error in Document Save !' + JSON.stringify(err,undefined,2));
        // }
    
    });




    console.log("hna2")


    // mongoose.connection.close();
    



});



router.post('/template', async (req,res) => {
  // await mongoose.disconnect();
  // mongoose.connection.close();


//     mongoose.connect(`mongodb://localhost:27017/${req.body.user}`, (err) => {
//     if(!err)
//     console.log(`Connection to ${req.body.user} Succesful !`);
//     else
//     console.log('Connection Failed !' + JSON.stringify(err, undefined,2));
// })

const tenantDB = await switchDB(`${req.body.Field[1].value}`, DocumentSchemas)  // Project + authUsers
  const tenantModel = await getDBModel(tenantDB, 'documents')
  
  // var field = new Field ({
  //     _id: req.body.id,
  //     // company_name: req.body.company_name,
  //     // company_owner: req.body.company_owner,
  //     // institut: req.body.institut,
  //     // directeur: req.body.directeur,
  //     // niveau_stagiaire:req.body.niveau_stagiaire,
  //     // nom_stagiaire:req.body.nom_stagiaire,
  //     // specialite_stagiaire:req.body.specialite_stagiaire,
  //     // date_debut:req.body.date_debut,
  //     // date_fin:req.body.date_fin,
  //     // date_ecriture:req.body.date_ecriture,

  //     // salarie :req.body.salarie,
  //     // employeur:req.body.employeur,
  //     // societe:req.body.societe,
  //     // renumeration:req.body.renumeration,
  //     // date_debut_contrat:req.body.date_debut_contrat,
  //     // type_contrat:req.body.type_contrat,
  //     // ville_ecriture:req.body.ville_ecriture,
  //     // adresse_societe:req.body.adresse_societe,
  //     label : req.body.label,
  //     value : req.body.value,
  //     type : req.body.type

  // }) ;
  fieldArray = [];
  fieldLabel = [];
  fieldNature = [];
  fieldType = [];



  for(let i=0; i<req.body.Field.length;i++){
      var field = new Field ({
  _id: new ObjectID,
  label : req.body.Field[i].label,
  value : req.body.Field[i].value,
  type : req.body.Field[i].type,
  nature: req.body.Field[i].nature,
      });

      fieldArray.push(field._id)
      // console.log(fieldArray)
      fieldLabel.push(field.label)
      fieldNature.push(field.nature)
      fieldType.push(field.type)


      field.save(
  //         (err,doc) => {
  //     // if (!err) { res.send(doc);}
  //     // else { console.log(err)
  //     //     // console.log('Error in Field Save !' + JSON.stringify(err,undefined,2));
  // }}
  );
  }
  console.log("hna4")

  res.send(field)
  // console.log(req.body.Field.length)
  // console.log(req.body.Field[0])
  // console.log(req.body.Field)


  // field = req.body; !!!!!!!!!!!!!

  //  field.save((err,doc) => {
  //     if (!err) { res.send(doc);}
  //     else { console.log(err)
  //         // console.log('Error in Field Save !' + JSON.stringify(err,undefined,2));
  // }});


  var template = new Template ({
    _id: new ObjectID,
    name: req.body.Field[2].value,
    date: req.body.Field[3].value,
    texte: req.body.Field[4].value,
    fields: fieldLabel,
    field_nature: fieldNature,
    field_types: fieldType

        });
  

        template.save(
          //         (err,doc) => {
          //     // if (!err) { res.send(doc);}
          //     // else { console.log(err)
          //     //     // console.log('Error in Field Save !' + JSON.stringify(err,undefined,2));
          // }}
          );

  
  var doc = new tenantModel ({
      _id: req.body.Field[0].value,
      name: req.body.Field[2].value,
      date: req.body.Field[3].value,
      texte: req.body.Field[4].value,  // this should be known for evry DOC ATTENTION !!!!!!!!!!!!!!!!!!
      fields: fieldArray
  });

  // const userDB = await switchDB(tenant.username, DocumentSchemas)  
  // const documentModel = await getDBModel(userDB, 'documents')

  // console.log(doc)

   doc.save((data,err) => {
      if (!err) { res.send(data);}
      // else { console.log('Error in Document Save !' + JSON.stringify(err,undefined,2));
      // }
  
  });




  console.log("hna3")


  // mongoose.connection.close();
  



});




// router.put('/:id', (req,res) => {
//     if(!ObjectId.isValid(req.params.id))
//     return res.status(400).send(`No Record found with the given Id :  ${req.params.id}`);

//     var emp ={
//         name: req.body.name,
//         position: req.body.position,
//         office: req.body.office,
//         salary: req.body.salary,
//     } ;

//     Employee.findByIdAndUpdate(req.params.id, {$set: emp},{new: true}, (err,doc) => {
//         if (!err) { res.send(doc);}
//         else { console.log('Error in updating Employee !' + JSON.stringify(err,undefined,2));
//     }});
// });


// router.delete('/:id', (req,res) => {
//     if(!ObjectId.isValid(req.params.id))
//     return res.status(400).send(`No Record found with the given Id :  ${req.params.id}`);

//     Employee.findByIdAndRemove(req.params.id , (err,doc) => {
//         if (!err) { res.send(doc);}
//         else { console.log('Error in deleting Employee !' + JSON.stringify(err,undefined,2));
//     }});
// });



module.exports = router;