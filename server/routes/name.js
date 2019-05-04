var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const UserModel =require('../schema/ServiceModel');

mongoose.connect('mongodb://servicy:servicy123@ds151416.mlab.com:51416/servicy', {useNewUrlParser: true});
router.get('/', function(req, res, next) {
    UserModel.find((err,data)=>{
        if(err){
            res.json({error:"error"});
        }
        else
        res.json({data:data.filter(item=>item.name)})
    })    

});

module.exports = router;
