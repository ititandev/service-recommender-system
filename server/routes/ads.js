var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const AdModel = require("../schema/AdModel");
const AdTypeModel = require("../schema/AdTypeModel");
const ViewModel = require("../schema/ViewModel");
const ClickModel = require("../schema/ClickModel");
const { verifyJWTToken } = require("../auth.js");
const as = require("async");

mongoose.connect(
  "mongodb://servicy:servicy123@ds151416.mlab.com:51416/servicy",
  { useNewUrlParser: true }
);

function callback(ad_id, uid) {
  view = new ViewModel({
    ad_id: ad_id,
    user_id: uid
  });
  view.save(err => {
    if (err) throw "Some error happen " + err;
  });
}

router.get("/ads", (req, res) => {
  limit = parseInt(req.query.limit);
  if (!limit) limit = 2;
  uid = null;

  verifyJWTToken(req.header("Authorization"))
    .then(payload => {
      uid = payload.uid;
      if (payload.role == "user") throw "user";

      AdModel.find({ status: "running" })
        .limit(limit)
        .populate("adtype")
        .populate("provider", "_id firstname lastname avatar")
        .exec((err, data) => {
          if (err) {
            return res.json({
              success: false,
              message: "Some error happen " + err
            });
          }

          return res.json({
            success: true,
            data: data
          });
        });
    })
    .catch(err => {
      AdModel.find({ status: "running" })
        .limit(limit)
        // .populate("adtype")
        .populate("provider", "_id firstname lastname avatar")
        .exec((err, data) => {
          if (err) {
            return res.json({
              success: false,
              message: "Some error happen " + err
            });
          }

          as.each(
            data,
            (ad, callback) => {
              callback(ad._id, uid);
            },
            err => {
              if (err) {
                return res.json({
                  success: false,
                  message: "Some error happen " + err
                });
              }
              return res.json({
                success: true,
                data: data
              });
            }
          );
          // async.each(
          //   data,
          //   (ad, callback) => {
          //     ad.views += 1;
          //     if (ad.views >= ad.adtype.max_views) ad.status = "done";
          //     ad.save(err => {
          //       url = ad.url;
          //       ad.url =
          //         req.protocol +
          //         "://" +
          //         req.get("host") +
          //         "/api/tracking/" +
          //         ad._id +
          //         "?url=" +
          //         encodeURI(url);
          //     });
          //   },
          //   (err) => {
          //     if (err) {
          //       return res.json({
          //         success: false,
          //         message: "Some error happen " + err
          //       });
          //     } else {
          //       return res.json({
          //         success: true,
          //         data: data
          //       });
          //     }
          //   }
          // );
        });
    });
});

router.get("/tracking/:id", (req, res) => {
  uid = null;
  ad_id = req.params.id;
  verifyJWTToken(req.header("Authorization"))
    .then(payload => {
      uid = payload.uid;
      if (payload.role == "user") throw "user";
    })
    .catch(err => {
      click = ClickModel({
        ad_id: ad_id,
        user_id: uid
      });
      click.save();
    });
  url = decodeURI(req.query.url);
  res.redirect(url);
});

router.get("/adtypes", (req, res) => {
  AdTypeModel.find((err, data) => {
    if (err)
      return res.json({
        success: false,
        message: "Some error happen"
      });
    return res.json({
      success: true,
      data: data
    });
  });
});

router.post("/ads", (req, res) => {
  verifyJWTToken(req.header("Authorization")).then(
    payload => {
      uid = payload.uid;
      role = payload.role;
      if (role != "provider")
        return res.json({
          success: false,
          message: "Only provider can create advertisement"
        });

      ad = new AdModel({
        provider: uid,
        status: "pending",
        banner: req.body.banner,
        url: req.body.url,
        name: req.body.name,
        adtype: req.body.adtype,
        views: 0
      });

      ad.save();
      return res.json({
        success: true,
        data: ad
      });
    },
    err => {
      return res.json({
        success: false,
        message: "Authentication failed"
      });
    }
  );
});

router.delete("/ads/:id", (req, res) => {
  verifyJWTToken(req.header("Authorization"))
    .then(payload => {
      if (payload.role == "user")
        return res.json({
          success: false,
          messsage: "Only Provider or Admin"
        });
      AdModel.findById(req.param("id"), (err, ad) => {
        if (!ad)
          return res.json({
            success: false,
            mesesage: "Advertisement not found"
          });
        console.log(payload.role);
        if (payload.role == "provider")
          if (ad.provider != payload.uid)
            return res.json({
              success: false,
              message: "Only owner of the advertisement"
            });

        ad.remove(err => {
          if (err)
            res.json({
              success: false,
              message: "Some error happen " + err
            });
          return res.json({
            success: true,
            data: ad
          });
        });
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: "Authentication failed"
      });
    });
});
module.exports = router;
