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
            user_id: Schema.Types.ObjectId,
            content: String,
            date_time: Date,
            replies:[
                {
                    user_id: Schema.Types.ObjectId,
                    content: String,
                    date_time: Date
                }
            ]
        }
    ],
    info:{
        location_id: Schema.Types.ObjectId
    },
    images:[String],
    provider_id: Schema.Types.ObjectId,
    category_id: Schema.Types.ObjectId
});
const ServiceModel = mongoose.model('services',ServiceSchema);

module.exports=ServiceModel