const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const AdvertisementSchema=new Schema({
    provider_id:  Schema.Types.ObjectId,
    status: String,
    banner: String,
    url: String,
    name: String,
    data_time: Date,
    keywords: [String],
    type_id: Schema.Types.ObjectId,
    views: Number
});
const AdvertisementModel = mongoose.model('advertisements',AdvertisementSchema);

module.exports=AdvertisementModel