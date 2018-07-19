var mongoClient = require('mongodb').MongoClient;
var config = require('./config');

mongoClient.connect("mongodb://localhost/" + config.db, function(err, db) {
  // ƒGƒ‰[ˆ—
  if (err) {
    return console.dir(err);
  }

  db.collection("users", function(err, collection) {
    if (err) {
      return console.dir(err);
    }

    // ŒŸõ‚·‚é
    collection.find({name: "’·–{"}).toArray(function(err, items) {
      console.log(items);
    });

  });
});