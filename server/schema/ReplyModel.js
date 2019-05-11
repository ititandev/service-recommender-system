const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const ReplySchema=new Schema({
    user_id: {type:Schema.Types.ObjectId,ref:'users'},
    content:String,
    date_time:Date


});
const ReplyModel = mongoose.model('replies',ReplySchema);

module.exports=ReplyModel