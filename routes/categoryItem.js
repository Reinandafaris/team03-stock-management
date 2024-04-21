const express = require('express');
const { updateCategory, getAllCategory, createCategory } = require('../controllers/categoryItem');

const router = express.Router();

router.get('/', getAllCategory);
router.post('/create', createCategory);
router.patch('/update/:id', updateCategory);

module.exports = router;
