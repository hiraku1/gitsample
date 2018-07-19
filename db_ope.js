var mongoClient = require('mongodb').MongoClient;
var config = require('./config');

mongoClient.connect("mongodb://localhost:27017", function(err, db) {
  // エラー処理
  if (err) {
    return console.dir(err);
  }

  db.collection("users", function(err, collection) {
    if (err) {
      return console.dir(err);
    }

    // 挿入するデータ
    var docs = [
      {name: "山口",   score: 20},
      {name: "大田",   score: 80},
      {name: "長本",   score: 100},
    ];

    collection.insert(docs, function(err, result) {
      // エラー処理
      if (err) {
        return console.dir(err);
      }

    });

    // 検索する
    collection.find().toArray(function(err, items) {
      console.log(items);
    });

  });
});