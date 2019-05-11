const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdTypeSchema = new Schema({
    name: String,
    max_views: Number
});
const AdTypeModel = mongoose.model('ad_types', AdTypeSchema);

module.exports = AdTypeModel