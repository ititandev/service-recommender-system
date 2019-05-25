const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RequestSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "users"},
    provider: { type: Schema.Types.ObjectId, ref: 'users' },
    service: {type: Schema.Types.ObjectId, ref: 'services'},
    message: String,
    status: String,
    data_time: { type: Date, default: Date.now },
});
const RequestModel = mongoose.model('requests', RequestSchema);

module.exports = RequestModel