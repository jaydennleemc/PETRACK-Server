const mongoHelper = require('../../utils/mongoHelper');
const utils = require('../../utils/utils');

exports.getPets = function (req, res) {
   utils.info('getPets API was called');
   if (req.headers.authorization != null) {
      const token = req.headers.authorization.replace('Bearer ', '');
      const result = JSON.parse(utils.verifyJWT(token));
      mongoHelper.findOne(result.id).then(user => {
         if (user != null) {
            if (user.pets != null) {
               const resp = {
                  'code': 0,
                  'message': 'Success',
                  'payload': user.pets
               };
               res.json(resp);
               utils.info({ 'response': resp });
            } else {
               const resp = {
                  'code': 0,
                  'message': 'Success',
                  'payload': []
               };
               res.json(resp);
               utils.info({ 'response': resp });
            }
         } else {
            const resp = {
               'code': 1,
               'message': 'Success'
            };
            res.json(resp);
            utils.info({ 'response': resp });
         }
      })
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

exports.getPet = function (req, res) {
   utils.info('getPet API was called');
   const petId = req.query.id;
   if (req.headers.authorization != null) {
      const token = req.headers.authorization.replace('Bearer ', '');
      const result = JSON.parse(utils.verifyJWT(token));
      mongoHelper.findOne(result.id).then(user => {
         if (user != null) {
            if (user.pets != null && user.pets.length > 0) {
               pets = user.pets.filter(function (value) {
                  if (value.id == petId) {
                     return value
                  }
               });

               if (pet[0] != null) {
                  const resp = {
                     'code': 0,
                     'message': 'Success',
                     'payload': pets[0]
                  };
                  res.json(resp);
                  utils.info({ 'response': resp });
               } else {
                  const resp = {
                     'code': 0,
                     'message': 'Success'
                  };
                  res.json(resp);
                  utils.info({ 'response': resp });
               }
            }
         } else {
            const resp = {
               'code': 1,
               'message': 'Success'
            }
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

exports.updatePet = function (req, res) {
   utils.info('updatePet API was called');
   const id = req.body.id;
   const name = req.body.name;
   const gender = req.body.gender;
   const type = req.body.type;
   const birthdate = req.body.birthdate;
   const weight = req.body.weight;

   if (req.headers.authorization != null) {
      const token = req.headers.authorization.replace('Bearer ', '')
      const result = JSON.parse(utils.verifyJWT(token));
      mongoHelper.findOne(result.id).then(user => {
         if (user != null) {
            if (user.pets != null && user.pets.length > 0) {
               var pet = {
                  'id': id,
                  'name': name,
                  'gender': gender,
                  'type': type,
                  'birthdate': birthdate,
                  'weight': weight,
               };
               pets = user.pets.filter(function (value) {
                  if (value.id = id) {
                     value = pet;
                  }
                  return value;
               });
               user.pets = pets;
            }
            mongoHelper.updateDocument(user.id, user).then(result => {
               if (result) {
                  const resp = {
                     'code': 0,
                     'message': 'Success'
                  }
                  res.json(resp);
                  utils.info({ 'response': resp });

               } else {
                  const resp = {
                     'code': 1,
                     'message': 'Success'
                  }
                  res.json(resp);
                  utils.info({ 'response': resp });
               }
            })
         }

      })
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

exports.addPet = function (req, res) {
   utils.info('addPet API was called');
   const id = utils.generatePetID();
   const name = req.body.name;
   const gender = req.body.gender;
   const type = req.body.type;
   const birthdate = req.body.birthdate;
   const weight = req.body.weight;
   if (req.headers.authorization != null) {
      const token = req.headers.authorization.replace('Bearer ', '');
      const result = JSON.parse(utils.verifyJWT(token));
      mongoHelper.findOne(result.id).then(user => {
         if (user != null) {
            if (user.pets != null) {
               var pet = {
                  'id': id,
                  'name': name,
                  'gender': gender,
                  'type': type,
                  'birthdate': birthdate,
                  'weight': weight,
               };
               user.pets.push(pet);
            } else {
               var pet = {
                  'id': id,
                  'name': name,
                  'gender': gender,
                  'type': type,
                  'birthdate': birthdate,
                  'weight': weight,
               };
               user.pets = []
               user.pets.push(pet);
            }

            mongoHelper.updateDocument(user.id, user).then(result => {
               if (result) {
                  const resp =
                     res.json({
                        'code': 0,
                        'message': 'Success'
                     });

               } else {
                  const resp =
                     res.json({
                        'code': 1,
                        'message': 'Success'
                     });
               }
            })
         }

      })
   } else {
      utils.info('authorization is empty');
   }
};

exports.deletePet = function (req, res) {
   utils.info('deletePet API was called');
   const petId = req.query.id;
   if (req.headers.authorization != null) {
      const token = req.headers.authorization.replace('Bearer ', '');
      const result = JSON.parse(utils.verifyJWT(token));
      mongoHelper.findOne(result.id).then(user => {
         if (user != null) {
            if (user.pets != null && user.pets.length > 0) {
               pets = user.pets.filter(function (value) {
                  if (value.id != petId) {
                     return value
                  }
               })

               user.pets = pets;
               mongoHelper.updateDocument(user.id, user).then(result => {
                  if (result) {
                     const resp =
                        res.json({
                           'code': 0,
                           'message': 'Success'
                        });
                  } else {
                     const resp =
                        res.json({
                           'code': 1,
                           'message': 'Success'
                        });
                  }
               })

            }
         } else {
            const resp = {
               'code': 1,
               'message': 'Success'
            }
            res.json(resp);
            utils.info({ 'response': resp });
         }
      })
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


