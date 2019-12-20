var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const { createJWToken, verifyJWTToken } = require("../auth.js");

const RequestModel = require("../schema/RequestModel");
mongoose.connect(
  "mongodb://127.0.0.1:27017/servicy",
  { useNewUrlParser: true }
);

router.post("/requests", (req, res) => {
  verifyJWTToken(req.header("Authorization"))
    .then(payload => {
      uid = payload.uid;
      role = payload.role;
      if (role !== "user")
        return res.json({
          success: false,
          message: "Please login as user."
        });

      request = new RequestModel({
        user: uid,
        provider: req.body.provider_id,
        service: req.body.service,
        message: req.body.message,
        status: "new"
      });

      request.save(err => {
        if (err)
          return res.json({
            success: false,
            message: "Some error happen"
          });
        return res.json({
          success: true,
          message: request
        });
      });
    })
    .catch(err => {
      return res.json({
        success: false,
        message: "Some error happen " + err
      });
    });
});

router.get("/requests", (req, res) => {
  verifyJWTToken(req.header("Authorization"))
    .then(
      payload => {
        uid = payload.uid;
        role = payload.role;
        if (role !== "provider")
          return res.json({
            success: false,
            message: "Please login as provider."
          });

        RequestModel.find({ provider: uid })
          .populate("user", "email firstname lastname phone avatar")
          .populate("service", "_id name avatar")
          .exec((err, requests) => {
            if (err) {
              return res.json({
                success: false,
                message: "Some error happen " + err
              });
            }

            return res.json({
              success: true,
              data: requests
            });
          });
      },
      err => {
        return res.json({
          success: false,
          message: "Authentication failed"
        });
      }
    )
    .catch(err => {
      return res.json({
        success: false,
        message: "Some error happen " + err
      });
    });
});

router.put("/requests", (req, res) => {
  verifyJWTToken(req.header("Authorization"))
    .then(
      payload => {
        uid = payload.uid;
        role = payload.role;
        if (role !== "provider")
          return res.json({
            success: false,
            message: "Please login as provider."
          });

        RequestModel.findById(req.body.request_id, (err, request) => {
          if (err)
            return res.json({
              success: false,
              message: "Some error happen " + err
            });
          request.status = "seen";

          request.save(err => {
            return res.json({
              success: true,
              data: request
            });
          });
        });
      },
      err => {
        return res.json({
          success: false,
          message: "Authentication failed"
        });
      }
    )
    .catch(err => {
      return res.json({
        success: false,
        message: "Some error happen " + err
      });
    });
});

module.exports = router;
