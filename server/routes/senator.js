const { Router } = require('express');
const senatorController = require('../controllers/senator');
const  verify = require('../controllers/users');

const senatorMiddleware = require('../middleware/senator');

// configure route
const senatorRouter = Router();

senatorRouter.post('/senators', verify.verifyToken, senatorMiddleware.checkSenator ,senatorController.createSenator);
senatorRouter.put('/senators/:id', verify.verifyToken, senatorMiddleware.checkSenator ,senatorController.modifySenator);
senatorRouter.delete('/senators/:id', verify.verifyToken, senatorController.deleteSenator);
senatorRouter.get('/senators', senatorController.getAllSenators);
senatorRouter.get('/senators/:id', senatorController.findSenatorById);

module.exports = senatorRouter;
