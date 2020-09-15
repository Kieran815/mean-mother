// Define the Schema
// Next we will create a models directory in the root
// of our project and in it a file named users.js.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// mongoose-unique-validator is a plugin which adds
// pre-save validation for unique fields within a
// Mongoose schema.
var uniqueValidator = require('mongoose-unique-validator');
var passportLocalMongoose = require('passport-local-mongoose');
// 
var Users = new Schema({
  email: {
    type: String,
    required: [true, "Please Enter E-Mail"],
    unique: [true, "E-Mail Already Registered. Please use another E-Mail"]
  },
  username: {
    type: String,
    required: [true, "Please Enter a User Name"],
    unique: [true, "User Name taken. Please Enter a Different User Name."]
  },
  first_name: String,
  last_name: String,
  admin: {
    type: Boolean,
    default: false
  },
  // Creating a new user shall automatically populate
  // created and modified dates.
  created: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date,
    default: Date.now
  },
  // require hash and salt for session mgmt
  hash: {
    type: String,
    required: [
      true,
      'Issue Creating Password'
    ]
  },
  salt: {
    type: String,
    required: [
      true,
      'Issue Creating Password'
    ]
  }

});

// Modifying an existing user shall automatically
// update the modified date.
Users.pre('save', function(next) {
  this.modified = new Date().toISOString();
  next();
});


// apply validator props to model
// see mongoose-unique-validator npm page
Users.plugin(uniqueValidator);
Users.plugin(passportLocalMongoose)

module.exports = mongoose.model("Users", Users);