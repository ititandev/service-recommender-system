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
  "mongodb://127.0.0.1:27017/servicy",
  { useNewUrlParser: true }
);

router.get("/ads", (req, res) => {
  limit = parseInt(req.query.limit);
  if (!limit) limit = 3;
  uid = null;

  verifyJWTToken(req.header("Authorization"))
    .then(payload => {
      uid = payload.uid;
      if (payload.role == "user") throw "user";
      query = {};
      if (payload.role == "provider") query = { provider: uid };
      AdModel.find(query)
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
        // .populate("adtype")
        .populate("provider", "_id firstname lastname avatar")
        .exec((err, data) => {
          if (err) {
            return res.json({
              success: false,
              message: "Some error happen " + err
            });
          }
          while (data.length > limit) {
            idx = Math.floor(Math.random() * data.length);
            data.splice(idx, 1);
          }

          as.each(
            data,
            (ad, cb) => {
              view = new ViewModel({
                ad_id: ad._id,
                user_id: uid
              });
              view.save(err => {
                if (err) return cb(err);
                ad.views += 1;
                if (ad.views >= ad.adtype.max_views) ad.status = "done";
                ad.save(err => {
                  if (err) return cb(err);
                  url = ad.url;
                  ad.url =
                    req.protocol +
                    "://" +
                    req.get("host") +
                    "/api/tracking/" +
                    ad._id +
                    "?url=" +
                    encodeURI(url);
                  return cb();
                });
              });
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
      click.save(err => {
        AdModel.findById(ad_id, (err, ad) => {
          ad.clicks += 1;
          ad.save(err => {
            url = decodeURI(req.query.url);
            res.redirect(url);
          });
        });
      });
    });
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
  verifyJWTToken(req.header("Authorization"))
    .then(payload => {
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
        views: 0,
        clicks: 0
      });

      ad.save();
      return res.json({
        success: true,
        data: ad
      });
    })
    .catch(err => {
      return res.json({
        success: false,
        message: "Authentication failed " + err
      });
    });
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
        message: "Authentication failed " + err
      });
    });
});

router.put("/ads/:id", (req, res) => {
  verifyJWTToken(req.header("Authorization"))
    .then(payload => {
      AdModel.findById(req.params.id, (err, ad) => {
        if (err)
          return res.json({
            success: false,
            message: "Some error happen " + err
          });
        if (!ad)
          return res.json({
            success: false,
            message: "Advertisement not found"
          });
        if (payload.uid != ad.provider && payload.role != "admin")
          return res.json({
            success: false,
            message: "Only admin can modify other advertisement"
          });
        if (req.body.status && payload.role != "admin")
          return res.json({
            success: false,
            message: "Only admin can modify status of advertisement"
          });
        delete req.body._id;

        for (var prop in req.body) ad[prop] = req.body[prop];

        ad.save(err => {
          if (err)
            return res.json({
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
      return res.json({
        success: false,
        message: "Authentication failed " + err
      });
    });
});

router.get("/views/:id", (req, res) => {
  verifyJWTToken(req.header("Authorization"))
    .then(payload => {
      if (payload.role == "user")
        return res.json({
          success: false,
          message: "User can not access view data"
        });
      ViewModel.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$data_time" },
              month: { $month: "$data_time" },
              day: { $dayOfMonth: "$data_time" },
              ad_id: "$ad_id"
            },
            count: { $sum: 1 },
            date: { $first: "$data_time" }
          }
        },
        { $sort: { date: 1 } }
      ]).exec((err, views) => {
        if (err)
          return res.json({
            success: false,
            message: "Some error happen " + err
          });
        views = views.filter(v => v._id.ad_id == req.params.id);
        return res.json({
          success: true,
          data: views
        });
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: "Authentication failed " + err
      });
    });
});

router.get("/clicks/:id", (req, res) => {
  verifyJWTToken(req.header("Authorization"))
    .then(payload => {
      if (payload.role == "user")
        return res.json({
          success: false,
          message: "User can not access click data"
        });
      ClickModel.aggregate([
        {
          $group: {
            _id: {
              ad_id: "$ad_id",
              year: { $year: "$data_time" },
              month: { $month: "$data_time" },
              day: { $dayOfMonth: "$data_time" }
            },
            count: { $sum: 1 },
            date: { $first: "$data_time" }
          }
        },
        { $sort: { date: 1 } }
      ]).exec((err, clicks) => {
        if (err)
          return res.json({
            success: false,
            message: "Some error happen " + err
          });
        clicks = clicks.filter(v => v._id.ad_id == req.params.id);
        return res.json({
          success: true,
          data: clicks
        });
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: "Authentication failed " + err
      });
    });
});
module.exports = router;
