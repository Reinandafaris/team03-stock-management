const Joi = require('joi');

//! LOGIN
const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).alphanum().required(),
});

//! Superadmin
const onlySuperAdmin = Joi.object({
	name: Joi.string().max(60).required(),
	role: Joi.string().required().valid('superadmin', 'admin', 'member'),
	email: Joi.string().email().required(),
	image: Joi.any(),
	companyId: Joi.string(),
	password: Joi.string().min(8).alphanum().required(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

const onlySuperAdminUpdate = Joi.object({
	name: Joi.string().max(60),
	role: Joi.string().valid('superadmin', 'admin', 'member'),
	email: Joi.string().email(),
	image: Joi.any(),
	companyId: Joi.string(),
	password: Joi.string().min(8).alphanum(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).messages({
		'any.only': 'Confirm password does not match password',
	}),
});

//! Admin & Member
const onlyAdmin = Joi.object({
	name: Joi.string().max(60).required(),
	role: Joi.string().required().valid('member'),
	email: Joi.string().email().required(),
	image: Joi.any(),
	companyId: Joi.string().required(),
	password: Joi.string().min(8).alphanum().required(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

//! Category Item
const categoryItemSchema = Joi.object({
	name: Joi.string().max(30).required(),
});

const updateCategoryItemSchema = Joi.object({
	name: Joi.string().max(30),
});

//! Companies
const companySchema = Joi.object({
	name: Joi.string().max(20).required(),
});

const updateCompanySchema = Joi.object({
	name: Joi.string().max(20),
});

module.exports = {
	loginSchema,
	onlySuperAdmin,
	onlySuperAdminUpdate,
	onlyAdmin,
	companySchema,
	updateCompanySchema,
	categoryItemSchema,
	updateCategoryItemSchema,
};
