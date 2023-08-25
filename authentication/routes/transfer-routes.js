const { Router } = require('express');
const { getAllTransfer, updateStatus, createTransfer } = require('../services/transfer-services');
const { authMiddleware } = require('../middleware/auth-middleware');
const { authorizAdmin, authorizMaker, authorizApprover} = require('../middleware/authoriz-middleware');

const transferRouter = Router();

transferRouter.get('/all', getAllTransfer)

transferRouter.put('/update', authorizApprover, updateStatus)

transferRouter.post('/create', authorizMaker, createTransfer)


module.exports = transferRouter;