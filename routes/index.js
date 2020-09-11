
/*
In the routing file (routes/index.js), you define 
your application's endpoints (aka actions) by 
making an HTTP request of a given type (typically
get or post) in the form of a router method against 
the router object. The first argument of this method 
names the endpoint, the second argument is a call 
back function that defines the server-side 
functionality for the action.
*/

var express = require('express');
var router = express.Router();

/* GET home page. */
/* router.get(). The first argument denotes the desired endpoint and the last argument is a call back function. The callback function tells the server how to deal with the request. The call back will always have three arguments req, res, and next.
*/
/* 
req - request the user is making of the server. This will contain user-supplied data in the form of req.params and req.body and provides several additional properties.*/
/* 
res - response the server is building for the user. This will tell the server which views to render, the type of response headers to include and provides several additional properties.
*/
/*
next - tells the current request to move to the next piece of middleware.
*/

router.get('/', function(req, res, next) {
  /* render() renders a view and serves it to the user. The first argument is the view's directory path. the second is a JSON object. This object holds a list of key-to-value pairs that get passed into the view/layout. Calling res.render('index', { title: 'Express', name: 'YOUR-NAME'}); pass two variables title and name into the view files and build the HTML document that will be served to the user */
  res.render('index', { title: 'My Portfolio', name: "Kieran" });
});

module.exports = router;
