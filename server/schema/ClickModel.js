const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClickSchema = new Schema({
    ad_id: { type: Schema.Types.ObjectId, ref: 'ads' },
    data_time: { type: Date, default: Date.now },
    user_id: {type: Schema.Types.ObjectId, ref: 'users'}
});
const ClickModel = mongoose.model('clicks', ClickSchema);

module.exports = ClickModel