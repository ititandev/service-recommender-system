var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const UserModel = require('../schema/ServiceModel');
const { createJWToken, verifyJWTToken } = require('../auth.js');

mongoose.connect('mongodb://servicy:servicy123@ds151416.mlab.com:51416/servicy', { useNewUrlParser: true });
router.get('/users', function (req, res, next) {
    UserModel.find((err, data) => {
        if (err) {
            res.json({ error: "error" });
        }
        else
            res.json({ data: data.filter(item => item.name) })
    })

});

router.get('/login', function (req, res, next) {
    res.status(200)
        .json({
            success: true,
            token: createJWToken({
                sessionData: 1,
                maxAge: 3600
            })
        })

})

router.get('/checktoken', function (req, res, next) {
    verifyJWTToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7fSwiaWF0IjoxNTU3NDYzNzY2LCJleHAiOjE1NTc0NjczNjZ9.VljCfr6vWU15zhBSegAJQmibMu53fwmakAAdZh6Kt6s").then(
        (any) => {
            res.send("dung cmnr")
        },
        (err) => {
            res.send("nhu cc")
        })
})
module.exports = router;
