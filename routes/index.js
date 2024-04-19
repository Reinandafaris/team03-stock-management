const router = require('express').Router();

const authRouter = require('./authRouter');
const companyRouter = require('./companyRouter');
const stockRouter = require('./stockRouter');
const itemRouter = require('./itemRouter');

router.use('/api/v1', authRouter);
router.use('/api/v1/company', companyRouter);
router.use('/api/v1/stock', stockRouter);
router.use('/api/v1/items', itemRouter);

module.exports = router;
