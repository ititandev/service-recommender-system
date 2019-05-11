var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const ServiceTypeModel = require('../schema/ServiceTypeModel');

mongoose.connect('mongodb://servicy:servicy123@ds151416.mlab.com:51416/servicy', { useNewUrlParser: true });
router.get('/servicetypes', function (req, res, next) {
    ServiceTypeModel.find((err, data) => {
        if (err) {
            return res.json({ success: false, message: "error" });
        }
        return res.json({ success: true, message: "Find service Types", data: data.filter(item => item.name) })
    })

});

module.exports = router;
