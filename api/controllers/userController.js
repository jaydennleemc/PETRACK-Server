const mongoHelper = require('../../utils/mongoHelper');
const utils = require('../../utils/utils');

exports.getProfile = function (req, res) {
   utils.info('getProfile API was called');
   if (req.headers.authorization != null) {
      const token = req.headers.authorization.replace('Bearer ', '')
      const result = JSON.parse(utils.verifyJWT(token));
      mongoHelper.findOne(result.id).then(user => {
         if (user != null) {
            utils.info('user found');
            const resp = {
               'code': 0,
               'message': 'Success',
               'payload': user.profile
            };
            res.json(resp);
            utils.info({ 'response': resp });
         } else {
            utils.info('cannot found user');
            const resp = {
               'code': 1,
               'message': 'Success'
            };
            res.json(resp);
            utils.info({ 'response': resp });
         }
      });
   } else {
      utils.info('authorization is empty');
      const resp = {
         'code': 1,
         'message': 'Success'
      };
      res.json(resp);
      utils.info({ 'response': resp });
   }
};


exports.updateProfile = function (req, res) {
   utils.info('updateProfile API was called');
   const resp = {
      'code': 0,
      'message': 'Success'
   };
   res.json(resp);

   utils.info({ 'response': resp });
};

