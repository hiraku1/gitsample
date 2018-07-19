var mongoClient = require('mongodb').MongoClient;
var config = require('./config');

mongoClient.connect("mongodb://localhost/" + config.db, function(err, db) {
  // �G���[����
  if (err) {
    return console.dir(err);
  }

  db.collection("users", function(err, collection) {
    if (err) {
      return console.dir(err);
    }

    // ��������
    collection.find({name: "���{"}).toArray(function(err, items) {
      console.log(items);
    });

  });
});