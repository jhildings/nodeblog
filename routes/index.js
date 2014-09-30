var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});




/* GET posts page. */
router.get('/posts', function(req, res) {
    var db = req.db;
    var collection = db.get('posts');
    collection.find({}, {sort: {quantity: -1}},function(e,docs){
        res.render('posts', {
            "posts" : docs
        });
    });
});





router.post('/addpost', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.author;
    var userEmail = req.body.content;
    var title = req.body.title;
    // Set our collection
    var collection = db.get('posts');
    var date =   moment().format("YYYY / MM / DD");
    // Submit to the DB
    collection.insert({
        "author" : userName,
        "title" : title,
        "content" : userEmail ,
        "date" : date
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("posts");
            // And forward to success page
            res.redirect("posts");
        }
    });
});



module.exports = router;