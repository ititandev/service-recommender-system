const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    role: String,
    avatar: String,
});
const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel