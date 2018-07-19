const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');

// 接続文字列
const url = "mongodb://localhost:27017";

//データベースName
const dbName = "study"
 
// MongoDB へ 接続
MongoClient.connect(url, function(err, client){
    assert.equal(null, err);
    var collection;
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // コレクションの取得
    collection = db.collection("user");

    // コレクションに含まれるドキュメントをすべて取得
    collection.find().toArray((error, documents) => {
        for (var document of documents) {
            console.log(document.name + ' ' + document.age);
        }
    });
 
    // コレクション中で条件に合致するドキュメントを取得
    //collection.find({age: {$lt: 15}}).toArray((error, documents)=>{
    //    for (var document of documents) {
    //        console.log(document.name);
    //    }
    //});

    client.close();
  });