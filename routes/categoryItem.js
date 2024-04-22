const express = require('express');
const { updateCategory, getAllCategory, createCategory, deleteCategory } = require('../controllers/categoryItem');
const Validator = require('../middlewares/validator');
const { categoryItemSchema, updateCategoryItemSchema } = require('../utils/joiValidation');

const router = express.Router();

router.get('/', getAllCategory);
router.post('/create', Validator(categoryItemSchema), createCategory);
router.patch('/update/:id', Validator(updateCategoryItemSchema), updateCategory);
router.delete('/delete/:id', deleteCategory);

module.exports = router;
