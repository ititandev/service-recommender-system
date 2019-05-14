var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const UserModel = require('../schema/UserModel');
const ServiceModel = require('../schema/ServiceModel')
const bcrypt = require('bcrypt');
const { createJWToken, verifyJWTToken } = require('../auth.js');
const saltRounds = 10;

mongoose.connect('mongodb://servicy:servicy123@ds151416.mlab.com:51416/servicy', { useNewUrlParser: true });

router.delete('/users/:id', function (req, res, next) {
  const userId = req.param("id");
  UserModel.find({ _id: userId }, (err, data) => {
    if (data.role == "user" || data.role == "admin") {
      UserModel.remove({
        _id: userId
      }, (err) => console.log(err));

      return res.json({
        success: true,
        message: "Remove success",
        data: userId
      })
    }
    else //provider
    {
      ServiceModel.remove({
        provider_id: userId
      }, (err) => console.log(err));

      UserModel.remove({
        _id: userId
      }, (err) => console.log(err));

      return res.json({
        success: true,
        message: "Remove success",
        data: userId
      })

    }

  })
});

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

router.put('/users', (req, res) => {
  verifyJWTToken(req.header("Authorization")).then(
    (payload) => {
      userId = req.body.userId;
      newRole = req.body.role;
      uid = payload.uid;
      role = payload.role;
      if (role !== "admin") {
        return res.json({
          success: false,
          message: "Only admin is allowed to update user"
        })
      }

      UserModel.update({
        _id: userId
      }, { role: newRole }, (err) => {
        console.log(err);
      });
      return res.json({
        success: true,
        message: "Update success",
        data: userId
      })

    },
    (err) => {
      return res.json({
        success: false,
        message: "Authentication failed"
      });
    })
});

router.post('/login', function (req, res, next) {
  UserModel.findOne({
    "email": req.body.email
  }, (err, user) => {
    if (err) {
      return res.json({
        success: false,
        message: "Some error happen"
      });
    }

    if (!user) {
      return res.json({
        success: false,
        message: "Account does not exist"
      });
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        token = createJWToken({
          uid: user._id,
          role: user.role
        }, 604800)
        res.set("Authorization", token)
        return res.json({
          "success": true,
          "data": { token: token, user: user }
        })
      }
      else
        return res.json({
          success: false,
          message: "Password is wrong"
        });
    })


  })

})

router.post('/signup', (req, res) => {
  UserModel.find({ "email": req.body.email }, (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: "Some error happen" + err
      });
    }
    if (data.length > 0)
      return res.json({
        success: false,
        message: "User exists"
      });

    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (!req.body.avatar)
        req.body.avatar = "https://us.v-cdn.net/6022045/uploads/defaultavatar.png"
      user = new UserModel({
        "email": req.body.email,
        "password": hash,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "role": "user",
        "avatar": req.body.avatar,
        "phone": req.body.phone
      })
      user.save((err) => {
        if (err)
          return res.json({
            success: false,
            message: "Some error happen" + err
          });
        return res.json({
          "success": true,
          "message": "Create new user successfully",
          "data": user
        })
      })
    })

  })
})

router.get('/checktoken/:token', function (req, res, next) {
  verifyJWTToken(req.param("token"))
    .then(
      (any) => {
        res.json(any)
      })
    .catch(
      (err) => {
        res.send("nhu cc")
      })
})

module.exports = router;
