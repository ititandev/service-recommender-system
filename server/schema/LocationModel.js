const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const LocationSchema=new Schema({
    name: String
});
const LocationModel = mongoose.model('locations',LocationSchema);

module.exports=LocationModel