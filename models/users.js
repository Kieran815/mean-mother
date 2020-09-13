// Define the Schema
// Next we will create a models directory in the root
// of our project and in it a file named users.js.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// mongoose-unique-validator is a plugin which adds
// pre-save validation for unique fields within a
// Mongoose schema.
var uniqueValidator = require('mongoose-unique-validator');

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
  }
});

// apply validator props to model
// see mongoose-unique-validator npm page
Users.plugin(uniqueValidator);

module.exports = mongoose.model("Users", Users);