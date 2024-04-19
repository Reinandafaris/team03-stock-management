const router = require('express').Router();

const authRouter = require('./authRouter');
const companyRouter = require('./companyRouter');
const stockRouter = require('./stockRouter');
const itemRouter = require('./itemRouter');
const categoryRouter = require('./categoryItemRouter');

router.use('/api/v1', authRouter);
router.use('/api/v1/company', companyRouter);
router.use('/api/v1/stock', stockRouter);
router.use('/api/v1/items', itemRouter);
router.use('/api/v1/category', categoryRouter);

module.exports = router;
