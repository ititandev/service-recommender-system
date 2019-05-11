const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdvertisementSchema = new Schema({
    provider_id: Schema.Types.ObjectId,
    status: String,
    banner: String,
    url: String,
    name: String,
    data_time: Date,
    type: {type: Schema.Types.ObjectId ,ref:'ad_types'},
    views: Number
});
const AdvertisementModel = mongoose.model('ads', AdvertisementSchema);

module.exports = AdvertisementModel