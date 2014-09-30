//load the Client interface
var MongoClient = require('mongodb').MongoClient;
// the client db connection scope is wrapped in a callback:

var connection_string = "mongodb://admin:k4GXrZvUkpcG@127.0.0.1:27017/b2";
console.log(connection_string)
MongoClient.connect(connection_string, function(err, db) {
  if(err) throw erro;
  var collection = db.collection("books").find().limit(10).toArray(function(err, docs) {
    console.log(docs);
    db.close();
  })
})
