const createHttpError = require('http-errors');
const { Stock, Item, sequelize } = require('../models');
const { Sequelize } = require('sequelize');
const { randomUUID } = require('crypto');

const getAllStock = async (req, res, next) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const offset = (page - 1) * limit;

		const whereCondition = req.user.companyId !== null ? { companyId: req.user.companyId } : {};

		const { count, rows } = await Stock.findAndCountAll({
			where: whereCondition,
			include: ['Company', 'Item'],
			order: [[Sequelize.col('stock'), 'ASC']],
			offset,
			limit,
		});

		res.status(200).json({
			status: true,
			message: 'all stock data retrieved successfully',
			totalItems: count,
			pagination: {
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
		const userLoggedIn = req.user;
		const { itemId, stock } = req.body;

		const item = await Item.findOne({
			where: {
				id: itemId,
			},
		});

		if (!item) {
			return next(createHttpError(422, 'item not found'));
		}

		if (item.stock - stock < 0) {
			return next(createHttpError(422, 'remaining stock is insufficient'));
		}

		let remainingStockInItem = item.stock - stock;

		const transaction = await sequelize.transaction();
		try {
			await Item.update(
				{
					stock: remainingStockInItem,
				},
				{
					where: {
						id: itemId,
					},
				},
				{ transaction }
			);

			const stocks = await Stock.create(
				{
					id: randomUUID(),
					companyId: userLoggedIn.companyId,
					itemId,
					stock,
				},
				{ transaction }
			);

			await transaction.commit();
			res.status(201).json({
				status: true,
				data: {
					stocks,
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

const updateStock = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { stock } = req.body;
		const userLoggedIn = req.user;

		const dbStock = await Stock.findByPk(id);

		if (!dbStock) {
			return next(createHttpError(404, 'stock not found'));
		}

		if (req.user.companyId !== null) {
			if (dbStock.companyId !== userLoggedIn.companyId) {
				return next(createHttpError(403, 'you does not have access permissions for this data'));
			}
		}

		const item = await Item.findOne({
			where: {
				id: dbStock.itemId,
			},
		});

		if (!item) {
			return next(createHttpError(422, 'item not found'));
		}

		let remainingStockInItem = item.stock;

		if (item.stock - stock < 0) {
			return next(createHttpError(422, 'remaining stock is insufficient'));
		}

		if (stock > dbStock.stock) {
			remainingStockInItem = item.stock - stock;
		} else if (stock == dbStock.stock) {
			remainingStockInItem = item.stock;
		} else if (stock < dbStock.stock) {
			remainingStockInItem = item.stock + (dbStock.stock - stock);
		}

		const transaction = await sequelize.transaction();
		try {
			await Item.update(
				{
					stock: remainingStockInItem,
				},
				{
					where: {
						id: dbStock.itemId,
					},
				},
				{ transaction }
			);

			await Stock.update(
				{
					stock,
				},
				{
					where: {
						id: dbStock.id,
					},
				},
				{ transaction }
			);

			await transaction.commit();
			res.status(200).json({
				status: true,
				message: 'stock updated successfully',
				data: {
					stock: stock,
				},
			});
		} catch (error) {
			await transaction.rollback();
			next(createHttpError(500, { message: error.message }));
		}
	} catch (error) {
		next(createHttpError(400, { message: error.message }));
	}
};

const deleteStock = async (req, res, next) => {
	try {
		const userLoggedIn = req.user;
		const stock = await Stock.findByPk(req.params.id);

		if (!stock) {
			next(createHttpError(404, 'stock not found'));
		}

		if (!stock) {
			return next(createHttpError(404, 'stock not found'));
		}

		if (req.user.companyId !== null) {
			if (stock.companyId !== userLoggedIn.companyId) {
				return next(createHttpError(403, 'you does not have access permissions for this data'));
			}
		}

		await stock.destroy({
			where: {
				id: req.params.id,
			},
		});

		res.status(200).json({
			status: true,
			message: 'stock deleted successfully',
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
