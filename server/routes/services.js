var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const { matchName } = require("./utils");
const ServiceModel = require("../schema/ServiceModel");
const ServiceTypeModel = require("../schema/ServiceTypeModel");
const LocationModel = require("../schema/LocationModel");
const { verifyJWTToken } = require("../auth.js");
const CommentModel = require("../schema/CommentModel");
const ReplyModel = require("../schema/ReplyModel");
const RatingModel = require("../schema/RatingModel");
mongoose.connect(
  "mongodb://servicy:servicy123@ds151416.mlab.com:51416/servicy",
  { useNewUrlParser: true }
);

router.get("/services/best", function(req, res, next) {
  // ServiceModel.find(
  //   { status: "active" },
  //   { rating: 1, avatar: 1, description: 1, name: 1 }
  // )
  //   .then(services => {
  //     services = services
  //       .sort(
  //         (a, b) =>
  //           a.rating.points / a.rating.total < b.rating.points / b.rating.total
  //       )
  //       .slice(0, 3);
  //     res.json({
  //       success: true,
  //       message: "Find best services",
  //       data: services
  //     });
  //   })
  //   .catch(err => {
  //     res.json({ success: false, message: "error" });
  //   });
});

router.get("/services", (req, res) => {
  const { locationName, serviceType, filterText, status } = req.query;
  ServiceModel.find({})
    .populate("servicetype")
    .populate("info.location_id")
    .populate({
      path: "provider_id",
      select: "_id firstname lastname avatar"
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
        let result = [];
        for (let service of docs) {
          let filterCondition = true;
          if (filterText !== undefined && filterText !== "") {
            filterCondition =
              matchName(service.description, filterText) ||
              matchName(service.info.address, filterText) ||
              matchName(service.info.price, filterText) ||
              matchName(service.info.website, filterText) ||
              matchName(service.info.content, filterText);
          }

          if (service.info.location_id !== null && locationName !== undefined) {
            filterCondition =
              filterCondition &&
              matchName(service.info.location_id.name, locationName);
          }

          if (service.servicetype !== null && serviceType !== undefined) {
            filterCondition =
              filterCondition &&
              matchName(service.servicetype.name, serviceType);
          }

          if (status !== undefined) {
            filterCondition = filterCondition && service.status == status;
          }

          if (filterCondition) {
            result.push(service);
          }
        }
        result = result.sort(
          (a, b) =>
            a.rating.points / a.rating.total < b.rating.points / b.rating.total
        );

        if (result.length < 1) {
          res.json({
            success: false,
            data: result,
            message: "Result not found"
          });
        } else {
          res.json({ success: true, data: result, message: "Found result" });
        }
      }
    });
});

router.post("/services", (req, res) => {
  verifyJWTToken(req.header("Authorization"))
    .then(payload => {
      model = req.body;

      if (payload.role == "user") model.user_id = payload.uid;
      else if (payload.role == "provider") model.provider_id = payload.uid;
      model.rating = { total: 1, points: 5 };
      model.status = "pending";

      service = new ServiceModel(model);
      service.save(err => {
        if (err)
          return res.json({
            success: false,
            message: "Some error happen " + err
          });
        return res.json({
          success: true,
          data: service
        });
      });
    })
    .catch(err => {
      return res.json({
        success: false,
        message: "Authentication failed"
      });
    });
});

router.get("/services/:id", function(req, res, next) {
  verifyJWTToken(req.header("Authorization"))
    .then(payload => {
      const serviceId = req.param("id");
      uid = payload.uid;
      ServiceModel.findOne({ _id: serviceId })
        .populate("servicetype")
        .populate("info.location_id")
        //   .populate({
        //     path:'ratings',
        //     select: 'user_id',
        //     match: uid
        // })
        .populate("ratings")
        .populate({
          path: "provider_id",
          select: "firstname lastname avatar"
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
            let result = [];
            let ratingUser = docs.ratings;

            ratingUser = ratingUser.filter(item => item.user_id == uid);
            docs.ratings = ratingUser;
            result.push(docs);

            if (result.length < 1) {
              res.json({
                success: false,
                data: result,
                message: "Result not found"
              });
            } else {
              res.json({
                success: true,
                data: result,
                message: "Found service"
              });
            }
          }
        });
    })
    .catch(err => {
      const serviceId = req.param("id");
      ServiceModel.findOne({ _id: serviceId })
        .populate("servicetype")
        .populate("info.location_id")
        //   .populate({
        //     path:'ratings',
        //     select: 'user_id',
        //     match: uid
        // })
        .populate("ratings")
        .populate({
          path: "provider_id",
          select: "firstname lastname avatar"
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
            let result = [];
            docs.ratings = [];
            result.push(docs);

            if (result.length < 1) {
              res.json({
                success: false,
                data: result,
                message: "Result not found"
              });
            } else {
              res.json({
                success: true,
                data: result,
                message: "Found service"
              });
            }
          }
        });
    });
});

router.delete("/servicetypes/:id", (req, res) => {
  verifyJWTToken(req.header("Authorization"))
    .then(payload => {
      if (payload.role != "admin")
        return res.json({
          success: false,
          message: "Only admin can delete servicetype"
        });
      ServiceTypeModel.findById(req.params.id, (err, servicetype) => {
        if (err)
          return res.json({
            success: false,
            message: "Some error happen " + err
          });
        if (!servicetype)
          return res.json({
            success: false,
            message: "Servicetype not found"
          });
        servicetype.delete(err => {
          if (err)
            return res.json({
              success: false,
              message: "Some error happen " + err
            });
          return res.json({
            success: true,
            data: servicetype
          });
        });
      });
    })
    .catch(err => {
      return res.json({
        success: false,
        message: "Authentication failed"
      });
    });
});


router.delete("/services/:id", function(req, res, next) {
  verifyJWTToken(req.header("Authorization"))
    .then(payload => {
      serviceId = req.param("id");
      uid = payload.uid;
      role = payload.role;
      if (role == "user")
        return res.json({
          success: false,
          message: "Sorry! Only admin/provider is allowed to delete the service"
        });

      ServiceModel.findOne({ _id: serviceId }, (err, data) => {
        if (!data) {
          return res.json({
            success: false,
            message: "the service is not existed",
            data: serviceId
          });
        } else {
          if (role == "provider" && data.provider_id != uid)
            return res.json({
              success: false,
              message: "Only own service is allowed to delete"
            });
          ServiceModel.remove({ _id: serviceId }, err => {
            if (err)
              return res.json({
                success: false,
                message: "Some error happen " + err
              });
            return res.json({
              success: true,
              data: serviceId
            });
          });
        }
      });
    })
    .catch(err => {
      return res.json({
        success: false,
        message: "Authentication failed"
      });
    });
});

router.get("/servicetypes", function(req, res, next) {
  var { status } = req.query;
  var query = {};
  if (status) {
    query.status = status;
  }
  ServiceTypeModel.find(query, { name: 1 }, (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: "error"
      });
    }
    if (data.length < 1)
      return res.json({
        success: false,
        data: data,
        message: "Not have Service Types yet"
      });
    return res.json({
      success: true,
      message: "Find service Types",
      data: data
    });
  });
});

router.post("/servicetypes", (req, res) => {
  verifyJWTToken(req.header("Authorization"))
    .then(payload => {
      serviceTypeName = req.body.name;
      uid = payload.uid;
      role = payload.role;

      ServiceTypeModel.findOne({ name: serviceTypeName }, (err, data) => {
        if (!data) {
          var serviceType = new ServiceTypeModel({
            name: serviceTypeName,
            status: "pending"
          });
          serviceType.save();
          return res.json({
            success: true,
            message:
              "new service type is added, please wait for the admin to accept",
            data: serviceType
          });
        } else if (data.status == "pending") {
          return res.json({
            success: false,
            message:
              "The service type is already added, but is waiting for admin to accept",
            data: []
          });
        } else if (data.status == "active") {
          return res.json({
            success: false,
            message: "The service type is already in our system",
            data: []
          });
        } //inactive
        else {
          return res.json({
            success: false,
            message:
              "The service type is already rejected by the admin. You can't request it",
            data: []
          });
        }
      });
    })
    .catch(err => {
      return res.json({
        success: false,
        message: "Authentication failed"
      });
    });
});

router.put("/servicetypes/:id", (req, res) => {
  verifyJWTToken(req.header("Authorization"))
    .then(payload => {
      serviceTypeId = req.params.id;
      uid = payload.uid;
      role = payload.role;
      if (role !== "admin")
        return res.json({
          success: false,
          message: "Sorry! Only admin is allowed to update the service type"
        });

      ServiceTypeModel.findById(serviceTypeId, (err, servicetype) => {
        if (!servicetype) {
          return res.json({
            success: false,
            message: "Not found the service type to update"
          });
        }
        if (req.body.status) servicetype.status = req.body.status;
        else servicetype.status = "active";

        servicetype.save(err => {
          if (err)
            return res.json({
              success: false,
              message: "Some error happen " + err
            });
          return res.json({
            success: true,
            data: servicetype
          });
        });
      });
    })
    .catch(err => {
      return res.json({
        success: false,
        message: "Authentication failed"
      });
    });
});

router.put("/services/:id", (req, res) => {
  verifyJWTToken(req.header("Authorization"))
    .then(payload => {
      if (payload.role == "user")
        return res.json({
          success: false,
          message: "User cannot modify service"
        });
      ServiceModel.findById(req.params.id, (err, service) => {
        if (err)
          return res.json({
            success: false,
            message: "Some error happen " + err
          });
        if (!service)
          return res.json({
            success: false,
            message: "Sevice not found"
          });
        if (req.body.status && payload.role != "admin")
          return res.json({
            success: false,
            message: "Only admin can modify status of service"
          });
        if (payload.uid != service.provider_id && payload.role != "admin")
          return res.json({
            success: false,
            message: "Only admin can modify other service"
          });
        delete req.body._id;

        for (var prop in req.body) service[prop] = req.body[prop];

        service.save(err => {
          if (err)
            return res.json({
              success: false,
              message: "Some error happen " + err
            });
          return res.json({
            success: true,
            data: service
          });
        });
      });
    })
    .catch(err => {
      return res.json({
        success: false,
        message: "Authentication failed"
      });
    });
});

router.get("/locations", (req, res) => {
  LocationModel.find((err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: "error"
      });
    }
    if (data.length < 1)
      return res.json({
        success: false,
        data: data,
        message: "Not have locations yet"
      });
    return res.json({
      success: true,
      message: "found locations",
      data: data.filter(item => item.name)
    });
  });
});

router.post("/comments", (req, res) => {
  verifyJWTToken(req.header("Authorization"))
    .then(payload => {
      serviceId = req.body.serviceId;
      content = req.body.content;
      uid = payload.uid;
      role = payload.role;
      var comment = new CommentModel({
        user_id: uid,
        content: content,
        date_time: Date.now(),
        replies: []
      });
      comment.save();

      ServiceModel.update(
        { _id: serviceId },
        { $push: { comments: comment._id } },
        err => {
          if (err)
            return res.json({
              success: false,
              message: "Some error happen " + err
            });
        }
      );

      return res.json({ success: true, message: "success", data: comment });
    })
    .catch(err => {
      return res.json({
        success: false,
        message: "Authentication failed"
      });
    });
});

router.post("/replies", (req, res) => {
  verifyJWTToken(req.header("Authorization"))
    .then(payload => {
      commentId = req.body.commentId;
      content = req.body.content;
      uid = payload.uid;
      role = payload.role;
      var reply = new ReplyModel({
        user_id: uid,
        content: content,
        date_time: Date.now()
      });
      reply.save();

      CommentModel.update(
        { _id: commentId },
        { $push: { replies: reply._id } },
        err => {
          if (err)
            return res.json({
              success: false,
              message: "Some error happen " + err
            });
        }
      );

      return res.json({ success: true, message: "success", data: reply });
      // END YOUR CODE HERE
    })
    .catch(err => {
      return res.json({
        success: false,
        message: "Authentication failed"
      });
    });
});

router.post("/ratings", (req, res) => {
  verifyJWTToken(req.header("Authorization"))
    .then(payload => {
      serviceId = req.body.serviceId;
      points = req.body.points;
      uid = payload.uid;
      role = payload.role;
      if (role !== "user")
        return res.json({
          success: false,
          message: "Sorry! Provider is not allowed to rate."
        });
      RatingModel.findOne(
        {
          service_id: serviceId,
          user_id: uid
        },
        function(err, rating) {
          if (err) return res.send({ success: false, message: err });

          if (!rating) {
            //not yet rated
            var rating = new RatingModel({
              service_id: serviceId,
              user_id: uid,
              points: points,
              date_time: Date.now()
            });
            rating.save();
            ServiceModel.update(
              { _id: serviceId },
              {
                $inc: {
                  "rating.points": points,
                  "rating.total": 1
                },
                $push: {
                  ratings: rating._id
                }
              },
              err => {
                if (err)
                  return res.json({
                    success: false,
                    message: "Some error happen " + err
                  });
              }
            );
            return res.json({
              success: true,
              message: "success",
              data: rating
            });
          } //rated
          else {
            var oldpoints = rating.points;
            var incrementPoints = points - oldpoints;
            var date_time = Date.now();
            var rating = new RatingModel({
              service_id: serviceId,
              user_id: uid,
              points: points,
              date_time: date_time
            });
            RatingModel.update(
              {
                service_id: serviceId,
                user_id: uid
              },
              {
                points: points,
                date_time: date_time
              },
              err => {
                if (err)
                  return res.json({
                    success: false,
                    message: "Some error happen " + err
                  });
              }
            );
            ServiceModel.update(
              { _id: serviceId },
              { $inc: { "rating.points": incrementPoints } },
              err => {
                if (err)
                  return res.json({
                    success: false,
                    message: "Some error happen " + err
                  });
              }
            );
            return res.json({
              success: true,
              message: "success",
              data: rating
            });
          }
        }
      );
    })
    .catch(err => {
      return res.json({
        success: false,
        message: "Authentication failed"
      });
    });
});

module.exports = router;
