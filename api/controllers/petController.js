const mongoHelper = require('../../utils/mongoHelper');
const utils = require('../../utils/utils');

exports.getPets = function (req, res) {
   console.log('getPets API was called');
   if (req.headers.authorization != null) {
      const token = req.headers.authorization.replace('Bearer ', '')
      const result = JSON.parse(utils.verifyJWT(token));
      mongoHelper.findOne(result.id).then(user => {
         if (user != null) {
            if (user.pets != null) {
               res.json({
                  'code': 0,
                  'message': 'Success',
                  'payload': user.pets
               });
            } else {
               res.json({
                  'code': 0,
                  'message': 'Success',
                  'payload': []
               });
            }
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

exports.getPet = function (req, res) {
   console.log('getPet API was called');
   const petId = req.query.id;
   if (req.headers.authorization != null) {
      const token = req.headers.authorization.replace('Bearer ', '')
      const result = JSON.parse(utils.verifyJWT(token));
      mongoHelper.findOne(result.id).then(user => {
         if (user != null) {
            if (user.pets != null && user.pets.length > 0) {
               pets = user.pets.filter(function (value) {
                  if (value.id == petId) {
                     return value
                  }
               })

               if (pet[0] != null) {
                  res.json({
                     'code': 0,
                     'message': 'Success',
                     'payload': pets[0]
                  });
               } else {
                  res.json({
                     'code': 0,
                     'message': 'Success'
                  });
               }
            }
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

exports.updatePet = function (req, res) {
   console.log('updatePet API was called');

   res.json({
      'code': 0,
      'message': 'Success'
   });

};

exports.addPet = function (req, res) {
   console.log('addPet API was called');
   const id = utils.generatePetID();
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
         }

      })
   }
};

exports.deletePet = function (req, res) {
   console.log('deletePet API was called');
   const petId = req.query.id;
   if (req.headers.authorization != null) {
      const token = req.headers.authorization.replace('Bearer ', '')
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
                  if(result) {
                     res.json({
                        'code': 0,
                        'message': 'Success'
                     });
                  }else {
                     res.json({
                        'code': 1,
                        'message': 'Success'
                     });
                  }
               })

            }
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


