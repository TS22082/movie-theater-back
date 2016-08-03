var express = require('express');
var router = express.Router();
var Showtimes = require('showtimes');

var NodeGeocoder = require('node-geocoder');

const geocodeOptions = {
  provider: 'google',
  apiKey: ''
}

router.get('/:zip', function(req, res, next) {
  var api = new Showtimes( req.params.zip );
   
  api.getTheaters(function (error, theaters) {
    if (error) {
      throw error
    }
   
    const addresses = theaters.map( theater => theater.address )

    NodeGeocoder( geocodeOptions ).batchGeocode( addresses, (err, result) => {
      const geocodes = result.map( entry => entry.value[0] )

      const geocodedTheaters = theaters.map( (theater, index) => {
        const position = {
          lat: geocodes[ index ].latitude, 
          lng: geocodes[ index ].longitude
        }

        return Object.assign( theater, { position })
      })

      res.send( geocodedTheaters );
    })
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