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
	password: Joi.string().min(8).alphanum().required(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

const onlySuperAdminUpdate = Joi.object({
	name: Joi.string().max(60),
	role: Joi.string().valid('superadmin', 'admin', 'member'),
	email: Joi.string().email(),
	password: Joi.string().min(8).alphanum(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).messages({
		'any.only': 'Confirm password does not match password',
	}),
});

//! Admin & Member
const onlyMemberAndAdmin = Joi.object({
	name: Joi.string().max(60).required(),
	role: Joi.string().required().valid('member'),
	email: Joi.string().email().required(),
	companyId: Joi.string().required(),
	password: Joi.string().min(8).alphanum().required(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

const onlyMemberUpdate = Joi.object({
	name: Joi.string().max(60),
	role: Joi.string().valid('member'),
	email: Joi.string().email(),
	companyId: Joi.string(),
	password: Joi.string().min(8).alphanum(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

const onlyAdminUpdate = Joi.object({
	name: Joi.string().max(60),
	role: Joi.string().valid('admin', 'member'),
	email: Joi.string().email(),
	companyId: Joi.string(),
	password: Joi.string().min(8).alphanum(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

module.exports = {
	loginSchema,
	onlySuperAdmin,
	onlySuperAdminUpdate,
	onlyMemberAndAdmin,
	onlyMemberUpdate,
	onlyAdminUpdate,
};