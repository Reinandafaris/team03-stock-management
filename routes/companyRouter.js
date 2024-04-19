const express = require("express");
const {
  findCompanies,
  createCompany,
} = require("../controllers/companyControllers");

const router = express.Router();

router.get("/", findCompanies);
router.post("/create", createCompany);

module.exports = router;
