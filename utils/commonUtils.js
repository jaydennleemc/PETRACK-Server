
const fs = require('fs');
const jwt = require('jsonwebtoken');

// PRIVATE and PUBLIC key
var privateKEY = fs.readFileSync('./private.key', 'utf8');
var publicKEY = fs.readFileSync('./public.key', 'utf8');

// PAYLOAD
var payload = {
    data1: "Data 1",
    data2: "Data 2",
    data3: "Data 3",
    data4: "Data 4",
};

var i = 'Mysoft corp';          // Issuer 
var s = 'some@user.com';        // Subject 
var a = 'http://mysoftcorp.in'; // Audience

// SIGNING OPTIONS
var signOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: "12h",
    algorithm: "RS256"
};

var verifyOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: "12h",
    algorithm: ["RS256"]
};

exports.generateJWT = function () {
    var token = jwt.sign(payload, privateKEY, signOptions);
    console.log("Token :" + token);
}

exports.verifyJWT = function (token) {
    var legit = jwt.verify(token, publicKEY, verifyOptions);
    console.log("\nJWT verification result: " + JSON.stringify(legit));
}