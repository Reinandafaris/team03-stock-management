const createHttpError = require("http-errors");
const { CategoryItems } = require("../models");

const findCategory = async (req, res, next) => {
  try {
    const category = await CategoryItems.findAll();

    res.status(200).json({
      status: "Success",
      data: {
        category,
      },
    });
  } catch (error) {
    next(createHttpError(400, { message: error.message }));
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log("masukk");

    const category = await CategoryItems.create(
      name,
    );
    res.status(201).json({
      status: "success",
      data: {
        ...category,
      },
    });
  } catch (error) {
    next(createHttpError(500, { message: error.message }));
  }
};

module.exports = {
  findCategory,
  createCategory,
};
