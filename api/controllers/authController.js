
const mongoHelper = require('../../utils/mongoHelper');
const httpService = require('../../service/httpService');
const utils = require('../../utils/utils');

exports.validateFacebook = function (req, res, next) {
  console.log('validateFacebook API was called');
  if (req.body.access_token != null) {
    // Facebook Login
    const token = req.body.access_token;

    httpService.validateFacebookToken(token).then((result) => {
      console.log(result);
      if (result) {
        res.json({
          'code': 0,
          'message': 'Success',
          'token': utils.generateJWT(result)
        });
      } else {
        res.json({
          'code': 1,
          'message': 'Can\'t Login With Facebook'
        });
      }

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
      'code': 0,
      'message': 'Error'
    });
  }

};


function facebookLogin(data) {
  var user = {
    id:data.id,
    name:data.name,
    gender:data.gender,
    birthday:data.birthday,
    picture:data.picture.data.url,
    email:data.email,
    token:utils.generateJWT(data),
    status:true
  };

  var u = mongoHelper.findOne(data.id);

  if(u == null) {
    mongoHelper.insertDocument(user);
  }else {
    u.status = true;
  }

}


exports.signOut = function (req, res, next) {
  console.log('signOut API was called');
  res.json({
    'code': 0,
    'message': 'Success'
  });

  next();
};
