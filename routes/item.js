const express = require('express');
const { getAllItem, createItem } = require('../controllers/item');

const router = express.Router();

router.get('/', getAllItem);
router.post('/create', createItem);

module.exports = router;
