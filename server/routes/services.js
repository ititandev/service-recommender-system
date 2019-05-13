var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { matchName } = require('./utils');
const ServiceModel = require('../schema/ServiceModel')
const ServiceTypeModel = require('../schema/ServiceTypeModel');
const LocationModel = require('../schema/LocationModel');
<<<<<<< HEAD
const UserModel = require('../schema/UserModel');
=======
>>>>>>> fefeb3284977f94325c642f13c6fdf5d096582ed
const { createJWToken, verifyJWTToken } = require('../auth.js');
const CommentModel = require('../schema/CommentModel');
const ReplyModel = require('../schema/ReplyModel');
const RatingModel = require('../schema/RatingModel');
mongoose.connect('mongodb://servicy:servicy123@ds151416.mlab.com:51416/servicy', { useNewUrlParser: true });

<<<<<<< HEAD
router.get('/services/best', function (req, res, next) {
    ServiceModel.find({ status: 'active' }, { rating: 1, avatar: 1, description: 1, name: 1 }).then(services => {
        services = services.sort((a, b) => a.rating.points / a.rating.total < b.rating.points / b.rating.total).slice(0, 3);
        res.json({ success: true, message: "Find best services", data: services });
    }).catch(err => {
        res.json({ success: false, message: "error" });
    });
});
router.get('/services', function (req, res, next) {
    const { locationName, serviceType, filterText, status } = req.query;
    ServiceModel.find({})
        .populate('category_id')
        .populate('info.location_id')
        .populate({
            path: 'provider_id',
            select: '_id firstname lastname avatar'
        })
        .populate({
            path: "comments",
            model: "comments",
            populate: {
                path: "replies",
                model: "replies",
                populate: {
                    path: "user_id",
                    model: "users",
                    select: "_id firstname lastname avatar"
                }
            }
        })
        .populate({
            path: "comments",
            model: "comments",
            populate: {
                path: "user_id",
                model: "users",
                select: "_id firstname lastname avatar"
            }
        })
        .exec((err, docs) => {
            if (err) {
                res.status(500).send("Internal server error " + err);
            } else {
                let result = []
                for (let service of docs) {

                    let filterCondition = true;
                    if (filterText !== undefined && filterText !== "") {
                        filterCondition = matchName(service.description, filterText) ||
                            matchName(service.info.address, filterText) ||
                            matchName(service.info.price, filterText) ||
                            matchName(service.info.website, filterText) ||
                            matchName(service.info.content, filterText);
                    }
=======
router.get('/services/best', (req, res) => {
  ServiceModel.find({ status: 'active' }, { rating: 1, avatar: 1, description: 1, name: 1 }).then(services => {
    services = services.sort((a, b) => a.rating.points / a.rating.total < b.rating.points / b.rating.total).slice(0, 3);
    res.json({ success: true, message: "Find best services", data: services });
  }).catch(err => {
    res.json({ success: false, message: "error" });
  });
});
>>>>>>> fefeb3284977f94325c642f13c6fdf5d096582ed

router.get('/services', (req, res) => {
  const { locationName, serviceType, filterText, status } = req.query;
  ServiceModel.find({})
    .populate('category_id')
    .populate('info.location_id')
    .populate({
      path: 'provider_id',
      select: '_id firstname lastname avatar'
    })
    .populate({
      path: "comments",
      model: "comments",
      populate: {
        path: "replies",
        model: "replies",
        populate: {
          path: "user_id",
          model: "users",
          select: "_id firstname lastname avatar"
        }
      }
    })
    .populate({
      path: "comments",
      model: "comments",
      populate: {
        path: "user_id",
        model: "users",
        select: "_id firstname lastname avatar"
      }
    })
    .exec((err, docs) => {
      if (err) {
        res.status(500).send("Internal server error " + err);
      } else {
        let result = []
        for (let service of docs) {

          let filterCondition = true;
          if (filterText !== undefined && filterText !== "") {
            filterCondition = matchName(service.description, filterText) ||
              matchName(service.info.address, filterText) ||
              matchName(service.info.price, filterText) ||
              matchName(service.info.website, filterText) ||
              matchName(service.info.content, filterText);
          }

          if (service.info.location_id !== null && locationName !== undefined) {
            filterCondition = filterCondition && matchName(service.info.location_id.name, locationName)
          }

          if (service.category_id !== null && serviceType !== undefined) {
            filterCondition = filterCondition && matchName(service.category_id.name, serviceType)
          }

          if (status !== undefined) {
            filterCondition = filterCondition && (service.status == status)
          }

          if (filterCondition) {
            result.push(service);
          }
        }
        result = result.sort((a, b) => a.rating.points / a.rating.total < b.rating.points / b.rating.total);

        if (result.length < 1) {
          res.json({ success: false, data: result, message: "Result not found" })
        } else {
          res.json({ success: true, data: result, message: "Found result" });
        }
      }
    });
});

router.get('/services/:id', function (req, res, next) {
    const serviceId = req.param("id");
    console.log(serviceId);
    ServiceModel.find({})
        .populate('category_id')
        .populate('info.location_id')
        .populate({
            path: 'provider_id',
            select: 'firstname lastname avatar'
        })
        .populate({
            path: "comments",
            model: "comments",
            populate: {
                path: "replies",
                model: "replies",
                populate: {
                    path: "user_id",
                    model: "users",
                    select: "firstname lastname avatar"
                }
            }
        })
        .populate({
            path: "comments",
            model: "comments",
            populate: {
                path: "user_id",
                model: "users",
                select: "firstname lastname avatar"
            }
        })
        .exec((err, docs) => {
            if (err) {
                res.status(500).send("Internal server error " + err);
            } else {
                let result = []
                for (let service of docs) {
                    if (service._id == serviceId) {
                        result.push(service);
                    }
                }

                if (result.length < 1) {
                    res.json({ success: false, data: result, message: "Result not found" })
                } else {
                    res.json({ success: true, data: result, message: "Found service" });
                }
            }
        });
});

router.get('/servicetypes', function (req, res, next) {
    var { status } = req.query;
    var query = {}
    if (status) {
        query.status = status
    }
    ServiceTypeModel.find(query, { name: 1 }, (err, data) => {
        if (err) {
            return res.json({
                success: false,
                message: "error"
            });
        }
        if (data.length < 1)
            return res.json({ success: false, data: data, message: "Not have Service Types yet" })
        return res.json({
            success: true,
            message: "Find service Types",
            data: data
        })
    })
  })

});

<<<<<<< HEAD
mongoose.connect('mongodb://servicy:servicy123@ds151416.mlab.com:51416/servicy', { useNewUrlParser: true });
router.get('/locations', function (req, res, next) {
    LocationModel.find((err, data) => {
        if (err) {
            return res.json({
                success: false,
                message: "error"
            });
        }
        if (data.length < 1)
            return res.json({ success: false, data: data, message: "Not have locations yet" })
        return res.json({
            success: true,
            message: "found locations",
            data: data.filter(item => item.name)
        })
=======

router.get('/locations', (req, res) => {
  LocationModel.find((err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: "error"
      });
    }
    if (data.length < 1)
      return res.json({ success: false, data: data, message: "Not have locations yet" })
    return res.json({
      success: true,
      message: "found locations",
      data: data.filter(item => item.name)
>>>>>>> fefeb3284977f94325c642f13c6fdf5d096582ed
    })
  })

});

router.post('/comments', (req, res) => {
<<<<<<< HEAD
    verifyJWTToken(req.header("Authorization")).then(
        (payload) => {
            serviceId = req.body.serviceId;
            content = req.body.content;
            uid = payload.uid;
            role = payload.role;
            var comment = new CommentModel({
                "user_id": uid,
                "content": content,
                "date_time": Date.now(),
                "replies": []
            });
            comment.save();


=======
  verifyJWTToken(req.header("Authorization")).then(
    (payload) => {
      serviceId = req.body.serviceId;
      content = req.body.content;
      uid = payload.uid;
      role = payload.role;
      var comment = new CommentModel({
        "user_id": uid,
        "content": content,
        "date_time": Date.now(),
        "replies": []
      });
      comment.save();


>>>>>>> fefeb3284977f94325c642f13c6fdf5d096582ed

      ServiceModel.update({ _id: serviceId }, { $push: { comments: comment._id } }, (err) => console.log(err));

      return res.json({ success: true, message: "success", data: comment })
    },
    (err) => {
      return res.json({
        success: false,
        message: "Authentication failed"
      });
    })
})

router.post('/replies', (req, res) => {
<<<<<<< HEAD
    verifyJWTToken(req.header("Authorization")).then(
        (payload) => {
            commentId = req.body.commentId;
            content = req.body.content;
            uid = payload.uid;
            role = payload.role;
            var reply = new ReplyModel({
                "user_id": uid,
                "content": content,
                "date_time": Date.now()
            });
            reply.save();
=======
  verifyJWTToken(req.header("Authorization")).then(
    (payload) => {
      commentId = req.body.commentId;
      content = req.body.content;
      uid = payload.uid;
      role = payload.role;
      var reply = new ReplyModel({
        "user_id": uid,
        "content": content,
        "date_time": Date.now()
      });
      reply.save();
>>>>>>> fefeb3284977f94325c642f13c6fdf5d096582ed

      CommentModel.update({ _id: commentId }, { $push: { replies: reply._id } }, (err) => console.log(err));

      return res.json({ success: true, message: "success", data: reply })
      // END YOUR CODE HERE
    },
    (err) => {
      return res.json({
        success: false,
        message: "Authentication failed"
      });
    })
})

router.post('/ratings', (req, res) => {
<<<<<<< HEAD
    verifyJWTToken(req.header("Authorization")).then(
        (payload) => {
            serviceId = req.body.serviceId;
            points = req.body.points;
            uid = payload.uid;
            role = payload.role;
            if (role !== "user")
                return res.json({
                    success: false,
                    message: "Sorry! Provider is not allowed to rate."
                });
            RatingModel.findOne({
                service_id: serviceId,
                user_id: uid
            }, function (err, rating) {
                if (err)
                    return res.send({ success: false, message: err });

                if (!rating)//not yet rated  
                {
                    var rating = new RatingModel({
                        "service_id": serviceId,
                        "user_id": uid,
                        "points": points,
                        "date_time": Date.now()
                    });
                    rating.save();
                    ServiceModel.update({ _id: serviceId }, {
                        $inc:
                        {
                            "rating.points": points,
                            "rating.total": 1
                        },
                        $push:
                        {
                            ratings: rating._id
                        }
                    }, (err) => console.log(err));
                    return res.json({ success: true, message: "success", data: rating });

                }
                else //rated
                {
                    var oldpoints = rating.points;
                    var incrementPoints = points - oldpoints;
                    var date_time = Date.now();
                    var rating = new RatingModel({
                        "service_id": serviceId,
                        "user_id": uid,
                        "points": points,
                        "date_time": date_time
                    });
                    RatingModel.update({
                        service_id: serviceId,
                        user_id: uid
                    }, {
                            points: points,
                            date_time: date_time
                        }, (err) => console.log(err));
                    ServiceModel.update({ _id: serviceId }, { $inc: { "rating.points": incrementPoints } }, (err) => console.log(err));
                    return res.json({
                        success: true,
                        message: "success",
                        data: rating
                    });
                }


            });


            // END YOUR CODE HERE
        },
        (err) => {
            return res.json({
                success: false,
                message: "Authentication failed"
            });
        })
=======
  verifyJWTToken(req.header("Authorization")).then(
    (payload) => {
      serviceId = req.body.serviceId;
      points = req.body.points;
      uid = payload.uid;
      role = payload.role;
      if (role !== "user")
        return res.json({
          success: false,
          message: "Sorry! Provider is not allowed to rate."
        });
      RatingModel.findOne({
        service_id: serviceId,
        user_id: uid
      }, function (err, rating) {
        if (err)
          return res.send({ success: false, message: err });

        if (!rating)//not yet rated  
        {
          var rating = new RatingModel({
            "service_id": serviceId,
            "user_id": uid,
            "points": points,
            "date_time": Date.now()
          });
          rating.save();
          ServiceModel.update({ _id: serviceId }, {
            $inc:
            {
              "rating.points": points,
              "rating.total": 1
            },
            $push:
            {
              ratings: rating._id
            }
          }, (err) => console.log(err));
          return res.json({ success: true, message: "success", data: rating });

        }
        else //rated
        {
          var oldpoints = rating.points;
          var incrementPoints = points - oldpoints;
          var date_time = Date.now();
          var rating = new RatingModel({
            "service_id": serviceId,
            "user_id": uid,
            "points": points,
            "date_time": date_time
          });
          RatingModel.update({
            service_id: serviceId,
            user_id: uid
          }, {
              points: points,
              date_time: date_time
            }, (err) => console.log(err));
          ServiceModel.update({ _id: serviceId }, { $inc: { "rating.points": incrementPoints } }, (err) => console.log(err));
          return res.json({
            success: true,
            message: "success",
            data: rating
          });
        }


      });

    },
    (err) => {
      return res.json({
        success: false,
        message: "Authentication failed"
      });
    })
>>>>>>> fefeb3284977f94325c642f13c6fdf5d096582ed
})


module.exports = router;
