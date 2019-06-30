
exports.validateFacebook = function (req, res) {
  console.log('validateFacebook API was called');
  if (req.body.access_token != null) {
    // Facebook Login
    res.json({
      'code': 0,
      'message': 'Success'
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


exports.signOut = function (req, res) {
  console.log('signOut API was called');
  res.json({
    'code': 0,
    'message': 'Success'
  });

};
