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
  UserModel.find({ "email": req.body.email, "password": req.body.password }, (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: "Some error happen"
      });
    }

    if (data.length != 1) {
      return res.json({
        success: false,
        message: "Email or password is wrong"
      });
    }
    
    token = createJWToken({
      uid: data[0]._id,
      role: data[0].role
    }, 604800)
    res.set("Authorization", token)
    return res.json({
      "success": true,
      "message": "",
      "data": token
    })
  })

})

router.post('/signup', (req, res) => {
  UserModel.find({ "email": req.body.email }, (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: "Some error happen"
      });
    }
    if (data.length > 0)
      return res.json({
        success: false,
        message: "User exists"
      });
    user = new UserModel({
      "email": req.body.email,
      "password": req.body.password,
      "firstname": req.body.firstname,
      "lastname": req.body.lastname,
      "role": "user",
      "avatar": req.body.avatar
    })

    user.save(function (err, doc, numbersAffected) {
      if (err)
        return res.json({
          success: false,
          message: "Some error happen"
        });
      return res.json({
        "success": true,
        "message": "Create new user successfully",
        "data": user
      })
    })
  })
})

router.get('/checktoken/:token', function (req, res, next) {
  verifyJWTToken(req.param("token")).then(
    (any) => {
      res.json(any)
    },
    (err) => {
      res.send("nhu cc")
    })
})

module.exports = router;
