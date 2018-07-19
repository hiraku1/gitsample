var mongoClient = require('mongodb').MongoClient;
var config = require('./config');

mongoClient.connect("mongodb://localhost/" + config.db, function(err, db) {
  // エラー処理
  if (err) {
    return console.dir(err);
  }

  db.collection("users", function(err, collection) {
    if (err) {
      return console.dir(err);
    }

    // 検索する
    collection.find({name: "長本"}).toArray(function(err, items) {
      console.log(items);
    });

  });
});