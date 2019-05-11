var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const UserModel = require('../schema/ServiceModel');
const { createJWToken, verifyJWTToken } = require('../auth.js');

mongoose.connect('mongodb://servicy:servicy123@ds151416.mlab.com:51416/servicy', { useNewUrlParser: true });
router.get('/users', function (req, res, next) {
  UserModel.find((err, data) => {
    if (err) {
      res.json({
        status: "error",
        message: "Some error happen"
      });
    }
    else
      res.json({
        status: "success",
        data: data
      })
  })

});

router.get('/login', function (req, res, next) {
  res.status(200)
      .json({
          success: true,
          token: createJWToken({
              sessionData: 1,
              maxAge: 604800
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
