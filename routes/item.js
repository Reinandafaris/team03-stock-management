const express = require('express');
const router = express.Router();

const { getAllItem, createItem, updateItem, deleteItem, getItemById } = require('../controllers/item');

const upload = require('../middlewares/upload');
const Validator = require('../middlewares/validator');
const Authenticate = require('../middlewares/authentication');
const CheckRole = require('../middlewares/checkRole');
const { itemSchema, updateItemSchema } = require('../utils/joiValidation');

router.get('/', Authenticate, CheckRole('superadmin', 'admin'), getAllItem);
router.get('/:id', Authenticate, CheckRole('superadmin', 'admin'), getItemById);
router.post('/create', Authenticate, CheckRole('superadmin'), upload.array('images'), Validator(itemSchema), createItem);
router.patch('/update/:id', Authenticate, CheckRole('superadmin'), upload.array('images'), Validator(updateItemSchema), updateItem);
router.delete('/delete/:id', Authenticate, CheckRole('superadmin'), deleteItem);

module.exports = router;
