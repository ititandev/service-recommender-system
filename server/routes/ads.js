var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const AdModel = require('../schema/AdModel');
const AdTypeModel = require('../schema/AdTypeModel');
const UserModel = require('../schema/UserModel');
const { createJWToken, verifyJWTToken } = require('../auth.js');

mongoose.connect('mongodb://servicy:servicy123@ds151416.mlab.com:51416/servicy', { useNewUrlParser: true });


router.get('/ads', function (req, res, next) {
    limit = parseInt(req.query.limit);
    if (!limit)
        limit = 2;

    AdModel.find({ status: "running" })
        .limit(limit)
        .populate('adtype')
        .populate('provider_id')
        .exec((err, data) => {
            if (err) {
                console.log(err)
                return res.json({
                    success: false,
                    message: "Some error happen"
                });
            }
            data.forEach((ad, ind) => {
                ad.views += 1;
                if (ad.views >= ad.adtype.max_views)
                    ad.status = "done"
                ad.save()
            })

            return res.json({
                success: true,
                data: data
            })
        })
});

router.get('/adtypes', function (req, res, next) {
    AdTypeModel.find((err, data) => {
        if (err)
            return res.json({
                success: false,
                message: "Some error happen"
            });
        return res.json({
            success: true,
            data: data
        })
    })
});

router.post('/ads', function (req, res, next) {

    verifyJWTToken(req.header("Authorization")).then(
        (payload) => {
            uid = payload.uid;
            role = payload.role;
            if (role != "provider")
                return res.json({
                    success: false,
                    message: "Authentication failed"
                });

            ad = new AdModel({
                provider_id: uid,
                status: "pending",
                banner: req.body.banner,
                url: req.body.url,
                name: req.body.name,
                adtype: req.body.adtype,
                views: 0
            })

            ad.save()
            return res.json({
                success: true,
                data: ad
            })
        },
        (err) => {
            return res.json({
                success: false,
                message: "Authentication failed"
            });
        })
});


module.exports = router;
