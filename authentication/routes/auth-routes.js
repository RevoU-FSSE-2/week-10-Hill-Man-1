const { Router } = require('express');
const { register, login } = require('../services/auth-services');

const authRouter = Router();

authRouter.post('/register', register)

authRouter.post('/login', login)

module.exports = authRouter;