
const mongoHelper = require('../../utils/mongoHelper');
const httpService = require('../../service/httpService');
const utils = require('../../utils/utils');

exports.validateFacebook = function (req, res, next) {
  console.log('validateFacebook API was called');
  if (req.body.access_token != null) {
    // Facebook Login
    const token = req.body.access_token;
    httpService.validateFacebookToken(token).then((result) => {
      // console.log(`result \n ${result}`);
      facebookLogin(result, res);
    }).catch(err => {
      console.log(err);
      res.json({
        'code': 1,
        'message': 'Can\'t Login With Facebook'
      });
    });

  } else if (req.body.mobile != null && req.param.code != null) {
    // Mobile Login
    res.json({
      'code': 0,
      'message': 'Success'
    });

  } else {
    res.json({
      'code': 1,
      'message': 'Error'
    });
  }

};


function facebookLogin(data, res) {
  const token = utils.generateJWT(data);
  const json = JSON.parse(data);
  var success = false;

  mongoHelper.findOne(json.id).then(existUser => {
    console.log(`existUser: \n ${JSON.stringify(existUser)}`);
    if (existUser == null) {
      var user = {
        id: json.id,
        'profile': {
          name: json.name,
          gender: json.gender,
          birthday: json.birthday,
          picture: json.picture.data.url,
          email: json.email,
          token: token,
          status: true
        }
      };
      success = mongoHelper.insertDocument(user);
    } else {
      user = existUser;
      user.profile.status = true;
      user.profile.token = token
      success = mongoHelper.updateDocument(user.id, user);
    }

    if (success) {
      res.json({
        'code': 0,
        'message': 'Success',
        'token': token
      });
    } else {
      res.json({
        'code': 1,
        'message': 'Can\'t Login With Facebook'
      });
    }
  })
}

function mobileLogin(data, res) {
  const json = JSON.parse(data);
  const token = utils.generateJWT(data);
  var success = false;
}

exports.signOut = function (req, res, next) {
  console.log('signOut API was called');
  if (req.headers.authorization != null) {
    const token = req.headers.authorization.replace('Bearer ', '')
    console.log(token);
    const result = JSON.parse(utils.verifyJWT(token));
    mongoHelper.findOne(result.id).then(user => {
      user.status = false
      mongoHelper.updateDocument(user.id, user).then(result => {
        if (result) {
          res.json({
            'code': 0,
            'message': 'Success'
          });
        } else {
          res.json({
            'code': 1,
            'message': 'Success'
          });
        }
      })
    })

  }
};
