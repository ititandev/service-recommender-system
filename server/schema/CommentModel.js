const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const CommentSchema=new Schema({
    user_id: {type:Schema.Types.ObjectId,ref:'users'},
    content:String,
    date_time:Date,
    replies:[
        {type:Schema.Types.ObjectId,ref:'replies'}
    ]

});
const CommentModel = mongoose.model('comments',CommentSchema);

module.exports=CommentModel