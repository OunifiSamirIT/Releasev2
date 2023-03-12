const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReleaseSchema = new Schema({
    Notes: String,
    Testeur: String,
    Version  :  String,
    Date: Date,
    image:  String,
    apkFile: String,
    lien: String
   
}, {timestamps: true})




module.exports = mongoose.model('release', ReleaseSchema)
