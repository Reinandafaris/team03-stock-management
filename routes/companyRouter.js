const express = require("express");
const {
  findCompanies,
  createCompany,
  deleteCompany,
  updateCompany,
} = require("../controllers/companyControllers");

const router = express.Router();

router.get("/", findCompanies);
router.post("/create", createCompany);
router.patch("/update/:id", updateCompany);
router.delete("/delete/:id", deleteCompany);

module.exports = router;
