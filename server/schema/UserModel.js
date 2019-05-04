const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const UserSchema=new Schema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    role: String,
    avatar: String,
});
const UserModel = mongoose.model('user',UserSchema);

module.exports=UserModel