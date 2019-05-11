var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const LocationModel = require('../schema/LocationModel');

mongoose.connect('mongodb://servicy:servicy123@ds151416.mlab.com:51416/servicy', { useNewUrlParser: true });
router.get('/locations', function (req, res, next) {
    LocationModel.find((err, data) => {
        if (err) {
            return res.json({ success: false, message: "error" });
        }
        return res.json({ success: true, message: "found locations", data: data.filter(item => item.name) })
    })

});

module.exports = router;