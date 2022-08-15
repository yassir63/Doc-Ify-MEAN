 const mongoose = require('mongoose');

 // mongo will automatically create a model that has the plural noun of our model !

 var Field = mongoose.model('Field',{

   
    _id:{type: String},
//     company_name: {type: String},
//     company_owner: {type: String},
//     institut: {type: String},
//     directeur: {type: String},
//     niveau_stagiaire:{type: String},
//     nom_stagiaire:{type: String},
//     specialite_stagiaire:{type: String},
//     date_debut:{type: String},
//     date_fin:{type: String},
//     date_ecriture:{type: String},

//     salarie :{type:String},
//   employeur:{type:String},
//   societe:{type:String},
//   renumeration:{type:Number},
//   date_debut_contrat:{type:String},
//   type_contrat:{type:String},
//   ville_ecriture:{type:String},
//   adresse_societe:{type:String},
label : {type: String},
value : {type : String},
type : {type : String},
nature:{type: String},

 });


 module.exports = {
    Field
 };
