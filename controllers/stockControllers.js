const createHttpError = require("http-errors");
const { Stock } = require("../models");

const findStock = async (req, res, next) => {
  try {
    const stocks = await Stock.findAll();

    res.status(200).json({
      status: "Success",
      data: {
        stocks,
      },
    });
  } catch (error) {
    next(createHttpError(400, { message: error.message }));
  }
};

const createStock = async (req, res, next) => {
  try {
    const { companyId, itemId, stock } = req.body;

    const stocks = await Stock.create({
      name,
    });

    res.status(201).json({
      status: "success",
      data: {
        stock,
      },
    });
  } catch (error) {
    next(createHttpError(500, { message: error.message }));
  }
};

module.exports = {
  findStock,
  createStock,
};
