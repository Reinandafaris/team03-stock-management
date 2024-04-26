const express = require('express');
const router = express.Router();

const Upload = require('../../middlewares/upload');
const Authenticate = require('../../middlewares/authentication');
const Validator = require('../../middlewares/validator');
const CheckRole = require('../../middlewares/checkRole');

const { getUsersPage } = require('../../controllers/webpages/superadmin/auth');

const { onlySuperAdmin, onlyAdmin, onlySuperAdminUpdate } = require('../../utils/joiValidation');

// superadmin
router.get('/', getUsersPage);

module.exports = router;
