var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const {matchName} = require('./utils');
const ServiceModel = require('../schema/ServiceModel')
const ServiceTypeModel =require('../schema/ServiceTypeModel');
const LocationModel=require('../schema/LocationModel');
mongoose.connect('mongodb://servicy:servicy123@ds151416.mlab.com:51416/servicy', {useNewUrlParser: true});

router.get('/services/best', function(req, res, next) {
    ServiceModel.find({},{rating: 1, avatar: 1, description: 1, name: 1}).then(services => {
        services = services.sort((a, b) => a.rating.points/a.rating.total < b.rating.points/b.rating.total).slice(0, 3);
        res.json({success: true,message:"Find best services",data:services});
    }).catch(err => {
        res.json({success:false,message:"error"});
    });
});
router.get('/services', function(req, res , next) {
    const {locationName, serviceType, filterText} = req.query;
    ServiceModel.find({})
    .populate('category_id')
    .populate('info.location_id')
    .exec((err, docs) =>{
        if (err){
            res.status(500).send("Internal server error " + err);
        } else {
            let result = []
            for (let service of docs) {
                let filterCondition = matchName(service.description, filterText) || 
                matchName(service.info.address,filterText) ||
                matchName(service.info.price,filterText) ||
                matchName(service.info.website,filterText) ||
                matchName(service.info.content,filterText);

                if (service.info.location_id !== null && locationName!==undefined) {
                    filterCondition = filterCondition && matchName(service.info.location_id.name,locationName) 
                }

                if (service.category_id !== null && serviceType!==undefined){
                    filterCondition = filterCondition && matchName(service.category_id.name,serviceType) 
                }

                if (filterCondition) {
                    result.push(service);
                }
            }

            if (result.length < 1) {
                res.json({success:false,data:result,message:"Result not found"})
            } else {
                res.json({success: true,data: result,message:"Found result"});
            }
        }
    });
});

router.get('/services/:id', function(req, res , next) {
    const serviceId = req.param("id");
    console.log(serviceId);
    ServiceModel.find({})
    .populate('category_id')
    .populate('info.location_id')
    .exec((err, docs) =>{
        if (err){
            res.status(500).send("Internal server error " + err);
        } else {
            let result = []
            for (let service of docs) {
                if (service._id==serviceId)
                {
                    result.push(service);
                }
            }

            if (result.length < 1) {
                res.json({success:false,data:result,message:"Result not found"})
            } else {
                res.json({success: true,data: result,message:"Found service"});
            }
        }
    });
});



module.exports = router;
