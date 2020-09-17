// Create a REST API
// Implement the REST/CRUD Functionality

// create: POST request that creates a article
// read: GET request that returns a single article record
// read: GET request that returns a list of article records
// update: PUT request that updates existing record
// delete: delete request that removes existing article

var express = require('express');
var router = express.Router();
// import articles model to compare input values against
var Articles = require('../../models/articles');


/* *** GET ALL RECORDS *** */
// read: `GET` request that returns list of article records
// The following will resolve any `GET` requests to
// `/api/articles/` to the `router.get()` method
router.get('/', function(req, res, next) {
  // res.json({success: true});
  Articles.find({}, function(err, articles) {
    if (err) {
      return res.json({'success': false, 'error': err});
    }
    return res.json({'success': true, 'articles': articles});
  });
});


/* *** GET ONE RECORD *** */
// read: `GET` request that returns a single article record
//  this example uses `articleId`
router.get('/:articleId', function(req, res) {
  var articleId = req.params.articleId;
  Articles.findOne({'_id': articleId}, function(err, article) {
    if(err) {
      return res.json({'success': false, 'error': err});
    }
    return res.json({'success': true, 'article': article});
  });
});


/* *** POST NEW RECORD *** */
// create: `POST` request that creates a article
// Sending a json payload over a `POST` request to the
// 'api/articles` endpoint shall create a new article record.

// router sends `post` request with data built off of
// `article` model

// `req.body.val` represents input values from the article.
router.post('/', function(req, res) {
  Articles.create(new Articles({
    title: req.body.title,
    slug: req.body.slug,
    description: req.body.description,
    keywords: req.body.keywords,
    body: req.body.body
  }), function(err, article) {
    if (err) {
      return res.json({success: false, 'error': err});
    }
    return res.json({success: true, article: article});
  });
});


/* *** UPDATE EXISTING RECORD *** */
// update: `PUT` request that updates existing record

// Sending a json payload with an id, over a `PUT`
// request to the `api/articles` endpoint shall update an
// existing article record.

// again, `req.body` represents input values
// from the article.
router.put('/', function(req, res) {
  // search for selected article based on articleId
  Articles.findOne({'_id': req.body._id}, function(err, article) {
    if (err) {
      return res.json({success: false, error: err});
    } else if (article) {
    // CONDITIONAL CALLBACKS
    // if article is found, check req.body and update
    // `article` values (`article.key`) if `data.val` is
    // included in the request
    // nested `if` statements
    // if (article) {
      let data = req.body;

      if (data.title) {
        article.title = data.title;
      };

      if (data.slug) {
        article.slug = data.slug;
      };

      if (data.description) {
        article.description = data.description;
      };

      if (data.keywords) {
        article.keywords = data.keywords;
      };

      if (data.body) {
        article.body = data.body;
      }

      // Mongoose provides a `save()` function that will
      // take a JSON object and store it in the database
      // If you load an existing document from the
      // database and modify it, save() updates the
      // existing document
      article.save(function(err) {
        if (err) {
          return res.json({success: false, error: err});
        } else {
          return res.json({success: true, article:article});
        }
      });
    }
  });
});


/* *** DELETE RECORD *** */
// delete: delete request that removes existing article

// Accessing the route `/api/articles/:articleId` (for which
// `:articleId` is the `id` of a known article) using a
// `DELETE` request shall delete the article with that id.
router.delete('/:articleId', function(req, res) {
  var articleId = req.params.articleId;

  Articles.remove({'_id': articleId}, function(err, removed) {
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
// db.articles.update({ "_id" : ObjectId("5f5d3d6d59bc7f4c4b66c014")}, {"admin": true, "title" : "testarticle", "slug" : "kieran.milligan@gmail.com", "description" : "Kieran", "keywords" : "Milligan", "__v" : 0 });


// CREATE TEST (2 Instances)
// curl -d '{"slug":"test2@example.com", "title":"testarticle2", "description": "Bob", "keywords": "smith"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/articles
// curl -d '{"slug":"test3@example.com", "title":"testarticle3", "description": "Sally", "keywords": "Smith"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/articles


// READ ALL TEST
// curl -H "Content-Type: application/json" -X GET http://localhost:3000/api/articles/

// READ ONE TEST
// curl -H "Content-Type: application/json" -X GET http://localhost:3000/api/articles/${articleId}
// curl -H "Content-Type: application/json" -X GET http://localhost:3000/api/articles/5f5d5be8fd2035735a31170b

// UPDATE TEST
// curl -d '{"_id":"${articleId}", "description":"Robert"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/api/articles
// curl -d '{"_id":"5f5d5be8fd2035735a31170b", "description":"Robert"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/api/articles

// DELETE TEST
// curl -H "Content-Type: application/json" -X DELETE http://localhost:3000/api/articles/${articleId}
// curl -H "Content-Type: application/json" -X DELETE http://localhost:3000/api/articles/5f5d5be8fd2035735a31170b