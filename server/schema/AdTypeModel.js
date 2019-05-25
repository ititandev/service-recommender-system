const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdTypeSchema = new Schema({
    name: String,
    max_views: Number
});
const AdTypeModel = mongoose.model('adtypes', AdTypeSchema);

module.exports = AdTypeModel