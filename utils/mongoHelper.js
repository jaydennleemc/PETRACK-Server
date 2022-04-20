
var MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://jayden:22150000@cluster0-fwcrs.mongodb.net/test?retryWrites=true&w=majority";

const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true });

const utils = require('./utils');
const DBName = 'petrack';
const CollectionName = 'petrack';

exports.healthCheckDB = function () {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        utils.info('**** Database healthCheck!! ****');
        var dbo = db.db(DBName);
        dbo.collection(CollectionName).find({}).toArray(function (err, result) {
            if (err) throw err;
            utils.info(result);
            db.close();
        });
    });
}

exports.findAllData = function () {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            utils.info('**** Database connected!! ****');
            var dbo = db.db(DBName);
            dbo.collection(CollectionName).find({}).toArray(function (err, result) {
                if (err) throw err;
                utils.info(`size = ${result.length}`);
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
            utils.info('**** Database connected!! ****');
            var dbo = db.db(DBName);
            dbo.collection(CollectionName).findOne({ 'id': id }, function (err, result) {
                if (err) throw err;
                db.close();
                resolve(result);
            });
        });
    });
};

exports.find = function (filter) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            utils.info('**** Database connected!! ****');
            var dbo = db.db(DBName);
            dbo.collection(CollectionName).find(filter).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                resolve(result);
            });
        })
    })
}


exports.insertDocument = function (doc) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            utils.info('**** Database connected!! ****');
            var dbo = db.db(DBName);
            dbo.collection(CollectionName).insert(doc, function (err, res) {
                if (err) throw err;
                utils.info(`****   ${doc} was inserted ****`);
                utils.info(res.result);
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
            utils.info('**** Database connected!! ****');

            var dbo = db.db(DBName);
            dbo.collection(CollectionName).updateOne({ 'id': id }, { $set: doc }, function (err, res) {
                if (err) throw err;
                utils.info(`****   ${doc} was updated ****`);
                utils.info(res.result);
                if (res.result.ok == 1) {
                    resolve(true);
                } else {
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
            utils.info('**** Database connected!! ****')

            var dbo = db.db(DBName);
            dbo.collection(CollectionName).insertMany(docs, function (err, res) {
                if (err) throw err;
                utils.info(`**** ${docs} was inserted ****`);
                utils.info(res.result);
                if (res.result.ok == 1) {
                    resolve(true);
                } else {
                    resolve(false);
                }
                db.close();
            });
        });
    });
};

exports.updateDocuments = function (id, doc) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            utils.info('**** Database connected!! ****');

            var dbo = db.db(DBName);
            dbo.collection(CollectionName).updateMany({ 'id': id }, { $set: doc }, function (err, res) {
                if (err) throw err;
                utils.info(`****   ${doc} was updated ****`);
                utils.info(res.result);
                if (res.result.ok == 1) {
                    resolve(true);
                } else {
                    resolve(false);
                }
                db.close();
            });
        });
    });
};

exports.deleteDocument = function (id) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            utils.info('**** Database connected!! ****');

            var dbo = db.db(DBName);
            dbo.collection(CollectionName).deleteOne({ 'id': id }, function (err, res) {
                if (err) throw err;
                utils.info(`****   document was deleted ****`);
                utils.info(res.result);
                if (res.result.ok == 1) {
                    resolve(true);
                } else {
                    resolve(false);
                }
                db.close();
            });
        });
    });
};

exports.deleteDocuments = function (id) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            utils.info('**** Database connected!! ****');

            var dbo = db.db(DBName);
            dbo.collection(CollectionName).deleteMany({ 'id': id }, function (err, res) {
                if (err) throw err;
                utils.info(`****   documents was deleted ****`);
                utils.info(res.result);
                if (res.result.ok == 1) {
                    resolve(true);
                } else {
                    resolve(false);
                }
                db.close();
            });
        });
    });
};