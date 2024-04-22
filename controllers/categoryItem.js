const createHttpError = require('http-errors');
const { CategoryItems } = require('../models');
const { randomUUID } = require('crypto');
const { Op, Sequelize } = require('sequelize');

const getAllCategory = async (req, res, next) => {
	try {
		const search = req.query.search || '';
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const offset = (page - 1) * limit;
		const { count, rows } = await CategoryItems.findAndCountAll({
			where: {
				name: {
					[Op.iLike]: `%${search}%`,
				},
			},
			order: [[Sequelize.col('name'), 'ASC']],
			offset,
			limit,
		});

		res.status(200).json({
			status: true,
			message: 'all category item data retrieved successfully',
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
		next(createHttpError(400, { message: error.message }));
	}
};

const createCategory = async (req, res, next) => {
	try {
		const { name } = req.body;

		const category = await CategoryItems.create({
			id: randomUUID(),
			name,
		});

		res.status(201).json({
			status: true,
			data: {
				category,
			},
		});
	} catch (error) {
		next(createHttpError(500, { message: error.message }));
	}
};

const updateCategory = async (req, res, next) => {
	const {name} = req.body;
	try {
		const id = req.params.id;
		const category = await CategoryItems.findByPk(id);

		if (!category) {
			return next(createHttpError(404, 'category item not found'));
		}

		await CategoryItems.update({
			name,
			},
			{
			where: {
				id: req.params.id,
			},
		});

		res.status(200).json({
			status: true,
			message: 'category item updated successfully',
			data: {
				name: req.body.name,
			},
		});
	} catch (error) {
		next(createHttpError(400, { message: error.message }));
	}
};

const deleteCategory = async (req, res, next) => {
	try {
		const category = await CategoryItems.findOne({
			where: {
				id: req.params.id,
			},
		});

		if (!category) {
			return next(createHttpError(404, 'category item not found'));
		}

		await CategoryItems.destroy({
			where: {
				id: req.params.id,
			},
		});

		res.status(200).json({
			status: true,
			message: 'category item deleted successfully',
		});
	} catch (error) {
		next(createHttpError(400, { message: error.message }));
	}
};

module.exports = {
	getAllCategory,
	createCategory,
	updateCategory,
	deleteCategory,
};
