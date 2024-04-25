const router = require('express').Router();

const authRouter = require('./auth');

router.use('/users', authRouter);

module.exports = router;
