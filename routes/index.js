const router = require('express').Router();

const authRouter = require('./auth');
const companyRouter = require('./company');
const stockRouter = require('./stock');
const itemRouter = require('./item');
const categoryRouter = require('./categoryItem');

router.use('/users', authRouter);
router.use('/companies', companyRouter);
router.use('/stocks', stockRouter);
router.use('/items', itemRouter);
router.use('/categories', categoryRouter);

module.exports = router;
