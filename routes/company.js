const express = require("express");
const {
  createCompany,
  deleteCompany,
  updateCompany,
  getAllCompany,
} = require("../controllers/company");
const Validator = require("../middlewares/validator");
const {
  companySchema,
  updateCompanySchema,
} = require("../utils/joiValidation");
const router = express.Router();

router.get("/", getAllCompany);
router.post("/create", Validator(companySchema), createCompany);
router.patch("/update/:id", Validator(updateCompanySchema), updateCompany);
router.delete("/delete/:id", deleteCompany);

module.exports = router;
