// Create a REST API
// Implement the REST/CRUD Functionality

// create: POST request that creates a user
// read: GET request that returns a single user record
// read: GET request that returns a list of user records
// update: PUT request that updates existing record
// delete: delete request that removes existing user

var express = require('express');
var router = express.Router();
// import Users model to compare input values against
var Users = require('../../models/users');

// read: GET request that returns a list of user records
// The following will resolve any `GET` requests to
//  `/api/users/` to the `router.get()` method
router.get('/', function(req, res, next) {
  // res.json({success: true});
  Users.find({}, function(err, users) {
    if (err) {
      return res.json({'success': false, 'error': err});
    }
    return res.json({'success': true, 'users': users});
  });
});



// tells express to `export` functions inside this module
module.exports = router;