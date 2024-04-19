const { Item } = require('../models');
const { Op, Sequelize } = require('sequelize');

const getItems = async (req, res) => {
	try {
		const search = req.query.search || '';
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const offset = (page - 1) * limit;

		const { count, rows } = await Item.findAndCountAll({
			where: {
				name: {
					[Op.iLike]: `%${search}%`,
				},
			},
			order: [[Sequelize.col('stock'), 'ASC']],
			offset,
			limit,
		});

		res.status(200).json({
			status: true,
			message: 'get all items data success',
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

const createItem = async (req, res) => {
	try {
		const { categoryId, name, price } = req.body;
		const files = req.files;

		const images = {
			imagesUrl: [],
			imagesId: [],
		};

		if (files) {
			const { imagesUrl, imagesId } = await handleUploadImage(files);

			images.imagesUrl = imagesUrl;
			images.imagesId = imagesId;
		}

		const newItem = await Item.create({
			id: randomUUID(),
			name,
			categoryId,
			price,
			imageUrl: images.imagesUrl,
			imageId: images.imagesId,
		});

		res.status(201).json({
			status: true,
			message: 'create user successfully!',
			data: {
				item: {
					...newItem,
				},
			},
		});
	} catch (error) {
		next(createHttpError(500, { message: error.message }));
	}
};

module.exports = {
	getItems,
	createItem,
};
