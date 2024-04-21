const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const handleUploadImage = require('../utils/handleUpload');
const { User, Auth, sequelize } = require('../models');
const { Op, Sequelize } = require('sequelize');
const { randomUUID } = require('crypto');

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await Auth.findOne({
			where: {
				email,
			},
			include: ['User'],
		});

		if (user && bcrypt.compareSync(password, user.password)) {
			const token = jwt.sign(
				{
					id: user.userId,
					username: user.User.name,
					role: user.User.role,
					email: user.email,
					companyId: user.User.companyId,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: process.env.JWT_EXP,
				}
			);

			res.cookie('_token', token, {
				httpOnly: true,
				maxAge: 24 * 60 * 60 * 100,
			});

			res.status(200).json({
				status: true,
				message: 'user logged in successfully',
				_token: token,
			});
		} else {
			next(
				createHttpError(400, {
					message: 'wrong Password or user not found',
				})
			);
		}
	} catch (error) {
		next(createHttpError(500, { message: error.message }));
	}
};

const register = async (req, res, next) => {
	try {
		const { email, password, confirmPassword, name, role, companyId } = req.body;

		const files = req.files;

		const images = {
			imagesUrl: [],
			imagesId: [],
		};

		// hashing password
		const saltRounds = 10;
		const hashedPassword = bcrypt.hashSync(password, saltRounds);
		const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

		if (files.length !== 0) {
			const { imagesUrl, imagesId } = await handleUploadImage(files);
			images.imagesUrl = imagesUrl;
			images.imagesId = imagesId;
		}

		const transaction = await sequelize.transaction();
		try {
			const user = await User.create(
				{
					id: randomUUID(),
					name,
					companyId,
					role,
					imageUrl: images.imagesUrl,
					imageId: images.imagesId,
				},
				{ transaction }
			);

			const auth = await Auth.create(
				{
					id: randomUUID(),
					email,
					password: hashedPassword,
					confirmPassword: hashedConfirmPassword,
					userId: user.id,
				},
				{ transaction }
			);

			await transaction.commit();

			res.status(201).json({
				status: true,
				message: 'user created successfully',
				data: {
					user: {
						id: user.id,
						name: user.name,
						role: user.role,
						companyId: user.companyId,
						imageUrl: user.imageUrl,
						imageId: user.imageId,
						createdAt: user.createdAt,
						updatedAt: user.updatedAt,
					},
					auth: {
						id: auth.id,
						userId: auth.userId,
						email: auth.email,
						createdAt: auth.createdAt,
						updatedAt: auth.updatedAt,
					},
				},
			});
		} catch (error) {
			await transaction.rollback();
			next(createHttpError(500, { message: error.message }));
		}
	} catch (error) {
		next(createHttpError(500, { message: error.message }));
	}
};

const getUserLoggedIn = async (req, res, next) => {
	try {
		const user = req.user;
		if (!user) return next(createHttpError(401, { message: 'Unauthorized' }));

		res.status(200).json({
			status: true,
			data: {
				user: {
					id: user.id,
					name: user.name,
					companyId: user.companyId,
					imageUrl: user.imageUrl,
					imageId: user.imageId,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
				},
				auth: {
					id: user.Auth.id,
					userId: user.Auth.userId,
					email: user.Auth.email,
					password: user.Auth.password,
					id: user.Auth.id,
					createdAt: user.Auth.createdAt,
					updatedAt: user.Auth.updatedAt,
				},
			},
		});
	} catch (err) {
		next(createHttpError(500, { message: err.message }));
	}
};

const getAllUser = async (req, res) => {
	try {
		const search = req.query.search || '';
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const offset = (page - 1) * limit;

		const { count, rows } = await User.findAndCountAll({
			where: {
				name: {
					[Op.iLike]: `%${search}%`,
				},
			},
			order: [[Sequelize.col('role'), 'ASC']],
			offset,
			limit,
		});

		res.status(200).json({
			status: true,
			message: 'all user data retrieved successfully',
			pagination: {
				totalItems: count,
				totalPages: Math.ceil(count / limit),
				currentPage: +page,
				pageItems: rows.length,
				nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
				prevPage: page > 1 ? page - 1 : null,
			},
			data: rows,
		});
	} catch (error) {
		next(createHttpError(500, { message: error.message }));
	}
};

const getUser = async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.id);

		if (!user) {
			return next(createHttpError(404, 'user not found'));
		}

		res.status(200).json({
			status: true,
			message: 'user data retrieved successfully',
			data: user,
		});
	} catch (error) {
		next(createHttpError(400, { message: error.message }));
	}
};

const updateUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await User.findByPk(id);

		if (!user) {
			return next(createHttpError(404, 'user not found'));
		}

		const { email, password, confirmPassword, name, role, companyId } = req.body;
		const files = req.files;

		const images = {
			imagesUrl: user.imageUrl,
			imagesId: user.imageId,
		};

		// hashing password
		const saltRounds = 10;
		const hashedPassword = bcrypt.hashSync(password, saltRounds);
		const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

		if (files.length !== 0) {
			const { imagesUrl, imagesId } = await handleUploadImage(files);
			images.imagesUrl = imagesUrl;
			images.imagesId = imagesId;
		}

		const transaction = await sequelize.transaction();
		try {
			await User.update(
				{
					name,
					companyId,
					role,
					imageUrl: images.imagesUrl,
					imageId: images.imagesId,
				},
				{
					where: {
						id,
					},
				},
				{ transaction }
			);

			await Auth.update(
				{
					email,
					password: hashedPassword,
					confirmPassword: hashedConfirmPassword,
				},
				{
					where: {
						id,
					},
				},
				{ transaction }
			);

			await transaction.commit();

			res.status(201).json({
				status: true,
				message: 'user updated successfully',
				data: {
					name: req.body.name,
					email: req.body.email,
					role: req.body.role,
					images,
					companyId: req.body.companyId,
				},
			});
		} catch (error) {
			await transaction.rollback();
			next(createHttpError(500, { message: error.message }));
		}
	} catch (error) {
		next(createHttpError(500, { message: error.message }));
	}
};

const deletedUser = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const checkUser = await User.findByPk(userId);
		if (!checkUser) {
			return next(createHttpError(404, 'user not found'));
		}
		const user = await User.findOne({
			where: {
				id: userId,
			},
			include: ['Auth'],
		});

		const authId = user.Auth.id;

		const transaction = await sequelize.transaction();
		try {
			await Auth.destroy(
				{
					where: {
						id: authId,
					},
				},
				{ transaction }
			);

			await User.destroy(
				{
					where: {
						id: userId,
					},
				},
				{ transaction }
			);

			await transaction.commit();
			res.status(201).json({
				status: true,
				message: 'user deleted successfully',
				data: req.body,
			});
		} catch (error) {
			await transaction.rollback();
			next(createHttpError(400, { message: error.message }));
		}
	} catch (error) {
		next(createHttpError(500, { message: error.message }));
	}
};

module.exports = {
	login,
	register,
	getUserLoggedIn,
	getAllUser,
	getUser,
	updateUser,
	deletedUser,
};
