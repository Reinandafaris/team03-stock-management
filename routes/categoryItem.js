const express = require('express');
const router = express.Router();

const { updateCategory, getAllCategory, createCategory, deleteCategory } = require('../controllers/categoryItem');

const Validator = require('../middlewares/validator');
const Authenticate = require('../middlewares/authentication');
const CheckRole = require('../middlewares/checkRole');

const { categoryItemSchema, updateCategoryItemSchema } = require('../utils/joiValidation');

router.get('/', Authenticate, CheckRole('superadmin'), getAllCategory);
router.post('/create', Authenticate, CheckRole('superadmin'), Validator(categoryItemSchema), createCategory);
router.patch('/update/:id', Authenticate, CheckRole('superadmin'), Validator(updateCategoryItemSchema), updateCategory);
router.delete('/delete/:id', Authenticate, CheckRole('superadmin'), deleteCategory);

module.exports = router;
