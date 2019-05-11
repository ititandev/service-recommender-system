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
        {
            user_id: {type:Schema.Types.ObjectId,ref:'users'},
            content: String,
            date_time: Date,
            replies:[
                {
                    user_id: {type:Schema.Types.ObjectId,ref:'users'}, 
                    content: String,
                    date_time: Date
                }
            ]
        }
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
    status: String

});
const ServiceModel = mongoose.model('services',ServiceSchema);

module.exports=ServiceModel