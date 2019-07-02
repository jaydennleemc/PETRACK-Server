
const httpService = require('../../service/httpService');

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
          'message': 'Success'
        });
      } else {
        res.json({
          'code': 1,
          'message': 'Success'
        });
      }

    }).catch(err => {
      console.log(err);
    })

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


exports.signOut = function (req, res, next) {
  console.log('signOut API was called');
  res.json({
    'code': 0,
    'message': 'Success'
  });

  next();
};
