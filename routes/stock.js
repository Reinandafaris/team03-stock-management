const express = require('express');

const router = express.Router();

const { getAllStock, createStock, updateStock, deleteStock } = require('../controllers/stock');

router.get('/', getAllStock);
router.post('/create', createStock);
router.patch('/update/:id', updateStock);
router.delete('/delete/:id', deleteStock);

module.exports = router;
