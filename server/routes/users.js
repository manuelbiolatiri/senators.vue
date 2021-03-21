const { Router } = require('express');
const signLogin =require('../controllers/users');
// import user middleware
const registerMiddleware = require('../middleware/users');

// configure route
const userRouter = Router();

userRouter.post('/signup', registerMiddleware.checkSignUp ,signLogin.signUP);
userRouter.post('/signin', signLogin.logIn);

// export user route to server.js
module.exports = userRouter;