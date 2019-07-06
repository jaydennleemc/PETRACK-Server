
const mongoHelper = require('../../utils/mongoHelper');
const httpService = require('../../service/httpService');
const utils = require('../../utils/utils');

exports.validateFacebook = function (req, res, next) {
  utils.info('validateFacebook API was called');
  if (req.body.access_token != null) {
    // Facebook Login
    token = req.body.access_token;
    httpService.validateFacebookToken(token).then((result) => {
      // utils.info(`result \n ${result}`);
      facebookLogin(result, res);
    }).catch(err => {
      utils.info(err);
      resp = {
        'code': 1,
        'message': 'Can\'t Login With Facebook'
      };
      res.json(resp);
      utils.info({"response":resp});
    });

  } else if (req.body.mobile != null && req.param.code != null) {
    // Mobile Login
    resp = {
      'code': 0,
      'message': 'Success'
    };
    res.json(resp);
    utils.info({"response":resp});

  } else {
    resp = {
      'code': 1,
      'message': 'Success'
    };
    res.json(resp);
    utils.info({"response":resp});
  }
};


function facebookLogin(data, res) {
  token = utils.generateJWT(data);
  json = JSON.parse(data);
  var success = false;

  mongoHelper.findOne(json.id).then(existUser => {
    utils.info(`existUser: \n ${JSON.stringify(existUser)}`);
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
      resp = {
        'code': 0,
        'message': 'Success',
        'token': token
      };
      res.json(resp);
      utils.info({"response":resp});
    } else {
      resp = {
        'code': 1,
        'message': 'Can\'t Login With Facebook'
      };
      res.json(resp);
      utils.info({"response":resp});
      
    }
  })
}

function mobileLogin(data, res) {
  const json = JSON.parse(data);
  const token = utils.generateJWT(data);
  var success = false;
}

exports.signOut = function (req, res, next) {
  utils.info('signOut API was called');
  if (req.headers.authorization != null) {
     token = req.headers.authorization.replace('Bearer ', '')
    utils.info(token);
     result = JSON.parse(utils.verifyJWT(token));
    mongoHelper.findOne(result.id).then(user => {
      user.status = false;
      mongoHelper.updateDocument(user.id, user).then(result => {
        if (result) {
          resp = {
            'code': 0,
            'message': 'Success'
          };
          res.json(resp);
          utils.info({"response":resp});
        } else {
          resp = {
            'code': 1,
            'message': 'Success'
          };
          res.json(resp);
          utils.info({"response":resp});
        }
      });
    });

  }
};
