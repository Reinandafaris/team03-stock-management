const express = require('express');
const { createCompany, deleteCompany, updateCompany, getAllCompany } = require('../controllers/company');

const router = express.Router();

router.get('/', getAllCompany);
router.post('/create', createCompany);
router.patch('/update/:id', updateCompany);
router.delete('/delete/:id', deleteCompany);

module.exports = router;
