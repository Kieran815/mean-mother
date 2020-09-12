// Implement the REST/CRUD Functionality

// create - A POST request that creates a user

// read - A GET request that returns either a single
//  user record

// read - A GET request that returns a list of user
//  records

// update - A PUT request that updates an existing
//  record

// delete - A delete request that removes an existing
//  user

var express = require('express');
var router = express.Router();
// import Users model to compare input values against
var Users = require('../../models/users');

// The following will resolve any `GET` requests to
//  `/api/users/` to the `router.get()` method
router.get('/', function(req, res, next) {
  // res.json({success: true});
  Users.find({})
});



// tells express to `export` functions inside this module
module.exports = router;