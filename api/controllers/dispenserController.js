
const mongoHelper = require('../../utils/mongoHelper');
const utils = require('../../utils/utils');


exports.findNearBy = function (req, res) {
   utils.info('findNearBy API was called');

   mongoHelper.find({ type: 'dispenser' }).then(result => {
      if (result != null && result.length > 0) {
         const resp = {
            'code': 0,
            'message': 'Success',
            'payload': result
         };
         res.json(resp);

      } else {
         const resp = {
            'code': 1,
            'message': 'Success'
         };
         res.json(resp);
      }
   })

};


exports.addDispenser = function (req, res) {
   utils.info('addDispenser API was called');

   var dispenser = {
      type: 'dispenser',
      id: utils.generateDispenserID(),
      power: 'hight',
      bags: 2500,
      enable: false,
      syncedTime: '',
      location: {
         lat: '22.2840547',
         long: '114.22432649999999'
      }
   };

   mongoHelper.insertDocument(dispenser).then(result => {
      if (result) {
         const resp =
            res.json({
               'code': 0,
               'message': 'Success'
            });
      } else {
         const resp = {
            'code': 1,
            'message': 'Success'
         };
         res.json(resp);
      }
   });
};

exports.updateDispenser = function (req, res) {
   utils.info('updateDispenser API was called');

   const resp = {
      'code': 0,
      'message': 'Success'
   };
   res.json(resp);
};

exports.deleteDispenser = function (req, res) {
   utils.info('deleteDispenser API was called');
   const id = req.body.id
   utils.info(`id = ${id}`)
   if (id != null) {
      mongoHelper.deleteDocument(id).then(result => {
         if (result) {
            const resp = {
               'code': 0,
               'message': 'Success'
            }
            res.json(resp);
         } else {
            const resp = {
               'code': 1,
               'message': 'Success'
            };
            res.json(resp);
         }

      });
   } else {
      const resp = {
         'code': 1,
         'message': 'Success'
      };
      res.json(resp);
   }
};

exports.activeDispenser = function (req, res) {
   utils.info('activeDispenser API was called');

   const id = req.body.id
   utils.info(`id = ${id}`)
   if (id != null) {
      mongoHelper.findOne(id).then(dispenser => {
         utils.info(`dispenser info \n ${JSON.stringify(dispenser)}`);
         if (dispenser) {
            dispenser.enable = true;
            utils.info(`modifyed dispenser info \n ${JSON.stringify(dispenser)}`);
            mongoHelper.updateDocument(id, dispenser).then(result => {
               if (result) {
                  const resp = {
                     'code': 0,
                     'message': 'Success'
                  };
                  res.json(resp);
               } else {
                  const resp = {
                     'code': 1,
                     'message': 'Success'
                  };
                  res.json(resp);
               }
            })
         } else {
            const resp = {
               'code': 1,
               'message': 'Success'
            };
            res.json(resp);
         }

      })
   } else {
      const resp = {
         'code': 1,
         'message': 'Success'
      };
      res.json(resp);
   }

};

exports.deactiveDispenser = function (req, res) {
   utils.info('deactiveDispenser API was called');

   const id = req.body.id

   if (id != null) {
      mongoHelper.findOne(id).then(dispenser => {
         utils.info(`dispenser info \n ${JSON.stringify(dispenser)}`);
         if (dispenser) {
            dispenser.enable = false;
            utils.info(`modifyed dispenser info \n ${JSON.stringify(dispenser)}`);
            mongoHelper.updateDocument(id, dispenser).then(result => {
               if (result) {
                  const resp = {
                     'code': 0,
                     'message': 'Success'
                  };
                  res.json(resp);
               } else {
                  const resp = {
                     'code': 1,
                     'message': 'Success'
                  };
                  res.json(resp);
               }
            })
         } else {
            const resp = {
               'code': 1,
               'message': 'Success'
            };
            res.json(resp);
         }
      })
   } else {
      const resp = {
         'code': 1,
         'message': 'Success'
      };
      res.json(resp);
   }
};