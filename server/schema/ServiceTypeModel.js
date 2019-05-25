const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const ServiceTypeSchema=new Schema({
    name: String,
    status:String
});
const ServiceTypeModel = mongoose.model('servicetypes',ServiceTypeSchema);

module.exports=ServiceTypeModel