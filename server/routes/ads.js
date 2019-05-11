var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const AdModel = require('../schema/AdModel');
const AdTypeModel = require('../schema/AdTypeModel');
const { createJWToken, verifyJWTToken } = require('../auth.js');

mongoose.connect('mongodb://servicy:servicy123@ds151416.mlab.com:51416/servicy', { useNewUrlParser: true });


router.get('/ads', function (req, res, next) {
    limit = parseInt(req.query.limit);
    if (!limit)
        limit = 2;

    AdModel.find({ status: "running" })
        .limit(limit)
        .populate('type_id')
        .exec((err, data) => {
            if (err) {
                console.log(err)
                return res.json({
                    success: false,
                    message: "Some error happen"
                });
            }

            return res.json({
                success: true,
                data: data
            })
        })

});

router.post('/ads', function (req, res, next) {
    new AdModel({

    })
});


module.exports = router;
