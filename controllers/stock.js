const createHttpError = require('http-errors');
const { Stock } = require('../models');
const { randomUUID } = require('crypto');

const getAllStock = async (req, res, next) => {
	try {
		const { count, rows } = await CategoryItems.findAndCountAll({
			where: {
				name: {
					[Op.iLike]: `%${search}%`,
				},
			},
			order: [[Sequelize.col('stock'), 'ASC']],
			offset,
			limit,
		});

		const search = req.query.search || '';
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const offset = (page - 1) * limit;

		res.status(200).json({
			status: true,
			message: 'get all stock successfully!',
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

const createStock = async (req, res, next) => {
	try {
		const { companyId, itemId, stock } = req.body;

		const stocks = await Stock.create({
			id: randomUUID(),
			companyId,
			itemId,
			stock,
		});

		res.status(201).json({
			status: true,
			data: {
				stocks,
			},
		});
	} catch (error) {
		next(createHttpError(500, { message: error.message }));
	}
};
const updateStock = async (req, res, next) => {
	const { companyId, itemId, stock } = req.body;
	try {
		await Stock.update(
			{
				companyId,
				itemId,
				stock,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);

		res.status(200).json({
			status: true,
			message: 'update stock is success',
		});
	} catch (error) {
		next(createHttpError(400, { message: error.message }));
	}
};

const deleteStock = async (req, res, next) => {
	try {
		const stock = await Stock.findByPk({
			where: {
				id: req.params.id,
			},
		});

		if (!stock) {
			next(createHttpError(404, { message: error.message }));
		}

		await stock.destroy({
			where: {
				id: req.params.id,
			},
		});

		res.status(200).json({
			status: true,
			message: 'delete stock is success',
		});
	} catch (error) {
		next(createHttpError(500, { message: error.message }));
	}
};

module.exports = {
	getAllStock,
	createStock,
	updateStock,
	deleteStock,
};
