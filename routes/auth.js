const express = require('express');
const router = express.Router();

const Upload = require('../middlewares/upload');
const Authenticate = require('../middlewares/authentication');
const Validator = require('../middlewares/validator');
const CheckRole = require('../middlewares/checkRole');

const { getAllUser, getUser, login, register, getUserLoggedIn, updateUser, deletedUser } = require('../controllers/auth');

const { onlySuperAdmin, onlyAdmin, onlySuperAdminUpdate } = require('../utils/joiValidation');

router.get('/me', Authenticate, getUserLoggedIn);
router.post('/login', login);
// superadmin
router.get('/', Authenticate, getAllUser);
router.get('/:id', Authenticate, getUser);
router.post('/sudo/register', Authenticate, CheckRole('superadmin'), Upload.array('images'), Validator(onlySuperAdmin), register);
router.patch('/sudo/update/:id', Authenticate, CheckRole('superadmin'), Upload.array('images'), Validator(onlySuperAdminUpdate), updateUser);
router.delete('/sudo/delete/:id', Authenticate, CheckRole('superadmin'), deletedUser);
// admin
router.post('/register', Authenticate, CheckRole('superadmin'), Upload.array('images'), Validator(onlyAdmin), register);
router.delete('/delete/:id', Authenticate, CheckRole('superadmin'), deletedUser);

module.exports = router;
