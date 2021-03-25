const { Router } = require('express');
const senatorController = require('../controllers/senator');
const  verify = require('../controllers/users');

const senatorMiddleware = require('../middleware/senator');

// configure route
const senatorRouter = Router();
senatorRouter.post('/senators', senatorMiddleware.checkSenator ,senatorController.createSenator);
senatorRouter.put('/senators/:id', senatorMiddleware.checkSenator ,senatorController.modifySenator);
senatorRouter.delete('/senators/:id', senatorController.deleteSenator);
senatorRouter.get('/senators', senatorController.getAllSenators);
senatorRouter.get('/states', senatorController.getAllStates);
senatorRouter.get('/senators/:id', senatorController.findSenatorById);
senatorRouter.post('/senators/email/:id', senatorController.sendEmailToSenator);


module.exports = senatorRouter;
