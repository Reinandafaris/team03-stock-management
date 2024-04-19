const createHttpError = require('http-errors');
const { User } = require('../models');
const { Op, Sequelize } = require('sequelize');

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
			message: 'get all user data success',
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
		res.status(500).json({
			status: false,
			message: error.message,
		});
	}
};

const getUser = async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.id);

		if (!user) {
			return next(createHttpError(404, 'User not found'));
		}

		res.status(200).json({
			status: true,
			data: {
				...user.dataValues,
			},
		});
	} catch (error) {
		next(createHttpError(400, { message: error.message }));
	}
};

module.exports = {
	getAllUser,
	getUser,
};
