const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const ServiceTypeSchema=new Schema({
    name: String,
    status:String
});
const ServiceTypeModel = mongoose.model('service_types',ServiceTypeSchema);

module.exports=ServiceTypeModel