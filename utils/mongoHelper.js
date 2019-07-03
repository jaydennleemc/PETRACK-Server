
var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/admin";

const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true });


const DBName = 'admin';
const CollectionName = 'petrack';

exports.healthCheckDB = function () {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log('**** Database healthCheck!! ****');
        var dbo = db.db(DBName);
        dbo.collection(CollectionName).find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}

exports.findAllData = function () {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            console.log('**** Database connected!! ****');

            var dbo = db.db(DBName);
            dbo.collection(CollectionName).find({}).toArray(function (err, result) {
                if (err) throw err;
                console.log(`size = ${result.length}`);
                db.close();
                resolve(result);
            });
        });
    });
};

exports.findOne = function (id) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            console.log('**** Database connected!! ****');

            var dbo = db.db(DBName);
            dbo.collection(CollectionName).findOne({ 'id': id }, function (err, result) {
                if (err) throw err;
                db.close();
                resolve(result);
            });
        });
    });
};


exports.insertDocument = function (doc) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            console.log('**** Database connected!! ****');

            var dbo = db.db(DBName);
            dbo.collection(CollectionName).insert(doc, function (err, res) {
                if (err) throw err;
                console.log(`****   ${doc} was inserted ****`);
                console.log(res.result);
                db.close();
                if (res.result.ok == 1) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });

    });
};


exports.updateDocument = function (id, doc) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            console.log('**** Database connected!! ****');

            var dbo = db.db(DBName);
            dbo.collection(CollectionName).updateOne({ 'id': id }, {$set:doc}, function (err, res) {
                if (err) throw err;
                console.log(`****   ${doc} was updated ****`);
                console.log(res.result);
                if(res.result.ok == 1) {
                    resolve(true);
                }else {
                    resolve(false);
                }
                db.close();
            });
        });
    });
};


exports.insertDocuments = function (docs) {

    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            console.log('**** Database connected!! ****')

            var dbo = db.db(DBName);
            dbo.collection(CollectionName).insertMany(docs, function (err, res) {
                if (err) throw err;
                console.log(`**** ${docs} was inserted ****`);
                console.log(res.result);
                db.close();
            });
        });
    });

};