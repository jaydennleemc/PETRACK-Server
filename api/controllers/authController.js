
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
  const result = JSON.parse(data);
  var success = false;
  const token = utils.generateJWT(data);

  mongoHelper.findOne(result.id).then(result => {

    console.log(result);

    if (result == null) {
      var user = {
        id: result.id,
        name: result.name,
        gender: result.gender,
        birthday: result.birthday,
        picture: result.picture.data.url,
        email: result.email,
        token: token,
        status: true
      };
      success = mongoHelper.insertDocument(user);
    } else {
      existUser = result;
      existUser.status = true;
      existUser.token = token
      success = mongoHelper.updateDocument(result.id, existUser);
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
