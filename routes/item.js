const express = require('express');
const router = express.Router();

const { getAllItem, createItem, updateItem, deleteItem } = require('../controllers/item');

const upload = require('../middlewares/upload');
const Validator = require('../middlewares/validator');
const Authenticate = require('../middlewares/authentication');
const CheckRole = require('../middlewares/checkRole');

router.get('/', Authenticate, CheckRole('superadmin'), getAllItem);
router.post('/create', Authenticate, CheckRole('superadmin'), upload.array('images'), createItem);
router.patch('/update/:id', Authenticate, CheckRole('superadmin'), upload.array('images'), updateItem);
router.delete('/delete/:id', Authenticate, CheckRole('superadmin'), deleteItem);

module.exports = router;
