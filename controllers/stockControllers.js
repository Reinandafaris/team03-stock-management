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
        companyId, itemId, stock
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
const updateStock = async (req, res, next) => {
    const { companyId, itemId, stock } = req.body;
    try {
      await Stock.update(
        {
            companyId, itemId, stock
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
  
      res.status(200).json({
        status: "Success",
        message: "update stock is success",
      });
    } catch (error) {
      next(createHttpError(400, { message: error.message }));
    }
  };
  
  const deleteStock = async (req, res, next) => {
    try {
      const stock = await Stock.findOne({
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
        status: "Success",
        message: "delete stock is success",
      });
    } catch (error) {
      next(createHttpError(500, { message: error.message }));
    }
  };

module.exports = {
  findStock,
  createStock,
  updateStock,
  deleteStock,
};
