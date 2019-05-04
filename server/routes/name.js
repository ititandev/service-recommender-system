var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
      error:0,
      message:'Successful',
      data: 'asdglasgaj'    
  })
});

module.exports = router;
