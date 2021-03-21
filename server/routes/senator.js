const { Router } = require('express');
const senatorController = require('../controllers/senator');
const  verify = require('../controllers/users');
// post middleware
const senatorMiddleware = require('../middleware/senator');

// configure route
const senatorRouter = Router();

senatorRouter.post('/posts', verify.verifyToken, senatorMiddleware.checkSenator ,senatorController.createSenator);
senatorRouter.put('/posts/:id', verify.verifyToken, senatorMiddleware.checkSenator ,senatorController.modifySenator);
senatorRouter.delete('/posts/:id', verify.verifyToken, senatorController.deleteSenator);

// export post route to app.js
module.exports = senatorRouter;
