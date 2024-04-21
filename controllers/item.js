const { Item, sequelize } = require("../models");
const { Op, Sequelize } = require("sequelize");
const { randomUUID } = require("crypto");
const createHttpError = require("http-errors");
const handleUploadImage = require("../utils/handleUpload");

const getAllItem = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Item.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      },
      order: [[Sequelize.col("stock"), "ASC"]],
      offset,
      limit,
    });

    res.status(200).json({
      status: true,
      message: "get all items data success",
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

const createItem = async (req, res, next) => {
  try {
    const { categoryId, name, price, stock } = req.body;
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

    const item = await Item.create({
      id: randomUUID(),
      name,
      categoryId,
      price,
      stock,
      imageUrl: images.imagesUrl,
      imageId: images.imagesId,
    });

    res.status(201).json({
      status: true,
      message: "create item successfully!",
      data: {
        item,
      },
    });
  } catch (error) {
    next(createHttpError(500, { message: error.message }));
  }
};

const updateItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Item.findByPk(id);

    if (!item) {
      return next(createHttpError(404, "item not found"));
    }

    const { categoryId, name, price, stock } = req.body;
    const files = req.files;

    const images = {
      imagesUrl: item.imageUrl,
      imagesId: item.imageId,
    };

    if (files.length !== 0) {
      const { imagesUrl, imagesId } = await handleUploadImage(files);
      images.imagesUrl = imagesUrl;
      images.imagesId = imagesId;
    }

    const transaction = await sequelize.transaction();
    try {
      await Item.update(
        {
          name,
          categoryId,
          price,
          stock,
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

      await transaction.commit();

      res.status(201).json({
        status: true,
        message: "item updated successfully",
        data: {
          name: req.body.name,
          categoryId: req.body.categoryId,
          price: req.body.price,
          stock: req.body.stock,
          imageUrl: images.imagesUrl,
          imageId: images.imagesId,
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

const deleteItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Item.findByPk(id);

    if (!item) {
      return next(createHttpError(404, "item not found"));
    }

    await item.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: true,
      message: "item deleted successfully",
    });
  } catch (error) {
    next(createHttpError(500, { message: error.message }));
  }
};

module.exports = {
  getAllItem,
  createItem,
  updateItem,
  deleteItem,
};
