const express = require('express');
const router = express.Router();

const { createCompany, deleteCompany, updateCompany, getAllCompany } = require('../controllers/company');

const Validator = require('../middlewares/validator');
const Authenticate = require('../middlewares/authentication');
const CheckRole = require('../middlewares/checkRole');

const { companySchema, updateCompanySchema } = require('../utils/joiValidation');

router.get('/', Authenticate, CheckRole('superadmin'), getAllCompany);
router.post('/create', Authenticate, CheckRole('superadmin'), Validator(companySchema), createCompany);
router.patch('/update/:id', Authenticate, CheckRole('superadmin'), Validator(updateCompanySchema), updateCompany);
router.delete('/delete/:id', Authenticate, CheckRole('superadmin'), deleteCompany);

module.exports = router;
