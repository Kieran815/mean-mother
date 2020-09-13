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


/* *** GET ALL RECORDS *** */
// read: `GET` request that returns list of user records
// The following will resolve any `GET` requests to
// `/api/users/` to the `router.get()` method
router.get('/', function(req, res, next) {
  // res.json({success: true});
  Users.find({}, function(err, users) {
    if (err) {
      return res.json({'success': false, 'error': err});
    }
    return res.json({'success': true, 'users': users});
  });
});


/* *** GET ONE RECORD *** */
// read: `GET` request that returns a single user record
//  this example uses `userId`
router.get('/:userId', function(req, res) {
  var userId = req.params.userId;
  Users.findOne({'_id': userId}, function(err, user) {
    if(err) {
      return res.json({'success': false, 'error': err});
    }
    return res.json({'success': true, 'user': user});
  });
});


/* *** POST NEW RECORD *** */
// create: `POST` request that creates a user
// Sending a json payload over a `POST` request to the
// 'api/users` endpoint shall create a new user record.

// router sends `post` request with data built off of
// `user` model

// `req.body.val` represents input values from the user.
router.post('/', function(req, res) {
  Users.create(new Users({
    username: req.body.username,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }), function(err, user) {
    if (err) {
      return res.json({success: false, 'error': err});
    }
    return res.json({success: true, user: user});
  });
});


/* *** UPDATE EXISTING RECORD *** */
// update: `PUT` request that updates existing record

// Sending a json payload with an id, over a `PUT`
// request to the `api/users` endpoint shall update an
// existing user record.

// again, `req.body` represents input values
// from the user.
router.put('/', function(req, res) {
  // search for selected user based on userId
  Users.findOne({'_id': req.body._id}, function(err, user) {
    if (err) {
      return res.json({success: false, error: err});
    } else if (user) {
    // CONDITIONAL CALLBACKS
    // if user is found, check req.body and update
    // `user` values (`user.key`) if `data.val` is
    // included in the request
    // nested `if` statements
    // if (user) {
      let data = req.body;

      if (data.username) {
        user.username = data.username;
      };

      if (data.email) {
        user.email = data.email;
      };

      if (data.first_name) {
        user.first_name = data.first_name;
      };

      if (data.last_name) {
        user.last_name = data.last_name;
      };

      // Mongoose provides a `save()` function that will
      // take a JSON object and store it in the database
      // If you load an existing document from the
      // database and modify it, save() updates the
      // existing document
      user.save(function(err) {
        if (err) {
          return res.json({success: false, error: err});
        } else {
          return res.json({success: true, user:user});
        }
      });
    }
  });
});


/* *** DELETE RECORD *** */
// delete: delete request that removes existing user

// Accessing the route `/api/users/:userId` (for which
// `:userId` is the `id` of a known user) using a
// `DELETE` request shall delete the user with that id.
router.delete('/:userId', function(req, res) {
  var userId = req.params.userId;

  Users.remove({'_id': userId}, function(err, removed) {
    if (err) {
      return res.json({success: false, error: err});
    }
    return res.json({success: true, status: removed});
  });
});


// tells express to `export` functions inside this module
module.exports = router;

/* *** END OF CRUD *** */



/* *** SAVING IN CASE I FUCKED UP *** */
// edit statement I used to update data in mongodb
// also set `admin` to `true`
// db.users.update({ "_id" : ObjectId("5f5d3d6d59bc7f4c4b66c014")}, {"admin": true, "username" : "testuser", "email" : "kieran.milligan@gmail.com", "first_name" : "Kieran", "last_name" : "Milligan", "__v" : 0 });


// CREATE TEST (2 Instances)
// curl -d '{"email":"test2@example.com", "username":"testuser2", "first_name": "Bob", "last_name": "smith"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/users
// curl -d '{"email":"test3@example.com", "username":"testuser3", "first_name": "Sally", "last_name": "Smith"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/users


// READ ALL TEST
// curl -H "Content-Type: application/json" -X GET http://localhost:3000/api/users/


// READ ONE TEST
// curl -H "Content-Type: application/json" -X GET http://localhost:3000/api/users/${userId}


// UPDATE TEST
// curl -d '{"_id":"${userId}", "first_name":"Robert"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/api/users

// DELETE TEST
// curl -H "Content-Type: application/json" -X DELETE http://localhost:3000/api/users/${userId}