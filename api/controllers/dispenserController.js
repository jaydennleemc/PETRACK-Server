
const mongoHelper = require('../../utils/mongoHelper');
const utils = require('../../utils/utils');


exports.findNearBy = function (req, res) {
   console.log('findNearBy API was called');

   mongoHelper.find({ type: 'dispenser' }).then(result => {
      if (result != null && result.length > 0) {
         res.json({
            'code': 0,
            'message': 'Success',
            'payload': result
         });

      } else {
         res.json({
            'code': 1,
            'message': 'Success'
         });
      }
   })

};


exports.addDispenser = function (req, res) {
   console.log('addDispenser API was called');

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
   }

   mongoHelper.insertDocument(dispenser).then(result => {
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


};

exports.updateDispenser = function (req, res) {
   console.log('updateDispenser API was called');

   res.json({
      'code': 0,
      'message': 'Success'
   });

};

exports.deleteDispenser = function (req, res) {
   console.log('deleteDispenser API was called');

   const id = req.body.id
   console.log(`id = ${id}`)
   if (id != null) {
      mongoHelper.deleteDocument(id).then(result => {
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
   } else {
      res.json({
         'code': 1,
         'message': 'Success'
      });
   }
};

exports.activeDispenser = function (req, res) {
   console.log('activeDispenser API was called');

   const id = req.body.id
   console.log(`id = ${id}`)
   if (id != null) {
      mongoHelper.findOne(id).then(dispenser => {
         console.log(`dispenser info \n ${JSON.stringify(dispenser)}`);
         if (dispenser) {
            dispenser.enable = true;
            console.log(`modifyed dispenser info \n ${JSON.stringify(dispenser)}`);
            mongoHelper.updateDocument(id, dispenser).then(result => {
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

exports.deactiveDispenser = function (req, res) {
   console.log('deactiveDispenser API was called');

   const id = req.body.id

   if (id != null) {
      mongoHelper.findOne(id).then(dispenser => {
         console.log(`dispenser info \n ${JSON.stringify(dispenser)}`);
         if (dispenser) {
            dispenser.enable = false;
            console.log(`modifyed dispenser info \n ${JSON.stringify(dispenser)}`);
            mongoHelper.updateDocument(id, dispenser).then(result => {
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