
var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/admin";

const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true });


const DBName = 'admin';
const CollectionName = 'petrack';

exports.healthCheckDB = function () {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log('**** Database healthCheck!! ****')

        var dbo = db.db(DBName);
        dbo.collection(CollectionName).find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}

exports.findAllData = function () {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log('**** Database healthCheck!! ****')

        var dbo = db.db(DBName);
        dbo.collection(CollectionName).find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(`size = ${result.length}`);
            db.close();
        });
    });
}

exports.insertDocument = async function (doc) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log('**** Database healthCheck!! ****')

        var dbo = db.db(DBName);
        dbo.collection(CollectionName).insert(doc, function (err, res) {
            if (err) throw err;
            console.log(`****   ${doc} was inserted ****`);
            console.log(res);
            db.close();
        });
    });

}

exports.insertDocuments = async function (docs) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log('**** Database healthCheck!! ****')

        var dbo = db.db(DBName);
        dbo.collection(CollectionName).insertMany(docs, function (err, res) {
            if (err) throw err;
            console.log(`**** ${docs} was inserted ****`)
            console.log(res);
            db.close();
        });
    });

}