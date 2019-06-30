// APIs 
const express = require("express");

// controllers
const authController = require('../api/controllers/authController');
const userController = require('../api/controllers/userController');
const petController = require('../api/controllers/petController');
const dispenserController = require('../api/controllers/dispenserController');

let router = express.Router();

let version = '/v1';

router.get('/', function (req, res) {
  console.log('health check API was called');
  res.json({ 'message': 'Success' });
});

router.get('/versions', function (req, res) {
  console.log('getVersion API was called');
  res.json({
    'code': 0,
    'message': 'Success',
    'version': '1.0.0'
  });
});

router.get('/agreement', function (req, res) {
  console.log('agreement API was called');
  res.json({
    'code': 0,
    'message': 'Success'
  });
});

router.get('/privacy', function (req, res) {
  console.log('privacy API was called');
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