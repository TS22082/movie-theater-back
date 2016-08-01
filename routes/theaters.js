var express = require('express');
var router = express.Router();
var Showtimes = require('showtimes');

router.get('/:zip', function(req, res, next) {
  var api = new Showtimes( req.params.zip );
   
  api.getTheaters(function (error, theaters) {
    if (error) {
      throw error
    }
   
    res.send( theaters );
  });
});


router.get('/id/:id', function(req, res, next) {
  var api = new Showtimes();
   
  api.getTheater(req.params.id, function (error, theater) {
    if (error) {
      throw error
    }
   
    res.send( theater );
  });
});

module.exports = router;