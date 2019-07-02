// APIs 
const express = require("express");

// controllers
const authController = require('../api/controllers/authController');
const userController = require('../api/controllers/userController');
const petController = require('../api/controllers/petController');
const dispenserController = require('../api/controllers/dispenserController');
const mongoHelper = require('../utils/mongoHelper');
const commonUtil = require('../utils/commonUtils');

let router = express.Router();

let version = '/v1';

router.get('/', function (req, res) {
  console.log('**** health check API was called **** ');
  res.json({ 'message': 'Success' });
});

router.get('/db', function (req, res, next) {
  console.log('**** health check API was called **** ');

  commonUtil.verifyJWT("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhMSI6IkRhdGEgMSIsImRhdGEyIjoiRGF0YSAyIiwiZGF0YTMiOiJEYXRhIDMiLCJkYXRhNCI6IkRhdGEgNCIsImlhdCI6MTU2MjA1NTQ0NywiZXhwIjoxNTYyMDk4NjQ3LCJhdWQiOiJodHRwOi8vbXlzb2Z0Y29ycC5pbiIsImlzcyI6Ik15c29mdCBjb3JwIiwic3ViIjoic29tZUB1c2VyLmNvbSJ9.efHZRsubdM6ERMlBZ0Yhu-LmNae3nrdO2PTbDZ0AJMt6XioNvyYL2LY9OSCVvkVaSHiL_FsKX0BI9ghTf8AfYg");

  res.json({ 'message': 'Success' });

  next();
});

router.get('/insert', function (req, res, next) {
  console.log('**** insert API was called **** ');

  var myobj = [{ id: "1123", name: "Company Inc", address: "Highway 37" },
  { id: "1123", name: "Company Inc", address: "Highway 37" },
  { id: "1123", name: "Company Inc", address: "Highway 37" },
  { id: "1123", name: "Company Inc", address: "Highway 37" }];
  mongoHelper.insertDocuments(myobj)

  res.json({ 'message': 'Success' });

  next();
});

router.get('/delete', function (req, res, next) {
  console.log('**** detele check API was called **** ');

  mongoHelper.findAllData()

  res.json({ 'message': 'Success' });

  next();
});



router.get('/versions', function (req, res) {
  console.log('**** getVersion API was called **** ');

  res.json({
    'code': 0,
    'message': 'Success',
    'version': '1.0.0'
  });
});

router.get('/agreement', function (req, res) {
  console.log('**** agreement API was called ****  ');
  res.json({
    'code': 0,
    'message': 'Success'
  });
});

router.get('/privacy', function (req, res) {
  console.log('**** privacy API was called ****  ');
  res.json({
    'code': 0,
    'message': 'Success'
  });
});

// Auth API
router.post(`${version}/auth`, authController.validateFacebook);

router.post(`${version}/signOut`, authController.signOut);

// Profile API
router.get(`${version}/profile`, userController.getProfile);

router.post(`${version}/profile`, userController.updateProfile);

// PET API
router.get(`${version}/pets`, petController.getPets);

router.get(`${version}/pet`, petController.getPet);

router.post(`${version}/pet`, petController.updatePet);

router.put(`${version}/pet`, petController.addPet);

router.delete(`${version}/pet`, petController.deletePet);

// Dispenser API
router.get(`${version}/findNearBy`, dispenserController.findNearBy);

router.put(`${version}/dispenser`, dispenserController.addDispenser);

router.post(`${version}/dispenser`, dispenserController.updateDispenser);

router.delete(`${version}/dispenser`, dispenserController.deleteDispenser);

router.post(`${version}/dispenser/active`, dispenserController.activeDispenser);

router.post(`${version}/dispenser/deactive`, dispenserController.deactiveDispenser);



module.exports = router;