const createHttpError = require("http-errors");
const { Companies } = require("../models");

const findCompanies = async (req, res, next) => {
  try {
    const companies = await Companies.findAll();

    res.status(200).json({
      status: "Success",
      data: {
        companies,
      },
    });
  } catch (error) {
    next(createHttpError(400, { message: error.message }));
  }
};

const createCompany = async (req, res, next) => {
  try {
    const { name } = req.body;

    const company = await Companies.create({
      name,
    });

    res.status(201).json({
      status: "success",
      data: {
        company,
      },
    });
  } catch (error) {
    next(createHttpError(500, { message: error.message }));
  }
};

const updateCompany = async (req, res, next) => {
  const { name } = req.body;
  try {
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
      status: "Success",
      message: "sukses update company",
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
      next(new ApiError("company id tersebut gak ada", 404));
    }

    await company.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete company",
    });
  } catch (error) {
    next(createHttpError(500, { message: error.message }));
  }
};

module.exports = {
  findCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
};
