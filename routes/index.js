const router = require('express').Router();

const authRouter = require('./auth');
const companyRouter = require('./company');
const stockRouter = require('./stock');
const itemRouter = require('./item');
const categoryRouter = require('./categoryItem');

router.use('/api/v1/users', authRouter);
router.use('/api/v1/companies', companyRouter);
router.use('/api/v1/stocks', stockRouter);
router.use('/api/v1/items', itemRouter);
router.use('/api/v1/categories', categoryRouter);

module.exports = router;
