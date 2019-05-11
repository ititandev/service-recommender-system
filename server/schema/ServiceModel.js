const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const ServiceSchema=new Schema({
    avatar: String,
    name: String,
    description: String,
    rating: {
        total: Number,
        points: Number
    },
    comments:[
        {type:Schema.Types.ObjectId,ref:'comments'}
    ],
    info:{
        location_id: {type: Schema.Types.ObjectId, ref: 'locations'} ,
        address: String,
        price: String,
        website: String,
        content: String
    },
    images:[String],
    provider_id: {type:Schema.Types.ObjectId,ref:'users'}, 
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'service_types'
    },
    status: String,
    ratings: [{type: Schema.Types.ObjectId, ref: 'ratings'}]

});
const ServiceModel = mongoose.model('services',ServiceSchema);

module.exports=ServiceModel