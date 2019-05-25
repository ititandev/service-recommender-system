const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const RatingSchema=new Schema({
    service_id: {type:Schema.Types.ObjectId,ref:'services'},
    user_id: {type:Schema.Types.ObjectId,ref:'users'},
    points:Number,
    date_time:Date,
 
});
const RatingModel = mongoose.model('ratings',RatingSchema);

module.exports=RatingModel