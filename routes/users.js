var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/app', function(req, res, next) {
  // add a non-API endpoint
  res.render('users/app', {title: 'User Management'});
});

module.exports = router;
