const mongoHelper = require('../../utils/mongoHelper');
const utils = require('../../utils/utils');

exports.getProfile = function (req, res) {
   console.log('getProfile API was called');
   if (req.headers.authorization != null) {
      const token = req.headers.authorization.replace('Bearer ', '')
      const result = JSON.parse(utils.verifyJWT(token));
      mongoHelper.findOne(result.id).then(user => {
         if (user != null) {
            res.json({
               'code': 0,
               'message': 'Success',
               'payload': user.profile
            });
         } else {
            res.json({
               'code': 1,
               'message': 'Success'
            });
         }
      })
   } else {
      res.json({
         'code': 1,
         'message': 'Success'
      });
   }
};


exports.updateProfile = function (req, res) {
   console.log('updateProfile API was called');

   res.json({
      'code': 0,
      'message': 'Success'
   });

};

