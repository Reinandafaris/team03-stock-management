const express = require('express');
const router = express.Router();

const { getAllStock, createStock, updateStock, deleteStock } = require('../controllers/stock');

const Validator = require('../middlewares/validator');
const Authenticate = require('../middlewares/authentication');
const CheckRole = require('../middlewares/checkRole');

router.get('/', Authenticate, CheckRole('superadmin', 'admin', 'member'), getAllStock);
router.post('/create', Authenticate, CheckRole('admin'), createStock);
router.patch('/update/:id', Authenticate, CheckRole('superadmin', 'admin', 'member'), updateStock);
router.delete('/delete/:id', Authenticate, CheckRole('superadmin', 'admin'), deleteStock);

module.exports = router;
