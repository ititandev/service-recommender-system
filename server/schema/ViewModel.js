const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ViewSchema = new Schema({
    ad_id: { type: Schema.Types.ObjectId, ref: 'ads' },
    data_time: { type: Date, default: Date.now },
    user_id: {type: Schema.Types.ObjectId, ref: 'users'}
});
const ViewModel = mongoose.model('views', ViewSchema);

module.exports = ViewModel