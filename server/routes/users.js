var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const UserModel = require('../schema/UserModel');
const { createJWToken, verifyJWTToken } = require('../auth.js');

mongoose.connect('mongodb://servicy:servicy123@ds151416.mlab.com:51416/servicy', { useNewUrlParser: true });


router.get('/users', function (req, res, next) {
  UserModel.find((err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: "Some error happen"
      });
    }
    else
      res.json({
        success: true,
        data: data
      })
  })
});

router.post('/login', function (req, res, next) {
  console.log({"email": req.body.email, "password": req.body.password})
  UserModel.find({"email": req.body.email, "password": req.body.password},(err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: "Some error happen"
      });
    }
    console.log(data)
    if (data.length != 1) {
      return res.json({
        success: false,
        message: "Email or password is wrong"
      });
    }
    token = createJWToken({
      sessionData: 1,
      maxAge: 604800
    })
    res.set("Authorization", token)
    return res.json({
      "success": true,
      "message": "",
      "data": token
    })
  })



})

router.get('/signup', function (req, res, next) {


})

router.get('/checktoken/:token', function (req, res, next) {
  verifyJWTToken(req.param("token")).then(
    (any) => {
      res.send("dung cmnr")
    },
    (err) => {
      res.send("nhu cc")
    })
})

module.exports = router;
