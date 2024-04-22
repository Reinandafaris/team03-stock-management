const createHttpError = require("http-errors");
const { Companies } = require("../models");
const { randomUUID } = require("crypto");
const { Op, Sequelize } = require("sequelize");

const getAllCompany = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Companies.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      },
      order: [[Sequelize.col("name"), "ASC"]],
      offset,
      limit,
    });

    res.status(200).json({
      status: true,
      message: "all company data retrieved successfully",
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

const createCompany = async (req, res, next) => {
  try {
    const { name } = req.body;

    const company = await Companies.create({
      id: randomUUID(),
      name,
    });

    res.status(201).json({
      status: true,
      message: "company data created successfully",
      data: company,
    });
  } catch (error) {
    next(createHttpError(500, { message: error.message }));
  }
};

const updateCompany = async (req, res, next) => {
  const { name } = req.body;
  try {
    const id = req.params.id;
    const company = await Companies.findByPk(id);

    if (!company) {
      return next(createHttpError(404, "user not found"));
    }

    await Companies.update(
      {
        name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: true,
      message: "company data updated successfully",
    });
  } catch (error) {
    next(createHttpError(400, { message: error.message }));
  }
};

const deleteCompany = async (req, res, next) => {
  try {
    const company = await Companies.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!company) {
      next(createHttpError(404, "company not found"));
    }

    await company.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: true,
      message: "company deleted successfully",
    });
  } catch (error) {
    next(createHttpError(500, { message: error.message }));
  }
};

module.exports = {
  getAllCompany,
  createCompany,
  updateCompany,
  deleteCompany,
};
