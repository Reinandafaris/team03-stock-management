const router = require('express').Router();

const authRouter = require('./auth');
const companyRouter = require('./company');
const stockRouter = require('./stock');
const itemRouter = require('./item');
const categoryRouter = require('./categoryItem');

router.use('/api/v1', authRouter);
router.use('/api/v1/company', companyRouter);
router.use('/api/v1/stock', stockRouter);
router.use('/api/v1/items', itemRouter);
router.use('/api/v1/category', categoryRouter);

module.exports = router;
